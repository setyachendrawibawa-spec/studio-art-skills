import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function ModuleCard({ module, progressPercent = null }) {
  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'tag-cyan';
      case 'intermediate': return 'tag-blue';
      case 'advanced': return 'tag-gold';
      default: return 'tag-cyan';
    }
  };

  return (
    <div className="card card-hover flex flex-col justify-between" style={{ height: '100%', overflow: 'hidden', padding: 0 }}>
      <div>
        <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
          <img 
            src={module.thumbnail_url} 
            alt={module.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px' }}>
            <span className={`tag ${getLevelColor(module.level)}`}>{module.level}</span>
            <span className="tag" style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
              {module.category}
            </span>
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>{module.title}</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '60px' }}>
            {module.description}
          </p>
        </div>
      </div>

      <div style={{ padding: '0 20px 20px 20px' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-2">
            <BookOpen size={16} />
            {module.lesson_count || 2} Lesson
          </span>
          {progressPercent !== null && (
            <span style={{ fontWeight: 600, color: 'var(--success)' }}>
              Selesai: {progressPercent}%
            </span>
          )}
        </div>

        <Link to={`/modules/${module.id}`} className="btn btn-outline" style={{ width: '100%', textAlign: 'center' }}>
          Lihat Modul
        </Link>
      </div>
    </div>
  );
}
