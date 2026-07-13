"use client";
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useModal } from '../../context/modal';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '1.25rem',
  padding: '2rem',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '0.6rem',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#f1f5f9',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/DecryptorX', icon: '⌥', sub: 'github.com/DecryptorX', color: '#f1f5f9' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ishan-yadav-a22251325', icon: '🔗', sub: 'linkedin.com/in/ishan-yadav', color: '#0a66c2' },
  { label: 'Email', href: 'mailto:ishanyadav09@outlook.com', icon: '✉', sub: 'ishanyadav09@outlook.com', color: '#00e5ff' },
  { label: 'Phone', href: 'tel:+919717432895', icon: '📱', sub: '+91 97174 32895', color: '#10b981' },
];

import { useSession } from 'next-auth/react';

export default function ContactPage() {
  const { openModal } = useModal();
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  React.useEffect(() => {
    if (session?.user) {
      if (session.user.name) setName(session.user.name);
      if (session.user.email && !session.user.email.includes('@portfolio.local')) {
        setEmail(session.user.email);
      }
    }
  }, [session]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setFormStatus('sending');
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_KEY || ''
      );
      setFormStatus('sent');
      formRef.current.reset();
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '8rem 2rem 6rem', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '5rem', textAlign: 'center' }}
        >
          <p style={{ fontSize: '0.8rem', color: '#00e5ff', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Connection</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '1rem' }}>Contact Me</h1>
          <p style={{ color: 'rgba(148,163,184,0.75)', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
            Submit the form below, check my availability, download my resume, or reach out directly on social networks.
          </p>
        </motion.div>

        {/* Info & Form Split */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          
          {/* Left Column: Direct info, Availability and Resume */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Availability Status */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#00ff88',
                  boxShadow: '0 0 10px #00ff88',
                  display: 'inline-block',
                  animation: 'pulse-glow 2s ease-in-out infinite'
                }} />
                <span style={{ fontSize: '0.85rem', color: '#00ff88', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Available for Opportunities
                </span>
              </div>
              <p style={{ color: 'rgba(148,163,184,0.85)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Actively seeking Cybersecurity Analyst, SOC Operations, or Software Developer Intern positions.
              </p>
            </div>

            {/* Resume Download Box */}
            <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(0,229,255,0.03) 0%, rgba(99,102,241,0.03) 100%)', border: '1px solid rgba(0,229,255,0.15)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.5rem' }}>Curriculum Vitae</h3>
              <p style={{ color: 'rgba(148,163,184,0.75)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Download my ATS-optimized professional resume summarizing my technical capabilities, achievements, and course works.
              </p>
              <button 
                onClick={openModal} 
                style={{
                  padding: '0.7rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.85rem',
                  background: '#00e5ff', color: '#000', border: 'none', transition: 'all 0.2s', cursor: 'pointer',
                  boxShadow: '0 0 15px rgba(0,229,255,0.2)'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 25px rgba(0,229,255,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 15px rgba(0,229,255,0.2)'; }}
              >
                Download CV
              </button>
            </div>

            {/* Speed Actions Card */}
            <div style={{ ...cardStyle, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.5rem' }}>Speed Actions</h3>
              <p style={{ color: 'rgba(148,163,184,0.75)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Copy credentials to your clipboard instantly or request a video meeting slot.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('ishanyadav09@outlook.com');
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  style={{
                    padding: '0.55rem 1rem', borderRadius: '0.4rem', fontWeight: 700, fontSize: '0.78rem',
                    background: copied ? '#00ff88' : 'rgba(255,255,255,0.04)',
                    color: copied ? '#000' : '#fff',
                    border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: copied ? '0 0 10px rgba(0,255,136,0.2)' : 'none'
                  }}
                >
                  {copied ? '✓ Email Copied!' : '✉ Copy Email'}
                </button>
                <button
                  onClick={() => alert('Booking scheduler integrated! Calendly interface will open here soon.')}
                  style={{
                    padding: '0.55rem 1rem', borderRadius: '0.4rem', fontWeight: 700, fontSize: '0.78rem',
                    background: 'transparent', color: '#00e5ff',
                    border: '1px solid rgba(0,229,255,0.25)', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  📅 Schedule a Chat
                </button>
              </div>
            </div>

            {/* Social Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.85rem 1.25rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '0.75rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.25)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>{link.label}</h4>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(148,163,184,0.6)', margin: 0 }}>{link.sub}</p>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'rgba(148,163,184,0.4)' }}>↗</span>
                </a>
              ))}
            </div>

          </motion.div>

          {/* Right Column: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={cardStyle}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>Send a Message</h2>
            
            {/* Authenticated user indicator */}
            {session?.user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', background: 'rgba(0,255,136,0.03)', border: '1px solid rgba(0,255,136,0.12)' }}>
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt={session.user.name ?? ''} width={32} height={32} style={{ borderRadius: '50%', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#111', color: '#00ff88', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, flexShrink: 0 }}>
                    {session.user.name ? session.user.name[0].toUpperCase() : 'U'}
                  </div>
                )}
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f1f5f9' }}>Signed in as {session.user.name}</div>
                  <div style={{ fontSize: '0.68rem', color: '#00ff88', fontWeight: 600 }}>Form fields auto-filled</div>
                </div>
              </div>
            )}

            <form ref={formRef} onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <label style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem', fontWeight: 700 }}>Your Name *</label>
                <input
                  required
                  name="from_name"
                  placeholder="John Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem', fontWeight: 700 }}>Your Email *</label>
                <input
                  required
                  name="reply_to"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem', fontWeight: 700 }}>Your Message *</label>
                <textarea
                  required
                  name="message"
                  placeholder="Hey Ishan, let's collaborate on..."
                  style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.6rem',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  background: formStatus === 'sent' ? '#10b981' : '#00e5ff',
                  color: '#000',
                  border: 'none',
                  cursor: formStatus === 'sending' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: formStatus === 'sending' ? 0.7 : 1,
                  marginTop: '0.5rem',
                  boxShadow: formStatus === 'sent' ? '0 0 15px rgba(16,185,129,0.2)' : '0 0 15px rgba(0,229,255,0.2)'
                }}
              >
                {formStatus === 'sending' ? 'Sending…' : formStatus === 'sent' ? '✓ Message Sent!' : formStatus === 'error' ? 'Try Again' : 'Send Message'}
              </button>

              {formStatus === 'error' && (
                <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                  Something went wrong. Please try emailing me directly at: ishanyadav09@outlook.com
                </p>
              )}

            </form>
          </motion.div>

        </div>

      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.9); }
        }
      `}</style>
    </div>
  );
}
