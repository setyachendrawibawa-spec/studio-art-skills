import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Seluruh kolom formulir wajib diisi.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }

    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Pendaftaran gagal. Email mungkin sudah terdaftar.');
    }
  };

  return (
    <div className="container flex items-center justify-center animate-fade-in" style={{ minHeight: '80vh', padding: '40px 0' }}>
      <div className="grid grid-cols-2 card" style={{ padding: 0, overflow: 'hidden', maxWidth: '850px', width: '100%' }}>
        {/* Left Info Column */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary), rgba(6, 182, 212, 0.1))', 
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRight: '1px solid var(--glass-border)'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>Mulailah Petualangan Seni Anda</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>
            Dengan membuat akun, Anda dapat langsung mengunggah karya hasil latihan Anda untuk dievaluasi oleh mentor professional.
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <li className="flex items-center gap-2">✔️ Akses 10+ modul kurikulum terstruktur</li>
            <li className="flex items-center gap-2">✔️ Dapatkan review penilaian & masukan mentor</li>
            <li className="flex items-center gap-2">✔️ Kumpulkan badge pencapaian belajar</li>
            <li className="flex items-center gap-2">✔️ Bangun portofolio digital pribadi Anda</li>
          </ul>
        </div>

        {/* Right Form Column */}
        <div style={{ padding: '40px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>Buat Akun Siswa</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>Proses cepat dan langsung aktif.</p>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '12px', borderRadius: '6px', fontSize: '13px', marginBottom: '20px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Art Student" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ paddingLeft: '40px', width: '100%' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="student@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '40px', width: '100%' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Minimal 6 karakter" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '40px', width: '100%' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Konfirmasi Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Ulangi password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ paddingLeft: '40px', width: '100%' }}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
              {loading ? 'Mendaftar...' : 'Buat Akun Sekarang'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Sudah punya akun? <Link to="/login" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Masuk di sini</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
