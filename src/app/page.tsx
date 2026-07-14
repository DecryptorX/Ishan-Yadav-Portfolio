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
      <div className="carousel-layout" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '4rem', alignItems: 'center', minHeight: '500px' }}>
        {/* Visual side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`visual-${active}`}
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -30 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              borderRadius: '2rem',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 40px 80px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div style={{ padding: '4rem 3rem', position: 'relative', minHeight: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.5 }} />
              <div aria-hidden style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52, 211, 153, 0.03) 0%, transparent 70%)', filter: 'blur(40px)' }} />
              
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                <span style={{ fontSize: '8rem', fontWeight: 900, fontFamily: 'var(--font-mono)', opacity: 0.04, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1, display: 'block' }}>
                  {p.num}
                </span>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: '#ffffff', marginTop: '-2rem', letterSpacing: '-0.02em' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', marginTop: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                {String(active + 1).padStart(2, '0')}
              </span>
              <span style={{ width: 30, height: 1, background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)' }}>
                {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            <span style={{
              display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px',
              fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
              background: 'rgba(52, 211, 153, 0.08)', color: 'var(--accent-emerald)',
              border: '1px solid rgba(52, 211, 153, 0.12)', marginBottom: '1.5rem'
            }}>
              {p.status === 'live' ? 'Live' : p.status === 'in-development' ? 'In Development' : 'Open Source'}
            </span>

            <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#ffffff', letterSpacing: '-0.03em', margin: '0 0 0.75rem' }}>
              {p.title}
            </h3>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: 'var(--font-editorial)', margin: '0 0 2rem', lineHeight: 1.7 }}>
              {p.tagline || p.description?.slice(0, 120) + '...'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2.5rem' }}>
              {(p.tech || []).slice(0, 5).map((t: string) => (
                <span key={t} style={{
                  padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 500,
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)'
                }}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.8rem' }}>
                  Source
                </a>
              )}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.8rem' }}>
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '3rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={prev} style={{
            width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
            color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s'
          }}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} style={{
            width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
            color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s'
          }}>
            <ChevronRight size={16} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === active ? 32 : 6, height: 6, borderRadius: '9999px',
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
    <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            // Philosophy
          </p>
          <blockquote style={{ fontSize: '1.45rem', fontWeight: 400, fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 2.5rem', letterSpacing: '-0.01em' }}>
            "Building secure systems requires a balance of defense engineering, local intelligence, and 
            <span style={{ color: '#ffffff', fontWeight: 500 }}> obsessive attention to detail</span>. 
            Every line of code is either a wall or a door."
          </blockquote>
          
          <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            // Domain Expertise
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.8, margin: '0 0 2rem' }}>
            Specializing in threat detection, incident log automation, and mapping attack patterns to the MITRE ATT&CK framework. Building tools that turn raw security data into actionable intelligence.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link href="/about" className="btn-primary" style={{ padding: '0.7rem 1.8rem', fontSize: '0.82rem' }}>
              About Me
            </Link>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[
            { label: 'MITRE ATT&CK', desc: 'Automated threat mapping', num: '01' },
            { label: 'SOC Analysis', desc: 'Log monitoring & triage', num: '02' },
            { label: 'Incident Response', desc: 'Automated report generation', num: '03' },
            { label: 'Penetration Testing', desc: 'Vulnerability assessment', num: '04' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 + (i * 0.1) }}
              className="card-editorial"
              style={{ padding: '1.5rem' }}
            >
              <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.75rem' }}>{item.num}</span>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-display)', margin: '0 0 0.35rem' }}>{item.label}</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide4Experience() {
  const experiences = [
    { period: '2025 — Present', role: 'Freelance Developer & Security Consultant', org: 'Self-Employed', brief: 'Building security tools, full-stack dashboards, and advising clients on threat protocols.' },
    { period: '2024 — Present', role: 'Social Media Sub Head', org: 'ACM Bennett University', brief: 'Managing digital channels, event media, and mentoring a junior content core team.' },
    { period: '2024 — Present', role: 'Academic Researcher', org: 'Bennett University', brief: 'ML integration with web security, emergency SOS platform, SOC threat simulation.' },
  ];
  return (
    <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <div>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                // History
              </p>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', margin: 0, fontFamily: 'var(--font-display)' }}>
                Experience
              </h2>
            </div>
            <Link href="/experience" className="btn-secondary" style={{ padding: '0.6rem 1.3rem', fontSize: '0.8rem' }}>
              Full History <ArrowUpRight size={14} />
            </Link>
          </div>
          
          <div style={{ position: 'relative' }}>
            {/* Animated Timeline Line */}
            <motion.div 
              initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', left: '16px', top: '10px', bottom: '10px', width: '2px', background: 'var(--accent-emerald)', opacity: 0.5, zIndex: 0 }} 
            />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1 }}>
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.6 + (i * 0.15) }}
                  className="card-editorial"
                  style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1.5rem', alignItems: 'center' }}
                >
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>
                    {exp.period}
                  </span>
                  <div>
                    <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-display)', margin: '0 0 0.2rem' }}>
                      {exp.role}
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', margin: 0 }}>
                      {exp.org} — {exp.brief}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Slide5Skills() {
  return (
    <div style={{ maxWidth: 960, width: '100%', margin: '0 auto', padding: '0 2rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
        <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          // Stack
        </p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', margin: '0 0 2.5rem', fontFamily: 'var(--font-display)' }}>
          Technologies
        </h2>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {SKILLS.slice(0, 6).map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + (gi * 0.1) }}
            className="card-editorial"
            style={{ padding: '1.25rem' }}
          >
            <h4 style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.85rem', fontFamily: 'var(--font-display)', margin: '0 0 0.75rem' }}>{group.category}</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {group.items.slice(0, 4).map(skill => (
                <span key={skill} style={{ padding: '0.2rem 0.55rem', borderRadius: '9999px', fontSize: '0.68rem', fontWeight: 500, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Slide6Journey() {
  return (
    <div style={{ maxWidth: 900, width: '100%', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
        <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          // Path
        </p>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>
          My Journey So Far
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '3rem', maxWidth: 600, margin: '0 auto 3rem' }}>
          From early experiments in programming to building full-stack platforms and securing systems. Explore the complete timeline of my evolution as a developer.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/journey" className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '0.9rem' }}>
            View Full Journey <ArrowUpRight size={16} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function Slide7Contact() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', padding: '0 2rem' }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
        <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52, 211, 153, 0.05) 0%, transparent 60%)', transform: 'translate(-50%, -50%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        
        <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          // Let's Connect
        </p>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>
          Let's build secure<br />solutions together.
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '3rem' }}>
          Looking for a Cybersecurity Analyst, SOC Intern, or Software Engineer? Let's discuss how I can contribute to your team.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn-primary">
            Get In Touch
          </Link>
          <Link href="/journey" className="btn-secondary">
            Explore My Journey
          </Link>
        </div>
      </motion.div>
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

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = 'hidden';
    
    const isInteractive = (target: EventTarget | null) => target instanceof Element && Boolean(target.closest('a, button, input, textarea, select, [data-carousel]'));
    
    const onWheel = (event: WheelEvent) => {
      if (isInteractive(event.target)) return;
      if (Math.abs(event.deltaY) < 20) return; // Ignore tiny scroll bumps
      event.preventDefault();
      
      if (!transitionLock.current) {
        goToScene(activeScene + (event.deltaY > 0 ? 1 : -1));
      }
    };
    
    const onKeyDown = (event: KeyboardEvent) => {
      if (isInteractive(event.target)) return;
      const forward = ['ArrowDown', 'PageDown', ' '];
      const backward = ['ArrowUp', 'PageUp'];
      if (forward.includes(event.key) || backward.includes(event.key)) {
        event.preventDefault();
        goToScene(activeScene + (forward.includes(event.key) ? 1 : -1));
      }
    };
    
    const onTouchStart = (event: TouchEvent) => { touchStartY.current = event.touches[0]?.clientY ?? null; };
    
    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartY.current === null || isInteractive(event.target)) return;
      const distance = touchStartY.current - (event.changedTouches[0]?.clientY ?? touchStartY.current);
      touchStartY.current = null;
      if (Math.abs(distance) > 50) goToScene(activeScene + (distance > 0 ? 1 : -1));
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [activeScene, goToScene, mounted]);

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
        <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>// Featured Work</p>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', margin: '0 0 3rem', fontFamily: 'var(--font-display)' }}>Selected Projects</h2>
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
    <div style={{ background: 'var(--bg)', color: 'var(--text)', position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Background Ambience */}
      <div className="moving-grid" style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5 }} />
      <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52, 211, 153, 0.02) 0%, transparent 60%)', transform: 'translate(-50%, -50%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Cinematic Slide Carousel */}
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

      {/* Navigation Indicators */}
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
    </div>
  );
}
