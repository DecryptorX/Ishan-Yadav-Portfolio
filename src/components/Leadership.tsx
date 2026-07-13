"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Leadership() {
  return (
    <section id="leadership" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Beyond Code</p>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>Leadership</h2>
          <p style={{ color: 'rgba(148,163,184,0.8)', fontSize: '0.95rem', marginBottom: '3rem', maxWidth: 500 }}>Community contributions and leadership roles.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '1.25rem', padding: '1.5rem', position: 'relative', overflow: 'hidden',
              }}>
              <div aria-hidden style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)', borderRadius: '50%', transform: 'translate(30%, -30%)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '0.75rem', background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                  📡
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '1rem' }}>Social Media Sub Head</h3>
                  <p style={{ color: '#00e5ff', fontSize: '0.82rem', fontWeight: 600 }}>ACM Bennett University</p>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'Managed the chapter\'s social media presence and digital marketing campaigns',
                  'Captured and produced event photography and videography for promotional content',
                  'Recruited, mentored, and managed a junior core team for content creation and social media operations',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'rgba(148,163,184,0.85)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    <span style={{ color: '#00e5ff', flexShrink: 0, marginTop: '0.15rem' }}>▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '1.25rem', padding: '1.5rem',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '0.75rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                  🏆
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '1rem' }}>Certifications</h3>
                  <p style={{ color: '#6366f1', fontSize: '0.82rem', fontWeight: 600 }}>Professional Credentials</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { issuer: 'Google', name: 'Operating Systems and You: Becoming a Power User', color: '#4285f4' },
                  { issuer: 'Google', name: 'The Bits and Bytes of Computer Networking', color: '#4285f4' },
                  { issuer: 'Arm', name: 'Computer Architecture Essentials on Arm', color: '#0091bd' },
                  { issuer: 'Infosys Springboard', name: 'Python Fundamentals', color: '#007cc2' },
                ].map(cert => (
                  <div key={cert.name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.75rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: cert.color, flexShrink: 0 }} />
                    <div>
                      <p style={{ color: '#f1f5f9', fontSize: '0.82rem', fontWeight: 600 }}>{cert.name}</p>
                      <p style={{ color: cert.color, fontSize: '0.72rem', marginTop: '0.1rem' }}>{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
