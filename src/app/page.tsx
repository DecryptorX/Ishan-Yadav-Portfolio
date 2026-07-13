"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Hero from '../components/Hero';
import MarqueeStrip from '../components/MarqueeStrip';
import { PROJECTS } from '../components/Projects';
import { SKILLS } from '../components/Skills';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.07)',
  borderRadius: '1.25rem',
  padding: '2rem',
  position: 'relative',
  overflow: 'hidden',
  transition: 'border-color 0.3s, box-shadow 0.3s',
};

export default function Page() {
  // Preview 3 projects for the home page
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Hero Section */}
      <Hero />

      {/* Marquee Strip */}
      <MarqueeStrip />

      {/* Short Introduction */}
      <section style={{ padding: '6rem 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.04)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Intro</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                Securing the Future,<br />Building the Present.
              </h2>
              <p style={{ color: 'rgba(148, 163, 184, 0.85)', fontSize: '0.98rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                I'm Ishan Yadav, a B.Tech Computer Science & Engineering student at Bennett University. 
                I specialize in cybersecurity threat automation and software engineering, combining local artificial intelligence with practical security defenses.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/about" style={{
                  padding: '0.7rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.85rem',
                  background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.2s', display: 'inline-block'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#00e5ff'; e.currentTarget.style.color = '#00e5ff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}>
                  About Me →
                </Link>
                <Link href="/journey" style={{
                  padding: '0.7rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.85rem',
                  background: 'transparent', color: 'rgba(226,232,240,0.8)', border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.2s', display: 'inline-block'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.color = '#818cf8'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(226,232,240,0.8)'; }}>
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
              <div aria-hidden style={{ position: 'absolute', top: 0, right: 0, width: 150, height: 150, background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)', borderRadius: '50%', transform: 'translate(30%, -30%)' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem' }}>Current Focus</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {[
                  'Automating incident logs maps to MITRE ATT&CK framework',
                  'Developing web and AI applications using Next.js & Python',
                  'Gaining hands-on knowledge in Security Operations Center (SOC) flows',
                  'Contributing to ACM Bennett University as Social Media Sub Head',
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'rgba(148,163,184,0.85)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    <span style={{ color: '#00e5ff', flexShrink: 0, marginTop: '0.15rem' }}>▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ padding: '6rem 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.04)', background: 'rgba(9,9,11,0.5)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Works</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em', margin: 0 }}>Featured Projects</h2>
            </div>
            <Link href="/projects" style={{
              padding: '0.6rem 1.3rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.85rem',
              background: 'transparent', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.3)',
              transition: 'all 0.2s', display: 'inline-block'
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
              View All Projects →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {featuredProjects.map((p, idx) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ ...cardStyle, display: 'flex', flexDirection: 'column', height: '100%' }}
                whileHover={{ borderColor: `${p.accent}40`, boxShadow: `0 10px 30px ${p.accent}08` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: p.accent, opacity: 0.25, fontFamily: 'monospace' }}>{p.num}</span>
                  <span style={{
                    padding: '0.15rem 0.6rem', borderRadius: 999, fontSize: '0.68rem', fontWeight: 700,
                    background: `${p.accent}15`, color: p.accent, border: `1px solid ${p.accent}30`
                  }}>
                    {p.status === 'live' ? 'Live' : p.status === 'in-development' ? 'In Development' : 'Open Source'}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.5rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.82rem', color: p.accent, fontWeight: 600, marginBottom: '1rem' }}>{p.tagline}</p>
                <p style={{ color: 'rgba(148,163,184,0.75)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                  {p.description.slice(0, 160)}...
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {p.tech.slice(0, 4).map(t => (
                    <span key={t} style={{ padding: '0.2rem 0.55rem', borderRadius: 999, fontSize: '0.7rem', background: 'rgba(255,255,255,0.04)', color: 'rgba(226,232,240,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ color: '#00e5ff', fontSize: '0.8rem', fontWeight: 700 }}>
                      Live Demo ↗
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(226,232,240,0.65)', fontSize: '0.8rem', fontWeight: 700 }}>
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
      <section style={{ padding: '6rem 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.04)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Abilities</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em', margin: 0 }}>Skills Preview</h2>
            </div>
            <Link href="/skills" style={{
              padding: '0.6rem 1.3rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.85rem',
              background: 'transparent', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.3)',
              transition: 'all 0.2s', display: 'inline-block'
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
              Explore All Skills →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {SKILLS.slice(0, 4).map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: gi * 0.08 }}
                style={{ ...cardStyle }}
                whileHover={{ borderColor: `${group.color}33`, boxShadow: `0 0 20px ${group.color}10` }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: group.color, boxShadow: `0 0 6px ${group.color}80` }} />
                  <h3 style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.85rem' }}>{group.category}</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {group.items.slice(0, 4).map(skill => (
                    <span key={skill} style={{
                      padding: '0.2rem 0.55rem', borderRadius: 999, fontSize: '0.72rem', fontWeight: 500,
                      background: `${group.color}12`, border: `1px solid ${group.color}28`, color: group.color,
                    }}>
                      {skill}
                    </span>
                  ))}
                  {group.items.length > 4 && (
                    <span style={{ fontSize: '0.72rem', color: 'rgba(148,163,184,0.5)', padding: '0.2rem 0.3rem' }}>
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
      <section style={{ padding: '8rem 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.04)', background: 'rgba(0,229,255,0.01)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.03) 0%, transparent 70%)', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '1rem' }}>
            Let's build secure solutions together.
          </h2>
          <p style={{ color: 'rgba(148,163,184,0.8)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Interested in hiring me for a Cybersecurity/SOC Analyst/Software Engineering role? Let's get in touch and discuss how I can add value to your team.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              padding: '0.8rem 2rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.92rem',
              background: '#00e5ff', color: '#000', border: 'none', transition: 'all 0.2s',
              boxShadow: '0 0 20px rgba(0,229,255,0.2)', display: 'inline-block'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,229,255,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,255,0.2)'; }}>
              Get In Touch
            </Link>
            <Link href="/journey" style={{
              padding: '0.8rem 2rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.92rem',
              background: 'rgba(255,255,255,0.04)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.2s', display: 'inline-block'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}>
              Explore My Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
