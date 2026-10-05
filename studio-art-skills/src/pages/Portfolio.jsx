import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, mockRoles } from '../context/AuthContext';
import { Plus, Image as ImageIcon, Search, Tag, X, Calendar } from 'lucide-react';
import { mockPortfolio } from '../data/mockData';

export default function Portfolio() {
  const { user } = useAuth();
  const [portfolioItems, setPortfolioItems] = useState(mockPortfolio);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null); // Lightbox state

  // Extract all unique tags
  const allTags = ['All', ...new Set(portfolioItems.flatMap(item => item.tags))];

  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.reflection.toLowerCase().includes(search.toLowerCase());
    const matchesTag = activeTag === 'All' || item.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div className="flex justify-between items-center flex-wrap gap-4" style={{ width: '100%' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Galeri Portofolio Seni</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Pameran karya seni terbaik, dokumentasi proses kreatif, dan refleksi belajar.</p>
        </div>
        {user?.role === mockRoles.LEARNER && (
          <Link to="/upload-work" className="btn btn-primary flex items-center gap-2">
            <Plus size={18} /> Unggah Karya Baru
          </Link>
        )}
      </div>

      {/* Search & Tag Chips */}
      <div className="card flex flex-col gap-4" style={{ padding: '16px' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-control" 
            placeholder="Cari karya berdasarkan judul atau refleksi..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '40px', width: '100%', marginBottom: 0 }}
          />
        </div>

        {/* Tag chips */}
        <div className="flex gap-2 flex-wrap" style={{ alignItems: 'center' }}>
          <Tag size={16} style={{ color: 'var(--text-muted)' }} />
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="btn"
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                borderRadius: '999px',
                background: activeTag === tag ? 'var(--accent-cyan)' : 'var(--bg-tertiary)',
                color: activeTag === tag ? '#0b0f19' : 'var(--text-secondary)',
                fontWeight: activeTag === tag ? 'bold' : 'normal',
                boxShadow: activeTag === tag ? '0 2px 10px var(--accent-glow)' : 'none'
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid gallery */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-3">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="card card-hover flex flex-col justify-between" 
              style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => setSelectedItem(item)}
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {item.is_featured && (
                  <span className="tag tag-gold" style={{ position: 'absolute', top: '12px', left: '12px', fontWeight: 'bold' }}>
                    Featured
                  </span>
                )}
              </div>

              <div style={{ padding: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{item.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '40px' }}>
                  {item.reflection}
                </p>
                
                <div className="flex gap-2 flex-wrap" style={{ marginTop: '12px' }}>
                  {item.tags.map(t => (
                    <span key={t} className="tag tag-cyan" style={{ fontSize: '10px' }}>#{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center justify-center" style={{ padding: '60px', textAlign: 'center' }}>
          <ImageIcon size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          <h3>Galeri Masih Kosong</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>Belum ada karya seni yang sesuai dengan pencarian Anda.</p>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {selectedItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(5, 7, 12, 0.9)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }} onClick={() => setSelectedItem(null)}>
          <div className="card animate-fade-in" style={{ 
            maxWidth: '900px', 
            width: '100%', 
            padding: 0, 
            overflow: 'hidden', 
            background: 'var(--bg-secondary)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            maxHeight: '85vh'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Image side */}
            <div style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', height: '100%', position: 'relative' }}>
              <img src={selectedItem.image_url} alt={selectedItem.title} style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }} />
              <button 
                onClick={() => setSelectedItem(null)} 
                className="btn btn-secondary" 
                style={{ position: 'absolute', top: '12px', left: '12px', padding: '6px', borderRadius: '50%' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Meta details side */}
            <div className="flex flex-col justify-between" style={{ padding: '30px', overflowY: 'auto' }}>
              <div>
                <div className="flex items-center justify-between" style={{ marginBottom: '10px' }}>
                  <span className="tag tag-cyan" style={{ fontSize: '11px' }}>Karya Portofolio</span>
                  {selectedItem.is_featured && <span className="tag tag-gold" style={{ fontSize: '11px', fontWeight: 'bold' }}>Featured</span>}
                </div>

                <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>{selectedItem.title}</h2>
                
                <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '20px' }}>
                  <Calendar size={14} />
                  <span>Dibuat pada: {new Date(selectedItem.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>

                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: 'var(--accent-cyan)' }}>Proses & Refleksi Kreatif</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                  {selectedItem.reflection || 'Tidak ada catatan refleksi.'}
                </p>

                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-muted)' }}>Tagging</h4>
                <div className="flex gap-2 flex-wrap">
                  {selectedItem.tags.map(t => (
                    <span key={t} className="tag tag-blue" style={{ fontSize: '11px' }}>#{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', marginTop: '20px' }}>
                <button onClick={() => setSelectedItem(null)} className="btn btn-secondary" style={{ width: '100%' }}>
                  Tutup Galeri
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
