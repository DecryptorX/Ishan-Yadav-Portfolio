"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';

const MILESTONES = [
  {
    year: '2006',
    title: 'Where It All Began',
    subtitle: 'Born in 2006',
    description: 'Every journey starts somewhere. Mine began with an endless curiosity about how things work and a fascination with technology that would eventually shape my career. Long before I wrote my first line of code, I was already drawn to computers, solving problems, and building things from scratch.',
    achievements: [
      'Discovered a natural affinity for puzzles, logical problems, and building mechanisms',
      'Developed an early curiosity about how software and hardware systems function under the hood',
      'Established a foundation of creative problem-solving and critical thinking'
    ],
    tech: ['Curiosity', 'Problem Solving', 'Logical Thinking'],
    color: '#00e5ff',
    icon: '👶'
  },
  {
    year: '2017',
    title: 'The First Lines of Code',
    subtitle: 'Discovering Programming',
    description: 'This was the year I truly stepped into the world of programming. I began experimenting with Python, Java, and JavaScript, creating small games and simple applications. Each project taught me something new and fueled my passion for software development. What started as curiosity quickly became a hobby I wanted to pursue every day.',
    achievements: [
      'Wrote my very first scripts in Python and explored basic object-oriented concepts in Java',
      'Created small custom text games, interactive scripts, and logical calculators',
      'Committed to programming as a creative daily hobby outside school hours'
    ],
    tech: ['Python', 'Java', 'JavaScript', 'Logic Design'],
    color: '#f59e0b',
    icon: '💻'
  },
  {
    year: '2020',
    title: 'Exploring Design',
    subtitle: 'UI/UX Design Journey',
    description: 'As I became more comfortable with coding, I realized that great software isn\'t just about functionality—it\'s also about user experience. I started designing interfaces, experimenting with layouts, colors, and interactions, and learned how thoughtful UI/UX can transform an ordinary application into an enjoyable experience.',
    achievements: [
      'Studied visual hierarchy, typography alignments, and intuitive interface layouts',
      'Experimented with wireframing tools to sketch creative and clean interface pathways',
      'Aligned visual empathy with codebase functions to build clean user flows'
    ],
    tech: ['Figma', 'UI/UX Design', 'Visual Hierarchy', 'Colors & Layouts'],
    color: '#ec4899',
    icon: '🎨'
  },
  {
    year: '2021',
    title: 'Robotics & IoT',
    subtitle: 'Competition and Innovation',
    description: 'I participated in an IoT, Coding, and Robotics competition, where I collaborated on building technology-driven solutions. It was my first experience working on larger technical challenges under competitive conditions, strengthening my problem-solving skills and exposing me to hardware-software integration.',
    achievements: [
      'Collaborated in a team environment to map sensors, indicators, and microcontrollers to a working application',
      'Programmed logic scripts to integrate hardware inputs dynamically under time pressure',
      'Exposed to core robotics concepts, networking loops, and mechanical-software interfaces'
    ],
    tech: ['IoT Protocols', 'Robotics Systems', 'Arduino / C++', 'Team Collaboration'],
    color: '#a855f7',
    icon: '🤖'
  },
  {
    year: '2024',
    title: 'A New Chapter',
    subtitle: 'Beginning My University Journey',
    description: 'After graduating from school, I joined Bennett University to pursue a Bachelor\'s degree in Computer Science. University opened the door to larger-scale software development, collaboration with talented peers, and opportunities to transform ideas into real-world projects.',
    achievements: [
      'Admitted to Bennett University B.Tech CSE program to build technical foundations',
      'Learned version control processes with Git & GitHub and navigated Linux environments',
      'Partnered on collective developer tasks and projects with skilled peers'
    ],
    tech: ['Computer Science', 'Data Structures', 'Git & GitHub', 'Linux CLI'],
    color: '#6366f1',
    icon: '🎓'
  },
  {
    year: '2025',
    title: 'Building, Leading & Securing',
    subtitle: 'Hackathons, Projects & Cybersecurity',
    description: '2025 became the year I accelerated my growth. I built SkinVision AI, Manifest, Jarvis, and several hackathon projects while diving deeper into backend engineering and cybersecurity. Alongside my technical journey, I served as the Social Media Sub Head of the ACM Student Chapter at Bennett University (2025–2026), managing the club\'s online presence, promoting events, and working with an incredible team to grow one of the university\'s most active technical communities.',
    achievements: [
      'Appointed Social Media Sub Head for the ACM Student Chapter at Bennett University (2025–2026)',
      'Built and shipped SkinVision AI, Manifest, Jarvis, and multiple hackathon prototypes',
      'Advanced hands-on understanding of threat log intelligence and cybersecurity audits'
    ],
    tech: ['Cybersecurity', 'Web Security', 'Flask APIs', 'Next.js Frontend', 'ACM Leadership'],
    color: '#10b981',
    icon: '🛡️'
  },
  {
    year: '2026',
    title: 'Startup & Scale',
    subtitle: 'Startup Journey',
    description: 'Currently, I\'m building a startup with a group of friends, leading backend development and cybersecurity. My focus has shifted from simply building applications to designing secure, scalable systems while continuing to explore AI, modern web technologies, and security-first software engineering.',
    achievements: [
      'Co-founded a tech startup alongside close friends',
      'Architected reliable database structures, scalable APIs, and backend server codebases',
      'Hardened cloud environments and established strict defensive credentials monitoring'
    ],
    tech: ['Backend Engineering', 'Startup Operations', 'API Scaling', 'Environment Security'],
    color: '#3b82f6',
    icon: '🚀'
  }
];

export default function JourneyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [milestonesList, setMilestonesList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeYear, setActiveYear] = useState('2006');

  React.useEffect(() => {
    fetch('/api/content/journey')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const colors = ['#00e5ff', '#f59e0b', '#ec4899', '#a855f7', '#6366f1', '#10b981', '#3b82f6'];
          const icons = ['👶', '💻', '🎨', '🤖', '🎓', '🛡️', '🚀'];
          const parsed = data.map((m, idx) => ({
            ...m,
            color: colors[idx % colors.length],
            icon: icons[idx % icons.length],
            achievements: typeof m.achievements === 'string' ? m.achievements.split('\n').map((a: any) => a.trim()).filter(Boolean) : m.achievements,
            tech: typeof m.tech === 'string' ? m.tech.split(',').map((t: any) => t.trim()).filter(Boolean) : m.tech || []
          }));
          setMilestonesList(parsed);
          if (parsed[0]?.year) {
            setActiveYear(parsed[0].year);
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090b', color: '#00ff88', fontFamily: 'monospace' }}>
        Loading journey milestones...
      </div>
    );
  }

  // Monitor scroll to update active year indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-year-section]');
      let currentYear = '2006';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          currentYear = section.getAttribute('data-year-section') || '2006';
        }
      });
      setActiveYear(currentYear);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="journey-page-container" style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative' }}>
      
      {/* Background Year Indicator (Cinematic, Large) */}
      <div 
        aria-hidden 
        style={{
          position: 'fixed',
          top: '50%',
          left: '10%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(8rem, 20vw, 24rem)',
          fontWeight: 900,
          color: 'rgba(255, 255, 255, 0.02)',
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.04)',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {activeYear}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '6rem', textAlign: 'center' }}
        >
          <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Timeline</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '1rem' }}>My Journey</h1>
          <p style={{ color: 'rgba(148,163,184,0.75)', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
            A chronological look at my academic developments, key projects, leadership positions, and technical milestones.
          </p>
        </motion.div>

        {/* Scroll Progress Timeline */}
        <div className="timeline-flex-container" style={{ display: 'flex', gap: '3rem', position: 'relative' }}>
          
          {/* Left Side: Sticky Timeline Indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '20px' }}>
            <div style={{
              width: '2px',
              position: 'absolute',
              top: '1.5rem',
              bottom: '1.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '999px'
            }} />
            
            {/* Glowing active scroll progress path */}
            <motion.div 
              style={{
                width: '2px',
                position: 'absolute',
                top: '1.5rem',
                bottom: '1.5rem',
                background: 'linear-gradient(to bottom, #00e5ff, #6366f1)',
                borderRadius: '999px',
                scaleY,
                transformOrigin: 'top',
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.3)'
              }} 
            />

            {/* Sticky Glowing Indicator Node */}
            <div style={{ position: 'sticky', top: '50vh', zIndex: 10 }}>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#00e5ff',
                  boxShadow: '0 0 12px #00e5ff',
                  border: '3px solid var(--bg)'
                }}
              />
            </div>
          </div>

          {/* Right Side: Milestones List */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8rem' }}>
            {milestonesList.map((m, idx) => (
              <div 
                key={m.year} 
                data-year-section={m.year}
                style={{ position: 'relative' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="timeline-card" style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '1.5rem',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.02)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Corner gradient glow */}
                    <div aria-hidden style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: `radial-gradient(circle, ${m.color}0a 0%, transparent 70%)`, pointerEvents: 'none' }} />
                    
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                          <span style={{ fontSize: '1.5rem' }}>{m.icon}</span>
                          <span style={{ fontSize: '1.4rem', fontWeight: 900, color: m.color, letterSpacing: '-0.02em' }}>{m.year}</span>
                        </div>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em' }}>{m.title}</h2>
                        <p style={{ color: m.color, fontSize: '0.85rem', fontWeight: 600, marginTop: '0.15rem' }}>{m.subtitle}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{ color: 'rgba(148, 163, 184, 0.85)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.75rem', whiteSpace: 'pre-line' }}>
                      {m.description}
                    </p>

                    {/* Achievements Checklist */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h3 style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '0.85rem' }}>Key Milestones</h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {m.achievements.map((ach: string, ai: number) => (
                          <li key={ai} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'rgba(226, 232, 240, 0.85)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                            <span style={{ color: m.color, flexShrink: 0, marginTop: '0.2rem', fontSize: '0.8rem' }}>✔</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech stacks learned */}
                    <div>
                      <h3 style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '0.75rem' }}>Skills &amp; Concepts Acquired</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {m.tech.map((t: string) => (
                          <span key={t} style={{
                            padding: '0.25rem 0.65rem', borderRadius: 999, fontSize: '0.75rem', fontWeight: 500,
                            background: `${m.color}10`, border: `1px solid ${m.color}25`, color: m.color
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              </div>
            ))}
          </div>

        </div>

        {/* Closing Section */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: '8rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.02) 0%, rgba(99, 102, 241, 0.02) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '1.5rem',
            padding: '4rem 2rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.03) 0%, transparent 70%)', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
          <span style={{ fontSize: '2rem', marginBottom: '1rem', display: 'inline-block' }}>✨</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#f1f5f9', marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>This is only the beginning.</h2>
          <p style={{ color: 'rgba(148, 163, 184, 0.85)', fontSize: '0.96rem', maxWidth: 620, margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Every project, competition, and challenge has added another chapter to my journey. I'm constantly learning, experimenting with new technologies, and pushing myself to build better software, solve bigger problems, and create products that make an impact. The timeline continues, and the best chapters are still ahead.
          </p>
          <Link href="/contact" style={{
            padding: '0.8rem 2.2rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.92rem',
            background: '#00e5ff', color: '#000', border: 'none', transition: 'all 0.2s',
            boxShadow: '0 0 20px rgba(0,229,255,0.2)', display: 'inline-block', textDecoration: 'none'
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,229,255,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,255,0.2)'; }}>
            Let's Write the Next Chapter →
          </Link>
        </motion.div>

        <style>{`
          .journey-page-container {
            padding: 8rem 2rem 8rem;
          }
          .timeline-card {
            padding: 2.5rem;
          }
          @media (max-width: 640px) {
            .journey-page-container {
              padding: 5rem 1rem 5rem !important;
            }
            .timeline-flex-container {
              gap: 1.25rem !important;
            }
            .timeline-card {
              padding: 1.5rem 1.25rem !important;
            }
          }
        `}</style>

      </div>
    </div>
  );
}
