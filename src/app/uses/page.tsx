"use client";
import React from 'react';
import { motion } from 'framer-motion';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '1.25rem',
  padding: '2rem',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
};

const SECTIONS = [
  {
    title: 'Hardware & Workstation',
    color: '#00e5ff',
    items: [
      { name: 'Laptop / System', desc: 'MacBook Air M2 (16GB RAM, 512GB SSD) — Extremely fast, lightweight, and perfect for localized model inference and code compilation.' },
      { name: 'Display Monitor', desc: 'LG Ultrawide 29" IPS Monitor — Great screen width for having terminal shells, code editors, and browsers open side-by-side.' },
      { name: 'Keyboard & Input', desc: 'Keychron K2 Mechanical Keyboard (Brown Switches) — Provides comfortable tactile feedback for prolonged coding sessions.' },
      { name: 'Audio Gear', desc: 'Sony WH-1000XM4 Noise Canceling Headphones — Keeps me focused in noisy environments.' }
    ]
  },
  {
    title: 'Development & Software',
    color: '#f59e0b',
    items: [
      { name: 'Text Editor / IDE', desc: 'Visual Studio Code — My primary development environment customized with material icons and dark themes.' },
      { name: 'Terminal Shell', desc: 'Zsh shell with Oh My Zsh, custom powerlevel10k theme, autocomplete, and syntax-highlighting plugins.' },
      { name: 'Browser Choice', desc: 'Google Chrome (for primary layout auditing and dev tools inspection) & Brave Browser (for ad-free searching).' },
      { name: 'Local Database Engines', desc: 'MySQL Workbench & MongoDB Compass — Used for inspecting data loops in node/flask projects.' }
    ]
  },
  {
    title: 'VS Code Extensions',
    color: '#ec4899',
    items: [
      { name: 'Prettier & ESLint', desc: 'Handles automatic formatting and maps type validation directly on file save.' },
      { name: 'GitLens', desc: 'Surfaces inline git blame history and repository logs directly in line files.' },
      { name: 'Error Lens', desc: 'Highlights compiler errors and warnings inline, preventing build blockages.' },
      { name: 'Pylance', desc: 'Provides fast type-checking parameters and IntelliSense completions for Python codebases.' }
    ]
  }
];

export default function UsesPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 6rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '5rem', textAlign: 'center' }}
        >
          <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Configuration</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '1rem' }}>Uses / Setup</h1>
          <p style={{ color: 'rgba(148,163,184,0.75)', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
            A detailed catalog of the hardware workstation, development software, and editor plugins I use on a daily basis.
          </p>
        </motion.div>

        {/* Sections list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {SECTIONS.map((sec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ ...cardStyle }}
            >
              {/* Colored top indicator line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(to right, ${sec.color}, transparent)` }} />

              {/* Title */}
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem', letterSpacing: '-0.02em' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: sec.color }} />
                {sec.title}
              </h2>

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {sec.items.map((item, ii) => (
                  <div key={ii} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', alignItems: 'flex-start', borderBottom: ii === sec.items.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.04)', paddingBottom: ii === sec.items.length - 1 ? 0 : '1.25rem' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f1f5f9' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(148,163,184,0.85)', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
