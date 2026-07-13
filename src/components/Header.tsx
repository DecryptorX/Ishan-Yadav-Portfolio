"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useModal } from '../context/modal';
import UserMenu from './auth/UserMenu';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/journey', label: 'Journey' },
  { href: '/experience', label: 'Experience' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const { openModal } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      backgroundColor: scrolled ? 'rgba(9,9,11,0.92)' : 'rgba(9,9,11,0.5)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      transition: 'background-color 0.3s ease',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        
        {/* Brand Logo */}
        <Link href="/" onClick={() => setMobileOpen(false)} style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff', letterSpacing: '-0.04em', textDecoration: 'none' }}>
          Ishan<span style={{ color: '#00e5ff' }}>.</span>
        </Link>

        {/* Desktop Navigation List */}
        <nav className="desktop-nav" aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <ul style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}
                  style={{ color: 'rgba(226,232,240,0.65)', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#00e5ff'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(226,232,240,0.65)'; }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Controls (Menu Avatar + Resume button) */}
        <div className="desktop-nav" style={{ alignItems: 'center', gap: '1.25rem' }}>
          <UserMenu />
          
          <button onClick={openModal} style={{
            padding: '0.45rem 1.15rem', borderRadius: '0.4rem',
            border: '1px solid rgba(0,229,255,0.6)', color: '#00e5ff',
            fontSize: '0.8rem', fontWeight: 700, display: 'inline-block',
            transition: 'all 0.2s', letterSpacing: '0.02em',
            background: 'transparent', cursor: 'pointer',
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#00e5ff'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#00e5ff'; }}>
            Resume ↗
          </button>
        </div>

        {/* Mobile controls bar (Burger button + User Menu avatar) */}
        <div className="mobile-only-controls" style={{ display: 'none', alignItems: 'center', gap: '1rem' }}>
          <UserMenu />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem',
              cursor: 'pointer', outline: 'none', display: 'flex', alignItems: 'center', padding: '0.25rem'
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

      </div>

      {/* Mobile Nav Dropdown Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden', background: 'rgba(9, 9, 11, 0.98)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex', flexDirection: 'column', gap: '1rem',
              padding: '1.5rem 2rem 2rem'
            }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {NAV.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    style={{ color: 'rgba(226,232,240,0.85)', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none', display: 'block' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0.5rem 0' }} />

            <button
              onClick={() => { setMobileOpen(false); openModal(); }}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '0.5rem',
                background: 'rgba(0, 229, 255, 0.06)', border: '1px solid rgba(0, 229, 255, 0.3)',
                color: '#00e5ff', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', textAlign: 'center'
              }}
            >
              Curriculum Vitae ↗
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Injected responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-only-controls {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-only-controls {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
