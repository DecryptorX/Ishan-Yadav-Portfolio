"use client";
import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { useModal } from '../context/modal';
import Image from 'next/image';
import Link from 'next/link';

const CYCLE = ['Cybersecurity Specialist', 'SOC Analyst Intern', 'Software Developer', 'Startup Co-Founder'];

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

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % CYCLE.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', padding: '6.75rem 2rem 4rem' }}>

      {/* Ambient glassmorphic glow mesh */}
      <div aria-hidden style={{ position: 'absolute', top: '15%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 255, 136, 0.045) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '15%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 229, 255, 0.045) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>

        {/* LEFT: Text */}
        <div>
          {/* Status Badge */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.50rem', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.35rem 0.9rem', borderRadius: 999,
              border: '1px solid rgba(0, 255, 136, 0.15)', background: 'rgba(0, 255, 136, 0.03)',
              color: '#00ff88', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88', display: 'inline-block', animation: 'hpulse 2s ease-in-out infinite' }} />
              🟢 Building Startup
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.35rem 0.9rem', borderRadius: 999,
              border: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.02)',
              color: 'rgba(226, 232, 240, 0.65)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              Gurgaon, IN
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', fontWeight: 800, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: '1.25rem' }}>
            Ishan Yadav
          </motion.h1>

          {/* Cycling Roles */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginBottom: '1.5rem', height: 32, position: 'relative' }}>
            {CYCLE.map((text, i) => (
              <motion.span key={text}
                initial={false}
                animate={{ opacity: i === idx ? 1 : 0, y: i === idx ? 0 : -8 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  position: 'absolute', top: 0, left: 0,
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)', fontWeight: 800,
                  background: 'linear-gradient(135deg, #00ff88 0%, #00e5ff 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  whiteSpace: 'nowrap',
                }}>
                {text}
              </motion.span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontSize: '0.96rem', color: 'rgba(148, 163, 184, 0.85)', maxWidth: 540, lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Computer Science student at Bennett University passionate about building secure, scalable software products. Currently leading backend development and cybersecurity at our startup co-founded with close friends.
          </motion.p>

          {/* Actions */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '3.5rem' }}>
            <button onClick={openModal} style={{
              padding: '0.75rem 1.6rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.88rem',
              background: '#00ff88', color: '#000', border: 'none',
              boxShadow: '0 0 20px rgba(0,255,136,0.25)', transition: 'all 0.2s', cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,136,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,136,0.25)'; }}>
              Download CV
            </button>
            <a href="https://github.com/DecryptorX" target="_blank" rel="noopener noreferrer" style={{
              padding: '0.75rem 1.6rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.88rem',
              background: 'rgba(0, 229, 255, 0.1)', color: '#00e5ff', display: 'inline-block',
              border: '1px solid rgba(0, 229, 255, 0.25)', transition: 'all 0.2s', textDecoration: 'none'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 229, 255, 0.18)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0, 229, 255, 0.1)'; }}>
              GitHub Profile
            </a>
            <Link href="/dashboard" style={{
              padding: '0.75rem 1.6rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.88rem',
              background: 'transparent', color: 'rgba(226,232,240,0.85)', display: 'inline-block',
              border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s', textDecoration: 'none'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(226,232,240,0.85)'; }}>
              View Dashboard
            </Link>
          </motion.div>

          {/* Counters Row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            style={{ display: 'flex', gap: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {STATS.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '1.75rem', fontWeight: 850, color: '#00ff88', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  <Counter end={s.end} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(148,163,184,0.6)', marginTop: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 700 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Floating Avatar */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', justifySelf: 'center', flexShrink: 0 }}>

          <div style={{
            width: 220, height: 220, borderRadius: '50%', position: 'relative',
            background: 'conic-gradient(from 0deg, #00ff88, #00e5ff, #00ff88)',
            padding: 3,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 255, 136, 0.08)',
            animation: 'hero-float 5s ease-in-out infinite'
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              overflow: 'hidden',
              border: '1px solid rgba(0,255,136,0.15)',
            }}>
              <Image
                src="/profile-ishan-v2.jpg"
                alt="Ishan Yadav"
                width={214}
                height={214}
                priority
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          {/* Small Social quick badges */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[
              { href: 'https://github.com/DecryptorX', label: 'GH' },
              { href: 'https://www.linkedin.com/in/ishan-yadav-a22251325', label: 'LI' },
              { href: 'mailto:ishanyadav09@outlook.com', label: '@' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{
                  width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '0.7rem', fontWeight: 800, color: 'rgba(226,232,240,0.65)', transition: 'all 0.2s', textDecoration: 'none'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#00ff88'; e.currentTarget.style.color = '#00ff88'; e.currentTarget.style.background = 'rgba(0,255,136,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(226,232,240,0.65)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                {l.label}
              </a>
            ))}
          </div>

        </motion.div>
      </div>

      <style>{`
        @keyframes hpulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} }
        @keyframes hero-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @media (max-width: 640px) {
          #home { padding: 5.5rem 1.25rem 3rem !important; }
        }
      `}</style>
    </section>
  );
}
