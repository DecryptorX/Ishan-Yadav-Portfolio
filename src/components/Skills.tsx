"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const SKILLS = [
  { category: 'Programming', color: '#f59e0b', items: ['Python', 'Java', 'JavaScript'] },
  { category: 'Web Development', color: '#00e5ff', items: ['React', 'Next.js', 'Flask', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { category: 'Databases', color: '#10b981', items: ['MySQL', 'MongoDB'] },
  { category: 'Developer Tools', color: '#6366f1', items: ['Git', 'GitHub', 'VS Code', 'Postman'] },
  { category: 'Operating Systems', color: '#ec4899', items: ['Windows', 'Linux'] },
];

export default function Skills() {
  return (
    <section id="skills" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>What I Know</p>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>Skills &amp; Technologies</h2>
          <p style={{ color: 'rgba(148,163,184,0.8)', fontSize: '0.95rem', marginBottom: '3rem', maxWidth: 500 }}>Technologies I&apos;ve worked with and use regularly.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
            {SKILLS.map((group, gi) => (
              <motion.div key={group.category}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: gi * 0.08 }}
                style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '1rem', padding: '1.25rem',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                whileHover={{ borderColor: `${group.color}33`, boxShadow: `0 0 20px ${group.color}10` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: group.color, boxShadow: `0 0 8px ${group.color}80` }} />
                  <h3 style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.9rem' }}>{group.category}</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {group.items.map(skill => (
                    <span key={skill} style={{
                      padding: '0.25rem 0.65rem', borderRadius: 999, fontSize: '0.78rem', fontWeight: 500,
                      background: `${group.color}12`, border: `1px solid ${group.color}28`, color: group.color,
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
