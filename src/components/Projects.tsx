"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const PROJECTS = [
  {
    num: '01',
    title: 'SkinVision AI',
    tagline: 'AI-powered skin disease detection platform',
    role: ['Full Stack Developer', 'AI Integration'],
    description:
      'An intelligent web application that leverages deep learning to analyse skin images and detect potential skin conditions. Built with a Flask backend handling the ML inference pipeline and a Next.js frontend delivering a seamless, mobile-first experience.',
    features: [
      'AI-powered dermoscopic image analysis',
      'Real-time skin condition detection',
      'Location-based dermatologist finder',
      'Responsive mobile-first UI',
      'Secure image upload pipeline',
    ],
    tech: ['Python', 'Flask', 'React', 'Next.js', 'Tailwind CSS', 'TensorFlow'],
    highlights:
      'Built the full ML pipeline from data preprocessing through model training to API serving. Integrated location services for dermatologist discovery.',
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
    description:
      'A professional-grade Python security tool that ingests Windows Event Logs and Linux syslog files, runs pattern-matching detection for common attack signatures — brute-force, privilege escalation, lateral movement — and produces structured incident reports.',
    features: [
      'Windows & Linux log parsing engine',
      'Brute-force and anomaly detection',
      'Privilege escalation pattern matching',
      'Structured HTML & JSON report generation',
      'Configurable detection rule sets',
    ],
    tech: ['Python', 'RegEx', 'Linux', 'Windows', 'JSON'],
    highlights:
      'Developed custom detection rules mapped to MITRE ATT&CK techniques, reducing manual log review time by automating pattern recognition across thousands of events.',
    github:
      'https://github.com/DecryptorX/Automated-Log-Analyzer-and-Reporting-Script',
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
    description:
      "A community-driven safety platform for women's security. Features real-time emergency SOS dispatch, AI-assisted threat monitoring, crowd-sourced safety heatmaps, and community engagement tools — all in a mobile-first progressive web app.",
    features: [
      'Real-time emergency SOS dispatch',
      'AI-assisted safety monitoring',
      'Community safety heatmaps',
      'Safe route recommendations',
      'Incident reporting & tracking',
    ],
    tech: ['React', 'Next.js', 'Node.js', 'MongoDB', 'AI/ML'],
    highlights:
      'Designed the AI safety scoring system and the emergency contact notification pipeline. Prioritised sub-second response times for SOS alerts.',
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
    description:
      'A modular desktop AI assistant built around OpenRouter-hosted LLMs, persistent conversational memory, a local-first tool-calling framework, and a planned PC automation layer — designed for offline-capable, privacy-preserving everyday use.',
    features: [
      'Natural voice interaction pipeline',
      'Persistent conversational memory',
      'OpenRouter LLM integration',
      'Modular tool-calling architecture',
      'PC automation capabilities (planned)',
    ],
    tech: ['Python', 'LLM APIs', 'Voice Recognition', 'Tool Calling', 'SQLite'],
    highlights:
      'Architecting a clean separation between the conversation manager, tool dispatcher, and response synthesiser to enable future multi-modal automation.',
    github: '',
    status: 'in-development',
    color: '#6366f1',
    accent: '#6366f1',
    gradFrom: '#07001e',
    gradTo: '#0f0028',
  },
];

/* ── Browser frame mockup ─────────────────────────────────────── */
function Mockup({ p, flip }: { p: typeof PROJECTS[0]; flip: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: flip ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%' }}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.015 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: `0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07), 0 0 60px ${p.accent}18`,
          background: `linear-gradient(160deg, ${p.gradFrom} 0%, ${p.gradTo} 100%)`,
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            background: 'rgba(0,0,0,0.5)',
            padding: '0.6rem 0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
              <div
                key={c}
                style={{ width: 9, height: 9, borderRadius: '50%', background: c }}
              />
            ))}
          </div>
          <div
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '0.3rem',
              height: '1.35rem',
              display: 'flex',
              alignItems: 'center',
              padding: '0 0.6rem',
              gap: '0.4rem',
            }}
          >
            <span style={{ fontSize: 8, color: p.accent, opacity: 0.7 }}>🔒</span>
            <div
              style={{
                height: 4,
                background: 'rgba(255,255,255,0.12)',
                borderRadius: 2,
                flex: 1,
              }}
            />
          </div>
        </div>

        {/* Content canvas */}
        <div
          style={{
            height: 300,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          {/* Grid lines */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(${p.accent}0a 1px, transparent 1px), linear-gradient(90deg, ${p.accent}0a 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
            }}
          />

          {/* Glow */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${p.accent}28 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Project number + title */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div
              style={{
                fontSize: '4.5rem',
                fontWeight: 900,
                color: p.accent,
                opacity: 0.12,
                lineHeight: 1,
                letterSpacing: '-0.06em',
                fontFamily: 'monospace',
              }}
            >
              {p.num}
            </div>
            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#f1f5f9',
                marginTop: '0.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              {p.title}
            </div>
            <div
              style={{
                marginTop: '0.6rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.35rem',
                justifyContent: 'center',
              }}
            >
              {p.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  style={{
                    padding: '0.2rem 0.55rem',
                    borderRadius: 999,
                    fontSize: '0.68rem',
                    background: `${p.accent}15`,
                    border: `1px solid ${p.accent}30`,
                    color: p.accent,
                    fontWeight: 600,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Status dot */}
            <div
              style={{
                marginTop: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.25rem 0.75rem',
                borderRadius: 999,
                background:
                  p.status === 'live'
                    ? 'rgba(16,185,129,0.12)'
                    : p.status === 'in-development'
                    ? 'rgba(245,158,11,0.12)'
                    : 'rgba(99,102,241,0.12)',
                border: `1px solid ${
                  p.status === 'live'
                    ? 'rgba(16,185,129,0.3)'
                    : p.status === 'in-development'
                    ? 'rgba(245,158,11,0.3)'
                    : 'rgba(99,102,241,0.3)'
                }`,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background:
                    p.status === 'live'
                      ? '#10b981'
                      : p.status === 'in-development'
                      ? '#f59e0b'
                      : '#6366f1',
                  animation: p.status === 'live' ? 'blink 2s ease-in-out infinite' : 'none',
                }}
              />
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  color:
                    p.status === 'live'
                      ? '#10b981'
                      : p.status === 'in-development'
                      ? '#f59e0b'
                      : '#6366f1',
                  textTransform: 'uppercase',
                }}
              >
                {p.status === 'live'
                  ? 'Live'
                  : p.status === 'in-development'
                  ? 'In Development'
                  : 'Open Source'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Feature checklist item ───────────────────────────────────── */
function Feature({
  text,
  accent,
  i,
}: {
  text: string;
  accent: string;
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: i * 0.07 }}
      style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.55rem' }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: `${accent}20`,
          border: `1px solid ${accent}50`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 1,
          fontSize: '0.6rem',
          color: accent,
          fontWeight: 900,
        }}
      >
        ✓
      </span>
      <span style={{ fontSize: '0.88rem', color: 'rgba(226,232,240,0.8)', lineHeight: 1.5 }}>
        {text}
      </span>
    </motion.div>
  );
}

/* ── Main component ───────────────────────────────────────────── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = React.useState('All');

  const getProjectCategories = (p: typeof PROJECTS[0]) => {
    if (p.num === '01') return ['AI', 'Web', 'Backend', 'Hackathon'];
    if (p.num === '02') return ['Cybersecurity', 'Backend', 'Personal'];
    if (p.num === '03') return ['Hackathon', 'Web', 'AI'];
    if (p.num === '04') return ['Personal', 'AI', 'Backend'];
    return [];
  };

  const filteredProjects = PROJECTS.filter(p => {
    if (activeFilter === 'All') return true;
    return getProjectCategories(p).includes(activeFilter);
  });

  return (
    <section
      id="projects"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(9,9,11,0.85)' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 2rem' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <p
            style={{
              fontSize: '0.78rem',
              color: '#00e5ff',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            What I&apos;ve Built
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 800,
              color: '#f1f5f9',
              letterSpacing: '-0.04em',
              marginBottom: '0.5rem',
            }}
          >
            Projects
          </h2>
          <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.95rem', maxWidth: 480 }}>
            A selection of projects I&apos;ve designed, built, and shipped — each one a real
            problem solved with code.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '4rem', justifyContent: 'center' }}>
          {['All', 'AI', 'Web', 'Backend', 'Cybersecurity', 'Hackathon', 'Personal'].map(cat => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '0.45rem 1.25rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  background: isActive ? '#00ff88' : 'rgba(255,255,255,0.02)',
                  color: isActive ? '#000' : 'rgba(226, 232, 240, 0.65)',
                  border: isActive ? '1px solid #00ff88' : '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: isActive ? '0 0 15px rgba(0,255,136,0.2)' : 'none'
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = 'rgba(226, 232, 240, 0.65)';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {filteredProjects.map((p, idx) => {
            const flip = idx % 2 !== 0;
            return (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Outer glass card */}
                <div
                  style={{
                    background: 'rgba(9,9,11,0.7)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: `1px solid ${p.accent}18`,
                    borderRadius: '1.5rem',
                    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                    boxShadow: `0 8px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px ${p.accent}06`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Subtle corner glow */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      width: 300,
                      height: 300,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${p.accent}08 0%, transparent 70%)`,
                      top: flip ? 'auto' : -80,
                      bottom: flip ? -80 : 'auto',
                      left: flip ? 'auto' : -80,
                      right: flip ? -80 : 'auto',
                      pointerEvents: 'none',
                    }}
                  />

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '2.5rem',
                      alignItems: 'center',
                    }}
                  >
                    {/* TEXT side */}
                    <div style={{ order: flip ? 2 : 1 }}>
                      {/* Number + tagline */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            color: p.accent,
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            opacity: 0.7,
                          }}
                        >
                          {p.num}
                        </span>
                        <div
                          style={{
                            height: 1,
                            width: 32,
                            background: `linear-gradient(90deg, ${p.accent}60, transparent)`,
                          }}
                        />
                      </div>

                      <h3
                        style={{
                          fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                          fontWeight: 800,
                          color: '#f1f5f9',
                          letterSpacing: '-0.03em',
                          marginBottom: '0.35rem',
                        }}
                      >
                        {p.title}
                      </h3>

                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: p.accent,
                          fontWeight: 600,
                          marginBottom: '1rem',
                          opacity: 0.9,
                        }}
                      >
                        {p.tagline}
                      </p>

                      <p
                        style={{
                          fontSize: '0.87rem',
                          color: 'rgba(148,163,184,0.8)',
                          lineHeight: 1.75,
                          marginBottom: '1.25rem',
                        }}
                      >
                        {p.description}
                      </p>

                      {/* Features */}
                      <div style={{ marginBottom: '1.25rem' }}>
                        <p
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'rgba(148,163,184,0.5)',
                            marginBottom: '0.6rem',
                          }}
                        >
                          Key Features
                        </p>
                        {p.features.map((f, i) => (
                          <Feature key={f} text={f} accent={p.accent} i={i} />
                        ))}
                      </div>

                      {/* Tech badges */}
                      <div style={{ marginBottom: '1.25rem' }}>
                        <p
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'rgba(148,163,184,0.5)',
                            marginBottom: '0.55rem',
                          }}
                        >
                          Technologies
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {p.tech.map((t) => (
                            <span
                              key={t}
                              style={{
                                padding: '0.25rem 0.65rem',
                                borderRadius: 999,
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                background: `${p.accent}10`,
                                border: `1px solid ${p.accent}25`,
                                color: p.accent,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Role */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <p
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'rgba(148,163,184,0.5)',
                            marginBottom: '0.45rem',
                          }}
                        >
                          My Role
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {p.role.map((r) => (
                            <span
                              key={r}
                              style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: 999,
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'rgba(226,232,240,0.8)',
                              }}
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                        {p.demo && (
                          <motion.a
                            href={p.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                              padding: '0.6rem 1.4rem',
                              borderRadius: '0.5rem',
                              background: p.accent,
                              color: '#000',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              boxShadow: `0 0 20px ${p.accent}30`,
                            }}
                          >
                            ↗ Live Demo
                          </motion.a>
                        )}
                        {p.github && (
                          <motion.a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                              padding: '0.6rem 1.4rem',
                              borderRadius: '0.5rem',
                              background: 'transparent',
                              color: 'rgba(226,232,240,0.85)',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              border: '1px solid rgba(255,255,255,0.15)',
                            }}
                          >
                            GitHub ↗
                          </motion.a>
                        )}
                        {!p.github && p.status === 'in-development' && (
                          <span
                            style={{
                              padding: '0.6rem 1.4rem',
                              borderRadius: '0.5rem',
                              background: 'rgba(245,158,11,0.1)',
                              border: '1px solid rgba(245,158,11,0.25)',
                              color: '#f59e0b',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                            }}
                          >
                            ⚡ In Development
                          </span>
                        )}
                      </div>
                    </div>

                    {/* IMAGE side */}
                    <div style={{ order: flip ? 1 : 2 }}>
                      <Mockup p={p} flip={flip} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </section>
  );
}
