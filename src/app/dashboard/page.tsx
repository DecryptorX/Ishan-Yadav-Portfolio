"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '1.25rem',
  padding: '1.75rem',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.3)',
};

const STATS = [
  { label: 'GitHub Commits (YTD)', value: '648', icon: '💻', change: '+12% from last month', color: '#00e5ff' },
  { label: 'Total Stars Gained', value: '42', icon: '⭐️', change: 'Across all repos', color: '#f59e0b' },
  { label: 'GitHub Streak', value: '18 Days', icon: '🔥', change: 'Active logs tracking', color: '#ec4899' },
  { label: 'Followers Count', value: '38', icon: '👥', change: 'Active connections', color: '#6366f1' }
];

const LANGUAGES = [
  { name: 'TypeScript / JS', percent: 45, color: '#00e5ff' },
  { name: 'Python', percent: 35, color: '#f59e0b' },
  { name: 'HTML / CSS', percent: 12, color: '#ec4899' },
  { name: 'Java & Others', percent: 8, color: '#a855f7' }
];

export default function DashboardPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState('');

  // Update clock widget
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
          <p style={{ fontSize: '0.8rem', color: '#00ff88', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Telemetry</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '1rem' }}>Personal Dashboard</h1>
          <p style={{ color: 'rgba(148,163,184,0.75)', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
            Live status trackers, GitHub activity logs, music telemetry, and active development pipelines.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {STATS.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              style={{ ...cardStyle }}
              whileHover={{ borderColor: `${s.color}25` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</span>
                <span style={{ fontSize: '1.25rem' }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 850, color: '#f1f5f9', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(148,163,184,0.5)', marginTop: '0.5rem' }}>
                {s.change}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Telemetry Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          
          {/* Live Status Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ ...cardStyle }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f1f5f9' }}>🟢 Live Status</h2>
              <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#00ff88', background: 'rgba(0,255,136,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                SYSTEM OK
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>Current Focus</div>
                <div style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 600 }}>Building Startup &amp; Cybersecurity Audits</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>Active Learning Topics</div>
                <div style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 600 }}>SOC Incident Operations · API Gateway Tuning · LLM Agents</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>Local Time Node</div>
                <div style={{ fontSize: '1.25rem', color: '#00e5ff', fontFamily: 'monospace', fontWeight: 700 }}>{time || '00:00:00'}</div>
              </div>
            </div>
          </motion.div>

          {/* Spotify Simulator Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ ...cardStyle }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f1f5f9' }}>🎵 Spotify Telemetry</h2>
              <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#1db954', background: 'rgba(29,185,84,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                ONLINE
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '0.75rem' }}>
              {/* Spinning CD Disk */}
              <div 
                style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, #1db954, #121212, #1db954)',
                  animation: isPlaying ? 'spin 5s linear infinite' : 'none',
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid rgba(255,255,255,0.1)'
                }}
              >
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#09090b' }} />
              </div>

              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f1f5f9' }}>Mockingbird</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(148,163,184,0.65)', marginTop: '0.15rem' }}>Eminem</div>
                <div style={{ display: 'flex', gap: 3, alignItems: 'center', height: 16, marginTop: '0.4rem' }}>
                  {[12, 35, 18, 45, 24, 38, 15, 30].map((h, i) => (
                    <div key={i} style={{ width: 2, height: `${isPlaying ? h : 5}px`, background: '#1db954', transition: 'height 0.2s', animation: isPlaying ? 'eq-wave 0.8s infinite alternate' : 'none', animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                marginTop: '1.25rem', width: '100%', padding: '0.6rem', borderRadius: '0.5rem',
                background: isPlaying ? 'rgba(255,255,255,0.04)' : '#1db954',
                color: isPlaying ? '#fff' : '#000',
                border: 'none', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {isPlaying ? '⏸ Pause Telemetry' : '▶ Resume Telemetry'}
            </button>
          </motion.div>

        </div>

        {/* GitHub Language & Commits Activity Calendar Mock */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Languages Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ ...cardStyle }}
          >
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '1.5rem' }}>💻 Codebase Profiling</h2>
            
            <div style={{ display: 'flex', height: '10px', borderRadius: '999px', overflow: 'hidden', marginBottom: '2rem', background: 'rgba(255,255,255,0.05)' }}>
              {LANGUAGES.map((l) => (
                <div key={l.name} style={{ width: `${l.percent}%`, background: l.color }} />
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {LANGUAGES.map((l) => (
                <div key={l.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
                    <span style={{ fontSize: '0.85rem', color: 'rgba(226,232,240,0.85)' }}>{l.name}</span>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'rgba(148,163,184,0.6)' }}>{l.percent}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* GitHub Commit Activity Mock Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{ ...cardStyle }}
          >
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '1.5rem' }}>📅 Commit Contributions</h2>
            
            {/* Git Contributions Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4px', maxWidth: '380px', margin: '0 auto 1.5rem' }}>
              {Array.from({ length: 60 }).map((_, i) => {
                // Generate varied density shades of green
                const rand = Math.random();
                let color = 'rgba(255, 255, 255, 0.05)';
                if (rand > 0.8) color = '#00ff88';
                else if (rand > 0.5) color = 'rgba(0, 255, 136, 0.5)';
                else if (rand > 0.2) color = 'rgba(0, 255, 136, 0.2)';
                
                return (
                  <div key={i} style={{ width: '100%', aspectRatio: '1', borderRadius: '2px', background: color }} />
                );
              })}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>
              <span>Less</span>
              <div style={{ display: 'flex', gap: '3px' }}>
                <div style={{ width: 8, height: 8, background: 'rgba(255, 255, 255, 0.05)' }} />
                <div style={{ width: 8, height: 8, background: 'rgba(0, 255, 136, 0.2)' }} />
                <div style={{ width: 8, height: 8, background: 'rgba(0, 255, 136, 0.5)' }} />
                <div style={{ width: 8, height: 8, background: '#00ff88' }} />
              </div>
              <span>More</span>
            </div>
          </motion.div>

        </div>

      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes eq-wave {
          0% { height: 3px; }
          100% { height: 18px; }
        }
      `}</style>
    </div>
  );
}
