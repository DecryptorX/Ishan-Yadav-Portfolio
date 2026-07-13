"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  pathname: string;
  onComplete?: () => void;
}

function getStepsForPath(pathname: string) {
  const path = pathname || '/';
  
  if (path === '/about') {
    return [
      { text: '> Initializing Profile...', delay: 0 },
      { text: '✔ Loading Biography', delay: 150 },
      { text: '✔ Loading Education Milestones', delay: 300 },
      { text: '✔ Loading Interests & Skills', delay: 450 },
      { text: '✔ Loading Philosophies', delay: 600 },
      { text: '✔ Loading Data about Ishan Yadav', delay: 750 },
      { text: '✔ Authenticating Session', delay: 900 },
      { text: '✔ Ready.', delay: 1050 }
    ];
  }
  
  if (path === '/projects') {
    return [
      { text: '> Initializing Projects Directory...', delay: 0 },
      { text: '✔ Loading Showcase Metrics', delay: 150 },
      { text: '✔ Loading Core Repositories', delay: 300 },
      { text: '✔ Loading Tech Categories', delay: 450 },
      { text: '✔ Indexing Filters', delay: 600 },
      { text: '✔ Rendering Grid Systems', delay: 750 },
      { text: '✔ Authenticating Session', delay: 900 },
      { text: '✔ Ready.', delay: 1050 }
    ];
  }
  
  if (path === '/journey') {
    return [
      { text: '> Initializing Milestones Timeline...', delay: 0 },
      { text: '✔ Loading Chronological Milestones', delay: 150 },
      { text: '✔ Indexing Time Intervals', delay: 300 },
      { text: '✔ Mapping Career Milestones', delay: 450 },
      { text: '✔ Connecting ACM Activities', delay: 600 },
      { text: '✔ Verifying Achievements', delay: 750 },
      { text: '✔ Authenticating Session', delay: 900 },
      { text: '✔ Ready.', delay: 1050 }
    ];
  }

  if (path === '/skills') {
    return [
      { text: '> Initializing Skills Dashboard...', delay: 0 },
      { text: '✔ Loading Programming Languages', delay: 150 },
      { text: '✔ Loading Cybersecurity Operations', delay: 300 },
      { text: '✔ Loading Web & Databases Frameworks', delay: 450 },
      { text: '✔ Loading DevOps Technologies', delay: 600 },
      { text: '✔ Resolving Skill Experience Metrics', delay: 750 },
      { text: '✔ Authenticating Session', delay: 900 },
      { text: '✔ Ready.', delay: 1050 }
    ];
  }

  if (path === '/experience') {
    return [
      { text: '> Initializing Experience Log...', delay: 0 },
      { text: '✔ Loading ACM Sub Head Role', delay: 150 },
      { text: '✔ Loading Developer History', delay: 300 },
      { text: '✔ Mapping Technical Roles', delay: 450 },
      { text: '✔ Verifying Credentials', delay: 600 },
      { text: '✔ Loading Goals & Objectives', delay: 750 },
      { text: '✔ Authenticating Session', delay: 900 },
      { text: '✔ Ready.', delay: 1050 }
    ];
  }

  if (path === '/contact') {
    return [
      { text: '> Initializing Connection Portal...', delay: 0 },
      { text: '✔ Loading EmailJS Configurations', delay: 150 },
      { text: '✔ Loading Availability Status', delay: 300 },
      { text: '✔ Preparing Message Fields', delay: 450 },
      { text: '✔ Loading Social Coordinates', delay: 600 },
      { text: '✔ Resolving Resume Link', delay: 750 },
      { text: '✔ Authenticating Session', delay: 900 },
      { text: '✔ Ready.', delay: 1050 }
    ];
  }

  if (path === '/login') {
    return [
      { text: '> Initializing Secure Gateway...', delay: 0 },
      { text: '✔ Preparing OAuth Authentication Flow', delay: 150 },
      { text: '✔ Connecting LinkedIn Portal', delay: 300 },
      { text: '✔ Connecting GitHub Portal', delay: 450 },
      { text: '✔ Connecting Google Portal', delay: 600 },
      { text: '✔ Injecting JWT Encryption', delay: 750 },
      { text: '✔ Authenticating Session', delay: 900 },
      { text: '✔ Ready.', delay: 1050 }
    ];
  }

  if (path === '/admin') {
    return [
      { text: '> Initializing Admin Dashboard...', delay: 0 },
      { text: '✔ Reading Secure Session Cookies', delay: 150 },
      { text: '✔ Verifying Whitelist Authority', delay: 300 },
      { text: '✔ Retrieving Visitor Intelligence Logs', delay: 450 },
      { text: '✔ Initializing SVG Graphs Telemetry', delay: 600 },
      { text: '✔ Hardening Administration Access', delay: 750 },
      { text: '✔ Authenticating Session', delay: 900 },
      { text: '✔ Ready.', delay: 1050 }
    ];
  }

  // Fallback (homepage/defaults)
  return [
    { text: '> Initializing System...', delay: 0 },
    { text: '✔ Loading Components', delay: 150 },
    { text: '✔ Loading Projects Preview', delay: 300 },
    { text: '✔ Connecting GitHub Telemetry', delay: 450 },
    { text: '✔ Loading Analytics Core', delay: 600 },
    { text: '✔ Authenticating Session', delay: 750 },
    { text: '✔ Initializing Layout', delay: 900 },
    { text: '✔ Ready.', delay: 1050 }
  ];
}

export default function Loader({ pathname, onComplete }: LoaderProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    setVisibleLines([]);
    setCursorPosition(0);

    const steps = getStepsForPath(pathname);
    const timers: NodeJS.Timeout[] = [];

    steps.forEach((step, idx) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, step.text]);
        setCursorPosition(idx + 1);
        
        if (idx === steps.length - 1) {
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 250); // 1050ms + 250ms = 1300ms (exactly 1.3 seconds)
        }
      }, step.delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [pathname, onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#09090b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'monospace',
      color: '#00ff88',
      zIndex: 99999,
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        background: 'rgba(17, 17, 17, 0.85)',
        border: '1px solid rgba(0, 255, 136, 0.2)',
        borderRadius: '0.75rem',
        padding: '2.25rem 2rem',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 255, 136, 0.05)',
        minHeight: '270px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      } as React.CSSProperties}>
        {/* Terminal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(0, 255, 136, 0.1)',
          paddingBottom: '0.75rem',
          marginBottom: '1.25rem',
          fontSize: '0.75rem',
          color: 'rgba(0, 255, 136, 0.5)',
          letterSpacing: '0.1em'
        }}>
          <span>SESSION_INIT // {pathname.toUpperCase() || 'ROOT'}</span>
          <span style={{ animation: 'blink-indicator 1.2s infinite' }}>● LINKED</span>
        </div>

        {/* Terminal output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem', lineHeight: 1.5, textAlign: 'left' }}>
          {visibleLines.map((line, idx) => (
            <motion.div
              key={`${line}-${idx}`}
              initial={{ filter: "blur(1.5px)", opacity: 0, y: 3 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ color: line.startsWith('✔') ? '#00ff88' : '#00e5ff' }}
            >
              {line}
            </motion.div>
          ))}
          
          {cursorPosition < 8 && (
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '15px',
              background: '#00ff88',
              animation: 'blink-cursor 0.8s infinite',
              marginLeft: '2px',
              marginTop: '4px'
            }} />
          )}
        </div>
      </div>

      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes blink-indicator {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
