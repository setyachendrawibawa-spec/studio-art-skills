import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, mockRoles } from '../context/AuthContext';
import { LayoutDashboard, BookOpen, Award, Image as ImageIcon, CheckSquare, Settings, LogOut, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    // Fallback if not logged in (handled by Router but good as safeguard)
    return (
      <div className="flex flex-col items-center justify-center" style={{ minHeight: '100vh', gap: '20px' }}>
        <ShieldAlert size={48} style={{ color: 'var(--error)' }} />
        <h2 style={{ fontFamily: 'var(--font-heading)' }}>Akses Ditolak. Silakan masuk terlebih dahulu.</h2>
        <Link to="/login" className="btn btn-primary">Halaman Login</Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <Link to="/" className="flex items-center gap-2" style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', marginBottom: '30px' }}>
            <span>🎨</span> Studio <span style={{ color: 'var(--accent-cyan)' }}>Art Skills</span>
          </Link>

          {/* User Profile Card in Sidebar */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '16px', borderRadius: '12px', marginBottom: '24px', textAlign: 'center' }}>
            <img src={user.avatar_url} alt={user.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-cyan)', marginBottom: '10px' }} />
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{user.name}</h4>
            <span className="tag tag-cyan" style={{ fontSize: '11px', textTransform: 'capitalize', marginTop: '6px' }}>{user.role}</span>
          </div>

          {/* Navigation Links based on role */}
          <nav className="flex flex-col gap-2">
            {user.role === mockRoles.LEARNER && (
              <>
                <Link to="/dashboard" className="btn" style={sidebarLinkStyle(isActive('/dashboard'))}>
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <Link to="/modules" className="btn" style={sidebarLinkStyle(isActive('/modules'))}>
                  <BookOpen size={18} /> Modul Belajar
                </Link>
                <Link to="/portfolio" className="btn" style={sidebarLinkStyle(isActive('/portfolio'))}>
                  <ImageIcon size={18} /> Portofolio Saya
                </Link>
                <Link to="/feedback" className="btn" style={sidebarLinkStyle(isActive('/feedback'))}>
                  <Award size={18} /> Feedback & Skor
                </Link>
              </>
            )}

            {user.role === mockRoles.MENTOR && (
              <>
                <Link to="/feedback" className="btn" style={sidebarLinkStyle(isActive('/feedback'))}>
                  <CheckSquare size={18} /> Evaluasi Tugas
                </Link>
                <Link to="/modules" className="btn" style={sidebarLinkStyle(isActive('/modules'))}>
                  <BookOpen size={18} /> Modul & Lesson
                </Link>
                <Link to="/portfolio" className="btn" style={sidebarLinkStyle(isActive('/portfolio'))}>
                  <ImageIcon size={18} /> Galeri Portofolio
                </Link>
              </>
            )}

            {user.role === mockRoles.ADMIN && (
              <>
                <Link to="/admin" className="btn" style={sidebarLinkStyle(isActive('/admin'))}>
                  <Settings size={18} /> Admin Panel
                </Link>
                <Link to="/modules" className="btn" style={sidebarLinkStyle(isActive('/modules'))}>
                  <BookOpen size={18} /> Kelola Modul
                </Link>
                <Link to="/portfolio" className="btn" style={sidebarLinkStyle(isActive('/portfolio'))}>
                  <ImageIcon size={18} /> Pameran Portofolio
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex flex-col gap-2" style={{ marginTop: 'auto' }}>
          <Link to="/" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px', justifyContent: 'flex-start' }}>
            <ArrowLeft size={16} /> Landing Page
          </Link>
          <button onClick={handleLogout} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '10px 16px', justifyContent: 'flex-start' }}>
            <LogOut size={16} /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

const sidebarLinkStyle = (active) => ({
  justifyContent: 'flex-start',
  padding: '12px 16px',
  background: active ? 'linear-gradient(135deg, var(--bg-tertiary), rgba(6,182,212,0.1))' : 'transparent',
  color: active ? 'var(--accent-cyan)' : 'var(--text-secondary)',
  borderColor: active ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
  fontWeight: active ? '600' : '500'
});
