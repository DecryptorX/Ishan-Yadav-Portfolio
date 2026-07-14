"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, LayoutGrid, Sparkles } from 'lucide-react';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.01)',
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  border: '1px solid rgba(255, 255, 255, 0.04)',
  borderRadius: '2rem',
  padding: '2.5rem',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
};

const ITEMS = [
  {
    title: 'SkinVision AI Dashboard',
    category: 'UI/UX Mockup',
    tech: 'Next.js, Canvas',
    desc: 'The user dashboard interface displaying ML classification logs and geolocation heatmaps for dermatologist matching.',
    color: '#ffffff',
    content: (
      <div style={{ background: '#0e171e', width: '100%', height: '220px', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}>
          <span>SKINVISION_MODEL_V2</span>
          <span style={{ animation: 'blink 1.2s infinite' }}>● ACTIVE</span>
        </div>
        <div>[RUNNING INFERENCE] Ingesting dermoscopic image...</div>
        <div>[PREPROCESSING] Slicing array to 224x224 input...</div>
        <div style={{ color: '#ffffff', fontWeight: 600 }}>[INFERENCE RESULT] Melanocytic Nevus detected (94.2%)</div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.04)', borderRadius: '9999px', fontSize: '0.65rem' }}>LOGS: OK</span>
          <span style={{ padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.04)', borderRadius: '9999px', fontSize: '0.65rem' }}>LATENCY: 142ms</span>
        </div>
      </div>
    )
  },
  {
    title: 'Automated Incident Report',
    category: 'Security Logs output',
    tech: 'HTML & JSON Logs',
    desc: 'HTML report generated dynamically by the parser script after assessing Linux syslogs for brute-force threats.',
    color: '#ffffff',
    content: (
      <div style={{ background: '#18181b', width: '100%', height: '220px', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem', color: '#ff6b6b' }}>
          <span>⚠️ BRUTE_FORCE TRIGGERED</span>
          <span>MITRE T1110</span>
        </div>
        <div>[LOG SOURCE] Linux /var/log/auth.log</div>
        <div>[PATTERN MATCH] 14 failed root ssh connections in 8 seconds</div>
        <div style={{ color: '#ff6b6b' }}>[SOURCE IP] 185.220.101.44 (Tor exit node)</div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.04)', borderRadius: '9999px', fontSize: '0.65rem' }}>REPORT ID: #4489</span>
          <span style={{ padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.04)', borderRadius: '9999px', fontSize: '0.65rem' }}>SEVERITY: HIGH</span>
        </div>
      </div>
    )
  },
  {
    title: 'SAFEपथ Emergency SOS flow',
    category: 'Mobile PWA mockups',
    tech: 'React, Leaflet',
    desc: 'The emergency SOS sequence layout showing the client-side countdown window before coordinates broadcast.',
    color: '#ffffff',
    content: (
      <div style={{ background: '#09090b', width: '100%', height: '220px', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>SOS DISPATCH COUNTDOWN</div>
        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#ffffff', lineHeight: 1, fontFamily: 'var(--font-display)' }}>03</div>
        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>Broadcasting location coordinates to family and emergency authorities in 3 seconds...</div>
      </div>
    )
  },
  {
    title: 'JARVIS Voice Interface',
    category: 'Desktop Assistant Mock',
    tech: 'SQLite, Web Audio API',
    desc: 'The assistant active wave status monitor displaying voice threshold inputs and backend JSON parsing.',
    color: '#ffffff',
    content: (
      <div style={{ background: '#070708', width: '100%', height: '220px', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          <span>JARVIS_SYSTEM_ACTIVE</span>
          <span>LISTENING</span>
        </div>
        {/* Animated equalizer waves */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', height: '50px', justifyContent: 'center', margin: 'auto 0' }}>
          {[30, 80, 45, 95, 60, 85, 30, 50, 90, 40].map((h, idx) => (
            <div key={idx} style={{ width: '4px', height: `${h}%`, background: '#ffffff', opacity: 0.6, borderRadius: '2px', animation: 'wave-height 1.2s ease-in-out infinite alternate', animationDelay: `${idx * 0.1}s` }} />
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          "Check logs in Linux server auth.log"
        </div>
      </div>
    )
  }
];

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % ITEMS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + ITEMS.length) % ITEMS.length);
  };

  const getRelativeIndex = (index: number) => {
    const len = ITEMS.length;
    let diff = index - activeIdx;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    return diff;
  };

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 6rem', background: 'var(--bg)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Asymmetrical Editorial Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '5rem', alignItems: 'start' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              // Asset Catalog
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', fontFamily: 'var(--font-display)', margin: 0 }}>
              Asset Archives
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '1.25rem' }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: 'var(--font-sans)', fontWeight: 400, margin: 0 }}>
              Visual mockups, voice system equalizers, and security parser logs generated by my application pipelines.
            </p>

            {/* View Mode Toggle */}
            <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: '0.3rem', borderRadius: '9999px', width: 'fit-content' }}>
              <button 
                onClick={() => setViewMode('carousel')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.4rem 1.2rem', borderRadius: '9999px',
                  background: viewMode === 'carousel' ? '#ffffff' : 'transparent',
                  color: viewMode === 'carousel' ? '#070708' : 'var(--text-muted)',
                  border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <Sparkles size={13} /> Cinematic Slider
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.4rem 1.2rem', borderRadius: '9999px',
                  background: viewMode === 'grid' ? '#ffffff' : 'transparent',
                  color: viewMode === 'grid' ? '#070708' : 'var(--text-muted)',
                  border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <LayoutGrid size={13} /> Grid Index
              </button>
            </div>
          </motion.div>
        </div>

        {/* View Mode Display */}
        <div style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          <AnimatePresence mode="wait">
            {viewMode === 'carousel' ? (
              
              /* Cinematic 3D Deck Carousel */
              <motion.div 
                key="carousel-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem' }}
              >
                {/* 3D Perspective Card Arena */}
                <div style={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: '520px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  perspective: '1200px',
                  transformStyle: 'preserve-3d'
                }}>
                  {ITEMS.map((item, idx) => {
                    const diff = getRelativeIndex(idx);
                    const isActive = diff === 0;
                    
                    return (
                      <motion.div
                        key={idx}
                        style={{
                          ...cardStyle,
                          position: 'absolute',
                          width: '100%',
                          maxWidth: '540px',
                          zIndex: 100 - Math.abs(diff),
                          pointerEvents: isActive ? 'auto' : 'none',
                          cursor: 'pointer'
                        }}
                        animate={{
                          x: diff * 280,
                          scale: isActive ? 1 : 0.85,
                          rotateY: diff * -18,
                          opacity: Math.abs(diff) > 1 ? 0 : (isActive ? 1 : 0.45),
                          z: isActive ? 0 : -150
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => {
                          if (!isActive) setActiveIdx(idx);
                        }}
                      >
                        {/* Canvas Mock */}
                        <div style={{ marginBottom: '2rem' }}>
                          {item.content}
                        </div>

                        {/* Card Info */}
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              {item.category}
                            </span>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                              0{idx + 1}
                            </span>
                          </div>

                          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)', margin: '0 0 0.75rem' }}>
                            {item.title}
                          </h3>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
                            {item.desc}
                          </p>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '1rem' }}>
                            SYSTEMS : {item.tech}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Controller Indicators */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                  <button 
                    onClick={handlePrev}
                    style={{
                      width: '44px', height: '44px', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                      color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'; }}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Progress Line Dot Indicators */}
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    {ITEMS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        style={{
                          width: idx === activeIdx ? '28px' : '6px',
                          height: '6px',
                          borderRadius: '9999px',
                          background: idx === activeIdx ? '#ffffff' : 'rgba(255,255,255,0.15)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />
                    ))}
                  </div>

                  <button 
                    onClick={handleNext}
                    style={{
                      width: '44px', height: '44px', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                      color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'; }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

              </motion.div>
            ) : (
              
              /* Editorial Grid Archive */
              <motion.div 
                key="grid-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                  {ITEMS.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                      style={{ ...cardStyle }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)'; }}
                    >
                      {/* Image Canvas Mock */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        {item.content}
                      </div>

                      {/* Meta */}
                      <div>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
                          {item.category}
                        </span>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: '0.35rem', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>
                          {item.title}
                        </h2>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                          {item.desc}
                        </p>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '1.25rem', fontFamily: 'var(--font-mono)', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '1rem' }}>
                          SYSTEMS : {item.tech}
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
