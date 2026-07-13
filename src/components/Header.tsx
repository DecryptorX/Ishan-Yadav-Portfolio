"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useModal } from '../context/modal';
import UserMenu from './auth/UserMenu';

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
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        
        {/* Brand Logo */}
        <Link href="/" style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff', letterSpacing: '-0.04em', textDecoration: 'none' }}>
          Ishan<span style={{ color: '#00e5ff' }}>.</span>
        </Link>

        {/* Navigation list */}
        <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
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

        {/* Right side controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
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
      </div>
    </header>
  );
}
