import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import { mockModules } from '../data/mockData';

export default function Modules() {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredModules = mockModules.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(search.toLowerCase()) || 
                          mod.description.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || mod.level === levelFilter;
    const matchesCategory = categoryFilter === 'all' || mod.category === categoryFilter;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const categories = ['all', ...new Set(mockModules.map(m => m.category))];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Professional'];

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Katalog Modul Seni</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Pilih kurikulum terstruktur Anda dan mulai tingkatkan kemampuan seni Anda.</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="card flex justify-between items-center gap-4 flex-wrap" style={{ padding: '16px' }}>
        <div style={{ position: 'relative', flexGrow: 1, minWidth: '250px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-control" 
            placeholder="Cari judul modul atau materi..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '40px', width: '100%', marginBottom: 0 }}
          />
        </div>

        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={16} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Level:</span>
            <select 
              value={levelFilter} 
              onChange={(e) => setLevelFilter(e.target.value)}
              className="form-control"
              style={{ padding: '8px 12px', fontSize: '13px', minWidth: '130px' }}
            >
              {levels.map(lvl => (
                <option key={lvl} value={lvl}>{lvl === 'all' ? 'Semua Level' : lvl}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Kategori:</span>
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="form-control"
              style={{ padding: '8px 12px', fontSize: '13px', minWidth: '140px' }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'Semua Kategori' : cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      {filteredModules.length > 0 ? (
        <div className="grid grid-cols-3">
          {filteredModules.map(mod => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center justify-center" style={{ padding: '60px', textAlign: 'center' }}>
          <BookOpen size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Tidak Ada Modul Ditemukan</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>Coba ubah filter pencarian Anda.</p>
        </div>
      )}
    </div>
  );
}
