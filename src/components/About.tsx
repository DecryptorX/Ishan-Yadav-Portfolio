"use client";
import React from 'react';
import { motion } from 'framer-motion';

const INTERESTS = ['Cybersecurity','Software Development','Artificial Intelligence','Basketball','Photography','Video Editing'];

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '1rem',
  padding: '1.5rem',
};

export default function About() {
  return (
    <section id="about" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Who I Am</p>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>About Me</h2>
          <p style={{ color: 'rgba(148,163,184,0.8)', fontSize: '0.95rem', marginBottom: '3rem', maxWidth: 500 }}>A little bit about who I am and what I do.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {/* Bio */}
            <div style={{ ...card, gridColumn: 'span 1' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Bio</h3>
              <p style={{ color: 'rgba(148,163,184,0.9)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                I&apos;m Ishan Yadav — a Cybersecurity Enthusiast and Software Developer from Gurgaon, Haryana, India. I love building secure, scalable systems and exploring the intersection of AI and cybersecurity.
              </p>
              <p style={{ color: 'rgba(148,163,184,0.9)', fontSize: '0.9rem', lineHeight: 1.8, marginTop: '0.75rem' }}>
                Currently pursuing my B.Tech in Computer Science & Engineering at Bennett University (graduating 2028). I build practical AI-powered applications and security tools in my spare time.
              </p>

              <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  ['📍', 'Gurgaon, Haryana, India'],
                  ['🎓', 'Bennett University — B.Tech CSE | CGPA 6.7/10'],
                  ['📧', 'ishanyadav09@outlook.com'],
                  ['🗣️', 'English • Hindi'],
                ].map(([icon, text]) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(148,163,184,0.8)', fontSize: '0.85rem' }}>
                    <span>{icon}</span><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div style={card}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem' }}>Education</h3>
              <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, #00e5ff, transparent)' }} />
                <div style={{ position: 'absolute', left: -4, top: 4, width: 9, height: 9, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 8px rgba(0,229,255,0.6)' }} />
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.95rem' }}>B.Tech — Computer Science &amp; Engineering</p>
                  <p style={{ color: '#00e5ff', fontSize: '0.82rem', fontWeight: 500, marginTop: '0.2rem' }}>Bennett University</p>
                  <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.8rem', marginTop: '0.2rem' }}>2024 — 2028 &nbsp;·&nbsp; CGPA: 6.7 / 10</p>
                  <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.82rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                    Focused on systems security, software engineering, and artificial intelligence.
                  </p>

                  <div style={{ marginTop: '1.5rem', position: 'absolute', left: -4, top: 80, width: 9, height: 9, borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 8px rgba(99,102,241,0.5)' }} />
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.95rem' }}>Class XII — Mathematics (NIOS)</p>
                    <p style={{ color: '#6366f1', fontSize: '0.82rem', fontWeight: 500, marginTop: '0.2rem' }}>St. Xavier&apos;s High School</p>
                    <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.8rem', marginTop: '0.2rem' }}>CBSE &nbsp;·&nbsp; 69.2%</p>
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.95rem' }}>Class X</p>
                    <p style={{ color: '#6366f1', fontSize: '0.82rem', fontWeight: 500, marginTop: '0.2rem' }}>St. Xavier&apos;s High School</p>
                    <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.8rem', marginTop: '0.2rem' }}>CBSE &nbsp;·&nbsp; 82%</p>
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: '1.25rem 0 0.75rem' }}>Interests</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {INTERESTS.map(i => (
                  <span key={i} style={{ padding: '0.3rem 0.75rem', borderRadius: 999, background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.15)', color: 'rgba(226,232,240,0.8)', fontSize: '0.78rem' }}>
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
