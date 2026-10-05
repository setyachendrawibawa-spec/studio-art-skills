import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#070a12', borderTop: '1px solid var(--glass-border)', padding: '40px 0 20px 0', marginTop: '60px' }}>
      <div className="container grid grid-cols-3" style={{ marginBottom: '30px' }}>
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2" style={{ fontWeight: 800, fontSize: '20px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            <span>🎨</span> Studio <span style={{ color: 'var(--accent-cyan)' }}>Art Skills</span>
          </Link>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '300px' }}>
            Platform pembelajaran seni lukis dan gambar digital interaktif terlengkap. Belajar dari dasar dengan feedback langsung dari mentor.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: 600, marginBottom: '10px' }}>Jalur Belajar</h4>
          <Link to="/modules" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Fundamental Drawing</Link>
          <Link to="/modules" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Shading and Light</Link>
          <Link to="/modules" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Color & Composition</Link>
          <Link to="/modules" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Final Project</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h4 style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: 600, marginBottom: '10px' }}>Bantuan & Syarat</h4>
          <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Pertanyaan Umum (FAQ)</Link>
          <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Hubungi Mentor</Link>
          <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Kebijakan Privasi</Link>
        </div>
      </div>
      
      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
          &copy; {new Date().getFullYear()} Studio Art Skills. Hak Cipta Dilindungi Undang-Undang.
        </p>
      </div>
    </footer>
  );
}
