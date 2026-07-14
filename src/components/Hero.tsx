"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, animate, useMotionValue, useSpring } from 'framer-motion';
import { useModal } from '../context/modal';
import Image from 'next/image';
import Link from 'next/link';

const DEFAULT_CYCLE = ['Cybersecurity Specialist', 'SOC Analyst Intern', 'Software Developer', 'Startup Co-Founder'];

const STATS = [
  { end: 4, suffix: '+', label: 'Projects Built' },
  { end: 5, suffix: '+', label: 'Certifications' },
  { end: 2028, suffix: '', label: 'Graduation Year' },
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const ctrl = animate(0, end, {
      duration: 1.8,
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
  
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

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
    const x = e.clientX - rect.left - 250; // Offset by half width of spotlight glow
    const y = e.clientY - rect.top - 250;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="home" 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        position: 'relative', 
        overflow: 'hidden', 
        padding: '8rem 2rem 4rem',
        background: 'var(--bg)'
      }}
    >
      {/* Volumetric cursor-tracking spotlight */}
      <motion.div 
        aria-hidden
        style={{ 
          position: 'absolute', 
          width: 500, 
          height: 500, 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.025) 0%, transparent 70%)', 
          filter: 'blur(50px)', 
          pointerEvents: 'none',
          left: springX,
          top: springY,
          zIndex: 1
        }} 
      />

      {/* Layered background mesh gradient */}
      <div 
        aria-hidden 
        style={{ 
          position: 'absolute', 
          top: '20%', 
          left: '10%', 
          width: 600, 
          height: 600, 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.015) 0%, transparent 65%)', 
          filter: 'blur(80px)', 
          pointerEvents: 'none',
          animation: 'mesh-float-slow 25s infinite ease-in-out'
        }} 
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* LEFT: Text & Branding statements */}
          <div>
            {/* Status indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              style={{ marginBottom: '2.5rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}
            >
              <span style={{
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.4rem',
                padding: '0.4rem 1rem', 
                borderRadius: 999,
                border: '1px solid rgba(255, 255, 255, 0.06)', 
                background: 'rgba(255, 255, 255, 0.02)',
                color: '#ffffff', 
                fontSize: '0.68rem', 
                fontFamily: 'var(--font-mono)',
                fontWeight: 500, 
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ffffff', display: 'inline-block', opacity: 0.8 }} />
                Startup Co-Founder
              </span>
              <span style={{
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.4rem',
                padding: '0.4rem 1rem', 
                borderRadius: 999,
                border: '1px solid rgba(255, 255, 255, 0.04)', 
                background: 'rgba(255, 255, 255, 0.01)',
                color: 'var(--text-muted)', 
                fontSize: '0.68rem', 
                fontFamily: 'var(--font-mono)',
                fontWeight: 500, 
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Gurgaon, IN
              </span>
            </motion.div>

            {/* Oversized typography with clip-path mask reveal */}
            <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
              <motion.h1 
                initial={{ y: '100%' }} 
                animate={{ y: 0 }} 
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{ 
                  fontSize: 'clamp(3rem, 7vw, 5.2rem)', 
                  fontWeight: 900, 
                  color: '#ffffff', 
                  lineHeight: 1.0, 
                  letterSpacing: '-0.05em', 
                  fontFamily: 'var(--font-display)' 
                }}
              >
                {heroData?.title || 'Ishan Yadav'}
              </motion.h1>
            </div>

            {/* Role transition details */}
            <div style={{ height: 36, position: 'relative', overflow: 'hidden', marginBottom: '2.5rem' }}>
              {cycleList.map((text, i) => (
                <motion.div 
                  key={text}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: i === idx ? '0%' : '-100%', opacity: i === idx ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute', 
                    top: 0, 
                    left: 0,
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)', 
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-editorial)',
                    color: 'var(--text-muted)'
                  }}
                >
                  {text}
                </motion.div>
              ))}
            </div>

            {/* Bio with slow fade */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{ 
                fontSize: '0.94rem', 
                color: 'var(--text-muted)', 
                maxWidth: 480, 
                lineHeight: 1.8, 
                marginBottom: '3rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 400 
              }}
            >
              {heroData?.bio || 'Computer Science student at Bennett University passionate about building secure, scalable software products. Currently leading backend development and cybersecurity at our startup co-founded with close friends.'}
            </motion.p>

            {/* Action buttons (Minimal, elegant, magnetic-style border glow) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}
            >
              <button 
                onClick={openModal} 
                style={{
                  padding: '0.8rem 2rem', 
                  borderRadius: '9999px', 
                  fontWeight: 650, 
                  fontSize: '0.85rem',
                  background: '#ffffff', 
                  color: '#070708', 
                  border: 'none',
                  boxShadow: '0 20px 40px rgba(255, 255, 255, 0.05)', 
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                  cursor: 'pointer'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 25px 45px rgba(255, 255, 255, 0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 255, 255, 0.05)'; }}
              >
                Curriculum Vitae
              </button>
              <a 
                href="https://github.com/DecryptorX" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  padding: '0.8rem 2rem', 
                  borderRadius: '9999px', 
                  fontWeight: 600, 
                  fontSize: '0.85rem',
                  background: 'rgba(255, 255, 255, 0.02)', 
                  color: '#ffffff', 
                  display: 'inline-block',
                  border: '1px solid rgba(255, 255, 255, 0.06)', 
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                  textDecoration: 'none'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'; }}
              >
                GitHub Profile
              </a>
              <Link 
                href="/dashboard" 
                style={{
                  padding: '0.8rem 2rem', 
                  borderRadius: '9999px', 
                  fontWeight: 600, 
                  fontSize: '0.85rem',
                  background: 'transparent', 
                  color: 'var(--text-muted)', 
                  display: 'inline-block',
                  border: '1px solid rgba(255, 255, 255, 0.03)', 
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                  textDecoration: 'none'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#ffffff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.03)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                Analytics
              </Link>
            </motion.div>

            {/* Counters Row - minimal style */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1, delay: 0.5 }}
              style={{ display: 'flex', gap: '3rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}
            >
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.03em', fontFamily: 'var(--font-display)' }}>
                    <Counter end={s.end} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Sophisticated Asymmetric Portrait Placement */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ justifySelf: 'center', position: 'relative' }}
          >
            {/* Soft Ambient Shadow backing */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '2rem',
              background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 80%)',
              filter: 'blur(30px)',
              zIndex: -1,
              transform: 'scale(1.1)'
            }} />

            {/* Editorial Frame Layout */}
            <div style={{
              width: 280,
              height: 380,
              borderRadius: '2rem',
              padding: 1,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
              animation: 'editorial-portrait-float 8s infinite ease-in-out',
              overflow: 'hidden'
            }}>
              <Image
                src={heroData?.avatarUrl || "/profile-ishan-v2.jpg"}
                alt={heroData?.title || "Ishan Yadav"}
                width={280}
                height={380}
                priority
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  display: 'block',
                  filter: 'grayscale(15%) contrast(105%) saturate(90%)'
                }}
              />
            </div>

            {/* Micro badges absolute positioning */}
            <div style={{
              position: 'absolute',
              bottom: '-1.5rem',
              right: '-1rem',
              background: 'rgba(7, 7, 8, 0.65)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.62rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
              display: 'flex',
              gap: '0.4rem',
              alignItems: 'center'
            }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff' }} />
              BUILDING SECURE SOLUTIONS
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @keyframes mesh-float-slow {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(-40px) scale(1.05); opacity: 0.4; }
        }
        @keyframes editorial-portrait-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        @media (max-width: 640px) {
          #home { padding: 7rem 1.25rem 3rem !important; }
        }
      `}</style>
    </section>
  );
}
