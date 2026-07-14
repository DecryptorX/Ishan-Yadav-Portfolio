"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.03)', padding: '5rem 2rem 3rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Top section — editorial grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Brand column */}
          <div>
            <p style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff', marginBottom: '0.75rem', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
              Ishan<span style={{ color: 'var(--accent-emerald)' }}>.</span>
            </p>
            <p style={{ color: 'var(--text-subtle)', fontSize: '0.82rem', lineHeight: 1.7, maxWidth: 260 }}>
              Building secure software and AI-driven tools. CS student at Bennett University.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem', fontWeight: 600 }}>
              Navigation
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Uses / Setup', href: '/uses' },
                { label: 'Asset Gallery', href: '/gallery' },
                { label: 'Technical Blog', href: '/blog' },
                { label: 'Dashboard', href: '/dashboard' },
              ].map(l => (
                <Link key={l.label} href={l.href}
                  style={{ color: 'var(--text-subtle)', fontSize: '0.82rem', transition: 'color 0.3s', textDecoration: 'none', fontWeight: 500 }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-subtle)'; }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect column */}
          <div>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem', fontWeight: 600 }}>
              Connect
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'GitHub', href: 'https://github.com/DecryptorX' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ishan-yadav-a22251325' },
                { label: 'Email', href: 'mailto:ishanyadav09@outlook.com' },
                { label: 'Contact Form', href: '/contact' },
              ].map(l => (
                <a key={l.label} href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ color: 'var(--text-subtle)', fontSize: '0.82rem', transition: 'color 0.3s', textDecoration: 'none', fontWeight: 500 }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-subtle)'; }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal column */}
          <div>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem', fontWeight: 600 }}>
              Legal
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Use', href: '/terms' },
                { label: 'Admin Panel', href: '/admin' },
              ].map(l => (
                <Link key={l.label} href={l.href}
                  style={{ color: 'var(--text-subtle)', fontSize: '0.82rem', transition: 'color 0.3s', textDecoration: 'none', fontWeight: 500 }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-subtle)'; }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-subtle)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', margin: 0 }}>
            © {new Date().getFullYear()} Ishan Yadav
          </p>
          <p style={{ color: 'var(--text-subtle)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', margin: 0 }}>
            Built with Next.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
