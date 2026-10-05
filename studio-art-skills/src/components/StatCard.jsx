import React, { useEffect, useState } from 'react';

export default function StatCard({ label, value, icon: Icon, color = 'var(--accent-cyan)' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Basic count-up animation
    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end)) {
      setCount(value);
      return;
    }
    if (end === 0) return;
    
    const duration = 1000;
    const increment = end / (duration / 16); // ~60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="card card-hover flex items-center gap-4" style={{ padding: '20px' }}>
      <div style={{ 
        padding: '12px', 
        borderRadius: '12px', 
        background: `rgba(6, 182, 212, 0.1)`, 
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={24} />
      </div>
      <div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
          {count}
        </div>
      </div>
    </div>
  );
}
