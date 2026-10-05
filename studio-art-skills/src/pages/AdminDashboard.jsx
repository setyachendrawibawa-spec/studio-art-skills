import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, BookOpen, Layers, Award, Trash2, Edit, Plus, X, BarChart3, Clock } from 'lucide-react';
import { mockUsers, mockModules, mockLessons, mockSubmissions, mockBadges } from '../data/mockData';
import StatCard from '../components/StatCard';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [modules, setModules] = useState(mockModules);
  const [lessons, setLessons] = useState(mockLessons);
  const [users, setUsers] = useState(mockUsers);
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [badges, setBadges] = useState(mockBadges);

  // Tab control states: 'modules' | 'lessons' | 'users' | 'submissions'
  const [activeTab, setActiveTab] = useState('modules');

  // Modal forms states for Modules
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [modTitle, setModTitle] = useState('');
  const [modLevel, setModLevel] = useState('Beginner');
  const [modCategory, setModCategory] = useState('Drawing');
  const [modDesc, setModDesc] = useState('');
  const [modThumb, setModThumb] = useState('https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&h=400&q=80');

  const handleCreateModule = (e) => {
    e.preventDefault();
    if (!modTitle || !modDesc) return;
    
    const newMod = {
      id: 'm_' + Date.now(),
      title: modTitle,
      slug: modTitle.toLowerCase().replace(/\s+/g, '-'),
      level: modLevel,
      category: modCategory,
      description: modDesc,
      thumbnail_url: modThumb,
      is_published: true,
      order_no: modules.length + 1,
      lesson_count: 0
    };

    const updated = [...modules, newMod];
    setModules(updated);
    mockModules.push(newMod); // Sync back to global mockData
    
    // Clear & close
    setModTitle('');
    setModDesc('');
    setShowModuleModal(false);
    alert('Modul baru berhasil ditambahkan!');
  };

  const handleDeleteModule = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus modul ini? Semua materi pelajaran terkait juga akan terpengaruh.')) {
      const updated = modules.filter(m => m.id !== id);
      setModules(updated);
      // Sync back to global
      const idx = mockModules.findIndex(m => m.id === id);
      if (idx !== -1) mockModules.splice(idx, 1);
    }
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Admin Control Panel</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Kelola kurikulum modul seni, pelajaran, data user, dan pantau status sistem secara real-time.</p>
      </div>

      {/* Admin stats */}
      <div className="grid grid-cols-4">
        <StatCard label="Total Pengguna" value={users.length} icon={Users} color="var(--accent-cyan)" />
        <StatCard label="Total Modul Seni" value={modules.length} icon={BookOpen} color="var(--accent-blue)" />
        <StatCard label="Total Pelajaran" value={lessons.length} icon={Layers} color="var(--reward-gold)" />
        <StatCard label="Total Submission" value={submissions.length} icon={Award} color="var(--success)" />
      </div>

      {/* Tab select controllers */}
      <div className="flex gap-2" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
        <button 
          onClick={() => setActiveTab('modules')} 
          className="btn" 
          style={{ background: activeTab === 'modules' ? 'rgba(6,182,212,0.1)' : 'transparent', color: activeTab === 'modules' ? 'var(--accent-cyan)' : 'var(--text-secondary)', border: activeTab === 'modules' ? '1px solid rgba(6,182,212,0.2)' : 'none' }}
        >
          Kelola Modul ({modules.length})
        </button>
        <button 
          onClick={() => setActiveTab('lessons')} 
          className="btn" 
          style={{ background: activeTab === 'lessons' ? 'rgba(6,182,212,0.1)' : 'transparent', color: activeTab === 'lessons' ? 'var(--accent-cyan)' : 'var(--text-secondary)', border: activeTab === 'lessons' ? '1px solid rgba(6,182,212,0.2)' : 'none' }}
        >
          Kelola Materi Lesson ({lessons.length})
        </button>
        <button 
          onClick={() => setActiveTab('users')} 
          className="btn" 
          style={{ background: activeTab === 'users' ? 'rgba(6,182,212,0.1)' : 'transparent', color: activeTab === 'users' ? 'var(--accent-cyan)' : 'var(--text-secondary)', border: activeTab === 'users' ? '1px solid rgba(6,182,212,0.2)' : 'none' }}
        >
          Daftar Pengguna ({users.length})
        </button>
        <button 
          onClick={() => setActiveTab('submissions')} 
          className="btn" 
          style={{ background: activeTab === 'submissions' ? 'rgba(6,182,212,0.1)' : 'transparent', color: activeTab === 'submissions' ? 'var(--accent-cyan)' : 'var(--text-secondary)', border: activeTab === 'submissions' ? '1px solid rgba(6,182,212,0.2)' : 'none' }}
        >
          Tugas Kumpul ({submissions.length})
        </button>
      </div>

      {/* TAB CONTENTS */}
      <div className="card" style={{ padding: '24px' }}>
        
        {/* MODULES CRUD */}
        {activeTab === 'modules' && (
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Daftar Kurikulum Modul</h3>
              <button onClick={() => setShowModuleModal(true)} className="btn btn-primary flex items-center gap-2" style={{ padding: '8px 16px', fontSize: '13px' }}>
                <Plus size={16} /> Tambah Modul
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px' }}>Modul</th>
                  <th style={{ padding: '12px' }}>Level</th>
                  <th style={{ padding: '12px' }}>Kategori</th>
                  <th style={{ padding: '12px' }}>Urutan</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {modules.map(mod => (
                  <tr key={mod.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={mod.thumbnail_url} alt="" style={{ width: '50px', height: '35px', borderRadius: '4px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{mod.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{mod.slug}</div>
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span className="tag tag-cyan" style={{ fontSize: '10px' }}>{mod.level}</span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{mod.category}</td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>#{mod.order_no}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button onClick={() => handleDeleteModule(mod.id)} className="btn" style={{ padding: '6px', color: 'var(--error)', background: 'transparent' }} title="Hapus">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* LESSONS CRUD */}
        {activeTab === 'lessons' && (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Daftar Materi Latihan / Lesson</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px' }}>Judul Lesson</th>
                  <th style={{ padding: '12px' }}>Modul ID</th>
                  <th style={{ padding: '12px' }}>Checklist</th>
                  <th style={{ padding: '12px' }}>Urutan</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map(les => (
                  <tr key={les.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{les.title}</td>
                    <td style={{ padding: '12px', color: 'var(--accent-cyan)' }}>{les.module_id}</td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{les.checklist_json.length} Kriteria</td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>#{les.order_no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* USERS LIST */}
        {activeTab === 'users' && (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Daftar User Platform</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px' }}>Nama</th>
                  <th style={{ padding: '12px' }}>Email</th>
                  <th style={{ padding: '12px' }}>Role</th>
                  <th style={{ padding: '12px' }}>Tanggal Gabung</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={u.avatar_url} alt="" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{u.email}</td>
                    <td style={{ padding: '12px' }}>
                      <span className="tag tag-blue" style={{ fontSize: '10px', textTransform: 'capitalize' }}>{u.role}</span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>
                      {new Date(u.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SUBMISSIONS LIST */}
        {activeTab === 'submissions' && (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Status Pengumpulan Tugas Siswa</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px' }}>Karya</th>
                  <th style={{ padding: '12px' }}>Siswa</th>
                  <th style={{ padding: '12px' }}>Materi Pelajaran</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Skor</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(sub => (
                  <tr key={sub.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={sub.file_url} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{sub.title}</span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{sub.user_name}</td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{sub.lesson_title}</td>
                    <td style={{ padding: '12px' }}>
                      <span className={`tag ${sub.status === 'reviewed' ? 'tag-gold' : 'tag-blue'}`} style={{ fontSize: '10px' }}>
                        {sub.status === 'reviewed' ? 'Reviewed' : 'Submitted'}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                      {sub.feedback ? `${sub.feedback.score}/100` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* CREATE MODULE POPUP MODAL */}
      {showModuleModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(5, 7, 12, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="card animate-fade-in" style={{ maxWidth: '550px', width: '100%', padding: '30px', background: 'var(--bg-secondary)' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Tambah Modul Kurikulum</h2>
              <button onClick={() => setShowModuleModal(false)} className="btn" style={{ padding: '4px', background: 'transparent', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateModule} className="flex flex-col gap-4">
              <div className="form-group">
                <label className="form-label">Judul Modul</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Misal: Anatomi Tubuh Dasar"
                  value={modTitle}
                  onChange={(e) => setModTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Level Tingkatan</label>
                  <select value={modLevel} onChange={(e) => setModLevel(e.target.value)} className="form-control">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Professional">Professional</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Kategori</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Drawing"
                    value={modCategory}
                    onChange={(e) => setModCategory(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Deskripsi Silabus</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="Deskripsikan garis besar materi yang akan dipelajari di dalam modul ini..."
                  value={modDesc}
                  onChange={(e) => setModDesc(e.target.value)}
                  required
                  style={{ resize: 'none' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tautan Gambar Sampul (Thumbnail URL)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={modThumb}
                  onChange={(e) => setModThumb(e.target.value)}
                />
              </div>

              <div className="flex gap-2" style={{ marginTop: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ flexGrow: 1, padding: '12px' }}>
                  Simpan Modul
                </button>
                <button type="button" onClick={() => setShowModuleModal(false)} className="btn btn-secondary" style={{ padding: '12px' }}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
