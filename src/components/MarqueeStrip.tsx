"use client";
import React from 'react';

const ITEMS = [
  'Python', 'React', 'Next.js', 'Cybersecurity', 'Flask', 'JavaScript',
  'MongoDB', 'Linux', 'Git', 'Tailwind CSS', 'SOC Analysis', 'MySQL',
  'AI / ML', 'Node.js', 'Java', 'Penetration Testing', 'VS Code', 'Postman',
];

function Track({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div style={{
      display: 'flex', gap: '0px',
      animation: `marquee${reverse ? 'R' : ''} 50s linear infinite`,
      willChange: 'transform',
    }}>
      {doubled.map((item, i) => (
        <span key={i} style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
          padding: '0 2.5rem', whiteSpace: 'nowrap',
          fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em',
          color: 'var(--text-subtle)',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-mono)',
        }}>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text-subtle)', display: 'inline-block', flexShrink: 0, opacity: 0.6 }} />
          {item}
        </span>
      ))}
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <div style={{ 
      borderTop: '1px solid rgba(255,255,255,0.03)', 
      borderBottom: '1px solid rgba(255,255,255,0.03)', 
      overflow: 'hidden', 
      padding: '1rem 0', 
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}
    className="marquee-container"
    >
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <Track />
      </div>
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <Track reverse />
      </div>
    </div>
  );
}
