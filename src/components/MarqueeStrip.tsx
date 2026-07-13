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
      animation: `marquee${reverse ? 'R' : ''} 40s linear infinite`,
      willChange: 'transform',
    }}>
      {doubled.map((item, i) => (
        <span key={i} style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          padding: '0 2rem', whiteSpace: 'nowrap',
          fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em',
          color: i % 3 === 0 ? '#00e5ff' : i % 3 === 1 ? 'rgba(226,232,240,0.5)' : '#6366f1',
          textTransform: 'uppercase',
        }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', display: 'inline-block', flexShrink: 0 }} />
          {item}
        </span>
      ))}
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden', padding: '0.85rem 0', background: 'rgba(255,255,255,0.015)' }}>
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <Track />
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeR { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}
