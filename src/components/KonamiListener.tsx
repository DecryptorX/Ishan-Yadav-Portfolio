"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export default function KonamiListener() {
  const [keys, setKeys] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Append key, slice array to keep only the last 10 inputs
      setKeys((prev) => {
        const updated = [...prev, e.key].slice(-KONAMI_CODE.length);
        
        // Verify code match
        const isMatch = updated.length === KONAMI_CODE.length && 
          updated.every((val, index) => val.toLowerCase() === KONAMI_CODE[index].toLowerCase());
          
        if (isMatch) {
          setUnlocked(true);
        }
        return updated;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {unlocked && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99995, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setUnlocked(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
          />

          {/* Achievement unlocked card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              position: 'relative',
              maxWidth: '480px',
              width: '100%',
              background: 'linear-gradient(135deg, #09090b 0%, #111 100%)',
              border: '2px solid #00ff88',
              borderRadius: '1.25rem',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(0, 255, 136, 0.15), 0 0 0 1px rgba(0, 255, 136, 0.05)',
              zIndex: 1
            }}
          >
            {/* Visual glow node */}
            <div aria-hidden style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '80px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 255, 136, 0.4) 0%, transparent 70%)', filter: 'blur(10px)' }} />
            
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🏆</div>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#00ff88', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              SECRET UNLOCKED!
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'rgba(0,255,136,0.6)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              HIDDEN ACHIEVEMENT FOUND
            </p>
            
            <p style={{ color: 'rgba(226, 232, 240, 0.85)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Congratulations! You entered the classic Konami code. You've bypassed our secure parameters and unlocked this secret easter egg panel.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => setUnlocked(false)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  background: '#00ff88',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 0 15px rgba(0,255,136,0.3)'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
              >
                Return to Sandbox
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
