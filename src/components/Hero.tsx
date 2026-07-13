"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/modal';
import Image from 'next/image';
import Link from 'next/link';
import MagneticButton from './MagneticButton';
import { FileText, MapPin } from 'lucide-react';

// GitHub / LinkedIn brand marks as inline SVGs (matches the rest of the codebase).
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Green is used sparingly as a single accent, not the primary color.
const ACCENT = '#00ff88';

// Almost-invisible backdrop typography — reduced opacity + scale.
const BACKGROUND_WORDS = [
  { text: 'BACKEND', top: '18%', left: '6%' },
  { text: 'SECURITY', top: '68%', left: '58%' },
];

// Shared entrance: gentle fade + blur + subtle translate (no bounce, no scale).
const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export default function Hero() {
  const { openModal } = useModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track mouse coordinates for the subtle spotlight
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouseCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '7rem 1.5rem 5rem',
        background: '#09090b',
        '--mouse-x': `${mouseCoords.x}px`,
        '--mouse-y': `${mouseCoords.y}px`,
      } as React.CSSProperties}
    >
      {/* Subtle spotlight glow that follows the cursor */}
      {!isMobile && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(0, 255, 136, 0.035), transparent 70%)',
            zIndex: 1,
            transition: 'background 0.1s linear',
          }}
        />
      )}

      {/* Faint background grid, revealed softly under the cursor */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          zIndex: 0,
          maskImage: isMobile
            ? 'radial-gradient(circle at 50% 40%, black 20%, transparent 90%)'
            : 'radial-gradient(340px circle at var(--mouse-x) var(--mouse-y), black 5%, transparent 80%)',
          WebkitMaskImage: isMobile
            ? 'radial-gradient(circle at 50% 40%, black 20%, transparent 90%)'
            : 'radial-gradient(340px circle at var(--mouse-x) var(--mouse-y), black 5%, transparent 80%)',
          transition: 'mask-image 0.15s ease-out, -webkit-mask-image 0.15s ease-out',
        }}
      />

      {/* Almost-invisible decorative backdrop words */}
      {!isMobile && (
        <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          {BACKGROUND_WORDS.map((w) => (
            <div
              key={w.text}
              style={{
                position: 'absolute',
                top: w.top,
                left: w.left,
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                fontWeight: 800,
                color: 'rgba(255, 255, 255, 0.012)',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.015)',
                letterSpacing: '0.12em',
                fontFamily: 'monospace',
                userSelect: 'none',
              }}
            >
              {w.text}
            </div>
          ))}
        </div>
      )}

      {/* Main hero grid — balanced columns, generous gap */}
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.09, delayChildren: 0.05 }}
        style={{
          maxWidth: 1120,
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr',
          gap: isMobile ? '3.5rem' : '5rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* LEFT COLUMN — identity + actions */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Availability eyebrow — minimal, low glow */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ marginBottom: '2rem' }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(226, 232, 240, 0.55)',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: ACCENT,
                  boxShadow: `0 0 8px ${ACCENT}`,
                  display: 'inline-block',
                  animation: 'hero-status-pulse 2.4s infinite',
                }}
              />
              Available for work
            </span>
          </motion.div>

          {/* Name — clean single-line hierarchy, no "Hi, I'm" */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              fontSize: 'clamp(2.6rem, 6vw, 4rem)',
              fontWeight: 700,
              color: '#fafafa',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            Ishan Yadav
          </motion.h1>

          {/* Role line — accent used only for the separator */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              marginTop: '1rem',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              fontWeight: 500,
              letterSpacing: '0.02em',
              color: 'rgba(226, 232, 240, 0.75)',
            }}
          >
            Backend Engineer <span style={{ color: ACCENT, margin: '0 0.5rem' }}>·</span> Cybersecurity
          </motion.p>

          {/* Description — natural, max three lines */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              marginTop: '1.75rem',
              fontSize: '1rem',
              color: 'rgba(148, 163, 184, 0.8)',
              lineHeight: 1.75,
              maxWidth: 480,
            }}
          >
            Building secure backend systems, AI-powered products, and scalable web
            experiences while exploring modern cybersecurity.
          </motion.p>

          {/* CTA buttons — smaller, softer glow, thin borders */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2.5rem' }}
          >
            {/* Primary: Projects */}
            <MagneticButton>
              <Link
                href="/projects"
                style={{
                  padding: '0.6rem 1.35rem',
                  borderRadius: '0.6rem',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  background: ACCENT,
                  color: '#04160d',
                  border: 'none',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 2px 12px rgba(0,255,136,0.15)',
                  transition: 'box-shadow 0.25s, transform 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,255,136,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,255,136,0.15)';
                }}
              >
                Projects
              </Link>
            </MagneticButton>

            {/* Secondary: Journey */}
            <MagneticButton>
              <Link
                href="/journey"
                style={{
                  padding: '0.6rem 1.35rem',
                  borderRadius: '0.6rem',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  color: 'rgba(226, 232, 240, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                Journey
              </Link>
            </MagneticButton>

            {/* Ghost: Resume */}
            <MagneticButton>
              <button
                onClick={openModal}
                style={{
                  padding: '0.6rem 1.35rem',
                  borderRadius: '0.6rem',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  background: 'transparent',
                  color: 'rgba(148, 163, 184, 0.8)',
                  border: '1px solid transparent',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fafafa';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(148, 163, 184, 0.8)';
                }}
              >
                <FileText size={14} />
                Resume
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* RIGHT COLUMN — premium developer ID card */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end' }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 320,
              background: 'rgba(255, 255, 255, 0.025)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              borderRadius: '1.25rem',
              padding: '1.75rem',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
              position: 'relative',
            }}
          >
            {/* Header row — avatar + name + role */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '0.9rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/profile-ishan-v2.jpg"
                  alt="Ishan Yadav"
                  width={64}
                  height={64}
                  priority
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 650,
                    color: '#fafafa',
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  Ishan Yadav
                </h3>
                <p
                  style={{
                    fontSize: '0.78rem',
                    color: 'rgba(148, 163, 184, 0.8)',
                    margin: '0.2rem 0 0',
                  }}
                >
                  Backend Engineer · Cybersecurity
                </p>
              </div>
            </div>

            <div style={{ height: 1, background: 'rgba(255, 255, 255, 0.06)', margin: '1.5rem 0' }} />

            {/* Details — only the essentials */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: 'rgba(148,163,184,0.7)' }}>
                  <MapPin size={13} /> Location
                </span>
                <span style={{ color: 'rgba(226,232,240,0.85)', fontWeight: 500 }}>Gurgaon, IN</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(148,163,184,0.7)' }}>Availability</span>
                <span style={{ color: ACCENT, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: ACCENT,
                      display: 'inline-block',
                      animation: 'hero-status-pulse 2s infinite',
                    }}
                  />
                  Open to work
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ color: 'rgba(148,163,184,0.7)', flexShrink: 0 }}>Current focus</span>
                <span style={{ color: 'rgba(226,232,240,0.85)', fontWeight: 500, textAlign: 'right' }}>
                  Secure backend &amp; SOC
                </span>
              </div>
            </div>

            <div style={{ height: 1, background: 'rgba(255, 255, 255, 0.06)', margin: '1.5rem 0' }} />

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                { href: 'https://github.com/DecryptorX', label: 'GitHub', Icon: GithubIcon },
                { href: 'https://www.linkedin.com/in/ishan-yadav-a22251325', label: 'LinkedIn', Icon: LinkedinIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '0.55rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    color: 'rgba(226,232,240,0.7)',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                    e.currentTarget.style.color = '#fafafa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.color = 'rgba(226,232,240,0.7)';
                  }}
                >
                  <Icon />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes hero-status-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
