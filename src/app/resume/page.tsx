"use client";
import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

type Stage = 'choose' | 'form' | 'ready';

export default function ResumePage() {
  const { data: session } = useSession();
  const [stage, setStage] = useState<Stage>('choose');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Auto-advance if logged in via LinkedIn
  React.useEffect(() => {
    if (session?.user) {
      handleLinkedInVisitor();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function handleLinkedInVisitor() {
    if (!session?.user) return;
    try {
      const res = await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: session.user.name ?? 'Unknown',
          email: session.user.email ?? '',
          source: 'linkedin',
          linkedinId: session.user.id,
          linkedinImage: session.user.image,
        }),
      });
      const data = await res.json();
      setVisitorId(data.id);
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId: data.id, page: '/resume', action: 'linkedin_login' }),
      });
    } catch {}
    setStage('ready');
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) { setError('Please fill in name and email.'); return; }
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'form' }),
      });
      const data = await res.json();
      setVisitorId(data.id);
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId: data.id, page: '/resume', action: 'form_submit' }),
      });
      setStage('ready');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDownload() {
    if (visitorId) {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId, page: '/resume', action: 'cv_downloaded' }),
      });
    }
    window.open('/resume.pdf', '_blank');
  }

  const card: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '1.25rem', padding: '2rem',
  };
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '0.6rem',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    color: '#f1f5f9', fontSize: '0.9rem', outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 4rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: '0.78rem', color: '#00e5ff', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>My Resume</p>
          <h1 style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Download CV</h1>
          <p style={{ color: 'rgba(148,163,184,0.8)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
            Choose how you&apos;d like to access my resume. Your information helps me understand who&apos;s interested in my work.
          </p>
        </motion.div>

        {/* STAGE: choose */}
        {stage === 'choose' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ display: 'grid', gap: '1rem' }}>

            {/* Option 1: Quick download */}
            <div style={card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '0.6rem', background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>📄</div>
                <div>
                  <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem' }}>Quick Download</h3>
                  <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.8rem' }}>No sign-in required</p>
                </div>
              </div>
              <a href="/resume.pdf" download target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '0.7rem', borderRadius: '0.6rem', background: '#00e5ff', color: '#000',
                  fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,255,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}>
                ↓ Download Now
              </a>
            </div>

            {/* Option 2: LinkedIn */}
            <div style={card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '0.6rem', background: 'rgba(10,102,194,0.15)', border: '1px solid rgba(10,102,194,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🔗</div>
                <div>
                  <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem' }}>Continue with LinkedIn</h3>
                  <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.8rem' }}>Auto-fill your details from your LinkedIn profile</p>
                </div>
              </div>
              <button onClick={() => signIn('linkedin', { callbackUrl: '/resume' })}
                style={{
                  width: '100%', padding: '0.7rem', borderRadius: '0.6rem',
                  background: '#0a66c2', color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0055a5'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#0a66c2'; }}>
                Sign in with LinkedIn
              </button>
            </div>

            {/* Option 3: Manual form */}
            <div style={card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '0.6rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>✏️</div>
                <div>
                  <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem' }}>Fill in Your Details</h3>
                  <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.8rem' }}>Leave your contact info &amp; download</p>
                </div>
              </div>
              <button onClick={() => setStage('form')} style={{
                width: '100%', padding: '0.7rem', borderRadius: '0.6rem',
                background: 'rgba(99,102,241,0.15)', color: '#818cf8', fontWeight: 700, fontSize: '0.9rem',
                border: '1px solid rgba(99,102,241,0.3)', cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; }}>
                Fill Form &amp; Download
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE: form */}
        {stage === 'form' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={card}>
            <button onClick={() => setStage('choose')} style={{ background: 'none', border: 'none', color: 'rgba(148,163,184,0.6)', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '1.25rem', padding: 0 }}>← Back</button>
            <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.4rem' }}>Quick Details</h3>
            <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
              Your info is shared only with Ishan Yadav and won&apos;t be sold or shared further.
            </p>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Full name *" style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }} />
              <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="Email address *" style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }} />
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="Phone number (optional)" style={inputStyle}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }} />
              {error && <p style={{ color: '#f87171', fontSize: '0.82rem' }}>{error}</p>}
              <button type="submit" disabled={submitting} style={{
                padding: '0.75rem', borderRadius: '0.6rem', background: '#00e5ff', color: '#000',
                fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: submitting ? 'wait' : 'pointer',
                opacity: submitting ? 0.7 : 1, transition: 'all 0.2s',
              }}>
                {submitting ? 'Saving…' : 'Continue to Download →'}
              </button>
            </form>
          </motion.div>
        )}

        {/* STAGE: ready */}
        {stage === 'ready' && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} style={{ ...card, textAlign: 'center' }}>
            {session?.user?.image && (
              <img src={session.user.image} alt={session.user.name ?? 'User'} width={72} height={72}
                style={{ borderRadius: '50%', margin: '0 auto 1rem', display: 'block', border: '3px solid rgba(0,229,255,0.3)' }} />
            )}
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎉</div>
            <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              You&apos;re all set{session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}!
            </h3>
            <p style={{ color: 'rgba(148,163,184,0.75)', fontSize: '0.88rem', marginBottom: '2rem' }}>
              Thanks for your interest. Click below to download my CV.
            </p>
            <button onClick={handleDownload} style={{
              padding: '0.85rem 2.5rem', borderRadius: '0.6rem', background: '#00e5ff', color: '#000',
              fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer',
              boxShadow: '0 0 24px rgba(0,229,255,0.3)', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; }}>
              ↓ Download Ishan Yadav CV
            </button>
            <p style={{ marginTop: '1.5rem', fontSize: '0.78rem', color: 'rgba(148,163,184,0.45)' }}>
              PDF · ATS-Optimised · Updated 2026
            </p>
          </motion.div>
        )}

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.75rem', color: 'rgba(100,116,139,0.5)' }}>
          By accessing this page you agree your contact information will be shared with Ishan Yadav only.
        </p>
      </div>
    </div>
  );
}
