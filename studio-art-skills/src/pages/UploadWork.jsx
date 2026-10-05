import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Upload, ArrowLeft, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { mockPortfolio } from '../data/mockData';

export default function UploadWork() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get('lessonId');

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=600&h=400&q=80');
  const [reflection, setReflection] = useState('');
  const [tagsString, setTagsString] = useState('Sketsa, Arsir, Pensil');
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      alert('Judul dan Tautan Karya wajib diisi!');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const tags = tagsString.split(',').map(t => t.trim()).filter(Boolean);
      const newItem = {
        id: 'p_' + Date.now(),
        user_id: 'u1',
        title,
        image_url: imageUrl,
        reflection,
        tags,
        is_featured: isFeatured,
        created_at: new Date().toISOString()
      };

      mockPortfolio.unshift(newItem);
      setLoading(false);
      alert('Karya seni Anda berhasil ditambahkan ke Portofolio!');
      navigate('/portfolio');
    }, 1200);
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6" style={{ maxWidth: '750px', margin: '0 auto' }}>
      <div>
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px', display: 'inline-flex', gap: '6px' }}>
          <ArrowLeft size={16} /> Kembali
        </button>
      </div>

      <div className="card">
        <h1 style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '6px' }}>
          Unggah Karya Baru
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
          Pamerkan karya seni terbaru Anda ke Galeri Portofolio atau kumpulkan untuk tugas modul.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="form-group">
            <label className="form-label">Judul Karya</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Contoh: Still Life Buah Apel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">URL Gambar (Demo Tautan)</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Masukkan URL foto karya Anda"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Kategori / Tag (Pisahkan dengan koma)</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Sketsa, Arsir, Pensil"
                value={tagsString}
                onChange={(e) => setTagsString(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Catatan Refleksi & Proses Kreatif</label>
            <textarea 
              className="form-control" 
              rows="4" 
              placeholder="Bagikan apa yang Anda pelajari, tantangan saat rendering, dan detail media yang digunakan..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              style={{ resize: 'none' }}
            />
          </div>

          {/* Visual Dropzone Preview */}
          <div style={{ 
            background: 'rgba(0,0,0,0.2)', 
            border: '2px dashed var(--glass-border)', 
            padding: '20px', 
            borderRadius: '12px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <img src={imageUrl} alt="Karya Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', objectFit: 'contain' }} />
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Pratinjau tampilan karya seni di Portofolio Anda.
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="featured" 
              checked={isFeatured} 
              onChange={(e) => setIsFeatured(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--accent-cyan)' }} 
            />
            <label htmlFor="featured" style={{ fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              Jadikan karya unggulan (Tampil di bagian atas Portofolio)
            </label>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '12px', marginTop: '10px' }}>
            {loading ? 'Menyimpan...' : 'Simpan & Publikasikan'}
          </button>
        </form>
      </div>
    </div>
  );
}
