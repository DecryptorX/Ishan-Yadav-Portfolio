"use client";
import React from 'react';
import { motion } from 'framer-motion';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '1.25rem',
  padding: '2rem',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
  cursor: 'pointer',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const POSTS = [
  {
    title: 'Analyzing Windows Event Logs for Threat Signatures with Python',
    date: 'July 10, 2026',
    readTime: '6 min read',
    desc: 'An in-depth look at automating log parsing in security monitoring pipelines, scanning syslogs for brute-force threats, and mapping indicators to the MITRE ATT&CK framework.',
    tags: ['Cybersecurity', 'Python', 'Log Audits'],
    color: '#00e5ff'
  },
  {
    title: 'Integrating Custom Deep Learning Models into Next.js App Router APIs',
    date: 'June 24, 2026',
    readTime: '8 min read',
    desc: 'A complete workflow guide to passing dermoscopic images from Next.js frontends to Python Flask ML frameworks and returning classification records dynamically.',
    tags: ['AI/ML', 'Next.js', 'Flask'],
    color: '#ec4899'
  },
  {
    title: 'Configuring Secure OAuth Handshakes with NextAuth and LinkedIn API',
    date: 'May 12, 2026',
    readTime: '5 min read',
    desc: 'How to register applications in developer consoles, map OpenID session claims, retrieve profile properties, and establish secure gates for analytics dashboards.',
    tags: ['Web Security', 'NextAuth.js', 'APIs'],
    color: '#f59e0b'
  }
];

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 6rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '5rem', textAlign: 'center' }}
        >
          <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Articles</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '1rem' }}>Technical Blog</h1>
          <p style={{ color: 'rgba(148,163,184,0.75)', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
            Sharing investigations, workflows, and solutions in cybersecurity logs, software APIs, and AI integrations.
          </p>
        </motion.div>

        {/* Blog Posts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {POSTS.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              style={{ ...cardStyle }}
              whileHover={{ borderColor: `${post.color}35`, boxShadow: `0 15px 30px ${post.color}05` }}
              onClick={() => alert(`"${post.title}" will be fully readable soon! Keep an eye on updates.`)}
            >
              {/* Post Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: 'rgba(148,163,184,0.5)', fontSize: '0.8rem' }}>
                <span>📅 {post.date}</span>
                <span>⏱️ {post.readTime}</span>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: '1rem', transition: 'color 0.2s' }}>
                {post.title}
              </h2>

              {/* Description */}
              <p style={{ color: 'rgba(148, 163, 184, 0.8)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                {post.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {post.tags.map(t => (
                  <span key={t} style={{
                    padding: '0.2rem 0.6rem', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600,
                    background: `${post.color}10`, border: `1px solid ${post.color}20`, color: post.color,
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
