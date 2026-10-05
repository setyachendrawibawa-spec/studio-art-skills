import React, { useState } from 'react';
import { useAuth, mockRoles } from '../context/AuthContext';
import { Award, CheckCircle, ShieldAlert, Star, MessageSquare, ListTodo, Plus } from 'lucide-react';
import { mockSubmissions, mockLessons } from '../data/mockData';
import SubmissionCard from '../components/SubmissionCard';

export default function Feedback() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [activeSubmission, setActiveSubmission] = useState(null);

  // Mentor Review states
  const [comment, setComment] = useState('');
  const [rubricScores, setRubricScores] = useState({});
  const [reviewing, setReviewing] = useState(false);

  // Learners list
  const learnerSubmissions = submissions.filter(s => s.user_id === 'u1');
  
  // Mentors list
  const pendingSubmissions = submissions.filter(s => s.status === 'submitted');
  const reviewedSubmissions = submissions.filter(s => s.status === 'reviewed');

  const handleOpenReview = (sub) => {
    setActiveSubmission(sub);
    setComment('');
    
    // Find lesson to get its rubrics
    const lesson = mockLessons.find(l => l.id === sub.lesson_id);
    if (lesson && lesson.rubrics) {
      const initialScores = {};
      lesson.rubrics.forEach(r => {
        initialScores[r.id] = 8; // Default initial score of 8/10
      });
      setRubricScores(initialScores);
    }
  };

  const handleRubricScoreChange = (rubricId, value) => {
    setRubricScores(prev => ({ ...prev, [rubricId]: parseInt(value, 10) }));
  };

  const submitMentorReview = (e) => {
    e.preventDefault();
    if (!comment) {
      alert('Catatan komentar wajib diisi!');
      return;
    }

    setReviewing(true);
    setTimeout(() => {
      // Find lesson rubrics
      const lesson = mockLessons.find(l => l.id === activeSubmission.lesson_id);
      
      // Calculate overall score
      let totalWeightedScore = 0;
      let totalWeights = 0;
      const scoresArray = [];

      lesson.rubrics.forEach(r => {
        const score = rubricScores[r.id] || 8;
        totalWeightedScore += score * r.weight;
        totalWeights += r.weight;
        scoresArray.push({
          criterion_id: r.id,
          score: score,
          max_score: r.max_score,
          name: r.criterion
        });
      });

      // Calculate score out of 100
      const finalScore = Math.round(((totalWeightedScore / (totalWeights * 10)) * 100));

      const updatedSubmissions = submissions.map(s => {
        if (s.id === activeSubmission.id) {
          return {
            ...s,
            status: 'reviewed',
            reviewed_at: new Date().toISOString(),
            feedback: {
              id: 'f_' + Date.now(),
              mentor_id: user.id,
              mentor_name: user.name,
              comment: comment,
              score: finalScore,
              rubric_scores: scoresArray
            }
          };
        }
        return s;
      });

      // Update global array and local state
      mockSubmissions.length = 0;
      mockSubmissions.push(...updatedSubmissions);
      setSubmissions(updatedSubmissions);

      setReviewing(false);
      setActiveSubmission(null);
      alert('Evaluasi penilaian berhasil disimpan!');
    }, 1200);
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
          {user?.role === mockRoles.MENTOR ? 'Evaluasi Karya Seni' : 'Feedback & Nilai Saya'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          {user?.role === mockRoles.MENTOR 
            ? 'Ulas latihan yang dikirimkan siswa dan berikan nilai berdasarkan rubrik standar.' 
            : 'Periksa hasil review mentor, skor rubrik detail, dan tingkatkan teknik menggambar Anda.'}
        </p>
      </div>

      {/* LEARNER VIEW */}
      {user?.role === mockRoles.LEARNER && (
        <div className="grid grid-cols-3">
          {learnerSubmissions.length > 0 ? (
            learnerSubmissions.map(sub => (
              <SubmissionCard key={sub.id} submission={sub} />
            ))
          ) : (
            <div className="card col-span-3 flex flex-col items-center justify-center" style={{ padding: '60px', gridColumn: 'span 3', textAlign: 'center' }}>
              <Award size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
              <h3>Belum Ada Tugas Dikirim</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>Silakan selesaikan materi pelajaran dan unggah karya pertama Anda.</p>
            </div>
          )}
        </div>
      )}

      {/* MENTOR VIEW */}
      {user?.role === mockRoles.MENTOR && (
        <div className="grid grid-cols-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
          {/* List submissions */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: 'var(--accent-cyan)' }}>
                Tugas Menunggu Penilaian ({pendingSubmissions.length})
              </h3>
              <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                {pendingSubmissions.length > 0 ? (
                  pendingSubmissions.map(sub => (
                    <SubmissionCard 
                      key={sub.id} 
                      submission={sub} 
                      isMentorView={true} 
                      onReviewClick={handleOpenReview} 
                    />
                  ))
                ) : (
                  <div className="card flex flex-col items-center justify-center" style={{ padding: '40px', gridColumn: 'span 2', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <CheckCircle size={32} style={{ color: 'var(--success)', marginBottom: '12px' }} />
                    Semua tugas siswa telah dinilai!
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: 'var(--text-muted)' }}>
                Riwayat Penilaian Selesai ({reviewedSubmissions.length})
              </h3>
              <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                {reviewedSubmissions.map(sub => (
                  <SubmissionCard key={sub.id} submission={sub} isMentorView={true} />
                ))}
              </div>
            </div>
          </div>

          {/* Review Evaluation Form Drawer/Panel */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Form Penilaian</h3>
            {activeSubmission ? (
              <div className="card flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <img src={activeSubmission.file_url} alt="Karya Siswa" style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700 }}>{activeSubmission.title}</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Oleh: {activeSubmission.user_name}</span>
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <strong>Catatan Siswa:</strong> "{activeSubmission.note}"
                </div>

                <form onSubmit={submitMentorReview} className="flex flex-col gap-4">
                  {/* Rubrics Sliders */}
                  <div>
                    <h5 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ListTodo size={14} /> Rubrik Kriteria (Skor 1 - 10)
                    </h5>
                    
                    {mockLessons.find(l => l.id === activeSubmission.lesson_id)?.rubrics.map(rub => (
                      <div key={rub.id} style={{ marginBottom: '14px' }}>
                        <div className="flex justify-between" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                          <span>{rub.criterion} (Bobot x{rub.weight})</span>
                          <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{rubricScores[rub.id] || 8}/10</span>
                        </div>
                        <input 
                          type="range" 
                          min="1" 
                          max="10" 
                          value={rubricScores[rub.id] || 8}
                          onChange={(e) => handleRubricScoreChange(rub.id, e.target.value)}
                          style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '12px' }}>Komentar Evaluasi</label>
                    <textarea 
                      className="form-control"
                      rows="4"
                      placeholder="Masukkan kritik membangun, apresiasi teknik, dan perbaikan untuk karya siswa..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      style={{ fontSize: '13px', resize: 'none' }}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button type="submit" disabled={reviewing} className="btn btn-primary" style={{ flexGrow: 1, padding: '10px', fontSize: '13px' }}>
                      {reviewing ? 'Menyimpan...' : 'Simpan Nilai'}
                    </button>
                    <button type="button" onClick={() => setActiveSubmission(null)} className="btn btn-secondary" style={{ padding: '10px', fontSize: '13px' }}>
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="card flex flex-col items-center justify-center" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                <Star size={32} style={{ marginBottom: '10px' }} />
                Pilih tombol "Beri Feedback" pada salah satu kiriman tugas siswa di daftar samping untuk memulai.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
