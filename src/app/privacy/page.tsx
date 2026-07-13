"use client";
import React from 'react';
import Link from 'next/link';


const sectionStyle: React.CSSProperties = {
  marginBottom: '2.5rem',
};

const headingStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  fontWeight: 800,
  color: '#f1f5f9',
  letterSpacing: '-0.02em',
  marginBottom: '0.75rem',
};

const bodyStyle: React.CSSProperties = {
  fontSize: '0.92rem',
  color: 'rgba(148, 163, 184, 0.85)',
  lineHeight: 1.75,
};

export default function PrivacyPage() {
  const lastUpdated = 'July 14, 2025';

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', padding: '8rem 1.5rem 5rem', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient glow */}
      <div aria-hidden style={{ position: 'absolute', top: '10%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,136,0.03) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>

        {/* Back link */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'rgba(148,163,184,0.6)', textDecoration: 'none', marginBottom: '3rem', fontWeight: 600, transition: 'color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#00ff88'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(148,163,184,0.6)'; }}>
          ← Back to Home
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: 999, border: '1px solid rgba(0,255,136,0.15)', background: 'rgba(0,255,136,0.03)', color: '#00ff88', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
            Legal
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'rgba(148,163,184,0.45)' }}>
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '2.5rem' }} />

        {/* Content */}
        <div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Overview</h2>
            <p style={bodyStyle}>
              This portfolio website (&ldquo;the Site&rdquo;) is operated by Ishan Yadav. This Privacy Policy explains how information is collected, used, and protected when you visit or authenticate with the Site.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Authentication</h2>
            <p style={bodyStyle}>
              The Site uses <strong style={{ color: '#f1f5f9' }}>LinkedIn OAuth</strong> for authentication. When you sign in with LinkedIn:
            </p>
            <ul style={{ ...bodyStyle, paddingLeft: '1.25rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Authentication is handled entirely by LinkedIn&apos;s secure servers.</li>
              <li>Passwords are <strong style={{ color: '#00ff88' }}>never collected, stored, or processed</strong> by this Site.</li>
              <li>Only the minimum information required to create your session — your name, email address, and profile image — is received from LinkedIn.</li>
              <li>Session data is stored in a secure, HTTP-only cookie and expires when you log out.</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Analytics</h2>
            <p style={bodyStyle}>
              The Site may collect anonymous, aggregated visitor analytics to understand how content is used. This may include browser type, device type, country, and pages visited. No personally identifiable information is linked to analytics data unless you have authenticated.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Contact Form</h2>
            <p style={bodyStyle}>
              If you submit a message through the contact form, your name, email address, and message content are received. This information is used solely to respond to your inquiry and is not shared with any third party.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Data Sharing</h2>
            <p style={bodyStyle}>
              No personal information is sold, rented, or traded to any third party. Data may be shared only where required by law.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Cookies</h2>
            <p style={bodyStyle}>
              The Site uses one essential HTTP-only cookie to maintain your authentication session. No tracking or advertising cookies are used.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Your Rights</h2>
            <p style={bodyStyle}>
              You may log out at any time to invalidate your session. If you wish to request deletion of any data held about you, please contact the site owner using the button below.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Changes to This Policy</h2>
            <p style={bodyStyle}>
              This policy may be updated from time to time. Continued use of the Site after changes constitutes acceptance of the updated policy.
            </p>
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '2.5rem 0' }} />

        {/* Footer actions */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/contact" style={{
            padding: '0.7rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.85rem',
            background: '#00ff88', color: '#000', textDecoration: 'none', transition: 'all 0.2s',
            boxShadow: '0 0 18px rgba(0,255,136,0.2)'
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 28px rgba(0,255,136,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 18px rgba(0,255,136,0.2)'; }}>
            Contact Me
          </Link>
          <Link href="/" style={{
            padding: '0.7rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.85rem',
            background: 'rgba(255,255,255,0.04)', color: 'rgba(226,232,240,0.85)', border: '1px solid rgba(255,255,255,0.08)',
            textDecoration: 'none', transition: 'all 0.2s'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(226,232,240,0.85)'; }}>
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
