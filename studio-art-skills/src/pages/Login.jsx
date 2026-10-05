import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, mockRoles } from '../context/AuthContext';
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Email dan Password wajib diisi.');
      return;
    }
    
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      if (result.user.role === mockRoles.ADMIN) navigate('/admin');
      else if (result.user.role === mockRoles.MENTOR) navigate('/feedback');
      else navigate('/dashboard');
    } else {
      setError(result.message || 'Login gagal. Periksa kembali email & password.');
    }
  };

  const handleQuickLogin = async (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    setLoading(true);
    const result = await login(demoEmail, 'password123');
    setLoading(false);
    
    if (result.success) {
      if (result.user.role === mockRoles.ADMIN) navigate('/admin');
      else if (result.user.role === mockRoles.MENTOR) navigate('/feedback');
      else navigate('/dashboard');
    }
  };

  return (
    <div className="container flex items-center justify-center animate-fade-in" style={{ minHeight: '80vh', padding: '40px 0' }}>
      <div className="grid grid-cols-2 card" style={{ padding: 0, overflow: 'hidden', maxWidth: '850px', width: '100%' }}>
        {/* Left Side: Form */}
        <div style={{ padding: '40px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Selamat Datang Kembali</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>Masuk untuk melanjutkan aktivitas belajar Anda.</p>
          
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '12px', borderRadius: '6px', fontSize: '13px', marginBottom: '20px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="form-group">
              <label className="form-label">Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Masukkan email Anda" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '40px', width: '100%' }}
                />
              </div>
            </div>
            
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '40px', width: '100%' }}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
              {loading ? 'Memproses...' : 'Masuk ke Platform'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Belum punya akun? <Link to="/register" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Daftar di sini</Link>
          </div>
        </div>

        {/* Right Side: Demo Quick Login info */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary), rgba(6, 182, 212, 0.1))', 
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderLeft: '1px solid var(--glass-border)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} style={{ color: 'var(--accent-cyan)' }} /> Akun Demo Akses Instan
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Pilih salah satu role di bawah untuk langsung mencoba dashboard dan melihat fitur lengkap masing-masing role:
          </p>

          <div className="flex flex-col gap-3">
            <button onClick={() => handleQuickLogin('learner@studioart.com')} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'space-between', padding: '12px' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>Learner (Siswa)</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Upload karya, periksa feedback & progres</div>
              </div>
              <ArrowRight size={16} />
            </button>

            <button onClick={() => handleQuickLogin('mentor@studioart.com')} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'space-between', padding: '12px' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>Mentor (Penilai)</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Evaluasi tugas siswa & input skor rubrik</div>
              </div>
              <ArrowRight size={16} />
            </button>

            <button onClick={() => handleQuickLogin('admin@studioart.com')} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'space-between', padding: '12px' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>Admin (Sistem)</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>CRUD user, modul, lesson, & dashboard stats</div>
              </div>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
