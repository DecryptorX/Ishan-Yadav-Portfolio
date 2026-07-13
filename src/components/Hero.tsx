"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../context/modal';
import Image from 'next/image';
import Link from 'next/link';
import MagneticButton from './MagneticButton';
import { FileText } from 'lucide-react';

// Green is used sparingly as a single accent, not the primary color.
const ACCENT = '#00ff88';

// Almost-invisible backdrop typography.
const BACKGROUND_WORDS = [
  { text: 'BACKEND', top: '18%', left: '5%' },
  { text: 'SECURITY', top: '70%', left: '56%' },
];

// Deterministic orbiting particles (no Math.random → no hydration mismatch).
// Each "satellite" orbits at its own radius/speed, breathes in-and-out, and fades.
const ORBIT_PARTICLES = [
  { angle: 0, radius: 172, size: 6, orbit: 28, breathe: 4.6, delay: 0.0, op: 0.9, dir: 1 },
  { angle: 45, radius: 205, size: 4, orbit: 36, breathe: 5.4, delay: 1.1, op: 0.65, dir: -1 },
  { angle: 90, radius: 158, size: 3, orbit: 24, breathe: 3.9, delay: 0.6, op: 0.55, dir: 1 },
  { angle: 135, radius: 214, size: 5, orbit: 42, breathe: 6.0, delay: 2.0, op: 0.8, dir: -1 },
  { angle: 180, radius: 184, size: 3, orbit: 31, breathe: 4.3, delay: 0.3, op: 0.5, dir: 1 },
  { angle: 225, radius: 226, size: 7, orbit: 48, breathe: 5.1, delay: 1.6, op: 0.85, dir: -1 },
  { angle: 270, radius: 166, size: 4, orbit: 27, breathe: 4.9, delay: 2.5, op: 0.6, dir: 1 },
  { angle: 315, radius: 208, size: 3, orbit: 39, breathe: 5.3, delay: 0.9, op: 0.5, dir: -1 },
];

// Shared entrance: gentle fade + blur + subtle translate (no bounce, no scale).
const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const PORTRAIT = 340; // px

export default function Hero() {
  const { openModal } = useModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouseCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Portrait tilt follows the cursor within its own bounds (max ~9°).
  const handlePortraitMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const py = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: px * 9, y: -py * 9 });
  };
  const handlePortraitLeave = () => setTilt({ x: 0, y: 0 });

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

      {/* Almost-invisible decorative backdrop words (~4% opacity) */}
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
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.02)',
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
          gridTemplateColumns: isMobile ? '1fr' : '1.05fr 0.95fr',
          gap: isMobile ? '4rem' : '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* LEFT COLUMN — identity + actions */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Availability eyebrow — minimal, low glow */}
          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: 'easeOut' }} style={{ marginBottom: '2rem' }}>
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

          {/* Name */}
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

          {/* Role line — accent only on the separator */}
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

          {/* Description */}
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

          {/* CTA buttons — consistent height, soft glow, thin borders */}
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
                  height: 44,
                  padding: '0 1.5rem',
                  borderRadius: '0.6rem',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  background: ACCENT,
                  color: '#04160d',
                  border: '1px solid transparent',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 2px 12px rgba(0,255,136,0.15)',
                  transition: 'box-shadow 0.25s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,255,136,0.25)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,255,136,0.15)'; }}
              >
                Projects
              </Link>
            </MagneticButton>

            {/* Secondary: Journey */}
            <MagneticButton>
              <Link
                href="/journey"
                style={{
                  height: 44,
                  padding: '0 1.5rem',
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
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
              >
                Journey
              </Link>
            </MagneticButton>

            {/* Ghost: Resume */}
            <MagneticButton>
              <button
                onClick={openModal}
                style={{
                  height: 44,
                  padding: '0 1.35rem',
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
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fafafa'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(148, 163, 184, 0.8)'; }}
              >
                <FileText size={14} />
                Resume
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* RIGHT COLUMN — large circular portrait with orbiting particles */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div
            onMouseMove={handlePortraitMove}
            onMouseLeave={handlePortraitLeave}
            style={{
              position: 'relative',
              width: PORTRAIT,
              height: PORTRAIT,
              maxWidth: '80vw',
              perspective: 1000,
            }}
          >
            {/* Soft outer glow */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: '-22%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,255,136,0.16) 0%, rgba(0,255,136,0.05) 40%, transparent 70%)',
                filter: 'blur(18px)',
                pointerEvents: 'none',
              }}
            />

            {/* Orbiting particle field — subtle cursor parallax */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                transform: `translate(${tilt.x * 0.9}px, ${-tilt.y * 0.9}px)`,
                transition: 'transform 0.3s ease-out',
                pointerEvents: 'none',
              }}
            >
              {ORBIT_PARTICLES.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ rotate: p.angle }}
                  animate={{ rotate: p.angle + 360 * p.dir }}
                  transition={{ duration: p.orbit, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 0,
                    height: 0,
                  }}
                >
                  <motion.span
                    animate={{ opacity: [p.op * 0.25, p.op, p.op * 0.25], x: [0, 7, 0] }}
                    transition={{ duration: p.breathe, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
                    style={{
                      position: 'absolute',
                      left: p.radius,
                      top: -p.size / 2,
                      width: p.size,
                      height: p.size,
                      borderRadius: '50%',
                      background: ACCENT,
                      boxShadow: `0 0 ${p.size + 4}px ${ACCENT}`,
                      willChange: 'transform, opacity',
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Floating + tilting portrait */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}
            >
              <motion.div
                animate={{ rotateX: tilt.y, rotateY: tilt.x }}
                transition={{ type: 'spring', stiffness: 150, damping: 18 }}
                style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}
              >
                {/* Outer ring */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: -14,
                    borderRadius: '50%',
                    border: '1px solid rgba(0, 255, 136, 0.28)',
                    boxShadow: '0 0 45px rgba(0, 255, 136, 0.15)',
                  }}
                />
                {/* Inner ring */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: -2,
                    borderRadius: '50%',
                    border: '2px solid rgba(0, 255, 136, 0.5)',
                    boxShadow: 'inset 0 0 20px rgba(0, 255, 136, 0.12), 0 0 25px rgba(0, 255, 136, 0.18)',
                  }}
                />
                {/* Image */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.55)',
                  }}
                >
                  <Image
                    src="/profile-ishan-v2.jpg"
                    alt="Ishan Yadav"
                    width={PORTRAIT}
                    height={PORTRAIT}
                    priority
                    sizes="340px"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </motion.div>
            </motion.div>
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
