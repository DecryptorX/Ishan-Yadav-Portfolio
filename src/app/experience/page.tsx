"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ExperiencePage() {
  const [experienceList, setExperienceList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const FALLBACK_ROLES = [
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

    fetch('/api/content/experience')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const parsed = data.map((exp, idx) => ({
            ...exp,
            organization: exp.company,
            title: exp.role,
            type: exp.description || 'Experience',
            responsibilities: exp.points ? exp.points.split('\n').map((p: any) => p.trim()).filter(Boolean) : []
          }));
          setExperienceList(parsed);
        } else {
          setExperienceList(FALLBACK_ROLES);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setExperienceList(FALLBACK_ROLES);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
        Loading experience...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 6rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Asymmetrical editorial header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '5rem', alignItems: 'start' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              // History
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', fontFamily: 'var(--font-display)', margin: 0 }}>
              Experience
            </h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ paddingTop: '1.25rem' }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: 'var(--font-sans)', fontWeight: 400, margin: 0 }}>
              Club leadership, freelance engineering, security research, and career aspirations as an intern candidate.
            </p>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', paddingLeft: '2rem' }}>
          {/* Animated vertical timeline progress line */}
          <motion.div 
            style={{ 
              position: 'absolute', 
              left: 0, 
              top: '1rem', 
              bottom: '1rem', 
              width: '1.5px', 
              background: 'linear-gradient(to bottom, var(--accent-emerald) 50%, rgba(52, 211, 153, 0.05) 100%)',
              originY: 0,
              scaleY: useSpring(useScroll({ target: containerRef, offset: ["start center", "end center"] }).scrollYProgress, { stiffness: 80, damping: 20 }),
              zIndex: 2
            }} 
          />
          {/* Static vertical background line */}
          <div style={{ position: 'absolute', left: 0, top: '1rem', bottom: '1rem', width: '1px', background: 'rgba(255,255,255,0.04)', zIndex: 1 }} />

          {experienceList.map((r, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}
            >
              {/* Timeline node */}
              <div style={{
                position: 'absolute',
                left: 'calc(-2rem - 4px)',
                top: '2rem',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: idx === 0 ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.15)',
                boxShadow: idx === 0 ? '0 0 12px rgba(52, 211, 153, 0.3)' : 'none',
                border: '2px solid var(--bg)',
              }} />

              <div className="card-editorial" style={{ padding: '2.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                  
                  {/* Meta */}
                  <div>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-muted)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      marginBottom: '1.25rem'
                    }}>
                      {r.type}
                    </span>
                    
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>{r.title}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>{r.organization}</p>
                    
                    <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.25rem', color: 'var(--text-subtle)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                      <span>{r.period}</span>
                      <span>{r.location}</span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h3 style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>Responsibilities</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {r.responsibilities.map((resp: string, ri: number) => (
                        <li key={ri} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.6 }}>
                          <span style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.7rem' }}>▹</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
