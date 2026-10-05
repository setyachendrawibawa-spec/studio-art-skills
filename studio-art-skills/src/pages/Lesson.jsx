import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, FileText, CheckSquare, UploadCloud, ChevronRight, Award } from 'lucide-react';
import { mockLessons, mockModules, mockSubmissions } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Find current lesson
  const lesson = mockLessons.find(l => l.id === id);
  const module = lesson ? mockModules.find(m => m.id === lesson.module_id) : null;
  
  if (!lesson) {
    return (
      <div style={{ color: 'white', padding: '50px', textAlign: 'center' }}>
        <h2>Materi pelajaran tidak ditemukan.</h2>
        <Link to="/modules" className="btn btn-secondary" style={{ marginTop: '20px' }}>Katalog Modul</Link>
      </div>
    );
  }

  // Manage checklist local states
  const [checkedItems, setCheckedItems] = useState(
    lesson.checklist_json.reduce((acc, item) => ({ ...acc, [item]: false }), {})
  );

  const toggleCheck = (item) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  // Find existing submission if any
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const mySubmission = submissions.find(s => s.lesson_id === lesson.id && s.user_id === 'u1');

  // Form states for uploading work
  const [title, setTitle] = useState('');
  const [fileUrl, setFileUrl] = useState('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&h=400&q=80');
  const [note, setNote] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert('Judul karya wajib diisi!');
      return;
    }
    
    setUploading(true);
    // Simulate upload process
    setTimeout(() => {
      const newSub = {
        id: 's_' + Date.now(),
        user_id: 'u1',
        user_name: user?.name || 'Art Learner',
        lesson_id: lesson.id,
        lesson_title: lesson.title,
        title,
        file_url: fileUrl,
        note,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
        reviewed_at: null,
        feedback: null
      };
      
      setSubmissions(prev => [newSub, ...prev]);
      // Update global mockSubmissions array so it persists in the session
      mockSubmissions.unshift(newSub);
      setUploading(false);
      setShowUploadForm(false);
      // Reset form
      setTitle('');
      setNote('');
      alert('Tugas karya seni Anda berhasil diunggah! Menunggu evaluasi mentor.');
    }, 1500);
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      {/* Header Navigation */}
      <div>
        <Link to={`/modules/${lesson.module_id}`} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px', display: 'inline-flex', gap: '6px' }}>
          <ArrowLeft size={16} /> Kembali ke Modul {module?.title}
        </Link>
      </div>

      <div className="grid grid-cols-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Left Column: Video & Lesson Materials */}
        <div className="flex flex-col gap-6">
          {/* Title Header */}
          <div>
            <span className="tag tag-cyan" style={{ marginBottom: '8px' }}>Materi #{lesson.order_no}</span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{lesson.title}</h1>
          </div>

          {/* Video Player */}
          {lesson.video_url && (
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--glass-border)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
              <iframe 
                src={lesson.video_url} 
                title={lesson.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          )}

          {/* Written Content */}
          <div className="card" style={{ padding: '24px' }}>
            <div 
              style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </div>
        </div>

        {/* Right Column: Checklists & Submissions */}
        <div className="flex flex-col gap-6">
          {/* Checklist card */}
          <div className="card">
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', itemsCenter: 'center', gap: '8px' }}>
              <CheckSquare size={18} style={{ color: 'var(--accent-cyan)' }} /> Checklist Latihan
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>Centang kriteria di bawah setelah Anda mempraktikkannya di kertas/digital canvas Anda:</p>
            
            <div className="flex flex-col gap-3">
              {lesson.checklist_json.map(item => (
                <div key={item} className="flex items-start gap-3" style={{ fontSize: '13px', cursor: 'pointer' }} onClick={() => toggleCheck(item)}>
                  <input 
                    type="checkbox" 
                    checked={checkedItems[item] || false} 
                    onChange={() => {}} // Controlled by outer div click
                    style={{ width: '18px', height: '18px', flexShrink: 0, accentColor: 'var(--accent-cyan)', marginTop: '2px' }} 
                  />
                  <span style={{ color: checkedItems[item] ? 'var(--text-primary)' : 'var(--text-secondary)', textDecoration: checkedItems[item] ? 'line-through' : 'none' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Submission panel */}
          <div className="card">
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', itemsCenter: 'center', gap: '8px' }}>
              <UploadCloud size={18} style={{ color: 'var(--accent-blue)' }} /> Pengumpulan Karya
            </h3>

            {mySubmission ? (
              <div className="flex flex-col gap-4">
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px' }}>
                  <img src={mySubmission.file_url} alt="Karya saya" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' }} />
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>{mySubmission.title}</div>
                  
                  <div style={{ marginTop: '8px' }}>
                    {mySubmission.status === 'reviewed' ? (
                      <div className="flex flex-col gap-2">
                        <span className="tag tag-gold" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}>
                          <Award size={12} /> Terbuka - Nilai: {mySubmission.feedback.score}/100
                        </span>
                        <div style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '8px', borderRadius: '6px', fontSize: '12px', borderLeft: '3px solid var(--reward-gold)' }}>
                          <strong>Mentor:</strong> "{mySubmission.feedback.comment}"
                        </div>
                      </div>
                    ) : (
                      <span className="tag tag-blue" style={{ fontSize: '11px' }}>Sedang Ditinjau Mentor</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {!showUploadForm ? (
                  <div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                      Sudah menyelesaikan seluruh checklist latihan? Ambil foto/scan karya Anda dan kirimkan untuk diulas oleh mentor.
                    </p>
                    <button onClick={() => setShowUploadForm(true)} className="btn btn-primary" style={{ width: '100%' }}>
                      Kumpulkan Karya
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleUploadSubmit} className="flex flex-col gap-4">
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label">Judul Karya Seni</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Misal: Gambar Kubus Cahaya"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ padding: '8px 12px', fontSize: '13px' }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label">Tautan Karya Seni (URL Gambar Demo)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Tautan URL gambar"
                        value={fileUrl}
                        onChange={(e) => setFileUrl(e.target.value)}
                        style={{ padding: '8px 12px', fontSize: '13px' }}
                      />
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Anda bisa menggunakan URL demo yang sudah terisi.</div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label">Catatan Proses Menggambar</label>
                      <textarea 
                        className="form-control" 
                        rows="3"
                        placeholder="Tulis kesulitan atau proses arsir yang Anda alami..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        style={{ padding: '8px 12px', fontSize: '13px', resize: 'none' }}
                      />
                    </div>

                    <div className="flex gap-2">
                      <button type="submit" disabled={uploading} className="btn btn-primary" style={{ flexGrow: 1, padding: '8px 16px', fontSize: '13px' }}>
                        {uploading ? 'Mengunggah...' : 'Submit'}
                      </button>
                      <button type="button" onClick={() => setShowUploadForm(false)} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                        Batal
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
