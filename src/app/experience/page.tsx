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
};

const ROLES = [
  {
    period: '2024 — Present',
    title: 'Social Media Sub Head',
    organization: 'ACM Bennett University Student Chapter',
    location: 'Greater Noida, India',
    color: '#00e5ff',
    type: 'Leadership & Community',
    responsibilities: [
      'Managed all digital channels and media assets for the university\'s ACM chapter, expanding community engagement by sharing security alerts and tech announcements.',
      'Organized and captured promotional event photography and high-quality recap videography for technical workshops.',
      'Supervised, mentored, and assigned tasks to a junior content core team of 5 members, establishing consistent release schedules.'
    ]
  },
  {
    period: '2025 — Present',
    title: 'Freelance Software Developer & Security Consultant',
    organization: 'Independent / Self-Employed',
    location: 'Gurgaon, India',
    color: '#f59e0b',
    type: 'Freelance Engineering',
    responsibilities: [
      'Engineered and custom-configured security monitoring tools for clients using Python, automating Linux syslog audits and threat log matching.',
      'Constructed responsive full-stack dashboards using React, Next.js, and Flask backend APIs, ensuring proper environment configuration and validation.',
      'Advised local clients on threat assessment protocols, secure session workflows, and credential handling best practices.'
    ]
  },
  {
    period: '2024 — Present',
    title: 'Academic Projects & Security Researcher',
    organization: 'Bennett University',
    location: 'Gurgaon, India',
    color: '#ec4899',
    type: 'Academic & Development',
    responsibilities: [
      'Researched and integrated machine learning algorithms with web security protocols, deploying full-stack deep learning classifiers.',
      'Designed safe notification dispatch structures and location services mapping for emergency emergency SOS setups (SAFEपथ platform).',
      'Modeled systems networks parameters to simulate enterprise environments for SOC threat evaluation.'
    ]
  },
  {
    period: 'Seeking Roles',
    title: 'SOC Analyst Intern / Software Developer Intern',
    organization: 'Active Candidate',
    location: 'Open to Remote / Hybrid / On-site',
    color: '#10b981',
    type: 'Career Focus',
    responsibilities: [
      'Ready to contribute to enterprise operations centers, monitor network traffic, analyze security incidents, and write custom automation scripts.',
      'Highly familiar with log analytics, Python script creation, Next.js / TypeScript code bases, and OWASP security guidelines.',
      'Committed to accelerating developer velocity while keeping defensive security controls tight.'
    ]
  }
];

export default function ExperiencePage() {
  const [experienceList, setExperienceList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/content/experience')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const colors = ['#00e5ff', '#f59e0b', '#ec4899', '#10b981'];
          const parsed = data.map((exp, idx) => ({
            ...exp,
            organization: exp.company,
            title: exp.role,
            color: colors[idx % colors.length],
            type: exp.description || 'Experience',
            responsibilities: exp.points ? exp.points.split('\n').map((p: any) => p.trim()).filter(Boolean) : []
          }));
          setExperienceList(parsed);
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090b', color: '#00ff88', fontFamily: 'monospace' }}>
        Loading experience history...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 6rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '5rem', textAlign: 'center' }}
        >
          <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>History</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '1rem' }}>Experience</h1>
          <p style={{ color: 'rgba(148,163,184,0.75)', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
            Club leadership, freelancing, security projects, and my current career objectives as an intern candidate.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative' }}>
          {experienceList.map((r, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ ...cardStyle }}
              whileHover={{ borderColor: `${r.color}35`, boxShadow: `0 15px 35px ${r.color}05` }}
            >
              {/* Top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(to right, ${r.color}, transparent)` }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                
                {/* Meta details */}
                <div>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '0.4rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    background: `${r.color}15`,
                    color: r.color,
                    border: `1px solid ${r.color}30`,
                    marginBottom: '1rem'
                  }}>
                    {r.type}
                  </span>
                  
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>{r.title}</h2>
                  <p style={{ color: 'rgba(226, 232, 240, 0.85)', fontSize: '0.9rem', fontWeight: 600 }}>{r.organization}</p>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', color: 'rgba(148,163,184,0.6)', fontSize: '0.8rem' }}>
                    <span>🗓️ {r.period}</span>
                    <span>📍 {r.location}</span>
                  </div>
                </div>

                {/* Responsibilities list */}
                <div>
                  <h3 style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '0.85rem' }}>Responsibilities &amp; Impact</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {r.responsibilities.map((resp: string, ri: number) => (
                      <li key={ri} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'rgba(148, 163, 184, 0.85)', fontSize: '0.86rem', lineHeight: 1.6 }}>
                        <span style={{ color: r.color, flexShrink: 0, marginTop: '0.15rem' }}>▹</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
