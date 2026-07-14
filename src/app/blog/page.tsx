"use client";
import React from 'react';
import { motion } from 'framer-motion';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.01)',
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  border: '1px solid rgba(255, 255, 255, 0.04)',
  borderRadius: '2rem',
  padding: '2.5rem',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
  cursor: 'pointer',
};

const POSTS = [
  {
    title: 'Analyzing Windows Event Logs for Threat Signatures with Python',
    date: 'July 10, 2026',
    readTime: '6 min read',
    desc: 'An in-depth look at automating log parsing in security monitoring pipelines, scanning syslogs for brute-force threats, and mapping indicators to the MITRE ATT&CK framework.',
    tags: ['Cybersecurity', 'Python', 'Log Audits'],
    color: 'var(--accent-emerald)'
  },
  {
    title: 'Integrating Custom Deep Learning Models into Next.js App Router APIs',
    date: 'June 24, 2026',
    readTime: '8 min read',
    desc: 'A complete workflow guide to passing dermoscopic images from Next.js frontends to Python Flask ML frameworks and returning classification records dynamically.',
    tags: ['AI/ML', 'Next.js', 'Flask'],
    color: '#ffffff'
  },
  {
    title: 'Configuring Secure OAuth Handshakes with NextAuth and LinkedIn API',
    date: 'May 12, 2026',
    readTime: '5 min read',
    desc: 'How to register applications in developer consoles, map OpenID session claims, retrieve profile properties, and establish secure gates for analytics dashboards.',
    tags: ['Web Security', 'NextAuth.js', 'APIs'],
    color: 'var(--accent-emerald)'
  }
];

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 6rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        {/* Asymmetrical Editorial Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '6rem', alignItems: 'start' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              // Articles
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', fontFamily: 'var(--font-display)', margin: 0 }}>
              Technical Blog
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ paddingTop: '1.25rem' }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: 'var(--font-sans)', fontWeight: 400, margin: 0 }}>
              Sharing technical investigations, system designs, and solutions in cybersecurity logging, software engineering, and AI interfaces.
            </p>
          </motion.div>
        </div>

        {/* Blog Posts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {POSTS.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
              style={{ ...cardStyle }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; }}
              onClick={() => alert(`"${post.title}" will be fully readable soon! Keep an eye on updates.`)}
            >
              {/* Post Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-subtle)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                {post.title}
              </h2>

              {/* Description */}
              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '2rem', margin: 0 }}>
                {post.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
                {post.tags.map(t => (
                  <span key={t} style={{
                    padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 500,
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: 'var(--text-muted)'
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
