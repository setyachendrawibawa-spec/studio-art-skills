const express = require('express');
const router = express.Router();
const db = require('../db');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

// Wrap all endpoints with authMiddleware
router.use(authMiddleware);

/* ==========================================================================
   SUBMISSIONS & FEEDBACK
   ========================================================================== */

// GET /api/submissions
router.get('/submissions', async (req, res) => {
  try {
    let queryText = 'SELECT s.*, u.name as user_name, l.title as lesson_title FROM submissions s JOIN users u ON s.user_id = u.id JOIN lessons l ON s.lesson_id = l.id';
    const params = [];
    
    // If learner, only show their submissions
    if (req.user.role === 'learner') {
      queryText += ' WHERE s.user_id = $1';
      params.push(req.user.id);
    }
    
    queryText += ' ORDER BY s.submitted_at DESC';
    const result = await db.query(queryText, params);
    
    // Fetch associated feedbacks
    const subsWithFeedback = await Promise.all(result.rows.map(async (sub) => {
      const fbResult = await db.query('SELECT f.*, u.name as mentor_name FROM feedback f JOIN users u ON f.mentor_id = u.id WHERE f.submission_id = $1', [sub.id]);
      return {
        ...sub,
        feedback: fbResult.rows[0] || null
      };
    }));

    res.json({ success: true, data: subsWithFeedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/submissions (Learner only)
router.post('/submissions', requireRole(['learner']), async (req, res) => {
  const { lessonId, title, fileUrl, note } = req.body;
  if (!lessonId || !title || !fileUrl) {
    return res.status(400).json({ success: false, message: 'lessonId, title, and fileUrl are required.' });
  }

  try {
    const result = await db.query(
      'INSERT INTO submissions (user_id, lesson_id, title, file_url, note) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, lessonId, title, fileUrl, note]
    );

    // Create activity log
    await db.query(
      'INSERT INTO activity_logs (user_id, action, entity_type, entity_id) VALUES ($1, $2, $3, $4)',
      [req.user.id, 'Mengirim latihan', 'submission', result.rows[0].id]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/feedback (Mentor only)
router.post('/feedback', requireRole(['mentor']), async (req, res) => {
  const { submissionId, comment, score, rubricScoresJson } = req.body;
  if (!submissionId || !comment || score === undefined) {
    return res.status(400).json({ success: false, message: 'submissionId, comment, and score are required.' });
  }

  try {
    // Start transaction
    await db.query('BEGIN');

    // Insert feedback
    const fbResult = await db.query(
      'INSERT INTO feedback (submission_id, mentor_id, comment, score, rubric_scores_json) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [submissionId, req.user.id, comment, score, JSON.stringify(rubricScoresJson || [])]
    );

    // Update submission status
    await db.query(
      'UPDATE submissions SET status = $1, reviewed_at = NOW() WHERE id = $2',
      ['reviewed', submissionId]
    );

    // Get submission owner to trigger progress updates
    const subOwnerRes = await db.query('SELECT user_id, lesson_id FROM submissions WHERE id = $1', [submissionId]);
    const studentId = subOwnerRes.rows[0].user_id;
    const lessonId = subOwnerRes.rows[0].lesson_id;

    // Log action
    await db.query(
      'INSERT INTO activity_logs (user_id, action, entity_type, entity_id) VALUES ($1, $2, $3, $4)',
      [req.user.id, 'Memberikan penilaian', 'feedback', fbResult.rows[0].id]
    );

    await db.query('COMMIT');
    res.status(201).json({ success: true, data: fbResult.rows[0] });
  } catch (error) {
    await db.query('ROLLBACK');
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ==========================================================================
   PORTFOLIO
   ========================================================================== */

// GET /api/portfolio
router.get('/portfolio', async (req, res) => {
  try {
    let queryText = 'SELECT p.*, u.name as user_name FROM portfolio_items p JOIN users u ON p.user_id = u.id';
    const params = [];

    if (req.user.role === 'learner') {
      queryText += ' WHERE p.user_id = $1';
      params.push(req.user.id);
    }

    queryText += ' ORDER BY p.is_featured DESC, p.created_at DESC';
    const result = await db.query(queryText, params);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/portfolio (Learner only)
router.post('/portfolio', requireRole(['learner']), async (req, res) => {
  const { title, imageUrl, reflection, tags, isFeatured } = req.body;
  if (!title || !imageUrl) {
    return res.status(400).json({ success: false, message: 'title and imageUrl are required.' });
  }

  try {
    const result = await db.query(
      'INSERT INTO portfolio_items (user_id, title, image_url, reflection, tags_json, is_featured) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [req.user.id, title, imageUrl, reflection, JSON.stringify(tags || []), isFeatured || false]
    );

    // Create activity log
    await db.query(
      'INSERT INTO activity_logs (user_id, action, entity_type, entity_id) VALUES ($1, $2, $3, $4)',
      [req.user.id, 'Mengunggah ke portofolio', 'portfolio_item', result.rows[0].id]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/submissions/:id (Learner only, only can edit if not reviewed yet)
router.put('/submissions/:id', requireRole(['learner']), async (req, res) => {
  const { id } = req.params;
  const { title, fileUrl, note } = req.body;
  try {
    const subCheck = await db.query('SELECT * FROM submissions WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    if (subCheck.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Submission not found or unauthorized.' });
    }
    if (subCheck.rows[0].status === 'reviewed') {
      return res.status(400).json({ success: false, message: 'Cannot edit a submission that has already been graded.' });
    }

    const result = await db.query(
      'UPDATE submissions SET title = COALESCE($1, title), file_url = COALESCE($2, file_url), note = COALESCE($3, note) WHERE id = $4 RETURNING *',
      [title, fileUrl, note, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/submissions/:id (Learner only, only can delete if not reviewed yet)
router.delete('/submissions/:id', requireRole(['learner']), async (req, res) => {
  const { id } = req.params;
  try {
    const subCheck = await db.query('SELECT * FROM submissions WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    if (subCheck.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Submission not found or unauthorized.' });
    }
    if (subCheck.rows[0].status === 'reviewed') {
      return res.status(400).json({ success: false, message: 'Cannot delete a submission that has already been graded.' });
    }

    await db.query('DELETE FROM submissions WHERE id = $1', [id]);
    res.json({ success: true, message: 'Submission successfully deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/portfolio/:id (Learner only, edit their own portfolio)
router.put('/portfolio/:id', requireRole(['learner']), async (req, res) => {
  const { id } = req.params;
  const { title, imageUrl, reflection, tags, isFeatured } = req.body;
  try {
    const portCheck = await db.query('SELECT * FROM portfolio_items WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    if (portCheck.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found or unauthorized.' });
    }

    const result = await db.query(
      'UPDATE portfolio_items SET title = COALESCE($1, title), image_url = COALESCE($2, image_url), reflection = COALESCE($3, reflection), tags_json = COALESCE($4, tags_json), is_featured = COALESCE($5, is_featured) WHERE id = $6 RETURNING *',
      [title, imageUrl, reflection, tags ? JSON.stringify(tags) : null, isFeatured, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/portfolio/:id (Learner only, delete their own portfolio)
router.delete('/portfolio/:id', requireRole(['learner']), async (req, res) => {
  const { id } = req.params;
  try {
    const portCheck = await db.query('SELECT * FROM portfolio_items WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    if (portCheck.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found or unauthorized.' });
    }

    await db.query('DELETE FROM portfolio_items WHERE id = $1', [id]);
    res.json({ success: true, message: 'Portfolio item successfully deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/modules (Admin only)
router.post('/modules', requireRole(['admin']), async (req, res) => {
  const { title, level, category, description, thumbnailUrl } = req.body;
  if (!title || !level || !category) {
    return res.status(400).json({ success: false, message: 'title, level, and category are required.' });
  }
  const slug = title.toLowerCase().replace(/\s+/g, '-');
  try {
    const result = await db.query(
      'INSERT INTO modules (title, slug, level, category, description, thumbnail_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, slug, level, category, description, thumbnailUrl]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/modules/:id (Admin only)
router.put('/modules/:id', requireRole(['admin']), async (req, res) => {
  const { id } = req.params;
  const { title, level, category, description, thumbnailUrl } = req.body;
  const slug = title ? title.toLowerCase().replace(/\s+/g, '-') : null;
  try {
    const result = await db.query(
      'UPDATE modules SET title = COALESCE($1, title), slug = COALESCE($2, slug), level = COALESCE($3, level), category = COALESCE($4, category), description = COALESCE($5, description), thumbnail_url = COALESCE($6, thumbnail_url) WHERE id = $7 RETURNING *',
      [title, slug, level, category, description, thumbnailUrl, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/modules/:id (Admin only)
router.delete('/modules/:id', requireRole(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM modules WHERE id = $1', [id]);
    res.json({ success: true, message: 'Module successfully deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/lessons (Admin only)
router.post('/lessons', requireRole(['admin']), async (req, res) => {
  const { moduleId, title, content, videoUrl, checklistJson, orderNo } = req.body;
  if (!moduleId || !title) {
    return res.status(400).json({ success: false, message: 'moduleId and title are required.' });
  }
  try {
    const result = await db.query(
      'INSERT INTO lessons (module_id, title, content, video_url, checklist_json, order_no) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [moduleId, title, content, videoUrl, JSON.stringify(checklistJson || []), orderNo || 0]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/lessons/:id (Admin only)
router.put('/lessons/:id', requireRole(['admin']), async (req, res) => {
  const { id } = req.params;
  const { title, content, videoUrl, checklistJson, orderNo } = req.body;
  try {
    const result = await db.query(
      'UPDATE lessons SET title = COALESCE($1, title), content = COALESCE($2, content), video_url = COALESCE($3, video_url), checklist_json = COALESCE($4, checklist_json), order_no = COALESCE($5, order_no) WHERE id = $6 RETURNING *',
      [title, content, videoUrl, checklistJson ? JSON.stringify(checklistJson) : null, orderNo, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/lessons/:id (Admin only)
router.delete('/lessons/:id', requireRole(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM lessons WHERE id = $1', [id]);
    res.json({ success: true, message: 'Lesson successfully deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ==========================================================================
   ADMIN DASHBOARD
   ========================================================================== */

// GET /api/admin/stats
router.get('/admin/stats', requireRole(['admin']), async (req, res) => {
  try {
    const userCount = await db.query('SELECT COUNT(*)::int as count FROM users');
    const moduleCount = await db.query('SELECT COUNT(*)::int as count FROM modules');
    const lessonCount = await db.query('SELECT COUNT(*)::int as count FROM lessons');
    const subCount = await db.query('SELECT COUNT(*)::int as count FROM submissions');

    res.json({
      success: true,
      data: {
        users: userCount.rows[0].count,
        modules: moduleCount.rows[0].count,
        lessons: lessonCount.rows[0].count,
        submissions: subCount.rows[0].count
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
