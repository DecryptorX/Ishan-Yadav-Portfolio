"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Leadership() {
  return (
    <section id="leadership" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="section-container">

        {/* Asymmetrical header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '4rem', alignItems: 'start' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>// Beyond Code</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em', fontFamily: 'var(--font-display)', margin: 0 }}>Leadership</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }} style={{ paddingTop: '1.25rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>Community contributions and leadership roles.</p>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="card-editorial" style={{ padding: '2rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '0.75rem', background: 'rgba(52, 211, 153, 0.06)', border: '1px solid rgba(52, 211, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                📡
              </div>
              <div>
                <h3 style={{ fontWeight: 700, color: '#ffffff', fontSize: '1rem', fontFamily: 'var(--font-display)', margin: 0 }}>Social Media Sub Head</h3>
                <p style={{ color: 'var(--accent-emerald)', fontSize: '0.78rem', fontWeight: 600, margin: '0.15rem 0 0' }}>ACM Bennett University</p>
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                'Managed the chapter\'s social media presence and digital marketing campaigns',
                'Captured and produced event photography and videography for promotional content',
                'Recruited, mentored, and managed a junior core team for content creation and social media operations',
              ].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.7rem' }}>▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="card-editorial" style={{ padding: '2rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '0.75rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                🏆
              </div>
              <div>
                <h3 style={{ fontWeight: 700, color: '#ffffff', fontSize: '1rem', fontFamily: 'var(--font-display)', margin: 0 }}>Certifications</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600, margin: '0.15rem 0 0' }}>Professional Credentials</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { issuer: 'Google', name: 'Operating Systems and You: Becoming a Power User' },
                { issuer: 'Google', name: 'The Bits and Bytes of Computer Networking' },
                { issuer: 'Arm', name: 'Computer Architecture Essentials on Arm' },
                { issuer: 'Infosys Springboard', name: 'Python Fundamentals' },
              ].map(cert => (
                <div key={cert.name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-emerald)', flexShrink: 0, opacity: 0.7 }} />
                  <div>
                    <p style={{ color: '#ffffff', fontSize: '0.82rem', fontWeight: 600, margin: 0 }}>{cert.name}</p>
                    <p style={{ color: 'var(--text-subtle)', fontSize: '0.7rem', margin: '0.15rem 0 0', fontFamily: 'var(--font-mono)' }}>{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
