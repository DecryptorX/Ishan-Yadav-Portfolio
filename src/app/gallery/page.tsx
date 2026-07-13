"use client";
import React from 'react';
import { motion } from 'framer-motion';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '1.25rem',
  padding: '1.5rem',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
};

const ITEMS = [
  {
    title: 'SkinVision AI Dashboard',
    category: 'UI/UX Mockup',
    tech: 'Next.js, Canvas',
    desc: 'The user dashboard interface displaying ML classification logs and geolocation heatmaps for dermatologist matching.',
    color: '#00e5ff',
    content: (
      <div style={{ background: '#0e171e', width: '100%', height: '180px', borderRadius: '0.75rem', border: '1px solid rgba(0,229,255,0.15)', padding: '1rem', fontFamily: 'monospace', fontSize: '0.65rem', color: '#00e5ff', display: 'flex', flexDirection: 'column', gap: '0.4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,229,255,0.1)', paddingBottom: '0.4rem' }}>
          <span>SKINVISION_MODEL_V2</span>
          <span style={{ animation: 'blink 1s infinite' }}>● ACTIVE</span>
        </div>
        <div>[RUNNING INFERENCE] Ingesting dermoscopic image...</div>
        <div>[PREPROCESSING] Slicing array to 224x224 input...</div>
        <div style={{ color: '#00ff88' }}>[INFERENCE RESULT] Melanocytic Nevus detected (Confidence: 94.2%)</div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '0.1rem 0.4rem', background: 'rgba(0,229,255,0.1)', borderRadius: '0.2rem' }}>LOGS: OK</span>
          <span style={{ padding: '0.1rem 0.4rem', background: 'rgba(0,229,255,0.1)', borderRadius: '0.2rem' }}>LATENCY: 142ms</span>
        </div>
      </div>
    )
  },
  {
    title: 'Automated Incident Report',
    category: 'Security Logs output',
    tech: 'HTML & JSON Logs',
    desc: 'HTML report generated dynamically by the parser script after assessing Linux syslogs for brute-force threats.',
    color: '#f59e0b',
    content: (
      <div style={{ background: '#1e140a', width: '100%', height: '180px', borderRadius: '0.75rem', border: '1px solid rgba(245,158,11,0.15)', padding: '1rem', fontFamily: 'monospace', fontSize: '0.65rem', color: '#f59e0b', display: 'flex', flexDirection: 'column', gap: '0.4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(245,158,11,0.1)', paddingBottom: '0.4rem', color: '#ff6b6b' }}>
          <span>⚠️ BRUTE_FORCE TRIGGERED</span>
          <span>MITRE T1110</span>
        </div>
        <div>[LOG SOURCE] Linux /var/log/auth.log</div>
        <div>[PATTERN MATCH] 14 failed root ssh connections in 8 seconds</div>
        <div style={{ color: '#ff6b6b' }}>[SOURCE IP] 185.220.101.44 (Tor exit node)</div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '0.1rem 0.4rem', background: 'rgba(245,158,11,0.1)', borderRadius: '0.2rem' }}>REPORT ID: #4489</span>
          <span style={{ padding: '0.1rem 0.4rem', background: 'rgba(245,158,11,0.1)', borderRadius: '0.2rem' }}>SEVERITY: HIGH</span>
        </div>
      </div>
    )
  },
  {
    title: 'SAFEपथ Emergency SOS flow',
    category: 'Mobile PWA mockups',
    tech: 'React, Leaflet',
    desc: 'The emergency SOS sequence layout showing the client-side countdown window before coordinates broadcast.',
    color: '#ec4899',
    content: (
      <div style={{ background: '#1c0e16', width: '100%', height: '180px', borderRadius: '0.75rem', border: '1px solid rgba(236,72,153,0.15)', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ec4899', letterSpacing: '0.05em' }}>SOS DISPATCH COUNTDOWN</div>
        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f1f5f9', lineHeight: 1 }}>03</div>
        <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>Broadcasting location coordinates to family and emergency authorities in 3 seconds...</div>
      </div>
    )
  },
  {
    title: 'JARVIS Voice Interface',
    category: 'Desktop Assistant Mock',
    tech: 'SQLite, Web Audio API',
    desc: 'The assistant active wave status monitor displaying voice threshold inputs and backend JSON parsing.',
    color: '#6366f1',
    content: (
      <div style={{ background: '#0f0e1c', width: '100%', height: '180px', borderRadius: '0.75rem', border: '1px solid rgba(99,102,241,0.15)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(99,102,241,0.1)', paddingBottom: '0.4rem', fontFamily: 'monospace', fontSize: '0.65rem', color: '#6366f1' }}>
          <span>JARVIS_SYSTEM_ACTIVE</span>
          <span>LISTENING</span>
        </div>
        {/* Animated equalizer waves */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '40px', justifyContent: 'center', margin: 'auto 0' }}>
          {[30, 80, 45, 95, 60, 85, 30, 50, 90, 40].map((h, idx) => (
            <div key={idx} style={{ width: '4px', height: `${h}%`, background: '#6366f1', borderRadius: '2px', animation: 'wave-height 1.2s ease-in-out infinite alternate', animationDelay: `${idx * 0.1}s` }} />
          ))}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
          "Check logs in Linux server auth.log"
        </div>
      </div>
    )
  }
];

export default function GalleryPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 6rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '5rem', textAlign: 'center' }}
        >
          <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Asset Catalog</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '1rem' }}>Project Gallery</h1>
          <p style={{ color: 'rgba(148,163,184,0.75)', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
            Mockups, terminal configurations, UI flows, and logs reports generated by my core applications.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              style={{ ...cardStyle }}
              whileHover={{ borderColor: `${item.color}35`, boxShadow: `0 15px 35px ${item.color}05` }}
            >
              {/* Image Canvas Mock */}
              <div style={{ marginBottom: '1.25rem' }}>
                {item.content}
              </div>

              {/* Meta */}
              <div>
                <span style={{ fontSize: '0.72rem', color: item.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.category}
                </span>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f1f5f9', marginTop: '0.25rem', letterSpacing: '-0.02em' }}>
                  {item.title}
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'rgba(148, 163, 184, 0.7)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: '1rem', fontFamily: 'monospace' }}>
                  ⚙️ {item.tech}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes wave-height {
          0% { height: 10%; }
          100% { height: 100%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
