"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../context/modal';
import Image from 'next/image';
import Link from 'next/link';
import MagneticButton from './MagneticButton';
import { Shield, Sparkles, Terminal, FileText, ChevronDown } from 'lucide-react';

const ROLES = [
  'Backend Developer',
  'Cybersecurity Specialist',
  'Full Stack Engineer',
  'Startup Co-Founder'
];

const BACKGROUND_WORDS = [
  { text: 'DEVELOPER', top: '15%', left: '8%', speed: 0.02 },
  { text: 'CYBER', top: '25%', left: '65%', speed: -0.015 },
  { text: 'BACKEND', top: '70%', left: '12%', speed: 0.025 },
  { text: 'SECURITY', top: '80%', left: '60%', speed: -0.01 }
];

export default function Hero() {
  const { openModal } = useModal();
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Roles cycle
  useEffect(() => {
    const t = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  // Track mouse coordinates for spotlight
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouseCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Profile Card 3D tilt calculation
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Max 10 degrees tilt rotation
    setTilt({
      x: (x / (rect.width / 2)) * 10,
      y: -(y / (rect.height / 2)) * 10
    });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '6rem 1.5rem 4rem',
        background: '#09090b',
        // Inject mouse coordinates as CSS custom properties for GPU composition
        '--mouse-x': `${mouseCoords.x}px`,
        '--mouse-y': `${mouseCoords.y}px`
      } as React.CSSProperties}
    >
      {/* 1. GPU-ACCELERATED FLUID SPOTLIGHT GLOW MESH OVERLAY */}
      {!isMobile && (
        <div 
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(550px circle at var(--mouse-x) var(--mouse-y), rgba(0, 255, 136, 0.06), transparent 75%)',
            zIndex: 1,
            mixBlendMode: 'screen',
            transition: 'background 0.05s linear'
          }}
        />
      )}

      {/* 2. REVEALED BACKGROUND GRID LINES (Shows textures under cursor spotlight) */}
      <div 
        aria-hidden
        className="revealed-grid"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0, 255, 136, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.02) 1px, transparent 1px)',
          backgroundSize: '45px 45px',
          zIndex: 0,
          opacity: 0.8,
          maskImage: isMobile 
            ? 'radial-gradient(circle at 50% 50%, black 30%, transparent 100%)'
            : 'radial-gradient(280px circle at var(--mouse-x) var(--mouse-y), black 10%, transparent 80%)',
          WebkitMaskImage: isMobile
            ? 'radial-gradient(circle at 50% 50%, black 30%, transparent 100%)'
            : 'radial-gradient(280px circle at var(--mouse-x) var(--mouse-y), black 10%, transparent 80%)',
          transition: 'mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out'
        }}
      />

      {/* 3. PARALLAX BACKDROP DECORATIVE TEXT */}
      {!isMobile && (
        <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          {BACKGROUND_WORDS.map((w) => {
            // Apply slight displacement relative to mouse center
            const dx = (mouseCoords.x - (containerRef.current?.offsetWidth || 1000) / 2) * w.speed;
            const dy = (mouseCoords.y - (containerRef.current?.offsetHeight || 800) / 2) * w.speed;
            return (
              <motion.div
                key={w.text}
                animate={{ x: dx, y: dy }}
                transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                style={{
                  position: 'absolute',
                  top: w.top,
                  left: w.left,
                  fontSize: 'clamp(3rem, 10vw, 7.5rem)',
                  fontWeight: 900,
                  color: 'rgba(255, 255, 255, 0.015)',
                  WebkitTextStroke: '1px rgba(0, 255, 136, 0.025)',
                  letterSpacing: '0.15em',
                  fontFamily: 'monospace',
                  userSelect: 'none'
                }}
              >
                {w.text}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 4. MAIN HERO BODY GRID */}
      <div 
        style={{
          maxWidth: 1100,
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}
      >
        
        {/* LEFT COLUMN: Texts + Dynamic typographies + CTA Actions */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Cyber secure status indicator badge */}
          <motion.div 
            initial={{ opacity: 0, filter: 'blur(6px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.35rem 0.9rem', borderRadius: '9999px',
              border: '1px solid rgba(0, 255, 136, 0.2)', background: 'rgba(0, 255, 136, 0.03)',
              color: '#00ff88', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
              boxShadow: '0 0 10px rgba(0, 255, 136, 0.05)'
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88', display: 'inline-block', animation: 'hero-status-pulse 2s infinite' }} />
              Active Telemetry Pipeline
            </span>
          </motion.div>

          {/* Headline Name */}
          <motion.h1
            initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              marginBottom: '1.25rem'
            }}
          >
            Hi, I&apos;m <span style={{ background: 'linear-gradient(135deg, #00ff88 0%, #00e5ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textShadow: '0 0 30px rgba(0,255,136,0.05)' }}>Ishan Yadav</span>
          </motion.h1>

          {/* Dynamic role rotating display */}
          <div style={{ marginBottom: '1.75rem', height: 36, display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginRight: '0.5rem' }}>
              Specialized as
            </span>
            <div style={{ position: 'relative', flex: 1, height: '100%', display: 'flex', alignItems: 'center' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
                    fontWeight: 800,
                    color: '#00ff88',
                    textShadow: '0 0 10px rgba(0, 255, 136, 0.25)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Subheading description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '0.94rem',
              color: 'rgba(148, 163, 184, 0.75)',
              lineHeight: 1.7,
              maxWidth: 480,
              marginBottom: '2.5rem'
            }}
          >
            Developing secure-by-default software, exploring deep backend scaling pipelines, and managing community computing as social lead at Bennett University ACM.
          </motion.p>

          {/* CTA Action Buttons Group */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2.5rem' }}
          >
            {/* Primary: View Projects */}
            <MagneticButton>
              <Link 
                href="/projects" 
                style={{
                  padding: '0.75rem 1.6rem',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  background: '#00ff88',
                  color: '#000',
                  border: 'none',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 20px rgba(0,255,136,0.3)',
                  transition: 'all 0.25s'
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 25px rgba(0,255,136,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,255,136,0.3)'; }}
              >
                View Projects ↗
              </Link>
            </MagneticButton>

            {/* Secondary: My Journey */}
            <MagneticButton>
              <Link 
                href="/journey"
                style={{
                  padding: '0.75rem 1.6rem',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  background: 'rgba(0, 229, 255, 0.05)',
                  color: '#00e5ff',
                  border: '1px solid rgba(0, 229, 255, 0.25)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 0 15px rgba(0, 229, 255, 0.05)',
                  transition: 'all 0.25s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 229, 255, 0.12)'; e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0, 229, 255, 0.05)'; e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.25)'; }}
              >
                My Journey 🧭
              </Link>
            </MagneticButton>

            {/* Ghost: Download Resume */}
            <MagneticButton>
              <button 
                onClick={openModal}
                style={{
                  padding: '0.75rem 1.6rem',
                  borderRadius: '9999px',
                  fontWeight: 750,
                  fontSize: '0.85rem',
                  background: 'transparent',
                  color: 'rgba(226, 232, 240, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.25s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = 'rgba(226, 232, 240, 0.75)'; }}
              >
                <FileText size={14} />
                CV Resume
              </button>
            </MagneticButton>
          </motion.div>

          {/* Live mini-terminal telemetry panel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              background: 'rgba(10, 10, 10, 0.6)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              borderRadius: '0.75rem',
              padding: '1rem',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: 'rgba(255,255,255,0.4)',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00ff88', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 800 }}>
              <Terminal size={14} /> LIVE_TELEMETRY // IN_BUILD
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '0.35rem' }}>
              <div>FOCUS:</div>
              <div style={{ color: '#f1f5f9' }}>Startup Scaling & Security Audits</div>
              <div>ACADEMICS:</div>
              <div style={{ color: '#f1f5f9' }}>B.Tech CSE @ Bennett University</div>
              <div>STACK:</div>
              <div style={{ color: '#00e5ff' }}>TS / Python / Go / Next.js / Mongo</div>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: 3D-Tilt interactive glass profile details card */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              perspective: 1000,
              transformStyle: 'preserve-3d',
              width: '100%',
              maxWidth: '340px'
            }}
          >
            <motion.div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              animate={{ rotateX: tilt.y, rotateY: tilt.x }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              style={{
                background: 'rgba(15, 15, 20, 0.8)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(0, 255, 136, 0.15)',
                borderRadius: '1.5rem',
                padding: '2rem 1.75rem',
                boxShadow: '0 25px 55px rgba(0, 0, 0, 0.55), 0 0 35px rgba(0, 255, 136, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
              whileHover={{ borderColor: 'rgba(0, 255, 136, 0.35)' }}
            >
              {/* Corner decorative light streak */}
              <div aria-hidden style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(0, 255, 136, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Glowing Avatar frame */}
              <div style={{
                width: 140, height: 140, borderRadius: '50%', position: 'relative',
                background: 'conic-gradient(from 0deg, #00ff88, #00e5ff, #00ff88)',
                padding: '3px',
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.35), 0 0 20px rgba(0, 255, 136, 0.1)',
                marginBottom: '1.25rem',
                animation: 'floating-avatar 4.5s ease-in-out infinite'
              }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(0,255,136,0.1)' }}>
                  <Image
                    src="/profile-ishan-v2.jpg"
                    alt="Ishan Yadav"
                    width={134}
                    height={134}
                    priority
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>

              {/* Bio info */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 850, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
                Ishan Yadav
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#00ff88', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
                @DecryptorX
              </p>

              <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '1.25rem' }} />

              {/* Stats & location checklist */}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Status:</span>
                  <span style={{ color: '#00ff88', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00ff88', display: 'inline-block', animation: 'hero-status-pulse 1.5s infinite' }} />
                    Available for Audits
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Location:</span>
                  <span style={{ color: '#f1f5f9', fontWeight: 650 }}>Gurgaon, IN</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>GitHub Followers:</span>
                  <span style={{ color: '#00e5ff', fontWeight: 750 }}>38 Connections</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Core Focus:</span>
                  <span style={{ color: '#f1f5f9', fontWeight: 650 }}>SOC Operations &amp; Dev</span>
                </div>
              </div>

              {/* Small SVG Quick Badges */}
              <div style={{ display: 'flex', gap: '0.45rem', marginTop: '1.5rem' }}>
                {[
                  { href: 'https://github.com/DecryptorX', path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
                  { href: 'https://www.linkedin.com/in/ishan-yadav-a22251325', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4' }
                ].map((l, i) => (
                  <a 
                    key={i} 
                    href={l.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.6)', transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#00ff88'; e.currentTarget.style.color = '#00ff88'; e.currentTarget.style.background = 'rgba(0,255,136,0.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d={l.path} />
                    </svg>
                  </a>
                ))}
              </div>

            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* 5. ANIMATED BOTTOM SCROLL TO EXPLORE INDICATOR */}
      <div 
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: 700,
          fontFamily: 'monospace',
          pointerEvents: 'none',
          zIndex: 2
        }}
      >
        <span>Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ display: 'flex', color: '#00ff88' }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </div>

      <style>{`
        @keyframes hero-status-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.8); opacity: 0.45; }
        }
        @keyframes floating-avatar {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(0.98); }
        }
      `}</style>
    </section>
  );
}
