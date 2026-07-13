"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useModal } from '../context/modal';

const PAGES = [
  { path: '/', label: 'Home Page', desc: 'Return to landing deck', section: 'Navigation' },
  { path: '/about', label: 'About Me', desc: 'Personal story, education and focus', section: 'Navigation' },
  { path: '/projects', label: 'Projects Showcase', desc: 'Featured applications and repositories', section: 'Navigation' },
  { path: '/journey', label: 'My Journey', desc: 'Chronological roadmap of milestones', section: 'Navigation' },
  { path: '/experience', label: 'Experience & History', desc: 'Leadership positions and freelancing', section: 'Navigation' },
  { path: '/skills', label: 'Skills & Tech', desc: 'Categorized technologies radar', section: 'Navigation' },
  { path: '/contact', label: 'Contact Me', desc: 'Email forms, booking and socials', section: 'Navigation' },
  { path: '/gallery', label: 'Asset Gallery', desc: 'Mockups and projects screenshots', section: 'Navigation' },
  { path: '/blog', label: 'Technical Blog', desc: 'Future security & dev articles', section: 'Navigation' },
  { path: '/uses', label: 'Uses / Setup', desc: 'Hardware gear and development config', section: 'Navigation' },
  { path: '/dashboard', label: 'System Dashboard', desc: 'Live stats, music, and GitHub tracker', section: 'Navigation' },
];

export default function CommandPalette() {
  const router = useRouter();
  const { openModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Monitor Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Set focus on input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredItems = PAGES.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation inside list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        navigate(filteredItems[selectedIndex].path);
      }
    }
  };

  const navigate = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* Floating hints in footer or header */}
      <div 
        aria-hidden
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 40,
          background: 'rgba(9, 9, 11, 0.65)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.4rem 0.75rem',
          borderRadius: '0.5rem',
          fontSize: '0.72rem',
          color: 'rgba(226, 232, 240, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span>Press</span>
        <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontFamily: 'monospace', color: '#00e5ff' }}>⌘K</kbd>
        <span>for command palette</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 99990, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '8vh 2rem 2rem' }}>
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(4px)' }}
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
                background: 'rgba(17, 17, 17, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '1rem',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.02), 0 0 30px rgba(0, 229, 255, 0.03)',
                overflow: 'hidden',
                zIndex: 1
              }}
            >
              {/* Input field */}
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', padding: '0.75rem 1.25rem' }}>
                <span style={{ fontSize: '1rem', marginRight: '0.75rem', opacity: 0.5 }}>🔍</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command or search pages..."
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#f1f5f9',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit'
                  }}
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', cursor: 'pointer', fontFamily: 'monospace' }}
                >
                  ESC
                </button>
              </div>

              {/* Items List */}
              <div style={{ maxHeight: '320px', overflowY: 'auto', padding: '0.5rem' }}>
                {filteredItems.length === 0 ? (
                  <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
                    No results found for "{query}"
                  </div>
                ) : (
                  <div>
                    <div style={{ padding: '0.4rem 0.75rem', fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.3)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                      System Navigation
                    </div>
                    {filteredItems.map((item, idx) => {
                      const isSelected = idx === selectedIndex;
                      return (
                        <div
                          key={item.path}
                          onClick={() => navigate(item.path)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.75rem 0.85rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            background: isSelected ? 'rgba(0, 229, 255, 0.08)' : 'transparent',
                            border: isSelected ? '1px solid rgba(0, 229, 255, 0.15)' : '1px solid transparent',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '0.86rem', fontWeight: 600, color: isSelected ? '#00e5ff' : '#f1f5f9' }}>
                              {item.label}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(148, 163, 184, 0.65)', marginTop: '0.15rem' }}>
                              {item.desc}
                            </div>
                          </div>
                          {isSelected && (
                            <span style={{ fontSize: '0.8rem', color: '#00e5ff', opacity: 0.8 }}>
                              ENTER ↵
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Quick Actions Footer */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '0.65rem 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.45)'
              }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ cursor: 'pointer' }} onClick={() => { setIsOpen(false); openModal(); }}>📄 Download CV</span>
                  <span style={{ cursor: 'pointer' }} onClick={() => { setIsOpen(false); navigator.clipboard.writeText('ishanyadav09@outlook.com'); alert('Email copied!'); }}>✉ Copy Email</span>
                </div>
                <div>
                  Use keys <kbd>↑</kbd> <kbd>↓</kbd> to scroll
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
