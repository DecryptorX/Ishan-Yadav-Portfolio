"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
};

export default function SkillsPage() {
  const [skillsList, setSkillsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [groupColor, setGroupColor] = useState<string>('var(--accent-emerald)');

  useEffect(() => {
    fetch('/api/content/skills')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const parsed = data.map((cat, idx) => ({
            category: cat.name,
            color: idx % 2 === 0 ? 'var(--accent-emerald)' : '#ffffff',
            skills: (cat.skills || []).map((s: any) => ({
              name: s.name,
              level: s.level,
              exp: s.exp,
              projects: s.projects ? s.projects.split(',').map((p: any) => p.trim()).filter(Boolean) : [],
              desc: s.desc,
            })),
          }));
          setSkillsList(parsed);
          if (parsed[0]?.skills?.length > 0) {
            setSelectedSkill(parsed[0].skills[0]);
            setGroupColor(parsed[0].color);
          }
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
        Loading skills dashboard...
      </div>
    );
  }

  return (
    <div className="skills-page-container" style={{ minHeight: '100vh', background: 'var(--bg)', padding: '8rem 2rem 6rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Asymmetrical Editorial Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '5rem', alignItems: 'start' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              // Inventory
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', fontFamily: 'var(--font-display)', margin: 0 }}>
              Skills Index
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ paddingTop: '1.25rem' }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: 'var(--font-sans)', fontWeight: 400, margin: 0 }}>
              Interactive technical skill matrices. Select any capability badge to load telemetry profiles, operational experience, and system integrations.
            </p>
          </motion.div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3rem', alignItems: 'start' }} className="skills-dashboard-grid">
          
          {/* LEFT: Category Matrices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {skillsList.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: gi * 0.05 }}
                style={{ ...cardStyle }}
                whileHover={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
              >
                {/* Category Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: group.color, boxShadow: group.color === 'var(--accent-emerald)' ? '0 0 10px rgba(52, 211, 153, 0.4)' : 'none' }} />
                  <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)', margin: 0 }}>{group.category}</h2>
                </div>

                {/* Badge layout */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {group.skills.map((s: any) => {
                    const isSelected = selectedSkill && selectedSkill.name === s.name;
                    return (
                      <button
                        key={s.name}
                        onClick={() => { setSelectedSkill(s); setGroupColor(group.color); }}
                        style={{
                          padding: '0.4rem 1rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: isSelected ? '#ffffff' : 'rgba(255,255,255,0.02)',
                          color: isSelected ? '#050506' : 'var(--text-muted)',
                          border: isSelected ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.04)',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Detail Telemetry Panel */}
          {selectedSkill && (
            <div style={{ position: 'sticky', top: '7rem' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ ...cardStyle, borderLeft: `3px solid ${groupColor}` }}
                >
                  {/* Glowing outline header icon */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>// Telemetry Profile</span>
                      <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', marginTop: '0.35rem', letterSpacing: '-0.03em', fontFamily: 'var(--font-display)' }}>{selectedSkill.name}</h2>
                    </div>
                    <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>⚙️</span>
                  </div>

                  {/* Info blocks */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                    
                    {/* Stats grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '1rem' }}>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>Experience</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginTop: '0.35rem', fontFamily: 'var(--font-display)' }}>{selectedSkill.exp}</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '1rem' }}>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>Expertise</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: groupColor, marginTop: '0.35rem', fontFamily: 'var(--font-display)' }}>{selectedSkill.level}</div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div>
                      <h3 style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>Usage Summary</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{selectedSkill.desc}</p>
                    </div>

                    {/* Projects linked */}
                    {selectedSkill.projects && selectedSkill.projects.length > 0 && (
                      <div>
                        <h3 style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>Core Integrations</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {selectedSkill.projects.map((p: string) => (
                            <span key={p} style={{
                              padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 500,
                              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: 'var(--text-muted)'
                            }}>
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

        </div>

      </div>
      <style>{`
        @media (max-width: 820px) {
          .skills-dashboard-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .skills-dashboard-grid > div:last-child {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
