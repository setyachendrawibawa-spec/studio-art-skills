import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Award, CheckCircle2, Calendar, Clock, ArrowRight, Play } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import { mockModules, mockBadges, mockUserBadges, mockProgress, mockActivityLogs } from '../data/mockData';

export default function LearnerDashboard() {
  const { user } = useAuth();
  
  // States loaded from local storage/mock fallback
  const [userProgress, setUserProgress] = useState(mockProgress);
  const [earnedBadges, setEarnedBadges] = useState([]);
  
  useEffect(() => {
    // Find badges earned by current user u1
    const ids = mockUserBadges.filter(ub => ub.user_id === 'u1').map(ub => ub.badge_id);
    const badges = mockBadges.filter(b => ids.includes(b.id));
    setEarnedBadges(badges);
  }, []);

  const getModuleProgress = (moduleId) => {
    const prog = userProgress.find(p => p.module_id === moduleId);
    return prog ? prog.percent_complete : 0;
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      {/* Top Banner Welcome */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, rgba(19, 27, 46, 0.9), rgba(59, 130, 246, 0.15))',
        padding: '30px', 
        border: '1px solid rgba(59, 130, 246, 0.2)' 
      }}>
        <div className="flex justify-between items-center flex-wrap gap-4" style={{ width: '100%' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>
              Selamat Belajar, {user?.name}! 👋
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Terus latih kemampuan menggambar Anda. Evaluasi mentor baru akan muncul di menu Feedback.
            </p>
          </div>
          <div className="flex gap-4">
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>XP SKILL</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--reward-gold)' }}>150 XP</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>BADGES</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-cyan)' }}>{earnedBadges.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left column (Modules & Assignments) - Right column (Badges & Activity) */}
      <div className="grid grid-cols-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="flex flex-col gap-6">
          {/* Active Modules */}
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={20} style={{ color: 'var(--accent-cyan)' }} /> Modul Belajar Aktif
            </h3>
            
            <div className="flex flex-col gap-4">
              {mockModules.slice(0, 2).map(mod => {
                const percent = getModuleProgress(mod.id);
                return (
                  <div key={mod.id} className="card flex justify-between items-center" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexGrow: 1 }}>
                      <img src={mod.thumbnail_url} alt={mod.title} style={{ width: '80px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div style={{ flexGrow: 1, maxWidth: '70%' }}>
                        <span className="tag tag-cyan" style={{ fontSize: '10px', marginBottom: '4px' }}>{mod.level}</span>
                        <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{mod.title}</h4>
                        <div style={{ marginTop: '8px' }}>
                          <ProgressBar value={percent} />
                        </div>
                      </div>
                    </div>
                    <Link to={`/modules/${mod.id}`} className="btn btn-secondary flex items-center gap-2" style={{ padding: '8px 16px', fontSize: '13px' }}>
                      {percent === 100 ? 'Review' : 'Lanjut'} <Play size={12} fill="white" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assignments checklist */}
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} style={{ color: 'var(--success)' }} /> Tugas / Latihan Hari Ini
            </h3>
            
            <div className="card flex flex-col gap-3" style={{ padding: '20px' }}>
              <div className="flex items-center gap-3" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={true} readOnly style={{ width: '16px', height: '16px', accentColor: 'var(--success)' }} />
                <span style={{ textDecoration: 'line-through' }}>Fundamental Drawing: Latihan Kontrol Garis</span>
              </div>
              <div className="flex items-center gap-3" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={false} readOnly style={{ width: '16px', height: '16px' }} />
                <span>Shading and Light: Gambar Value Scale 9-tingkatan</span>
              </div>
              <div className="flex items-center gap-3" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={false} readOnly style={{ width: '16px', height: '16px' }} />
                <span>Unggah 1 karya terbaik ke Galeri Portofolio Anda</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Badges and Activity */}
        <div className="flex flex-col gap-6">
          {/* Badge Showcase */}
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} style={{ color: 'var(--reward-gold)' }} /> Lencana Tercapai
            </h3>
            <div className="grid grid-cols-2" style={{ gap: '12px' }}>
              {earnedBadges.map(badge => (
                <div key={badge.id} className="badge-item earned" style={{ padding: '12px' }}>
                  <span className="badge-icon" style={{ fontSize: '32px' }}>{badge.icon_url}</span>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{badge.name}</div>
                  <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{badge.description}</div>
                </div>
              ))}
              {mockBadges.slice(2).map(badge => (
                <div key={badge.id} className="badge-item" style={{ padding: '12px', opacity: 0.5 }}>
                  <span className="badge-icon" style={{ fontSize: '32px' }}>{badge.icon_url}</span>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>{badge.name}</div>
                  <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Belum Terbuka</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Logs */}
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} style={{ color: 'var(--text-secondary)' }} /> Riwayat Aktivitas
            </h3>
            <div className="card flex flex-col gap-4" style={{ padding: '20px' }}>
              {mockActivityLogs.map(log => (
                <div key={log.id} style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)', marginTop: '6px' }} />
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{log.action}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                      {new Date(log.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
