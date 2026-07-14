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
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
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
          padding: scrolled ? '0.75rem 0' : '1.5rem 0',
          transition: 'padding 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none'
        }}
      >
        <motion.header
          animate={{
            width: scrolled ? '65%' : '88%',
            borderRadius: scrolled ? '9999px' : '1.25rem',
            backgroundColor: scrolled ? 'rgba(5, 5, 6, 0.55)' : 'rgba(5, 5, 6, 0.15)',
            borderColor: scrolled ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
            boxShadow: scrolled ? '0 20px 60px rgba(0, 0, 0, 0.4)' : 'none',
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '1200px',
            borderWidth: '1px',
            borderStyle: 'solid',
            backdropFilter: 'blur(30px) saturate(200%)',
            WebkitBackdropFilter: 'blur(30px) saturate(200%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: scrolled ? 50 : 60,
            padding: scrolled ? '0 2rem' : '0 2rem',
            pointerEvents: 'auto',
            transition: 'height 0.6s cubic-bezier(0.16, 1, 0.3, 1), padding 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="header-nav-pill"
        >
          {/* LEFT: Branding Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/" onClick={() => setMobileOpen(false)} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: '#fff', letterSpacing: '-0.03em', textDecoration: 'none' }}>
              Ishan<span className="blinking-dot" style={{ color: 'var(--accent-emerald)', display: 'inline-block', transformOrigin: 'bottom' }}>.</span>
            </Link>
          </motion.div>

          {/* CENTER: Navigation Links */}
          <nav className="desktop-links" aria-label="Primary navigation" style={{ display: 'flex', alignItems: 'center' }}>
            <ul style={{ display: 'flex', alignItems: 'center', gap: scrolled ? '0.25rem' : '0.5rem', listStyle: 'none', margin: 0, padding: 0, transition: 'gap 0.6s' }}>
              {NAV_ITEMS.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li key={href} style={{ position: 'relative' }}>
                    <Link
                      href={href}
                      style={{
                        color: isActive ? '#ffffff' : 'var(--text-muted)',
                        fontSize: '0.76rem',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: isActive ? 600 : 500,
                        textDecoration: 'none',
                        transition: 'color 0.3s',
                        padding: '0.4rem 0.75rem',
                        borderRadius: '9999px',
                        display: 'block'
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#ffffff';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          e.currentTarget.style.color = 'var(--text-muted)';
                        }
                      }}
                    >
                      {label}
                    </Link>

                    {/* Active indicator — emerald underline */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        style={{
                          position: 'absolute',
                          bottom: -2,
                          left: '25%',
                          right: '25%',
                          height: 2,
                          background: 'var(--accent-emerald)',
                          borderRadius: '9999px',
                          boxShadow: '0 0 8px rgba(52, 211, 153, 0.3)'
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
          <div className="desktop-links" style={{ alignItems: 'center', gap: '1rem' }}>
            {/* GitHub */}
            <a 
              href="https://github.com/DecryptorX" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile"
              style={{ color: 'var(--text-muted)', display: 'flex', transition: 'color 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/ishan-yadav-a22251325" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile"
              style={{ color: 'var(--text-muted)', display: 'flex', transition: 'color 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Separator */}
            <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.06)' }} />

            {/* Resume Button */}
            <motion.button 
              onClick={openModal} 
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '0.35rem 1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 600,
                background: 'rgba(255, 255, 255, 0.02)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'; }}
            >
              <FileText size={11} />
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
              <motion.div
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <X size={20} style={{ color: '#fff' }} /> : <Menu size={20} />}
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
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 70,
              left: '1rem',
              right: '1rem',
              background: 'rgba(5, 5, 6, 0.9)',
              backdropFilter: 'blur(40px) saturate(200%)',
              WebkitBackdropFilter: 'blur(40px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              borderRadius: '1.5rem',
              padding: '2rem',
              zIndex: 49,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* Page Links list with stagger */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {NAV_ITEMS.map(({ href, label }, i) => {
                const isActive = pathname === href;
                return (
                  <motion.li 
                    key={href}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        color: isActive ? '#ffffff' : 'var(--text-muted)',
                        fontSize: '1rem',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: isActive ? 600 : 500,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 0.5rem',
                        borderRadius: '0.75rem',
                        transition: 'background 0.2s'
                      }}
                    >
                      {isActive && (
                        <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--accent-emerald)', flexShrink: 0 }} />
                      )}
                      {label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)' }} />

            {/* Resume button inside Mobile drawer */}
            <button
              onClick={() => { setMobileOpen(false); openModal(); }}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <FileText size={14} />
              Resume
            </button>

            {/* Social quick links inside Mobile drawer */}
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '0.25rem' }}>
              <a 
                href="https://github.com/DecryptorX" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/ishan-yadav-a22251325" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg> LinkedIn
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
