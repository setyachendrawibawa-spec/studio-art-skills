import React from 'react';

export default function ProgressBar({ value, max = 100 }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="flex items-center gap-4" style={{ width: '100%' }}>
      <div className="progress-bar-container" style={{ flexGrow: 1 }}>
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-cyan)', minWidth: '40px', textAlign: 'right' }}>
        {Math.round(percentage)}%
      </span>
    </div>
  );
}
