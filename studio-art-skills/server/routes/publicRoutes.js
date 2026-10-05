const express = require('express');
const router = express.Router();
const db = require('../db');

// Fallback arrays
const fallbackModules = [
  { id: 'm1', title: 'Fundamental Drawing', slug: 'fundamental-drawing', level: 'Beginner', category: 'Drawing', description: 'Pelajari dasar-dasar menggambar mulai dari kontrol garis kasar, konstruksi bentuk 3D, perspektif, dan proporsi dasar objek sehari-hari.', thumbnail_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&h=400&q=80', is_published: true, order_no: 1, lesson_count: 2 }
];

// GET /api/public/modules
router.get('/modules', async (req, res) => {
  try {
    const modulesRes = await db.query(
      'SELECT m.*, COUNT(l.id)::int as lesson_count FROM modules m LEFT JOIN lessons l ON m.id = l.module_id WHERE m.is_published = true GROUP BY m.id ORDER BY m.order_no'
    );
    res.json({
      success: true,
      data: modulesRes.rows
    });
  } catch (error) {
    console.warn('API database query failed, returning fallback modules');
    res.json({
      success: true,
      data: fallbackModules
    });
  }
});

// GET /api/public/modules/:id
router.get('/modules/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const moduleRes = await db.query('SELECT * FROM modules WHERE id = $1', [id]);
    if (moduleRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Modul tidak ditemukan.' });
    }
    res.json({
      success: true,
      data: moduleRes.rows[0]
    });
  } catch (error) {
    const fallback = fallbackModules.find(m => m.id === id);
    if (!fallback) return res.status(404).json({ success: false, message: 'Modul tidak ditemukan (Fallback).' });
    res.json({
      success: true,
      data: fallback
    });
  }
});

// GET /api/public/lessons/:id
router.get('/lessons/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const lessonRes = await db.query('SELECT * FROM lessons WHERE id = $1', [id]);
    if (lessonRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Pelajaran tidak ditemukan.' });
    }
    res.json({
      success: true,
      data: lessonRes.rows[0]
    });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Pelajaran tidak ditemukan.' });
  }
});

// GET /api/public/portfolio-preview
router.get('/portfolio-preview', async (req, res) => {
  try {
    const portfolioRes = await db.query(
      'SELECT p.*, u.name as user_name FROM portfolio_items p JOIN users u ON p.user_id = u.id WHERE p.is_featured = true ORDER BY p.created_at DESC LIMIT 4'
    );
    res.json({
      success: true,
      data: portfolioRes.rows
    });
  } catch (error) {
    res.json({
      success: true,
      data: [
        { id: 'p1', title: 'Kubus 3D dalam Ruang', image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&h=400&q=80', reflection: 'Latihan menggambar bentuk geometri 3D pertama kali.', tags: ['Basic', '3D Shape'], is_featured: true }
      ]
    });
  }
// GET /api/public/lessons
router.get('/lessons', async (req, res) => {
  const { moduleId } = req.query;
  try {
    let queryText = 'SELECT * FROM lessons';
    const params = [];
    if (moduleId) {
      queryText += ' WHERE module_id = $1';
      params.push(moduleId);
    }
    queryText += ' ORDER BY order_no ASC';
    const result = await db.query(queryText, params);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
