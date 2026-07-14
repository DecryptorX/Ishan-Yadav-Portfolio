"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';

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

  const [milestonesList, setMilestonesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeYear, setActiveYear] = useState('');

  useEffect(() => {
    const FALLBACK_MILESTONES = [
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
        color: 'var(--accent-emerald)',
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
        color: '#ffffff',
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
        color: 'var(--accent-emerald)',
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
        color: '#ffffff',
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
        color: 'var(--accent-emerald)',
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
        color: '#ffffff',
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
        color: 'var(--accent-emerald)',
        icon: '🚀'
      }
    ];

    fetch('/api/content/journey')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const parsed = data.map((m, idx) => ({
            ...m,
            color: idx % 2 === 0 ? 'var(--accent-emerald)' : '#ffffff',
            achievements: typeof m.achievements === 'string' ? m.achievements.split('\n').map((a: any) => a.trim()).filter(Boolean) : m.achievements,
            tech: typeof m.tech === 'string' ? m.tech.split(',').map((t: any) => t.trim()).filter(Boolean) : m.tech || []
          }));
          setMilestonesList(parsed);
          if (parsed[0]?.year) {
            setActiveYear(parsed[0].year);
          }
        } else {
          setMilestonesList(FALLBACK_MILESTONES);
          setActiveYear(FALLBACK_MILESTONES[0].year);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMilestonesList(FALLBACK_MILESTONES);
        setActiveYear(FALLBACK_MILESTONES[0].year);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-year-section]');
      let currentYear = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          currentYear = section.getAttribute('data-year-section') || '';
        }
      });
      if (currentYear) {
        setActiveYear(currentYear);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [milestonesList]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
        Loading journey milestones...
      </div>
    );
  }

  return (
    <div ref={containerRef} className="journey-page-container" style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative', padding: '8rem 2rem 8rem' }}>
      
      {/* Background Year Indicator (Cinematic, Large) */}
      {activeYear && (
        <div 
          aria-hidden 
          style={{
            position: 'fixed',
            top: '50%',
            left: '12%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(8rem, 20vw, 24rem)',
            fontWeight: 900,
            color: 'rgba(255, 255, 255, 0.015)',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.03)',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: 'var(--font-display)'
          }}
        >
          {activeYear}
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Asymmetrical Editorial Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '6rem', alignItems: 'start' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              // Timeline
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', fontFamily: 'var(--font-display)', margin: 0 }}>
              Milestones
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ paddingTop: '1.25rem' }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: 'var(--font-sans)', fontWeight: 400, margin: 0 }}>
              A chronological perspective on academic stages, engineering developments, leadership positions, and technical milestones.
            </p>
          </motion.div>
        </div>

        {/* Scroll Progress Timeline */}
        <div className="timeline-flex-container" style={{ display: 'flex', gap: '3.5rem', position: 'relative' }}>
          
          {/* Left Side: Sticky Timeline Indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '20px' }}>
            <div style={{
              width: '1px',
              position: 'absolute',
              top: '1.5rem',
              bottom: '1.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '999px'
            }} />
            
            {/* Glowing active scroll progress path */}
            <motion.div 
              style={{
                width: '1px',
                position: 'absolute',
                top: '1.5rem',
                bottom: '1.5rem',
                background: 'linear-gradient(to bottom, var(--accent-emerald), #ffffff)',
                borderRadius: '999px',
                scaleY,
                transformOrigin: 'top',
                boxShadow: '0 0 10px rgba(52, 211, 153, 0.2)'
              }} 
            />

            {/* Sticky Glowing Indicator Node */}
            <div style={{ position: 'sticky', top: '50vh', zIndex: 10 }}>
              <motion.div 
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--accent-emerald)',
                  boxShadow: '0 0 12px var(--accent-emerald)',
                  border: '2px solid var(--bg)'
                }}
              />
            </div>
          </div>

          {/* Right Side: Milestones List */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6rem' }}>
            {milestonesList.map((m, idx) => (
              <div 
                key={m.year} 
                data-year-section={m.year}
                style={{ position: 'relative' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="card-editorial" style={{ padding: '2.5rem' }}>
                    {/* Corner gradient glow */}
                    <div aria-hidden style={{ position: 'absolute', top: 0, right: 0, width: 250, height: 250, background: `radial-gradient(circle, ${m.color}05 0%, transparent 70%)`, pointerEvents: 'none' }} />
                    
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                          <span style={{ fontSize: '1.15rem' }}>{m.icon || '✨'}</span>
                          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: m.color, letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>{m.year}</span>
                        </div>
                        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', fontFamily: 'var(--font-display)', margin: 0 }}>{m.title}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500, marginTop: '0.25rem' }}>{m.subtitle}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '2rem', whiteSpace: 'pre-line' }}>
                      {m.description}
                    </p>

                    {/* Achievements Checklist */}
                    {m.achievements && m.achievements.length > 0 && (
                      <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>Key Milestones</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {m.achievements.map((ach: string, ai: number) => (
                            <li key={ai} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                              <span style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '0.2rem', fontSize: '0.7rem' }}>▹</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech stacks learned */}
                    {m.tech && m.tech.length > 0 && (
                      <div>
                        <h3 style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>Skills &amp; Concepts Acquired</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {m.tech.map((t: string) => (
                            <span key={t} style={{
                              padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 500,
                              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: 'var(--text-muted)'
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

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
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: '8rem',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.01)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            borderRadius: '2rem',
            padding: '5rem 2rem',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52, 211, 153, 0.02) 0%, transparent 70%)', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
          <span style={{ fontSize: '2rem', marginBottom: '1.25rem', display: 'inline-block' }}>✨</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 900, color: '#ffffff', marginBottom: '1.25rem', letterSpacing: '-0.03em', fontFamily: 'var(--font-display)' }}>This is only the beginning.</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 620, margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Every project, hackathon, and security challenge adds a new chapter to the timeline. Continuous experimentation and defensive hardening guide the path forward.
          </p>
          <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
            Let's Write the Next Chapter →
          </Link>
        </motion.div>

      </div>
      <style>{`
        @media (max-width: 640px) {
          .journey-page-container {
            padding: 5rem 1rem 5rem !important;
          }
          .timeline-flex-container {
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
