"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from '../context/modal';
import UserMenu from './auth/UserMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/journey', label: 'Journey' },
  { href: '/experience', label: 'Experience' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const { openModal } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Outer floating boundary header container */}
      <div 
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          padding: scrolled ? '1rem 0' : '0',
          transition: 'padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none' // Let mouse events pass through empty space
        }}
      >
        <motion.header
          animate={{
            width: scrolled ? '75%' : '95%',
            borderRadius: scrolled ? '9999px' : '0px',
            backgroundColor: scrolled ? 'rgba(9, 9, 11, 0.75)' : 'rgba(9, 9, 11, 0)',
            borderColor: scrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0)',
            boxShadow: scrolled ? '0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 136, 0.02)' : 'none',
            scale: scrolled ? 0.98 : 1,
            y: scrolled ? 4 : 0
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '1200px',
            borderWidth: '1px',
            borderStyle: 'solid',
            backdropFilter: scrolled ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: scrolled ? 54 : 68,
            padding: scrolled ? '0 2rem' : '0 1.5rem',
            pointerEvents: 'auto', // Enable pointer events for header items
            transition: 'height 0.4s, padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="header-nav-pill"
        >
          {/* LEFT: Branding Logo */}
          <motion.div
            whileHover={{ scale: 1.06, rotate: 1.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
          >
            <Link href="/" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 850, fontSize: '1.2rem', color: '#fff', letterSpacing: '-0.04em', textDecoration: 'none' }}>
              Ishan<span style={{ color: '#00ff88', textShadow: '0 0 8px rgba(0, 255, 136, 0.6)' }}>.</span>
            </Link>
          </motion.div>

          {/* CENTER: Navigation Links */}
          <nav className="desktop-links" aria-label="Primary navigation" style={{ display: 'flex', alignItems: 'center' }}>
            <ul style={{ display: 'flex', alignItems: 'center', gap: scrolled ? '1.15rem' : '1.5rem', listStyle: 'none', margin: 0, padding: 0, transition: 'gap 0.4s' }}>
              {NAV_ITEMS.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li key={href} style={{ position: 'relative' }}>
                    <Link
                      href={href}
                      style={{
                        color: isActive ? '#00ff88' : 'rgba(226, 232, 240, 0.6)',
                        fontSize: '0.82rem',
                        fontWeight: 650,
                        textDecoration: 'none',
                        transition: 'color 0.25s',
                        padding: '0.45rem 0.25rem',
                        display: 'block',
                        textShadow: isActive ? '0 0 8px rgba(0, 255, 136, 0.25)' : 'none'
                      }}
                      onMouseEnter={e => {
                        if (!isActive) e.currentTarget.style.color = '#00ff88';
                      }}
                      onMouseLeave={e => {
                        if (!isActive) e.currentTarget.style.color = 'rgba(226, 232, 240, 0.6)';
                      }}
                    >
                      {label}
                    </Link>
                    
                    {/* Sliding underline active highlight */}
                    {isActive && (
                      <motion.div
                        layoutId="activeUnderline"
                        style={{
                          position: 'absolute',
                          bottom: '-2px',
                          left: '0.25rem',
                          right: '0.25rem',
                          height: '2px',
                          background: '#00ff88',
                          borderRadius: '2px',
                          boxShadow: '0 0 8px rgba(0, 255, 136, 0.7)'
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* RIGHT: Social links + Resume + User Avatar */}
          <div className="desktop-links" style={{ alignItems: 'center', gap: scrolled ? '1rem' : '1.25rem', transition: 'gap 0.4s' }}>
            
            {/* GitHub */}
            <a 
              href="https://github.com/DecryptorX" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile"
              style={{ color: 'rgba(226, 232, 240, 0.6)', display: 'flex', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#00ff88'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(226, 232, 240, 0.6)'; }}
            >
              <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/ishan-yadav-a22251325" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile"
              style={{ color: 'rgba(226, 232, 240, 0.6)', display: 'flex', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#00ff88'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(226, 232, 240, 0.6)'; }}
            >
              <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Separator line */}
            <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.08)' }} />

            {/* Resume Button */}
            <motion.button 
              onClick={openModal} 
              whileHover={{ scale: 1.04, y: -0.5 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: '0.4rem 1.1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(0, 229, 255, 0.4)',
                color: '#00e5ff',
                fontSize: '0.78rem',
                fontWeight: 750,
                background: 'rgba(0, 229, 255, 0.02)',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.05)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.1)'; e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.8)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(0, 229, 255, 0.02)'; e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.4)'; }}
            >
              <FileText size={13} />
              Resume
            </motion.button>

            {/* Auth Dropdown menu */}
            <UserMenu />
          </div>

          {/* MOBILE: Toggle Hamburger button controls */}
          <div className="mobile-toggle-btn" style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }}>
            <UserMenu />
            
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                padding: '0.2rem'
              }}
            >
              {/* Morphing Hamburger Menu icon with simple animate tag */}
              <motion.div
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <X size={22} style={{ color: '#00ff88' }} /> : <Menu size={22} />}
              </motion.div>
            </button>
          </div>

        </motion.header>
      </div>

      {/* MOBILE Navigation Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 76,
              left: '1rem',
              right: '1rem',
              background: 'rgba(9, 9, 11, 0.94)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '1.5rem',
              padding: '1.75rem 2rem',
              zIndex: 49,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 255, 136, 0.02)'
            }}
          >
            {/* Page Links list */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {NAV_ITEMS.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        color: isActive ? '#00ff88' : 'rgba(226, 232, 240, 0.85)',
                        fontSize: '1rem',
                        fontWeight: 650,
                        textDecoration: 'none',
                        display: 'block',
                        padding: '0.2rem 0'
                      }}
                    >
                      <span style={{ marginRight: '0.5rem', color: isActive ? '#00ff88' : 'rgba(255,255,255,0.1)' }}>//</span>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0.25rem 0' }} />

            {/* Resume button inside Mobile drawer */}
            <button
              onClick={() => { setMobileOpen(false); openModal(); }}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '9999px',
                background: 'rgba(0, 229, 255, 0.06)',
                border: '1px solid rgba(0, 229, 255, 0.35)',
                color: '#00e5ff',
                fontSize: '0.88rem',
                fontWeight: 750,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <FileText size={15} />
              Curriculum Vitae ↗
            </button>

            {/* Social quick links inside Mobile drawer */}
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '0.5rem' }}>
              <a 
                href="https://github.com/DecryptorX" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'rgba(226, 232, 240, 0.65)', textDecoration: 'none', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/ishan-yadav-a22251325" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'rgba(226, 232, 240, 0.65)', textDecoration: 'none', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg> LinkedIn
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Media query styling overrides */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-links {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: flex !important;
          }
          .header-nav-pill {
            width: 95% !important;
            border-radius: 9999px !important;
            background-color: rgba(9, 9, 11, 0.85) !important;
            border-color: rgba(255, 255, 255, 0.08) !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
            height: 52px !important;
            padding: 0 1.25rem !important;
            backdrop-filter: blur(16px) !important;
            -webkit-backdrop-filter: blur(16px) !important;
            margin-top: 4px !important;
          }
        }
        @media (min-width: 769px) {
          .desktop-links {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
