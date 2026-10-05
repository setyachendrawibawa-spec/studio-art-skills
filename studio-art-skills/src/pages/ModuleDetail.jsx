import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, FileText } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import LessonCard from '../components/LessonCard';
import { mockModules, mockLessons, mockProgress } from '../data/mockData';

export default function ModuleDetail() {
  const { id } = useParams();
  
  // Find current module
  const module = mockModules.find(m => m.id === id);
  
  if (!module) {
    return (
      <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--error)' }}>Modul tidak ditemukan.</h2>
        <Link to="/modules" className="btn btn-secondary" style={{ marginTop: '20px' }}>Kembali ke Katalog</Link>
      </div>
    );
  }

  // Find lessons belonging to this module
  const lessons = mockLessons.filter(l => l.module_id === module.id);
  
  // Find progress for current user (u1)
  const currentProgressObj = mockProgress.find(p => p.module_id === module.id);
  const percentComplete = currentProgressObj ? currentProgressObj.percent_complete : 0;

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      {/* Header breadcrumb */}
      <div>
        <Link to="/modules" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px', display: 'inline-flex', gap: '6px' }}>
          <ArrowLeft size={16} /> Kembali ke Katalog
        </Link>
      </div>

      {/* Module Hero Header */}
      <div className="card" style={{ 
        position: 'relative', 
        padding: 0, 
        overflow: 'hidden', 
        border: '1px solid var(--glass-border)' 
      }}>
        <div style={{ height: '220px', width: '100%', position: 'relative' }}>
          <img src={module.thumbnail_url} alt={module.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }} />
          <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
            <div className="flex gap-2" style={{ marginBottom: '8px' }}>
              <span className="tag tag-cyan">{module.level}</span>
              <span className="tag" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>{module.category}</span>
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'white' }}>{module.title}</h1>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
            {module.description}
          </p>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
            <h4 style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px' }}>Progres Belajar Anda:</h4>
            <ProgressBar value={percentComplete} />
          </div>
        </div>
      </div>

      {/* Lessons Outline Section */}
      <div className="grid grid-cols-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} style={{ color: 'var(--accent-cyan)' }} /> Kurikulum & Materi Latihan
          </h3>
          
          <div>
            {lessons.length > 0 ? (
              lessons.map((lesson, idx) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  order={idx + 1}
                  isCompleted={percentComplete === 100}
                />
              ))
            ) : (
              <div className="card" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Belum ada materi pelajaran yang diunggah untuk modul ini.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar info */}
        <div className="flex flex-col gap-6">
          <div className="card flex flex-col gap-4">
            <h4 style={{ fontSize: '16px', fontWeight: 700 }}>Informasi Modul</h4>
            <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)' }}>
              <div className="flex justify-between">
                <span>Total Pelajaran:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{lessons.length} Lesson</span>
              </div>
              <div className="flex justify-between">
                <span>Level:</span>
                <span style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>{module.level}</span>
              </div>
              <div className="flex justify-between">
                <span>Sertifikat Kelulusan:</span>
                <span style={{ fontWeight: 600, color: 'var(--success)' }}>Tersedia</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>Indikator Penilaian</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Setiap latihan akan dinilai oleh mentor berdasarkan rubrik standard seperti ketepatan garis, pencahayaan, perspektif, dan volume objek. Pastikan Anda menyelesaikan checklist latihan sebelum mengunggah.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
