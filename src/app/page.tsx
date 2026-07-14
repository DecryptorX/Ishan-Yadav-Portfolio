"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Hero from '../components/Hero';
import MarqueeStrip from '../components/MarqueeStrip';
import { SKILLS } from '../components/Skills';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.01)',
  border: '1px solid rgba(255, 255, 255, 0.04)',
  borderRadius: '1.5rem',
  padding: '2rem',
  position: 'relative',
  overflow: 'hidden',
  transition: 'border-color 0.3s, box-shadow 0.3s',
};

export default function Page() {
  const [featuredProjects, setFeaturedProjects] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/content/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const parsed = data.slice(0, 3).map(p => ({
            ...p,
            role: typeof p.role === 'string' ? p.role.split(',').map((r: any) => r.trim()).filter(Boolean) : p.role,
            features: typeof p.features === 'string' ? p.features.split('\n').map((f: any) => f.trim()).filter(Boolean) : p.features,
            tech: typeof p.tech === 'string' ? p.tech.split(',').map((t: any) => t.trim()).filter(Boolean) : p.tech,
          }));
          setFeaturedProjects(parsed);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Hero Section */}
      <Hero />

      {/* Marquee Strip */}
      <MarqueeStrip />

      {/* Short Introduction */}
      <section style={{ padding: '6rem 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                // Core Philosophy
              </p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>
                Securing the Future,<br />Building the Present.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
                I am Ishan Yadav, a B.Tech Computer Science & Engineering student at Bennett University. 
                I specialize in cybersecurity threat automation and software engineering, combining local artificial intelligence with practical security defenses.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/about" style={{
                  padding: '0.75rem 1.6rem', borderRadius: '9999px', fontWeight: 600, fontSize: '0.85rem',
                  background: '#ffffff', color: '#070708', border: 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'inline-block', textDecoration: 'none'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; }}>
                  About Me →
                </Link>
                <Link href="/journey" style={{
                  padding: '0.75rem 1.6rem', borderRadius: '9999px', fontWeight: 600, fontSize: '0.85rem',
                  background: 'transparent', color: '#ffffff', border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'inline-block', textDecoration: 'none'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = ''; }}>
                  My Journey →
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{ ...cardStyle }}
            >
              <div aria-hidden style={{ position: 'absolute', top: 0, right: 0, width: 150, height: 150, background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)', borderRadius: '50%', transform: 'translate(30%, -30%)' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>Current Focus</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {[
                  'Automating incident logs maps to MITRE ATT&CK framework',
                  'Developing web and AI applications using Next.js & Python',
                  'Gaining hands-on knowledge in Security Operations Center (SOC) flows',
                  'Contributing to ACM Bennett University as Social Media Sub Head',
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    <span style={{ color: '#ffffff', flexShrink: 0, marginTop: '0.15rem' }}>▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ padding: '6rem 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.03)', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                // Showcase
              </p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em', margin: 0, fontFamily: 'var(--font-display)' }}>
                Featured Projects
              </h2>
            </div>
            <Link href="/projects" style={{
              padding: '0.6rem 1.3rem', borderRadius: '9999px', fontWeight: 600, fontSize: '0.82rem',
              background: 'transparent', color: '#ffffff', border: '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'inline-block', textDecoration: 'none'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
              View All Projects →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {featuredProjects.map((p, idx) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ ...cardStyle, display: 'flex', flexDirection: 'column', height: '100%' }}
                whileHover={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', opacity: 0.08, fontFamily: 'var(--font-mono)' }}>{p.num}</span>
                  <span style={{
                    padding: '0.2rem 0.75rem', borderRadius: '9999px', fontSize: '0.68rem', fontWeight: 600,
                    background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.04)'
                  }}>
                    {p.status === 'live' ? 'Live' : p.status === 'in-development' ? 'In Dev' : 'Open Source'}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>{p.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>{p.tagline}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                  {p.description.slice(0, 160)}...
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {p.tech.slice(0, 4).map((t: string) => (
                    <span key={t} style={{ padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.72rem', background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                      Live Demo ↗
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none' }}>
                      GitHub ↗
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brief Skills Preview */}
      <section style={{ padding: '6rem 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                // Abilities
              </p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em', margin: 0, fontFamily: 'var(--font-display)' }}>
                Skills Preview
              </h2>
            </div>
            <Link href="/skills" style={{
              padding: '0.6rem 1.3rem', borderRadius: '9999px', fontWeight: 600, fontSize: '0.82rem',
              background: 'transparent', color: '#ffffff', border: '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'inline-block', textDecoration: 'none'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
              Explore All Skills →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {SKILLS.slice(0, 4).map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: gi * 0.08 }}
                style={{ ...cardStyle }}
                whileHover={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ffffff', opacity: 0.6 }} />
                  <h3 style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem', fontFamily: 'var(--font-display)' }}>{group.category}</h3>
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
                  {group.items.length > 4 && (
                    <span style={{ fontSize: '0.72rem', color: 'rgba(148,163,184,0.4)', padding: '0.25rem 0.35rem' }}>
                      +{group.items.length - 4} more
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA Section */}
      <section style={{ padding: '8rem 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.03)', background: 'rgba(255,255,255,0.01)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.01) 0%, transparent 70%)', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
            Let's build secure solutions together.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Interested in hiring me for a Cybersecurity/SOC Analyst/Software Engineering role? Let's get in touch and discuss how I can add value to your team.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              padding: '0.8rem 2rem', borderRadius: '9999px', fontWeight: 650, fontSize: '0.85rem',
              background: '#ffffff', color: '#070708', border: 'none', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'inline-block', textDecoration: 'none'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; }}>
              Get In Touch
            </Link>
            <Link href="/journey" style={{
              padding: '0.8rem 2rem', borderRadius: '9999px', fontWeight: 600, fontSize: '0.85rem',
              background: 'rgba(255,255,255,0.02)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'inline-block', textDecoration: 'none'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'; }}>
              Explore My Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
