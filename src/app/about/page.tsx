"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.07)',
  borderRadius: '1.25rem',
  padding: '2rem',
  position: 'relative',
  overflow: 'hidden',
};

const INTERESTS = ['Cybersecurity', 'Software Development', 'Artificial Intelligence', 'Basketball', 'Photography', 'Video Editing'];

const STATS = [
  { value: '4+', label: 'Projects Built' },
  { value: '5+', label: 'Certifications' },
  { value: '2028', label: 'Graduation Year' },
  { value: '1.5k+', label: 'Hours Coding' }
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 4rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '4rem' }}
        >
          <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Get to Know Me</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '1rem' }}>About Me</h1>
          <p style={{ color: 'rgba(148,163,184,0.8)', fontSize: '1.05rem', maxWidth: 600, lineHeight: 1.6 }}>
            A B.Tech Computer Science student specializing in cybersecurity and building interactive software systems.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
          
          {/* Story Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Personal Story</h2>
              <p style={{ color: 'rgba(148, 163, 184, 0.9)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                I'm Ishan Yadav, a Cybersecurity Enthusiast and Software Developer based in Gurgaon, Haryana, India. 
                My path in tech started with a simple curiosity about how computers communicate and how systems can be defended.
              </p>
              <p style={{ color: 'rgba(148, 163, 184, 0.9)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                Currently, I'm pursuing a Bachelor of Technology in Computer Science &amp; Engineering at Bennett University. 
                Beyond university studies, I construct security automation utilities and practical deep learning integrations. 
                I believe that security should be a core component of software design rather than an afterthought.
              </p>
              <p style={{ color: 'rgba(148, 163, 184, 0.9)', fontSize: '0.92rem', lineHeight: 1.8 }}>
                I love turning complex requirements into simple, clean, and highly secure codebases. 
                Whether creating custom analysis scripts or engineering robust applications, I always strive for technical excellence.
              </p>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>My Philosophy</h2>
              <blockquote style={{ borderLeft: '3px solid #00e5ff', paddingLeft: '1rem', margin: 0, color: 'rgba(226,232,240,0.9)', fontSize: '0.92rem', fontStyle: 'italic', lineHeight: 1.7 }}>
                "Security is not a product, but a process. It relies on continuous monitoring, defensive coding, and a thorough understanding of potential threat patterns."
              </blockquote>
              <p style={{ color: 'rgba(148, 163, 184, 0.9)', fontSize: '0.88rem', lineHeight: 1.8, marginTop: '1rem' }}>
                I structure my projects to reflect this principle—handling data cleanly, maintaining secure session scopes, and designing interfaces with strict defensive checks.
              </p>
            </div>
          </motion.div>

          {/* Profile & Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {STATS.map((s, idx) => (
                <div key={idx} style={{ ...cardStyle, padding: '1.25rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#00e5ff', marginBottom: '0.2rem' }}>{s.value}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(148,163,184,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Profile Image & Meta */}
            <div style={{ ...cardStyle, display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{
                width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                border: '3px solid rgba(0, 229, 255, 0.3)'
              }}>
                <Image
                  src="/profile-ishan-v2.jpg"
                  alt="Ishan Yadav"
                  width={100}
                  height={100}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: 0 }}>Ishan Yadav</h3>
                <p style={{ fontSize: '0.82rem', color: '#00e5ff', fontWeight: 600, marginTop: '0.25rem' }}>CS Student &amp; Security Enthusiast</p>
                <p style={{ fontSize: '0.78rem', color: 'rgba(148,163,184,0.6)', marginTop: '0.5rem' }}>📍 Gurgaon, Haryana, India</p>
              </div>
            </div>

            {/* Current Focus */}
            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Current Focus</h2>
              <p style={{ color: 'rgba(148, 163, 184, 0.9)', fontSize: '0.92rem', lineHeight: 1.8 }}>
                Currently, I am diving deep into the Security Operations Center (SOC) analyst responsibilities, learning to monitor enterprise threats, and parsing log formats. 
                At the same time, I am building full stack React and Next.js interfaces that leverage ML pipelines for security audits.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Education & Interests */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={cardStyle}
          >
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>Education</h2>
            <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, #00e5ff, transparent)' }} />
              
              <div style={{ position: 'absolute', left: -4, top: 4, width: 9, height: 9, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 8px rgba(0,229,255,0.6)' }} />
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.95rem' }}>B.Tech — Computer Science &amp; Engineering</p>
                <p style={{ color: '#00e5ff', fontSize: '0.82rem', fontWeight: 500, marginTop: '0.2rem' }}>Bennett University</p>
                <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.8rem', marginTop: '0.2rem' }}>2024 — 2028 &nbsp;·&nbsp; CGPA: 6.7 / 10</p>
                <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.82rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                  Focusing on networks, systems security, database architectures, and artificial intelligence models.
                </p>
              </div>

              <div style={{ position: 'absolute', left: -4, top: 120, width: 9, height: 9, borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 8px rgba(99,102,241,0.5)' }} />
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.95rem' }}>Class XII — Mathematics (NIOS)</p>
                <p style={{ color: '#6366f1', fontSize: '0.82rem', fontWeight: 500, marginTop: '0.2rem' }}>St. Xavier's High School</p>
                <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.8rem', marginTop: '0.2rem' }}>CBSE &nbsp;·&nbsp; 69.2%</p>
              </div>

              <div style={{ position: 'absolute', left: -4, top: 215, width: 9, height: 9, borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 8px rgba(99,102,241,0.5)' }} />
              <div>
                <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.95rem' }}>Class X</p>
                <p style={{ color: '#6366f1', fontSize: '0.82rem', fontWeight: 500, marginTop: '0.2rem' }}>St. Xavier's High School</p>
                <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.8rem', marginTop: '0.2rem' }}>CBSE &nbsp;·&nbsp; 82%</p>
              </div>
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ ...cardStyle, display: 'flex', flexDirection: 'column' }}
          >
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>Interests &amp; Hobbies</h2>
            <p style={{ color: 'rgba(148, 163, 184, 0.9)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              When I'm not writing code or looking at threat signatures, I spend time on a variety of creative and active pursuits:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {INTERESTS.map(i => (
                <span key={i} style={{ padding: '0.4rem 0.9rem', borderRadius: 999, background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.15)', color: 'rgba(226,232,240,0.85)', fontSize: '0.82rem' }}>
                  {i}
                </span>
              ))}
            </div>
            <p style={{ color: 'rgba(148, 163, 184, 0.9)', fontSize: '0.88rem', lineHeight: 1.7, marginTop: 'auto' }}>
              I enjoy basketball for focus and teamwork, and photography/video editing for composition and digital art design.
            </p>
          </motion.div>
        </div>

        {/* Journey Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(0,229,255,0.02) 0%, rgba(99,102,241,0.02) 100%)', border: '1px solid rgba(0,229,255,0.12)', textAlign: 'center', padding: '3rem 2rem' }}
        >
          <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>My Progress</p>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Interested in my coding milestones?</h2>
          <p style={{ color: 'rgba(148, 163, 184, 0.8)', fontSize: '0.92rem', maxWidth: 540, margin: '0 auto 2rem', lineHeight: 1.6 }}>
            I have kept a detailed milestone log of all my academic stages, project releases, and certificates earned during my studies.
          </p>
          <Link href="/journey" style={{
            padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.9rem',
            background: '#00e5ff', color: '#000', border: 'none', transition: 'all 0.2s',
            boxShadow: '0 0 20px rgba(0,229,255,0.2)', display: 'inline-block'
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,229,255,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,255,0.2)'; }}>
            View Full Journey →
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
