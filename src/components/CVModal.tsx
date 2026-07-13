"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../context/modal';
import emailjs from '@emailjs/browser';

type Tab = 'email' | 'download';
type Status = 'idle' | 'sending' | 'sent' | 'error';

const TOPICS = ['Hiring', 'Internship', 'Collaboration', 'Research', 'Just Curious', 'Other'];

const inputCss: React.CSSProperties = {
  width: '100%',
  padding: '0.65rem 0.9rem',
  borderRadius: '0.5rem',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#f1f5f9',
  fontSize: '0.88rem',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelCss: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(148,163,184,0.6)',
  marginBottom: '0.4rem',
};

export default function CVModal() {
  const { isOpen, closeModal } = useModal();
  const [tab, setTab] = useState<Tab>('email');
  const [form, setForm] = useState({ name: '', email: '', topic: 'Hiring' });
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeModal]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('sending');

    // Save visitor
    try {
      const res = await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, source: 'form', topic: form.topic }),
      });
      const data = await res.json();
      if (data.id) {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId: data.id, page: 'cv-modal', action: `email_request:${form.topic}` }),
        });
      }
    } catch {}

    // Send via EmailJS if configured
    try {
      const svcId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const tplId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const key   = process.env.NEXT_PUBLIC_EMAILJS_KEY;
      if (svcId && tplId && key && formRef.current) {
        await emailjs.sendForm(svcId, tplId, formRef.current, key);
      }
      setStatus('sent');
    } catch {
      // Even if EmailJS fails, data is stored — show success
      setStatus('sent');
    }
  }

  async function handleDownload() {
    try {
      const res = await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Anonymous', email: 'direct@download', source: 'direct' }),
      });
      const data = await res.json();
      if (data.id) {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId: data.id, page: 'cv-modal', action: 'direct_download' }),
        });
      }
    } catch {}
    // Use a hidden anchor with download attribute to force browser download
    const a = document.createElement('a');
    a.href = '/resume.pdf';
    a.download = 'Ishan_Yadav_Resume.pdf';
    a.click();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.72)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          {/* Centering wrapper — flexbox centres the card; Framer Motion handles only scale/y animation */}
          <div style={{
            position: 'fixed', inset: 0, zIndex: 201,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
            pointerEvents: 'none',
          }}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Get CV"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              pointerEvents: 'all',
              width: '100%', maxWidth: 460,
              background: 'rgba(17,17,20,0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '1.25rem',
              padding: '2rem',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Close */}
            <button
              onClick={closeModal}
              aria-label="Close"
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(226,232,240,0.6)', fontSize: '1rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(226,232,240,0.6)'; }}
            >
              ×
            </button>

            {/* Badge */}
            <div style={{ marginBottom: '1rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.25rem 0.75rem', borderRadius: '0.35rem',
                background: 'rgba(0,229,255,0.12)', border: '1px solid rgba(0,229,255,0.3)',
                color: '#00e5ff', fontSize: '0.7rem', fontWeight: 800,
                letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>
                ↓ GET CV
              </span>
            </div>

            {/* Title */}
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.3 }}>
              Hello! Glad you&apos;re interested in my background.
            </h2>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.6rem', padding: '0.2rem' }}>
              {(['email', 'download'] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setStatus('idle'); }}
                  style={{
                    flex: 1, padding: '0.55rem 0', borderRadius: '0.4rem',
                    fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                    border: 'none', transition: 'all 0.2s',
                    background: tab === t ? '#00e5ff' : 'transparent',
                    color: tab === t ? '#000' : 'rgba(148,163,184,0.7)',
                  }}
                >
                  {t === 'email' ? 'Request on Email' : 'Download Now'}
                </button>
              ))}
            </div>

            {/* TAB: Request on Email */}
            {tab === 'email' && (
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div key="sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
                    <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>Done, {form.name.split(' ')[0]}!</p>
                    <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.85rem' }}>
                      I&apos;ll send my CV to <span style={{ color: '#00e5ff' }}>{form.email}</span> shortly. Talk soon!
                    </p>
                    <button onClick={closeModal} style={{
                      marginTop: '1.25rem', padding: '0.6rem 1.5rem', borderRadius: '0.5rem',
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(226,232,240,0.8)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                    }}>Close</button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p style={{ color: 'rgba(148,163,184,0.65)', fontSize: '0.83rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                      Enter your details below, and I&apos;ll send you a copy of my CV right away.
                    </p>
                    <form ref={formRef} onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={labelCss}>Your Name</label>
                        <input
                          name="from_name"
                          required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="John Doe"
                          style={inputCss}
                          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.45)'; }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                        />
                      </div>
                      <div>
                        <label style={labelCss}>Email Address</label>
                        <input
                          name="reply_to"
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="you@example.com"
                          style={inputCss}
                          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.45)'; }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                        />
                      </div>
                      <div>
                        <label style={labelCss}>Topic of Interest</label>
                        <select
                          name="topic"
                          value={form.topic}
                          onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
                          style={{
                            ...inputCss,
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.9rem center',
                            cursor: 'pointer',
                          }}
                        >
                          {TOPICS.map(t => <option key={t} value={t} style={{ background: '#111114' }}>{t}</option>)}
                        </select>
                      </div>
                      {status === 'error' && (
                        <p style={{ color: '#f87171', fontSize: '0.8rem' }}>Something went wrong — please email me directly.</p>
                      )}
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        style={{
                          padding: '0.8rem', borderRadius: '0.6rem', border: 'none',
                          background: status === 'sending' ? 'rgba(0,229,255,0.6)' : '#00e5ff',
                          color: '#000', fontWeight: 800, fontSize: '0.95rem',
                          cursor: status === 'sending' ? 'wait' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                          transition: 'all 0.2s',
                          boxShadow: '0 0 20px rgba(0,229,255,0.25)',
                        }}
                        onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.boxShadow = '0 0 30px rgba(0,229,255,0.5)'; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,255,0.25)'; }}
                      >
                        {status === 'sending' ? (
                          <>Sending…</>
                        ) : (
                          <><span style={{ fontSize: '1rem' }}>↓</span> Get CV</>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* TAB: Download Now */}
            {tab === 'download' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ color: 'rgba(148,163,184,0.65)', fontSize: '0.83rem', lineHeight: 1.6 }}>
                  Download my latest ATS-optimised CV directly. No sign-in required.
                </p>
                <div style={{ padding: '1.25rem', borderRadius: '0.75rem', background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.15)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '2rem' }}>📄</span>
                  <div>
                    <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.9rem' }}>Ishan_Yadav_ATS_Resume.pdf</p>
                    <p style={{ color: 'rgba(148,163,184,0.5)', fontSize: '0.75rem', marginTop: '0.2rem' }}>PDF · ATS-Optimised · Updated 2026</p>
                  </div>
                </div>
                <a
                  href="/resume.pdf"
                  download="Ishan_Yadav_Resume.pdf"
                  style={{
                    padding: '0.8rem', borderRadius: '0.6rem', border: 'none',
                    background: '#00e5ff', color: '#000',
                    fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    boxShadow: '0 0 20px rgba(0,229,255,0.25)', transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,229,255,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,255,0.25)'; }}
                >
                  <span>&#8595;</span> Download Now
                </a>
              </motion.div>
            )}
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
