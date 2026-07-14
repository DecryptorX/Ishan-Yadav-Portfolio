"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

// Mockup / Visual frame with mouse parallax zoom
function ProjectVisual({ p }: { p: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.01)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        cursor: 'pointer'
      }}
      className="project-visual-container"
    >
      {/* Visual Canvas */}
      <div style={{ padding: '4rem 2rem', position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/* Subtle grid backing */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        {/* Soft centered ambient glow */}
        <div aria-hidden style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)', filter: 'blur(30px)' }} />

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: '8rem', fontWeight: 900, fontFamily: 'var(--font-mono)', opacity: 0.03, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1 }}>
            {p.num}
          </span>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: '#ffffff', marginTop: '-1.5rem' }}>
            {p.title}
          </h4>
          <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {p.status}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projectsList, setProjectsList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeFilter, setActiveFilter] = React.useState('All');

  React.useEffect(() => {
    fetch('/api/content/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const parsed = data.map(p => ({
            ...p,
            role: typeof p.role === 'string' ? p.role.split(',').map((r: any) => r.trim()).filter(Boolean) : p.role,
            features: typeof p.features === 'string' ? p.features.split('\n').map((f: any) => f.trim()).filter(Boolean) : p.features,
            tech: typeof p.tech === 'string' ? p.tech.split(',').map((t: any) => t.trim()).filter(Boolean) : p.tech,
          }));
          setProjectsList(parsed);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getProjectCategories = (p: any) => {
    if (p.num === '01') return ['AI', 'Web', 'Backend', 'Hackathon'];
    if (p.num === '02') return ['Cybersecurity', 'Backend', 'Personal'];
    if (p.num === '03') return ['Hackathon', 'Web', 'AI'];
    if (p.num === '04') return ['Personal', 'AI', 'Backend'];
    
    const cats: string[] = ['All'];
    const techStr = (p.tech || []).join(' ').toLowerCase();
    if (techStr.includes('ai') || techStr.includes('tensorflow') || techStr.includes('ml')) cats.push('AI');
    if (techStr.includes('react') || techStr.includes('next.js') || techStr.includes('html')) cats.push('Web');
    if (techStr.includes('python') || techStr.includes('node') || techStr.includes('flask')) cats.push('Backend');
    if (techStr.includes('security') || techStr.includes('incident')) cats.push('Cybersecurity');
    return cats;
  };

  const filteredProjects = projectsList.filter(p => {
    if (activeFilter === 'All') return true;
    return getProjectCategories(p).includes(activeFilter);
  });

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
        Loading archives...
      </div>
    );
  }

  return (
    <section id="projects" style={{ background: 'var(--bg)', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      
      {/* Intro Header */}
      <div className="section-container" style={{ paddingBottom: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 800, marginBottom: '4rem' }}
        >
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            // Portfolio Index
          </p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>
            Selected Works
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.8 }}>
            Case studies of security log parsers, safety applications, and modular AI agents. Each represents a solution built with precise software architecture.
          </p>
        </motion.div>

        {/* Minimal Category Navigation bar */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '1.5rem', marginBottom: '6rem' }}>
          {['All', 'AI', 'Web', 'Backend', 'Cybersecurity', 'Hackathon', 'Personal'].map(cat => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.4rem 0',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 600 : 500,
                  fontFamily: 'var(--font-sans)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'color 0.3s'
                }}
              >
                {cat}
                {isActive && (
                  <motion.div 
                    layoutId="activeFilterLine"
                    style={{ position: 'absolute', bottom: -24, left: 0, right: 0, height: 1, background: '#ffffff' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Project Cases */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12rem' }}>
          {filteredProjects.map((p, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={p.num} 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1.1fr 1fr', 
                  gap: '5rem', 
                  alignItems: 'center',
                  minHeight: '65vh'
                }} 
                className="project-case-grid"
              >
                
                {/* Visual side (Left or Right) */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ order: isEven ? 1 : 2 }}
                >
                  <ProjectVisual p={p} />
                </motion.div>

                {/* Case Study Details side */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  style={{ order: isEven ? 2 : 1 }}
                >
                  {/* Number & Role */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      CASE {p.num}
                    </span>
                    <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      {p.role.join(' / ')}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#ffffff', letterSpacing: '-0.03em', margin: '0 0 0.5rem' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: 'var(--font-editorial)', margin: '0 0 2rem' }}>
                    {p.tagline}
                  </p>

                  {/* Editorial Layout: Problem, Solution, Results */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2.5rem' }}>
                    
                    {/* Problem */}
                    <div>
                      <h4 style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                        01 / Problem Statement
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                        {p.description}
                      </p>
                    </div>

                    {/* Solution */}
                    {p.features && p.features.length > 0 && (
                      <div>
                        <h4 style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
                          02 / Key Architecture & Systems
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          {p.features.slice(0, 3).map((f: string) => (
                            <div key={f} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff', opacity: 0.6 }} />
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Results / Highlights */}
                    {p.highlights && (
                      <div>
                        <h4 style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                          03 / Outcomes & Impact
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                          {p.highlights}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Tech stack */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
                    {p.tech.map((t: string) => (
                      <span 
                        key={t}
                        style={{
                          padding: '0.35rem 0.9rem',
                          borderRadius: '9999px',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          background: 'rgba(255, 255, 255, 0.01)',
                          color: '#ffffff',
                          fontSize: '0.72rem',
                          fontWeight: 500
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                        Live Case Study ↗
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', textDecoration: 'none' }}>
                        Source Code ↗
                      </a>
                    )}
                  </div>
                  
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        @media (max-width: 820px) {
          .project-case-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .project-case-grid > div {
            order: unset !important;
          }
        }
      `}</style>
    </section>
  );
}
