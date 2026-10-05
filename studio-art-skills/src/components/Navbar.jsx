import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, mockRoles } from '../context/AuthContext';
import { Menu, X, LogOut, BookOpen, Award, User, Settings, Image as ImageIcon } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === mockRoles.ADMIN) return '/admin';
    if (user.role === mockRoles.MENTOR) return '/feedback'; // Mentors start at Feedback / Grading Panel
    return '/dashboard'; // Learners
  };

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center" style={{ width: '100%' }}>
        <Link to="/" className="flex items-center gap-2" style={{ fontWeight: 800, fontSize: '22px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
          <span style={{ fontSize: '28px' }}>🎨</span>
          Studio <span style={{ color: 'var(--accent-cyan)' }}>Art Skills</span>
        </Link>

        {/* Desktop Menu */}
        <div className="flex items-center gap-6" style={{ display: 'none', display: 'flex' }}>
          <Link to="/" className="nav-link" style={navLinkStyle}>Home</Link>
          <Link to="/modules" className="nav-link" style={navLinkStyle}>Modul Seni</Link>
          <Link to="/portfolio" className="nav-link" style={navLinkStyle}>Portofolio</Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to={getDashboardLink()} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                {user.role === mockRoles.LEARNER && <User size={16} />}
                {user.role === mockRoles.MENTOR && <Award size={16} />}
                {user.role === mockRoles.ADMIN && <Settings size={16} />}
                Dashboard
              </Link>
              <div className="flex items-center gap-2">
                <img src={user.avatar_url} alt={user.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--accent-cyan)' }} />
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{user.name}</span>
              </div>
              <button onClick={handleLogout} className="btn" style={{ padding: '6px', background: 'transparent', color: 'var(--text-muted)' }} title="Keluar">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="nav-link" style={navLinkStyle}>Masuk</Link>
              <Link to="/register" className="btn btn-primary pulse-glow" style={{ padding: '8px 18px', fontSize: '14px' }}>Mulai Belajar</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const navLinkStyle = {
  fontSize: '15px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  transition: 'color var(--transition-fast)',
  cursor: 'pointer'
};
// Hover states are styled in global.css or using JS hover handlers if inline, but let's keep inline simple
