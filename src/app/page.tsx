"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Hero from '../components/Hero';
import { SKILLS } from '../components/Skills';
import { ChevronLeft, ChevronRight, ExternalLink, ArrowUpRight } from 'lucide-react';

/* ============================================
   FEATURED CAROUSEL COMPONENT
   ============================================ */
function FeaturedCarousel({ projects }: { projects: any[] }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = projects.slice(0, 5);

  const goTo = useCallback((idx: number) => {
    setActive(((idx % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    timerRef.current = setInterval(next, 8000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, active, next, slides.length]);

  if (slides.length === 0) return null;
  const p = slides[active];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ position: 'relative' }}
    >
      <div className="carousel-layout" style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '6rem', alignItems: 'center', minHeight: '520px' }}>
        {/* Visual side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`visual-${active}`}
            initial={{ opacity: 0, scale: 0.96, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.96, x: -40 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              borderRadius: '2.5rem',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 40px 80px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{ padding: '6rem 4rem', position: 'relative', minHeight: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.5 }} />
              <div aria-hidden style={{ position: 'absolute', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52, 211, 153, 0.04) 0%, transparent 70%)', filter: 'blur(50px)' }} />
              
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <span style={{ fontSize: '11rem', fontWeight: 900, fontFamily: 'var(--font-mono)', opacity: 0.03, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1, display: 'block' }}>
                  {p.num}
                </span>
                <h4 style={{ fontSize: '2.2rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: '#ffffff', marginTop: '-3rem', letterSpacing: '-0.02em' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', marginTop: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {p.status === 'live' ? '● Live' : p.status === 'in-development' ? '◐ In Development' : '○ Open Source'}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Content side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${active}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                {String(active + 1).padStart(2, '0')}
              </span>
              <span style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)' }}>
                {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            <span style={{
              display: 'inline-block', padding: '0.35rem 1rem', borderRadius: '9999px',
              fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
              background: 'rgba(52, 211, 153, 0.08)', color: 'var(--accent-emerald)',
              border: '1px solid rgba(52, 211, 153, 0.12)', marginBottom: '2rem'
            }}>
              {p.status === 'live' ? 'Live' : p.status === 'in-development' ? 'In Development' : 'Open Source'}
            </span>

            <h3 style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.4rem)', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#ffffff', letterSpacing: '-0.03em', margin: '0 0 1rem' }}>
              {p.title}
            </h3>

            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: 'var(--font-editorial)', margin: '0 0 2.5rem', lineHeight: 1.7 }}>
              {p.tagline || p.description?.slice(0, 120) + '...'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
              {(p.tech || []).slice(0, 5).map((t: string) => (
                <span key={t} style={{
                  padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 500,
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)'
                }}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.8rem 2rem', fontSize: '0.85rem' }}>
                  Source
                </a>
              )}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '0.85rem' }}>
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={prev} style={{
            width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
            color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
          >
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} style={{
            width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
            color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === active ? 36 : 8, height: 8, borderRadius: '9999px',
              background: i === active ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)', boxShadow: i === active ? '0 0 12px rgba(52, 211, 153, 0.3)' : 'none'
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================
   SLIDE COMPONENTS
   ============================================ */

function Slide2About() {
  return (
    <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', padding: '0 4rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="hero-grid">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>
            // Philosophy
          </p>
          <blockquote style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.3rem)', fontWeight: 400, fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 3rem', letterSpacing: '-0.02em' }}>
            "Building secure systems requires a balance of defense engineering, local intelligence, and 
            <span style={{ color: '#ffffff', fontWeight: 500 }}> obsessive attention to detail</span>. 
            Every line of code is either a wall or a door."
          </blockquote>
          
          <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            // Domain Expertise
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.8, margin: '0 0 3rem' }}>
            Specializing in threat detection, incident log automation, and mapping attack patterns to the MITRE ATT&CK framework. Building tools that turn raw security data into actionable intelligence.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/about" className="btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '0.9rem' }}>
              About Me
            </Link>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {[
            { label: 'MITRE ATT&CK', desc: 'Automated threat mapping and signature verification.', num: '01' },
            { label: 'SOC Analysis', desc: 'Real-time log monitoring, alert analysis, and triage workflows.', num: '02' },
            { label: 'Incident Response', desc: 'Automated response execution and reporting dashboards.', num: '03' },
            { label: 'Penetration Testing', desc: 'Continuous vulnerability assessment and threat model validation.', num: '04' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.4 + (i * 0.1) }}
              className="card-editorial"
              style={{ padding: '2.5rem', minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.4s' }}
            >
              <div>
                <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', display: 'block', marginBottom: '1.25rem' }}>{item.num}</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-display)', margin: '0 0 0.75rem' }}>{item.label}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide4Experience() {
  const experiences = [
    { period: '2025 — Present', role: 'Freelance Developer & Consultant', org: 'Self-Employed', brief: 'Engineering custom security monitoring tools using Python, auditing Linux syslogs, and constructing Next.js dashboards backed by Flask APIs.' },
    { period: '2024 — Present', role: 'Social Media Sub Head', org: 'ACM Bennett University', brief: 'Managing digital channels, event media, and supervising a junior core team of 5 members to establish consistent release schedules.' },
    { period: '2024 — Present', role: 'Academic Projects Researcher', org: 'Bennett University', brief: 'Researching machine learning integrations with web security and building women safety SOS dispatcher architectures.' },
  ];
  return (
    <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', padding: '0 4rem' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              // History
            </p>
            <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', margin: 0, fontFamily: 'var(--font-display)' }}>
              Experience
            </h2>
          </div>
          <Link href="/experience" className="btn-secondary" style={{ padding: '0.8rem 1.8rem', fontSize: '0.85rem' }}>
            Full History <ArrowUpRight size={16} />
          </Link>
        </div>
        
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {/* Connecting line */}
          <div style={{ position: 'absolute', top: '-1.5rem', left: '1rem', right: '1rem', height: '1px', background: 'rgba(255,255,255,0.06)', zIndex: 0 }} />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.4 + (i * 0.15) }}
              className="card-editorial"
              style={{ padding: '2.5rem', minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
                  <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                    {exp.period}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)', margin: '0 0 0.5rem', lineHeight: 1.3 }}>
                  {exp.role}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', margin: '0 0 1.5rem' }}>
                  {exp.org}
                </p>
                <p style={{ fontSize: '0.96rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                  {exp.brief}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Slide5Skills() {
  return (
    <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', padding: '0 4rem' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          // Stack
        </p>
        <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', margin: '0 0 3.5rem', fontFamily: 'var(--font-display)' }}>
          Technologies & Expertise
        </h2>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        {SKILLS.slice(0, 6).map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 + (gi * 0.1) }}
            className="card-editorial"
            style={{ padding: '2.5rem', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.4s' }}
          >
            <div>
              <h4 style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.25rem', fontFamily: 'var(--font-display)', margin: '0 0 1.5rem' }}>{group.category}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {group.items.slice(0, 6).map(skill => (
                  <span key={skill} style={{ padding: '0.4rem 0.9rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 500, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: 'var(--text-muted)', transition: 'all 0.3s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.3)'; e.currentTarget.style.color = '#ffffff'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Slide6Journey() {
  const milestones = [
    { year: '2023', label: 'Systems Foundations', desc: 'Started computer science studies, centering on security fundamentals, operating systems, and Python scripting.' },
    { year: '2024', label: 'AI & Research Core', desc: 'Authored emergency SOS response systems and integrated machine learning classifiers with security layers.' },
    { year: '2025', label: 'Startups & Production', desc: 'Co-founded backend operations, building custom threat intelligence log parsers and consulting on local infrastructure.' },
  ];
  return (
    <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', padding: '0 4rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '6rem', alignItems: 'center' }} className="hero-grid">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            // Path
          </p>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>
            My Journey So Far
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '3rem' }}>
            From building local helper scripts to engineering machine-learning defense structures. Explore the complete interactive timeline of my development path.
          </p>
          <div style={{ display: 'flex' }}>
            <Link href="/journey" className="btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '0.9rem' }}>
              View Full Journey <ArrowUpRight size={16} />
            </Link>
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {milestones.map((ms, i) => (
            <motion.div
              key={ms.year}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + (i * 0.15) }}
              className="card-editorial"
              style={{ padding: '2rem 2.5rem', display: 'grid', gridTemplateColumns: '100px 1fr', gap: '2rem', alignItems: 'center' }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--accent-emerald)', borderRight: '1px solid rgba(255,255,255,0.06)', paddingRight: '1.5rem' }}>
                {ms.year}
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)', margin: '0 0 0.35rem' }}>{ms.label}</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{ms.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide7Contact() {
  return (
    <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', padding: '0 4rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '6rem', alignItems: 'center' }} className="hero-grid">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            // Let's Connect
          </p>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>
            Let's build secure solutions together.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '3rem' }}>
            Looking for a Cybersecurity Analyst, SOC Intern, or Software Engineer? Let's discuss how I can contribute to your team.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '0.9rem' }}>
              Get In Touch
            </Link>
            <Link href="/journey" className="btn-secondary" style={{ padding: '0.9rem 2.2rem', fontSize: '0.9rem' }}>
              Explore My Journey
            </Link>
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { label: 'Email', value: 'ishanyadav09@outlook.com', href: 'mailto:ishanyadav09@outlook.com' },
            { label: 'LinkedIn', value: 'ishan-yadav-a22251325', href: 'https://www.linkedin.com/in/ishan-yadav-a22251325' },
            { label: 'GitHub', value: 'DecryptorX', href: 'https://github.com/DecryptorX' },
          ].map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + (i * 0.15) }}
              className="card-editorial"
              style={{ padding: '2rem 2.5rem', display: 'block', textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; }}
            >
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{c.label}</span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-display)', margin: 0, wordBreak: 'break-all' }}>{c.value}</h4>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ============================================
   HOMEPAGE
   ============================================ */
export default function Page() {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeScene, setActiveScene] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isExited, setIsExited] = useState(false);
  const transitionLock = useRef(false);
  const touchStartY = useRef<number | null>(null);
  
  const TOTAL_SCENES = 7;

  useEffect(() => {
    const FALLBACK_PROJECTS = [
      {
        num: '01', title: 'SkinVision AI', tagline: 'AI-powered skin disease detection platform',
        status: 'live', demo: 'https://skinvision.vercel.app/', github: 'https://github.com/DecryptorX/SkinVision',
        tech: ['Python', 'Flask', 'React', 'Next.js', 'Tailwind CSS', 'TensorFlow']
      },
      {
        num: '02', title: 'Automated Log Analyzer', tagline: 'Security log analysis and automated incident reporting',
        status: 'open-source', github: 'https://github.com/DecryptorX/Automated-Log-Analyzer-and-Reporting-Script',
        tech: ['Python', 'RegEx', 'Linux', 'Windows', 'JSON']
      },
      {
        num: '03', title: 'SAFEपथ', tagline: 'AI-assisted women safety and emergency response platform',
        status: 'open-source', github: 'https://github.com/DecryptorX/SafePath',
        tech: ['React', 'Next.js', 'Node.js', 'MongoDB', 'AI/ML']
      },
      {
        num: '04', title: 'JARVIS AI Agent', tagline: 'Desktop AI assistant with local intelligence and voice interaction',
        status: 'in-development', github: '',
        tech: ['Python', 'LLM APIs', 'Voice Recognition', 'Tool Calling', 'SQLite']
      },
    ];

    fetch('/api/content/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const parsed = data.map(p => ({
            ...p,
            tech: typeof p.tech === 'string' ? p.tech.split(',').map((t: any) => t.trim()).filter(Boolean) : p.tech,
          }));
          setFeaturedProjects(parsed);
        } else {
          setFeaturedProjects(FALLBACK_PROJECTS);
        }
      })
      .catch(() => setFeaturedProjects(FALLBACK_PROJECTS));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goToScene = useCallback((nextScene: number) => {
    if (transitionLock.current || nextScene < 1 || nextScene > TOTAL_SCENES || nextScene === activeScene) return;
    
    transitionLock.current = true;
    setDirection(nextScene > activeScene ? 1 : -1);
    setActiveScene(nextScene);
    
    // Lock duration matches animation duration (850ms)
    window.setTimeout(() => { transitionLock.current = false; }, 850);
  }, [activeScene]);

  // Scroll lock effect using body class
  useEffect(() => {
    if (!mounted) return;
    if (isExited) {
      document.documentElement.classList.remove('lock-scroll');
      document.body.classList.remove('lock-scroll');
    } else {
      document.documentElement.classList.add('lock-scroll');
      document.body.classList.add('lock-scroll');
    }
    return () => {
      document.documentElement.classList.remove('lock-scroll');
      document.body.classList.remove('lock-scroll');
    };
  }, [isExited, mounted]);

  useEffect(() => {
    if (!mounted) return;
    
    const isInteractive = (target: EventTarget | null) => target instanceof Element && Boolean(target.closest('a, button, input, textarea, select, [data-carousel]'));
    
    const onWheel = (event: WheelEvent) => {
      if (isInteractive(event.target)) return;

      if (isExited) {
        if (window.scrollY === 0 && event.deltaY < 0) {
          event.preventDefault();
          setIsExited(false);
          goToScene(TOTAL_SCENES);
        }
        return;
      }

      if (Math.abs(event.deltaY) < 20) return; // Ignore tiny scroll bumps
      event.preventDefault();
      
      if (!transitionLock.current) {
        const next = activeScene + (event.deltaY > 0 ? 1 : -1);
        if (next > TOTAL_SCENES) {
          setIsExited(true);
        } else {
          goToScene(next);
        }
      }
    };
    
    const onKeyDown = (event: KeyboardEvent) => {
      if (isInteractive(event.target)) return;

      if (isExited) {
        if (window.scrollY === 0 && (event.key === 'ArrowUp' || event.key === 'PageUp')) {
          event.preventDefault();
          setIsExited(false);
          goToScene(TOTAL_SCENES);
        }
        return;
      }

      const forward = ['ArrowDown', 'PageDown', ' '];
      const backward = ['ArrowUp', 'PageUp'];
      if (forward.includes(event.key) || backward.includes(event.key)) {
        event.preventDefault();
        const next = activeScene + (forward.includes(event.key) ? 1 : -1);
        if (next > TOTAL_SCENES) {
          setIsExited(true);
        } else {
          goToScene(next);
        }
      }
    };
    
    const onTouchStart = (event: TouchEvent) => { touchStartY.current = event.touches[0]?.clientY ?? null; };
    
    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartY.current === null || isInteractive(event.target)) return;
      const distance = touchStartY.current - (event.changedTouches[0]?.clientY ?? touchStartY.current);
      touchStartY.current = null;

      if (isExited) {
        if (window.scrollY === 0 && distance < -50) {
          setIsExited(false);
          goToScene(TOTAL_SCENES);
        }
        return;
      }

      if (Math.abs(distance) > 50) {
        const next = activeScene + (distance > 0 ? 1 : -1);
        if (next > TOTAL_SCENES) {
          setIsExited(true);
        } else {
          goToScene(next);
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [activeScene, goToScene, mounted, isExited]);

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
      filter: 'blur(12px)',
    }),
    center: {
      y: '0%',
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.85, 
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
        y: { duration: 0.85 },
        opacity: { duration: 0.65 },
        scale: { duration: 0.85 },
        filter: { duration: 0.85 }
      }
    },
    exit: (direction: number) => ({
      y: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
      filter: 'blur(12px)',
      transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    })
  };

  const renderScene = () => {
    switch (activeScene) {
      case 1: return <Hero />;
      case 2: return <Slide2About />;
      case 3: return (
        <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', padding: '0 4rem' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>// Featured Work</p>
            <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', margin: '0 0 3.5rem', fontFamily: 'var(--font-display)' }}>Selected Projects</h2>
          </motion.div>
          <FeaturedCarousel projects={featuredProjects} />
        </div>
      );
      case 4: return <Slide4Experience />;
      case 5: return <Slide5Skills />;
      case 6: return <Slide6Journey />;
      case 7: return <Slide7Contact />;
      default: return null;
    }
  };

  if (!mounted) {
    return <div style={{ background: 'var(--bg)', minHeight: '100vh' }} />;
  }

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', position: 'relative', minHeight: '100vh' }}>
      {/* Background Ambience */}
      <div className="moving-grid" style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.5, pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'fixed', top: '50%', left: '50%', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52, 211, 153, 0.02) 0%, transparent 60%)', transform: 'translate(-50%, -50%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Cinematic Slide Carousel */}
      <div style={{ 
        position: isExited ? 'relative' : 'fixed', 
        inset: isExited ? 'auto' : 0, 
        height: '100vh', 
        width: '100%', 
        overflow: 'hidden',
        zIndex: 1 
      }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeScene}
            custom={direction}
            initial={slideVariants.enter(direction)}
            animate={slideVariants.center}
            exit={slideVariants.exit(direction)}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              willChange: 'transform, opacity'
            }}
          >
            {renderScene()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Indicators */}
      {!isExited && (
        <nav style={{
          position: 'fixed', right: '2rem', top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: '0.8rem', zIndex: 50
        }}>
          {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToScene(i + 1)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: 8, height: 8, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer',
                background: activeScene === i + 1 ? 'var(--accent-emerald)' : 'rgba(255, 255, 255, 0.15)',
                boxShadow: activeScene === i + 1 ? '0 0 10px rgba(52, 211, 153, 0.5)' : 'none',
                transform: activeScene === i + 1 ? 'scale(1.3)' : 'scale(1)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          ))}
        </nav>
      )}

      {/* Vertical offset spacing to push footer below absolute carousel when exited */}
      {isExited && (
        <div style={{ paddingTop: '100vh' }} />
      )}
    </div>
  );
}
