import React from 'react';
import { Award, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SubmissionCard({ submission, isMentorView = false, onReviewClick = null }) {
  const isReviewed = submission.status === 'reviewed';

  return (
    <div className="card flex flex-col justify-between" style={{ padding: '20px', height: '100%' }}>
      <div>
        <div style={{ position: 'relative', width: '100%', height: '160px', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
          <img src={submission.file_url} alt={submission.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
            {isReviewed ? (
              <span className="tag tag-gold" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                <Award size={14} /> {submission.feedback?.score || 0}/100
              </span>
            ) : (
              <span className="tag tag-blue" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} /> Menunggu Review
              </span>
            )}
          </div>
        </div>

        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>{submission.lesson_title}</span>
        <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '4px 0 8px 0', color: 'var(--text-primary)' }}>{submission.title}</h4>
        
        {submission.user_name && isMentorView && (
          <div style={{ fontSize: '13px', color: 'var(--accent-cyan)', marginBottom: '8px', fontWeight: 500 }}>
            Pengirim: {submission.user_name}
          </div>
        )}

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '16px' }}>
          {submission.note || 'Tidak ada catatan proses.'}
        </p>

        {isReviewed && submission.feedback && (
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px', borderLeft: '3px solid var(--reward-gold)', marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: 'var(--reward-gold)', fontWeight: 600, marginBottom: '4px' }}>Feedback Mentor:</div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              "{submission.feedback.comment}"
            </p>
          </div>
        )}
      </div>

      <div>
        {isMentorView && !isReviewed && onReviewClick ? (
          <button onClick={() => onReviewClick(submission)} className="btn btn-primary" style={{ width: '100%', padding: '8px 16px', fontSize: '13px' }}>
            Beri Feedback <ArrowRight size={16} />
          </button>
        ) : (
          <Link to={`/lessons/${submission.lesson_id}`} className="btn btn-secondary" style={{ width: '100%', padding: '8px 16px', fontSize: '13px' }}>
            Lihat Detail Latihan
          </Link>
        )}
      </div>
    </div>
  );
}
