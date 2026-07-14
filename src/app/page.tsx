"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import Hero from '../components/Hero';
import MarqueeStrip from '../components/MarqueeStrip';
import { SKILLS } from '../components/Skills';
import { ChevronLeft, ChevronRight, ExternalLink, ArrowUpRight } from 'lucide-react';

/* ============================================
   FEATURED CAROUSEL COMPONENT
   ============================================ */
function FeaturedCarousel({ projects }: { projects: any[] }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = projects.slice(0, 5);

  const goTo = useCallback((idx: number) => {
    setActive(((idx % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Autoplay
  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    timerRef.current = setInterval(next, 8000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, active, next, slides.length]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  // Mouse wheel nav
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let debounce = false;
    const handler = (e: WheelEvent) => {
      if (debounce) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || Math.abs(e.deltaY) > 50) {
        debounce = true;
        if (e.deltaX > 0 || e.deltaY > 0) next();
        else prev();
        setTimeout(() => { debounce = false; }, 800);
      }
    };
    el.addEventListener('wheel', handler, { passive: true });
    return () => el.removeEventListener('wheel', handler);
  }, [next, prev]);

  // Touch swipe
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next(); else prev();
      }
    };
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchend', onEnd, { passive: true });
    return () => { el.removeEventListener('touchstart', onStart); el.removeEventListener('touchend', onEnd); };
  }, [next, prev]);

  if (slides.length === 0) return null;

  const p = slides[active];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ position: 'relative' }}
    >
      {/* Carousel content */}
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
              {/* Grid pattern */}
              <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.5 }} />
              {/* Center glow */}
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
            {/* Slide counter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                {String(active + 1).padStart(2, '0')}
              </span>
              <span style={{ width: 30, height: 1, background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)' }}>
                {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Status badge */}
            <span style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.65rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              background: 'rgba(52, 211, 153, 0.08)',
              color: 'var(--accent-emerald)',
              border: '1px solid rgba(52, 211, 153, 0.12)',
              marginBottom: '1.5rem'
            }}>
              {p.status === 'live' ? 'Live' : p.status === 'in-development' ? 'In Development' : 'Open Source'}
            </span>

            {/* Title */}
            <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#ffffff', letterSpacing: '-0.03em', margin: '0 0 0.75rem' }}>
              {p.title}
            </h3>

            {/* Tagline */}
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: 'var(--font-editorial)', margin: '0 0 2rem', lineHeight: 1.7 }}>
              {p.tagline || p.description?.slice(0, 120) + '...'}
            </p>

            {/* Tech stack pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2.5rem' }}>
              {(p.tech || []).slice(0, 5).map((t: string) => (
                <span key={t} style={{
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  color: 'var(--text-muted)',
                }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.8rem' }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg> Source
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

      {/* Navigation controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '3rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={prev}
            style={{
              width: 42, height: 42, borderRadius: '50%',
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.3s'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'; }}
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            style={{
              width: 42, height: 42, borderRadius: '50%',
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.3s'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'; }}
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Progress indicators */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === active ? 32 : 6,
                height: 6,
                borderRadius: '9999px',
                background: i === active ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.1)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: i === active ? '0 0 12px rgba(52, 211, 153, 0.3)' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .carousel-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ============================================
   HOMEPAGE
   ============================================ */
export default function Page() {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);

  useEffect(() => {
    const FALLBACK_PROJECTS = [
      {
        num: '01',
        title: 'SkinVision AI',
        tagline: 'AI-powered skin disease detection platform',
        role: ['Full Stack Developer', 'AI Integration'],
        description: 'An intelligent web application that leverages deep learning to analyse skin images and detect potential skin conditions. Built with a Flask backend handling the ML inference pipeline and a Next.js frontend delivering a seamless, mobile-first experience.',
        features: [
          'AI-powered dermoscopic image analysis',
          'Real-time skin condition detection',
          'Location-based dermatologist finder',
          'Responsive mobile-first UI',
          'Secure image upload pipeline',
        ],
        tech: ['Python', 'Flask', 'React', 'Next.js', 'Tailwind CSS', 'TensorFlow'],
        highlights: 'Built the full ML pipeline from data preprocessing through model training to API serving. Integrated location services for dermatologist discovery.',
        github: 'https://github.com/DecryptorX/SkinVision',
        demo: 'https://skinvision.vercel.app/',
        status: 'live',
        color: '#00e5ff',
        accent: '#00e5ff',
        gradFrom: '#001f2e',
        gradTo: '#002a3d',
      },
      {
        num: '02',
        title: 'Automated Log Analyzer',
        tagline: 'Security log analysis and automated incident reporting',
        role: ['Security Developer', 'Python Engineer'],
        description: 'A professional-grade Python security tool that ingests Windows Event Logs and Linux syslog files, runs pattern-matching detection for common attack signatures — brute-force, privilege escalation, lateral movement — and produces structured incident reports.',
        features: [
          'Windows & Linux log parsing engine',
          'Brute-force and anomaly detection',
          'Privilege escalation pattern matching',
          'Structured HTML & JSON report generation',
          'Configurable detection rule sets',
        ],
        tech: ['Python', 'RegEx', 'Linux', 'Windows', 'JSON'],
        highlights: 'Developed custom detection rules mapped to MITRE ATT&CK techniques, reducing manual log review time by automating pattern recognition across thousands of events.',
        github: 'https://github.com/DecryptorX/Automated-Log-Analyzer-and-Reporting-Script',
        status: 'open-source',
        color: '#f59e0b',
        accent: '#f59e0b',
        gradFrom: '#1e1000',
        gradTo: '#2a1600',
      },
      {
        num: '03',
        title: 'SAFEपथ',
        tagline: 'AI-assisted women safety and emergency response platform',
        role: ['Full Stack Developer', 'AI Integration'],
        description: "A community-driven safety platform for women's security. Features real-time emergency SOS dispatch, AI-assisted threat monitoring, crowd-sourced safety heatmaps, and community engagement tools — all in a mobile-first progressive web app.",
        features: [
          'Real-time emergency SOS dispatch',
          'AI-assisted safety monitoring',
          'Community safety heatmaps',
          'Safe route recommendations',
          'Incident reporting & tracking',
        ],
        tech: ['React', 'Next.js', 'Node.js', 'MongoDB', 'AI/ML'],
        highlights: 'Designed the AI safety scoring system and the emergency contact notification pipeline. Prioritised sub-second response times for SOS alerts.',
        github: 'https://github.com/DecryptorX/SafePath',
        status: 'open-source',
        color: '#ec4899',
        accent: '#ec4899',
        gradFrom: '#1e0011',
        gradTo: '#2a0018',
      },
      {
        num: '04',
        title: 'JARVIS AI Agent',
        tagline: 'Desktop AI assistant with local intelligence and voice interaction',
        role: ['AI Engineer', 'System Architect'],
        description: 'A modular desktop AI assistant built around OpenRouter-hosted LLMs, persistent conversational memory, a local-first tool-calling framework, and a planned PC automation layer — designed for offline-capable, privacy-preserving everyday use.',
        features: [
          'Natural voice interaction pipeline',
          'Persistent conversational memory',
          'OpenRouter LLM integration',
          'Modular tool-calling architecture',
          'PC automation capabilities (planned)',
        ],
        tech: ['Python', 'LLM APIs', 'Voice Recognition', 'Tool Calling', 'SQLite'],
        highlights: 'Architecting a clean separation between the conversation manager, tool dispatcher, and response synthesiser to enable future multi-modal automation.',
        github: '',
        status: 'in-development',
        color: '#6366f1',
        accent: '#6366f1',
        gradFrom: '#07001e',
        gradTo: '#0f0028',
      },
    ];

    fetch('/api/content/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const parsed = data.map(p => ({
            ...p,
            role: typeof p.role === 'string' ? p.role.split(',').map((r: any) => r.trim()).filter(Boolean) : p.role,
            features: typeof p.features === 'string' ? p.features.split('\n').map((f: any) => f.trim()).filter(Boolean) : p.features,
            tech: typeof p.tech === 'string' ? p.tech.split(',').map((t: any) => t.trim()).filter(Boolean) : p.tech,
          }));
          setFeaturedProjects(parsed);
        } else {
          setFeaturedProjects(FALLBACK_PROJECTS);
        }
      })
      .catch(err => {
        console.error(err);
        setFeaturedProjects(FALLBACK_PROJECTS);
      });
  }, []);

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeScene, setActiveScene] = useState(1);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted || isMobile) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const updateActiveScene = (latest: number) => {
      if (latest < 0.2) setActiveScene(1);
      else if (latest < 0.4) setActiveScene(2);
      else if (latest < 0.6) setActiveScene(3);
      else if (latest < 0.8) setActiveScene(4);
      else setActiveScene(5);
    };

    const updateScrollProgress = () => {
      const start = container.offsetTop;
      const scrollableDistance = container.offsetHeight - window.innerHeight;
      const latest = scrollableDistance > 0
        ? Math.min(Math.max((window.scrollY - start) / scrollableDistance, 0), 1)
        : 0;

      scrollYProgress.set(latest);
      updateActiveScene(latest);
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [isMobile, mounted, scrollYProgress]);

  // Scene 1: Hero Transforms
  const s1Y = useTransform(scrollYProgress, [0.0, 0.2], ['0vh', '-100vh']);

  // Scene 2: Philosophy & Cybersecurity Expertise
  const s2Y = useTransform(scrollYProgress, [0.0, 0.2, 0.4], ['100vh', '0vh', '-100vh']);

  // Scene 3: Featured Projects
  const s3Y = useTransform(scrollYProgress, [0.2, 0.4, 0.6], ['100vh', '0vh', '-100vh']);

  // Scene 4: Experience & Skills
  const s4Y = useTransform(scrollYProgress, [0.4, 0.6, 0.8], ['100vh', '0vh', '-100vh']);

  // Scene 5: Contact
  const s5Y = useTransform(scrollYProgress, [0.6, 0.8], ['100vh', '0vh']);

  const renderContent = () => {
    if (!mounted) {
      return (
        <div
          ref={scrollContainerRef}
          style={{ background: 'var(--bg)', minHeight: '100vh' }}
        />
      );
    }

    if (isMobile) {
      return (
        <div style={{ background: 'var(--bg)', color: 'var(--text)' }}>
          {/* Hero Section */}
          <Hero />

          {/* Marquee Strip */}
          <MarqueeStrip />

          {/* Philosophy Statement */}
          <section style={{ padding: 'var(--section-pad) 2rem', position: 'relative', overflow: 'hidden' }}>
            <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52, 211, 153, 0.02) 0%, transparent 60%)', transform: 'translate(-50%, -50%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: 'center' }}
              >
                <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
                  // Philosophy
                </p>
                <blockquote style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', fontWeight: 400, fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, letterSpacing: '-0.01em' }}>
                  "Building secure systems requires a balance of defense engineering, local intelligence, and 
                  <span style={{ color: '#ffffff', fontWeight: 500 }}> obsessive attention to detail</span>. 
                  Every line of code is either a wall or a door."
                </blockquote>
                <div style={{ width: 40, height: 1, background: 'var(--accent-emerald)', margin: '2.5rem auto 0', opacity: 0.5 }} />
              </motion.div>
            </div>
          </section>

          {/* Featured Projects Carousel */}
          <section style={{ padding: 'var(--section-pad) 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    // Featured Work
                  </p>
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', margin: 0, fontFamily: 'var(--font-display)' }}>
                    Selected Projects
                  </h2>
                </motion.div>
                <Link href="/projects" className="btn-secondary" style={{ padding: '0.6rem 1.3rem', fontSize: '0.8rem' }}>
                  View All <ArrowUpRight size={14} />
                </Link>
              </div>

              <FeaturedCarousel projects={featuredProjects} />
            </div>
          </section>

          {/* Cybersecurity Expertise */}
          <section style={{ padding: 'var(--section-pad) 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.03)', position: 'relative', overflow: 'hidden' }}>
            <div aria-hidden style={{ position: 'absolute', top: 0, right: 0, width: 500, height: 500, background: 'radial-gradient(circle, rgba(52, 211, 153, 0.015) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div className="expertise-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem', alignItems: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    // Core Domain
                  </p>
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>
                    Cybersecurity<br />Expertise
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                    Specializing in threat detection, incident log automation, and mapping attack patterns to the MITRE ATT&CK framework. Building tools that turn raw security data into actionable intelligence.
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Link href="/about" className="btn-primary" style={{ padding: '0.7rem 1.8rem', fontSize: '0.82rem' }}>
                      About Me
                    </Link>
                    <Link href="/journey" className="btn-secondary" style={{ padding: '0.7rem 1.8rem', fontSize: '0.82rem' }}>
                      My Journey
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
                >
                  {[
                    { label: 'MITRE ATT&CK', desc: 'Automated threat mapping', num: '01' },
                    { label: 'SOC Analysis', desc: 'Log monitoring & triage', num: '02' },
                    { label: 'Incident Response', desc: 'Automated report generation', num: '03' },
                    { label: 'Penetration Testing', desc: 'Vulnerability assessment', num: '04' },
                  ].map((item, i) => (
                    <div
                      key={item.label}
                      className="card-editorial"
                      style={{ padding: '1.75rem' }}
                    >
                      <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', display: 'block', marginBottom: '1rem' }}>{item.num}</span>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-display)', margin: '0 0 0.35rem' }}>{item.label}</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Selected Experience */}
          <section style={{ padding: 'var(--section-pad) 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    // History
                  </p>
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', margin: 0, fontFamily: 'var(--font-display)' }}>
                    Experience
                  </h2>
                </motion.div>
                <Link href="/experience" className="btn-secondary" style={{ padding: '0.6rem 1.3rem', fontSize: '0.8rem' }}>
                  Full History <ArrowUpRight size={14} />
                </Link>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }} className="experience-scroll">
                {[
                  { period: '2025 — Present', role: 'Freelance Developer & Security Consultant', org: 'Self-Employed', brief: 'Building security tools, full-stack dashboards, and advising clients on threat protocols.' },
                  { period: '2024 — Present', role: 'Social Media Sub Head', org: 'ACM Bennett University', brief: 'Managing digital channels, event media, and mentoring a junior content core team.' },
                  { period: '2024 — Present', role: 'Academic Researcher', org: 'Bennett University', brief: 'ML integration with web security, emergency SOS platform, SOC threat simulation.' },
                ].map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="card-editorial"
                    style={{ minWidth: '340px', flexShrink: 0, padding: '2rem' }}
                  >
                    <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', marginBottom: '1rem', display: 'block' }}>
                      {exp.period}
                    </span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-display)', margin: '0 0 0.3rem' }}>
                      {exp.role}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', margin: '0 0 1rem' }}>
                      {exp.org}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                      {exp.brief}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Technologies */}
          <section style={{ padding: 'var(--section-pad) 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    // Stack
                  </p>
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', margin: 0, fontFamily: 'var(--font-display)' }}>
                    Technologies
                  </h2>
                </motion.div>
                <Link href="/skills" className="btn-secondary" style={{ padding: '0.6rem 1.3rem', fontSize: '0.8rem' }}>
                  All Skills <ArrowUpRight size={14} />
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
                {SKILLS.slice(0, 5).map((group, gi) => (
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: gi * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="card-editorial"
                    style={{ padding: '1.75rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)' }}>0{gi + 1}</span>
                      <h3 style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.88rem', fontFamily: 'var(--font-display)', margin: 0 }}>{group.category}</h3>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {group.items.slice(0, 4).map(skill => (
                        <span key={skill} style={{
                          padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 500,
                          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: 'var(--text-muted)',
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section style={{ padding: 'clamp(8rem, 15vh, 12rem) 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.03)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
            <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52, 211, 153, 0.03) 0%, transparent 60%)', transform: 'translate(-50%, -50%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                  // Let's Connect
                </p>
                <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', marginBottom: '1.25rem', fontFamily: 'var(--font-display)' }}>
                  Let's build secure<br />solutions together.
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '3rem' }}>
                  Looking for a Cybersecurity Analyst, SOC Intern, or Software Engineer? Let's discuss how I can contribute to your team.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Link href="/contact" className="btn-primary">
                    Get In Touch
                  </Link>
                  <Link href="/journey" className="btn-secondary">
                    Explore My Journey
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      );
    }

    return (
      <div ref={scrollContainerRef} className="scroll-scene-container" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <div className="scroll-scene-viewport moving-grid">
          
          {/* Volumetric center backing lights */}
          <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52, 211, 153, 0.02) 0%, transparent 60%)', transform: 'translate(-50%, -50%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

          {/* Scene 1: Hero */}
          <motion.div 
            className="scroll-scene-slide"
            style={{ y: s1Y, zIndex: activeScene === 1 ? 10 : 1, pointerEvents: activeScene === 1 ? 'auto' : 'none' }}
          >
            <Hero />
          </motion.div>

          {/* Scene 2: Philosophy & Cybersecurity */}
          <motion.div 
            className="scroll-scene-slide"
            style={{ y: s2Y, zIndex: activeScene === 2 ? 10 : 2, pointerEvents: activeScene === 2 ? 'auto' : 'none' }}
          >
            <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto', padding: '0 2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
                <div>
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
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    { label: 'MITRE ATT&CK', desc: 'Automated threat mapping', num: '01' },
                    { label: 'SOC Analysis', desc: 'Log monitoring & triage', num: '02' },
                    { label: 'Incident Response', desc: 'Automated report generation', num: '03' },
                    { label: 'Penetration Testing', desc: 'Vulnerability assessment', num: '04' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="card-editorial"
                      style={{ padding: '1.5rem' }}
                    >
                      <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.75rem' }}>{item.num}</span>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-display)', margin: '0 0 0.35rem' }}>{item.label}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scene 3: Featured Projects */}
          <motion.div 
            className="scroll-scene-slide"
            style={{ y: s3Y, zIndex: activeScene === 3 ? 10 : 3, pointerEvents: activeScene === 3 ? 'auto' : 'none' }}
          >
            <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto', padding: '0 2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                <div>
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    // Featured Work
                  </p>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', margin: 0, fontFamily: 'var(--font-display)' }}>
                    Selected Projects
                  </h2>
                </div>
                <Link href="/projects" className="btn-secondary" style={{ padding: '0.6rem 1.3rem', fontSize: '0.8rem' }}>
                  View All <ArrowUpRight size={14} />
                </Link>
              </div>
              <FeaturedCarousel projects={featuredProjects} />
            </div>
          </motion.div>

          {/* Scene 4: Experience & Skills */}
          <motion.div 
            className="scroll-scene-slide"
            style={{ y: s4Y, zIndex: activeScene === 4 ? 10 : 4, pointerEvents: activeScene === 4 ? 'auto' : 'none' }}
          >
            <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto', padding: '0 2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                    <div>
                      <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        // History
                      </p>
                      <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', margin: 0, fontFamily: 'var(--font-display)' }}>
                        Experience
                      </h2>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { period: '2025 — Present', role: 'Freelance Developer & Security Consultant', org: 'Self-Employed', brief: 'Building security tools, full-stack dashboards, and advising clients on threat protocols.' },
                      { period: '2024 — Present', role: 'Social Media Sub Head', org: 'ACM Bennett University', brief: 'Managing digital channels, event media, and mentoring a junior content core team.' },
                      { period: '2024 — Present', role: 'Academic Researcher', org: 'Bennett University', brief: 'ML integration with web security, emergency SOS platform, SOC threat simulation.' },
                    ].map((exp, i) => (
                      <div
                        key={i}
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
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                    <div>
                      <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        // Stack
                      </p>
                      <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', margin: 0, fontFamily: 'var(--font-display)' }}>
                        Technologies
                      </h2>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {SKILLS.slice(0, 3).map((group, gi) => (
                      <div
                        key={group.category}
                        className="card-editorial"
                        style={{ padding: '1.25rem' }}
                      >
                        <h4 style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.8rem', fontFamily: 'var(--font-display)', margin: '0 0 0.75rem' }}>{group.category}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {group.items.slice(0, 4).map(skill => (
                            <span key={skill} style={{
                              padding: '0.2rem 0.55rem', borderRadius: '9999px', fontSize: '0.68rem', fontWeight: 500,
                              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: 'var(--text-muted)',
                            }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scene 5: Contact */}
          <motion.div 
            className="scroll-scene-slide"
            style={{ y: s5Y, zIndex: activeScene === 5 ? 10 : 5, pointerEvents: activeScene === 5 ? 'auto' : 'none' }}
          >
            <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', padding: '0 2rem' }}>
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
            </div>
          </motion.div>

        </div>
      </div>
    );
  };

  return renderContent();
}
