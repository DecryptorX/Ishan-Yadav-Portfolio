"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, animate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useModal } from '../context/modal';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { HeroGlitchTitle } from './HeroGlitchTitle';const DEFAULT_CYCLE = ['Secure Software Engineer', 'Backend Developer', 'Cybersecurity Engineer', 'AI Builder'];

const STATS = [
  { end: 4, suffix: '+', label: 'Projects Built' },
  { end: 5, suffix: '+', label: 'Certifications' },
  { end: 2028, suffix: '', label: 'Graduation Year' },
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const ctrl = animate(0, end, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return ctrl.stop;
  }, [end]);
  const display = suffix === '' && end > 2000 ? val.toString() : val.toLocaleString();
  return <>{display}{suffix}</>;
}

export default function Hero() {
  const { openModal } = useModal();
  const [idx, setIdx] = useState(0);
  const [heroData, setHeroData] = useState<any>(null);
  const [cycleList, setCycleList] = useState<string[]>(DEFAULT_CYCLE);

  // Mouse spotlight tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    fetch('/api/content/hero')
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          setHeroData(data);
          if (data.roles) {
            setCycleList(data.roles.split(',').map((r: string) => r.trim()).filter(Boolean));
          }
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (cycleList.length === 0) return;
    const t = setInterval(() => setIdx(i => (i + 1) % cycleList.length), 3000);
    return () => clearInterval(t);
  }, [cycleList]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 300;
    const y = e.clientY - rect.top - 300;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="home" 
      className="hero-section-root"
    >
      {/* Volumetric cursor-tracking spotlight */}
      <motion.div 
        aria-hidden
        style={{ 
          position: 'absolute', 
          width: 800, 
          height: 800, 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.04) 0%, rgba(255, 255, 255, 0.015) 30%, transparent 60%)', 
          filter: 'blur(80px)', 
          pointerEvents: 'none',
          left: springX,
          top: springY,
          zIndex: 1
        }} 
      />

      {/* Layered background mesh gradients */}
      <div 
        aria-hidden 
        style={{ 
          position: 'absolute', 
          top: '15%', 
          left: '5%', 
          width: 700, 
          height: 700, 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.015) 0%, transparent 60%)', 
          filter: 'blur(100px)', 
          pointerEvents: 'none',
          animation: 'mesh-float-slow 30s infinite ease-in-out'
        }} 
      />
      <div 
        aria-hidden 
        style={{ 
          position: 'absolute', 
          bottom: '10%', 
          right: '10%', 
          width: 500, 
          height: 500, 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.01) 0%, transparent 60%)', 
          filter: 'blur(80px)', 
          pointerEvents: 'none',
          animation: 'mesh-float-slow 25s infinite ease-in-out reverse'
        }} 
      />

      <div style={{ width: '90vw', maxWidth: 'none', margin: '0 auto', position: 'relative', zIndex: 2 }} className="slide-content-container">
        <div className="hero-grid-main">
          
          {/* LEFT: Text & Branding statements */}
          <div>
            {/* Status indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} 
              style={{ marginBottom: '3.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
            >
              <span style={{
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.5rem 1.25rem', 
                borderRadius: 999,
                border: '1px solid rgba(52, 211, 153, 0.15)', 
                background: 'rgba(52, 211, 153, 0.05)',
                color: 'var(--accent-emerald)', 
                fontSize: '0.75rem', 
                fontFamily: 'var(--font-mono)',
                fontWeight: 500, 
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-emerald)', display: 'inline-block', animation: 'blink 2s infinite' }} />
                Open to Work
              </span>
              <span style={{
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.5rem 1.25rem', 
                borderRadius: 999,
                border: '1px solid rgba(255, 255, 255, 0.04)', 
                background: 'rgba(255, 255, 255, 0.01)',
                color: 'var(--text-muted)', 
                fontSize: '0.75rem', 
                fontFamily: 'var(--font-mono)',
                fontWeight: 500, 
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                Gurgaon, IN
              </span>
            </motion.div>
 
            {/* Massive typography — Name */}
            <HeroGlitchTitle 
              text="ISHAN YADAV"
              className="hero-name-heading"
              style={{ 
                fontSize: 'clamp(2.8rem, 6.5vw, 6.2rem)', 
                fontWeight: 900, 
                color: '#ffffff', 
                lineHeight: 1.0, 
                letterSpacing: '-0.04em', 
                margin: '0 0 2rem 0',
                textTransform: 'uppercase',
              }}
            />
 
            {/* Animated role transition */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', height: 40, marginBottom: '2.5rem' }}
            >
              {/* Fixed emerald accent line */}
              <span style={{ 
                width: 24, 
                height: 1, 
                background: 'var(--accent-emerald)',
                display: 'inline-block',
                flexShrink: 0
              }} />
 
              {/* Text cycling container */}
              <div style={{ height: '100%', position: 'relative', overflow: 'hidden', flexGrow: 1 }}>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={cycleList[idx]}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute', 
                      top: 0, 
                      left: 0,
                      fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', 
                      fontWeight: 400,
                      fontStyle: 'italic',
                      fontFamily: 'var(--font-editorial)',
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {cycleList[idx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
 
            {/* Bio */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              style={{ 
                fontSize: '1rem', 
                color: 'var(--text-muted)', 
                maxWidth: 750, 
                lineHeight: 1.8, 
                marginBottom: '3.5rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 400 
              }}
            >
              {heroData?.bio || 'Computer Science student at Bennett University building secure, scalable software. Currently leading backend development and cybersecurity at a startup co-founded with close friends.'}
            </motion.p>
 
            {/* Action buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '4rem' }}
            >
              <button onClick={openModal} className="btn-primary">
                Curriculum Vitae
              </button>
              <a 
                href="https://github.com/DecryptorX" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary"
              >
                GitHub Profile
              </a>
              <Link href="/dashboard" className="btn-ghost">
                Analytics
              </Link>
            </motion.div>
 
            {/* Counters Row */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1.2, delay: 0.8 }}
              style={{ display: 'flex', gap: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}
            >
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.03em', fontFamily: 'var(--font-display)' }}>
                    <Counter end={s.end} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', marginTop: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
 
          {/* RIGHT: Sophisticated Asymmetric Portrait */}
          <motion.div 
            initial={{ opacity: 0, y: 0, scale: 0.95 }} 
            animate={{ opacity: 1, y: -60, scale: 1 }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            style={{ justifySelf: 'center', position: 'relative' }}
          >
            {/* Ambient glow backing */}
            <div style={{
              position: 'absolute',
              inset: '-20%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(52, 211, 153, 0.04) 0%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: -1,
              animation: 'glow-pulse 6s infinite ease-in-out'
            }} />
 
            <PremiumPortrait 
              avatarUrl={heroData?.avatarUrl || "/profile-ishan-v2.jpg"} 
              title={heroData?.title || "Ishan Yadav"} 
            />
 
            {/* Floating badge */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: '-1.5rem',
                background: 'rgba(5, 5, 6, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(52, 211, 153, 0.1)',
                padding: '0.5rem 1.2rem',
                borderRadius: '9999px',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-emerald)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-emerald)', animation: 'blink 2s infinite' }} />
              Building Secure Solutions
            </motion.div>
          </motion.div>
 
        </div>
      </div>
 
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 5
        }}
      >
        <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} color="var(--text-subtle)" />
        </motion.div>
      </motion.div>
 
      <style>{`
        .hero-name-heading {
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .hero-name-heading {
            white-space: normal !important;
          }
        }
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center;
          }
          .hero-grid > div:last-child {
            order: -1;
          }
          .hero-grid > div:first-child > div {
            justify-content: center;
          }
        }
        @media (max-width: 640px) {
          #home { padding: 5rem 1.25rem 3rem !important; }
        }
      `}</style>
    </section>
  );
}function PremiumPortrait({ avatarUrl, title }: { avatarUrl: string; title: string }) {
  const [mousePos, setMousePos] = useState({ x: 150, y: 150, isHovering: false });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true
    });
  };
  
  const handleMouseLeave = () => {
    setMousePos(prev => ({ ...prev, isHovering: false }));
  };
  
  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: 300,
        height: 300,
        borderRadius: '50%',
        padding: 1,
        background: 'linear-gradient(160deg, rgba(52, 211, 153, 0.25) 0%, rgba(255,255,255,0.04) 50%, rgba(52, 211, 153, 0.1) 100%)',
        boxShadow: '0 40px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
        animation: 'float-gentle 10s infinite ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none'
      }}
    >
      {/* Base Layer: Dotted Halftone Background */}
      <div className="halftone-dots" style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', opacity: 0.25 }} />
      
      {/* Grain Layer */}
      <div className="noise-overlay" style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }} />
 
      {/* Emerald Edge Glow Border Shadow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        border: '1.5px solid rgba(52, 211, 153, 0.25)',
        boxShadow: 'inset 0 0 20px rgba(52, 211, 153, 0.15)',
        pointerEvents: 'none',
        zIndex: 5
      }} />
 
      {/* Base grayscale blurred image */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 1 }}>
        <Image
          src={avatarUrl}
          alt={title}
          width={300}
          height={300}
          priority
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            filter: 'grayscale(100%) contrast(0.9) opacity(0.35) blur(3px)',
            transition: 'filter 0.3s ease'
          }}
        />
      </div>
 
      {/* Top full-color masked image */}
      <div style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        inset: 0, 
        zIndex: 2,
        opacity: mousePos.isHovering ? 1 : 0,
        transition: 'opacity 0.4s ease',
        WebkitMaskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
        maskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`
      }}>
        <Image
          src={avatarUrl}
          alt={title}
          width={300}
          height={300}
          priority
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            filter: 'contrast(1.15) saturate(1.1)'
          }}
        />
      </div>
    </div>
  );
}
