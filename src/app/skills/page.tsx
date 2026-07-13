"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
};

interface Skill {
  name: string;
  level: string;
  exp: string;
  projects: string[];
  desc: string;
}

interface SkillGroup {
  category: string;
  color: string;
  skills: Skill[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Programming Languages',
    color: '#f59e0b',
    skills: [
      { name: 'Python', level: 'Proficient', exp: '3 Years', projects: ['SkinVision AI', 'Automated Log Analyzer', 'JARVIS AI Agent'], desc: 'Used for backend API creation, deep learning classification pipeline builds, and raw logs regex parser script engineering.' },
      { name: 'Java', level: 'Amateur', exp: '2 Years', projects: ['Academic Algorithms', 'Object-Oriented structures'], desc: 'Applied in college coursework to implement computational data structures, logical recursion, and algorithmic processes.' },
      { name: 'JavaScript', level: 'Amateur', exp: '3 Years', projects: ['SAFEपथ', 'Interactive Portfolio'], desc: 'Underpins all interactive browser scripting, DOM tracking, cursor trailing interpolations, and animations.' }
    ]
  },
  {
    category: 'Frameworks & Frontend',
    color: '#00e5ff',
    skills: [
      { name: 'React', level: 'Amateur', exp: '2.5 Years', projects: ['SAFEपथ', 'Portfolio'], desc: 'Built modular component systems, interactive mapping grids, and responsive state handlers.' },
      { name: 'Next.js', level: 'Amateur', exp: '2 Years', projects: ['SkinVision AI', 'Portfolio App Router'], desc: 'Leveraged Next.js App Router for layouts routing transitions, server-side dynamic analytics pipelines, and API hooks.' },
      { name: 'Flask', level: 'Amateur', exp: '2 Years', projects: ['SkinVision AI', 'JARVIS AI Agent'], desc: 'Utilized as lightweight backend gateways to run Python inference classification scripts and process JSON client calls.' },
      { name: 'Tailwind CSS', level: 'Amateur', exp: '2.5 Years', projects: ['All Web Projects'], desc: 'Used to write utility styling tokens, custom layouts responsive grids, and design system templates.' }
    ]
  },
  {
    category: 'Databases & DevOps',
    color: '#10b981',
    skills: [
      { name: 'MongoDB', level: 'Amateur', exp: '2 Years', projects: ['SAFEपथ'], desc: 'Managed schema structures for geolocation heatmaps, user records, and threat reporting logs.' },
      { name: 'MySQL', level: 'Amateur', exp: '2.5 Years', projects: ['Academic Databases', 'Admin Analytics'], desc: 'Constructed relational entity maps, transaction indexing, and optimized SQL procedures.' },
      { name: 'Git & GitHub', level: 'Amateur', exp: '3 Years', projects: ['All Projects'], desc: 'Controlled branches, semantic tags, release structures, actions automation workflows, and collaborative pull request audits.' }
    ]
  },
  {
    category: 'Cybersecurity Operations',
    color: '#a855f7',
    skills: [
      { name: 'Log Security Auditing', level: 'Amateur', exp: '1.5 Years', projects: ['Automated Log Analyzer'], desc: 'Parsed raw syslog streams, verified authentication footprints, and configured anomalous event notifications.' },
      { name: 'MITRE ATT&CK Mapping', level: 'Amateur', exp: '1.5 Years', projects: ['Automated Log Analyzer'], desc: 'Mapped event behaviors (e.g. brute-force, privilege escalation attempts) to standard threat IDs.' },
      { name: 'System Hardening', level: 'Amateur', exp: '1 Year', projects: ['Sandbox Lab Setups'], desc: 'Audited directory credential scopes, port listening logs, and configured system firewalls.' }
    ]
  }
];

export default function SkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILL_GROUPS[0].skills[0]);
  const [groupColor, setGroupColor] = useState<string>(SKILL_GROUPS[0].color);

  return (
    <div className="skills-page-container" style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '5rem', textAlign: 'center' }}
        >
          <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Inventory</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '1rem' }}>Skills Dashboard</h1>
          <p style={{ color: 'rgba(148,163,184,0.75)', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
            Interactive skills matrices. Click any technical badge to load operational statistics, years of experience, and project integrations.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          
          {/* LEFT: Category Matrices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {SKILL_GROUPS.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.05 }}
                style={{ ...cardStyle, padding: '1.5rem' }}
                whileHover={{ borderColor: `${group.color}25` }}
              >
                {/* Category Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: group.color }} />
                  <h2 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#f1f5f9' }}>{group.category}</h2>
                </div>

                {/* Badge layout */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {group.skills.map((s) => {
                    const isSelected = selectedSkill.name === s.name;
                    return (
                      <button
                        key={s.name}
                        onClick={() => { setSelectedSkill(s); setGroupColor(group.color); }}
                        style={{
                          padding: '0.35rem 0.85rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          background: isSelected ? group.color : 'rgba(255,255,255,0.02)',
                          color: isSelected ? '#000' : 'rgba(226, 232, 240, 0.75)',
                          border: isSelected ? `1px solid ${group.color}` : '1px solid rgba(255, 255, 255, 0.06)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          boxShadow: isSelected ? `0 0 12px ${group.color}25` : 'none'
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
          <div style={{ position: 'sticky', top: '7rem' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                style={{ ...cardStyle, borderLeft: `4px solid ${groupColor}` }}
              >
                {/* Glowing outline header icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: groupColor, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Telemetry Profile</span>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 850, color: '#f1f5f9', marginTop: '0.2rem', letterSpacing: '-0.03em' }}>{selectedSkill.name}</h2>
                  </div>
                  <span style={{ fontSize: '1.75rem' }}>⚙️</span>
                </div>

                {/* Info blocks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                  
                  {/* Stats grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '0.5rem' }}>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Experience</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f1f5f9', marginTop: '0.2rem' }}>{selectedSkill.exp}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '0.5rem' }}>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Expertise</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: groupColor, marginTop: '0.2rem' }}>{selectedSkill.level}</div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h3 style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '0.5rem' }}>Usage Summary</h3>
                    <p style={{ color: 'rgba(148, 163, 184, 0.85)', fontSize: '0.9rem', lineHeight: 1.6 }}>{selectedSkill.desc}</p>
                  </div>

                  {/* Projects linked */}
                  <div>
                    <h3 style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '0.75rem' }}>Core Integrations</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {selectedSkill.projects.map(p => (
                        <span key={p} style={{
                          padding: '0.2rem 0.6rem', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600,
                          background: `${groupColor}10`, border: `1px solid ${groupColor}20`, color: groupColor
                        }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
        <style>{`
          .skills-page-container {
            padding: 8rem 2rem 6rem;
          }
          @media (max-width: 640px) {
            .skills-page-container {
              padding: 5rem 1rem 4rem !important;
            }
          }
        `}</style>
    </div>
  );
}
