import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, PlayCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function LessonCard({ lesson, order, isCompleted = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card" style={{ padding: '16px', borderLeft: isCompleted ? '4px solid var(--success)' : '1px solid var(--glass-border)', background: 'rgba(19, 27, 46, 0.4)', marginBottom: '12px' }}>
      <div className="flex justify-between items-center" style={{ cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-4">
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-tertiary)',
            color: isCompleted ? 'var(--success)' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            {isCompleted ? <CheckCircle2 size={18} /> : order}
          </div>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>{lesson.title}</h4>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Latihan & Rubrik Penilaian</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isOpen ? <ChevronUp size={20} className="text-muted" /> : <ChevronDown size={20} className="text-muted" />}
        </div>
      </div>

      {isOpen && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Pelajari materi dasar, video tutorial, panduan checklist latihan, dan kumpulkan karya seni Anda untuk dinilai oleh mentor profesional.
          </p>
          <div className="flex gap-4">
            <Link to={`/lessons/${lesson.id}`} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <PlayCircle size={16} /> Mulai Latihan
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
