"use client";
import React from 'react';
import { motion } from 'framer-motion';

const INTERESTS = ['Cybersecurity', 'Software Development', 'Artificial Intelligence', 'Basketball', 'Photography', 'Video Editing'];

export default function About() {
  return (
    <section id="about" style={{ borderTop: '1px solid rgba(255,255,255,0.03)', background: 'var(--bg)' }}>
      <div className="section-container">
        
        {/* Header Block - Editorial Asymmetric layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '6rem', alignItems: 'start' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              // Who I Am
            </p>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', fontFamily: 'var(--font-display)', margin: 0 }}>
              Philosophy & Biography
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ paddingTop: '1.25rem' }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: 'var(--font-sans)', fontWeight: 400, margin: 0 }}>
              Building secure systems requires a balance of defense engineering and local intelligence. My approach focuses on creating robust backend solutions backed by threat modeling and practical research.
            </p>
          </motion.div>
        </div>

        {/* Content Layout - Asymmetrical Blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '5rem', alignItems: 'start' }} className="about-grid">
          
          {/* Bio column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
          >
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: '#ffffff', marginBottom: '1.25rem' }}>Biography</h3>
              <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                I am Ishan Yadav, a B.Tech Computer Science student currently residing in Gurgaon, Haryana. My passion lies in constructing high-performance software architectures while embedding proactive security mechanisms.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.8 }}>
                Currently in my studies at Bennett University (graduating 2028), I specialize in incident log automation mapping to the MITRE ATT&CK framework and crafting AI-driven tools.
              </p>
            </div>

            {/* Quick specifications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', padding: '2rem', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '1.5rem', background: 'rgba(255,255,255,0.01)' }}>
              {[
                ['Location', 'Gurgaon, Haryana, India'],
                ['Academics', 'Bennett University — B.Tech CSE (CGPA: 6.7)'],
                ['Contact', 'ishanyadav09@outlook.com'],
                ['Languages', 'English • Hindi'],
              ].map(([title, val]) => (
                <div key={title} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.5rem', fontSize: '0.82rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{title}</span>
                  <span style={{ color: '#ffffff', fontWeight: 550 }}>{val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education & Timeline column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
          >
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: '#ffffff', marginBottom: '1.5rem' }}>Timeline</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative', paddingLeft: '1.5rem' }}>
                {/* Timeline vertical rule */}
                <div style={{ position: 'absolute', left: 0, top: '0.4rem', bottom: '0.4rem', width: '1px', background: 'rgba(255, 255, 255, 0.06)' }} />
                
                {[
                  {
                    title: 'B.Tech — Computer Science & Engineering',
                    sub: 'Bennett University',
                    period: '2024 — 2028',
                    desc: 'Focusing on distributed systems, network security architectures, threat simulation, and custom automation models.'
                  },
                  {
                    title: 'Class XII — Mathematics',
                    sub: 'St. Xavier\'s High School (CBSE / NIOS)',
                    period: 'Completed',
                    desc: 'Core science foundation focused on logic, computing sciences, and advanced math frameworks.'
                  },
                  {
                    title: 'Class X',
                    sub: 'St. Xavier\'s High School (CBSE)',
                    period: 'Completed',
                    desc: 'Secondary school education focusing on science foundations.'
                  }
                ].map((item, idx) => (
                  <div key={item.title} style={{ position: 'relative' }}>
                    {/* Node dot */}
                    <div style={{
                      position: 'absolute',
                      left: 'calc(-1.5rem - 4.5px)',
                      top: '0.4rem',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      border: '2.5px solid var(--bg)',
                      boxShadow: '0 0 10px rgba(255,255,255,0.15)'
                    }} />
                    
                    <h4 style={{ fontSize: '0.94rem', fontWeight: 650, color: '#ffffff', margin: 0 }}>{item.title}</h4>
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', margin: '0.25rem 0' }}>
                      {item.sub} &nbsp;·&nbsp; {item.period}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0.4rem 0 0' }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests details */}
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: '#ffffff', marginBottom: '1.25rem' }}>Focus Interests</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {INTERESTS.map(i => (
                  <span 
                    key={i} 
                    style={{ 
                      padding: '0.4rem 1.1rem', 
                      borderRadius: '9999px', 
                      background: 'rgba(255, 255, 255, 0.02)', 
                      border: '1px solid rgba(255, 255, 255, 0.04)', 
                      color: 'var(--text)', 
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      transition: 'border-color 0.3s, background-color 0.3s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'; e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)'; e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'; }}
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      <style>{`
        @media (max-width: 820px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </section>
  );
}
