"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const SKILLS = [
  { category: 'Programming', color: '#ffffff', items: ['Python', 'Java', 'JavaScript'] },
  { category: 'Web Development', color: '#ffffff', items: ['React', 'Next.js', 'Flask', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { category: 'Databases', color: '#ffffff', items: ['MySQL', 'MongoDB'] },
  { category: 'Developer Tools', color: '#ffffff', items: ['Git', 'GitHub', 'VS Code', 'Postman'] },
  { category: 'Operating Systems', color: '#ffffff', items: ['Windows', 'Linux'] },
];

export default function Skills() {
  const [skillsList, setSkillsList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/content/skills')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const formatted = data.map(cat => ({
            category: cat.name,
            color: '#ffffff', // Unified luxury color
            items: (cat.skills || []).map((s: any) => s.name)
          }));
          setSkillsList(formatted);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
        Loading skills index...
      </div>
    );
  }

  return (
    <section id="skills" style={{ background: 'var(--bg)', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="section-container">
        
        {/* Asymmetrical Editorial Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '6rem', alignItems: 'start' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              // Stack & Tooling
            </p>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', fontFamily: 'var(--font-display)', margin: 0 }}>
              Technical Abilities
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ paddingTop: '1.25rem' }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: 'var(--font-sans)', fontWeight: 400, margin: 0 }}>
              A curated index of programming languages, frameworks, database systems, and runtime environments I use to design high-performance applications.
            </p>
          </motion.div>
        </div>

        {/* Asymmetric Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {skillsList.map((group, gi) => (
            <motion.div 
              key={group.category}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: gi * 0.05 }}
              style={{
                background: 'rgba(255, 255, 255, 0.01)', 
                border: '1px solid rgba(255, 255, 255, 0.04)',
                borderRadius: '1.5rem', 
                padding: '2rem',
                transition: 'border-color 0.3s, background-color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)'; e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.01)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>0{gi + 1} //</span>
                <h3 style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.94rem', fontFamily: 'var(--font-display)', margin: 0 }}>
                  {group.category}
                </h3>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {group.items.map((skill: string) => (
                  <span 
                    key={skill} 
                    style={{
                      padding: '0.35rem 0.95rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.75rem', 
                      fontWeight: 500,
                      background: 'rgba(255, 255, 255, 0.02)', 
                      border: '1px solid rgba(255, 255, 255, 0.04)', 
                      color: 'var(--text-muted)',
                      transition: 'color 0.25s, border-color 0.25s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'; e.currentTarget.style.color = '#ffffff'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
