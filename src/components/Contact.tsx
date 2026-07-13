"use client";
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/DecryptorX', icon: '⌥', sub: 'github.com/DecryptorX', color: '#f1f5f9' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ishan-yadav-a22251325', icon: '🔗', sub: 'linkedin.com/in/ishan-yadav', color: '#0a66c2' },
  { label: 'Email', href: 'mailto:ishanyadav09@outlook.com', icon: '✉', sub: 'ishanyadav09@outlook.com', color: '#00e5ff' },
  { label: 'Phone', href: 'tel:+919717432895', icon: '📱', sub: '+91 97174 32895', color: '#10b981' },
];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem', borderRadius: '0.6rem',
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
  color: '#f1f5f9', fontSize: '0.9rem', outline: 'none',
  transition: 'border-color 0.2s',
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_KEY || ''
      );
      setStatus('sent');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Say Hello</p>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>Get In Touch</h2>
          <p style={{ color: 'rgba(148,163,184,0.8)', fontSize: '0.95rem', marginBottom: '3rem', maxWidth: 500 }}>Have a project in mind or just want to chat? I&apos;m always open to interesting conversations.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Form */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1.25rem', padding: '1.75rem' }}>
              <h3 style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '1rem', marginBottom: '1.25rem' }}>Send a message</h3>
              <form ref={formRef} onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <input name="from_name" required placeholder="Your name" style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }} />
                <input name="reply_to" required type="email" placeholder="Your email" style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }} />
                <textarea name="message" required placeholder="Your message..." style={{ ...inputStyle, minHeight: 130, resize: 'vertical' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }} />
                <button type="submit" disabled={status === 'sending'} style={{
                  padding: '0.75rem', borderRadius: '0.6rem', fontWeight: 700, fontSize: '0.9rem',
                  background: status === 'sent' ? '#10b981' : '#00e5ff',
                  color: '#000', border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s', opacity: status === 'sending' ? 0.7 : 1,
                }}>
                  {status === 'sending' ? 'Sending…' : status === 'sent' ? '✓ Message Sent!' : status === 'error' ? 'Try again' : 'Send Message'}
                </button>
                {status === 'error' && <p style={{ color: '#f87171', fontSize: '0.8rem' }}>Something went wrong. Email me directly at ishanyadav09@outlook.com</p>}
              </form>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '0.5rem' }}>
                <p style={{ color: 'rgba(148,163,184,0.8)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                  Open to internship opportunities, freelance projects, and interesting conversations about cybersecurity and software engineering.
                </p>
              </div>
              {LINKS.map(l => (
                <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1.1rem',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '0.75rem', transition: 'border-color 0.2s, background 0.2s',
                    color: 'inherit',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.2)'; e.currentTarget.style.background = 'rgba(0,229,255,0.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>
                  <span style={{ fontSize: '1.2rem' }}>{l.icon}</span>
                  <div>
                    <p style={{ fontWeight: 600, color: '#f1f5f9', fontSize: '0.88rem' }}>{l.label}</p>
                    <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.78rem' }}>{l.sub}</p>
                  </div>
                  <span style={{ marginLeft: 'auto', color: 'rgba(148,163,184,0.4)', fontSize: '0.9rem' }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
