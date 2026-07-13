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

export default function TermsPage() {
  const lastUpdated = 'July 14, 2025';

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', padding: '8rem 1.5rem 5rem', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient glow */}
      <div aria-hidden style={{ position: 'absolute', top: '10%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.025) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>

        {/* Back link */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'rgba(148,163,184,0.6)', textDecoration: 'none', marginBottom: '3rem', fontWeight: 600, transition: 'color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#00ff88'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(148,163,184,0.6)'; }}>
          ← Back to Home
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: 999, border: '1px solid rgba(0,229,255,0.15)', background: 'rgba(0,229,255,0.03)', color: '#00e5ff', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
            Legal
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>
            Terms of Use
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
            <h2 style={headingStyle}>Acceptance of Terms</h2>
            <p style={bodyStyle}>
              By accessing or using this portfolio website (&ldquo;the Site&rdquo;), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Intellectual Property</h2>
            <p style={bodyStyle}>
              All content on the Site — including but not limited to text, code, graphics, logos, and project descriptions — is the intellectual property of Ishan Yadav unless otherwise noted. You may not reproduce, distribute, or use any content without prior written permission.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Portfolio Content</h2>
            <p style={bodyStyle}>
              Projects, case studies, and written content on this Site are provided for informational and demonstration purposes only. Details about third-party projects or employers have been shared with permission or are publicly available. Any views expressed are solely those of the author.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Disclaimer</h2>
            <p style={bodyStyle}>
              The Site and its content are provided &ldquo;as is&rdquo; without any warranty of any kind, express or implied. While every effort is made to ensure accuracy, no representations are made as to the completeness or accuracy of information on the Site.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Limitation of Liability</h2>
            <p style={bodyStyle}>
              To the fullest extent permitted by law, Ishan Yadav shall not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the Site or its content.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Acceptable Use</h2>
            <p style={bodyStyle}>
              You agree not to use the Site for any unlawful purpose or in any way that could harm the Site, its owner, or other users. Automated scraping, reverse engineering, or attempts to gain unauthorized access are prohibited.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Third-Party Links</h2>
            <p style={bodyStyle}>
              The Site may contain links to external websites. These links are provided for convenience only. Ishan Yadav is not responsible for the content or privacy practices of third-party sites.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Modifications</h2>
            <p style={bodyStyle}>
              These Terms may be updated at any time without notice. Continued use of the Site after changes constitutes your acceptance of the revised Terms.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={headingStyle}>Contact</h2>
            <p style={bodyStyle}>
              If you have any questions about these Terms, please contact me through the contact page.
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
          <Link href="/privacy" style={{
            padding: '0.7rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.85rem',
            background: 'rgba(255,255,255,0.04)', color: 'rgba(226,232,240,0.85)', border: '1px solid rgba(255,255,255,0.08)',
            textDecoration: 'none', transition: 'all 0.2s'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(226,232,240,0.85)'; }}>
            Privacy Policy
          </Link>
        </div>

      </div>
    </div>
  );
}
