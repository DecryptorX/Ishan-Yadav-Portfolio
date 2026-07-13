"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '3.5rem 2rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: '0.4rem' }}>
          Ishan<span style={{ color: '#00e5ff' }}>.</span>
        </p>
        <p style={{ color: 'rgba(100,116,139,0.8)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
          Cybersecurity Enthusiast · Software Developer · CS Student
        </p>

        {/* Main navigations */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {[
            { label: 'Uses / Setup', href: '/uses' },
            { label: 'Asset Gallery', href: '/gallery' },
            { label: 'Technical Blog', href: '/blog' },
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Admin Panel', href: '/admin' },
          ].map(l => (
            <Link key={l.label} href={l.href}
              style={{ color: 'rgba(226, 232, 240, 0.5)', fontSize: '0.82rem', transition: 'color 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#00e5ff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(226, 232, 240, 0.5)'; }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Social connections */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/DecryptorX' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ishan-yadav-a22251325' },
            { label: 'Contact', href: '/contact' },
            { label: 'Email', href: 'mailto:ishanyadav09@outlook.com' },
          ].map(l => (
            <a key={l.label} href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{ color: 'rgba(100,116,139,0.6)', fontSize: '0.82rem', transition: 'color 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#00ff88'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(100,116,139,0.6)'; }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Legal links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Use', href: '/terms' },
          ].map(l => (
            <Link key={l.label} href={l.href}
              style={{ color: 'rgba(100,116,139,0.4)', fontSize: '0.75rem', transition: 'color 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(148,163,184,0.7)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(100,116,139,0.4)'; }}>
              {l.label}
            </Link>
          ))}
        </div>

        <p style={{ color: 'rgba(100,116,139,0.4)', fontSize: '0.72rem' }}>
          © {new Date().getFullYear()} Ishan Yadav. Built with Next.js &amp; Framer Motion.
        </p>
      </div>
    </footer>
  );
}
