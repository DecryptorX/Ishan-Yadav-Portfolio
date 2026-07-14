"use client";
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useModal } from '../../context/modal';
import { useSession } from 'next-auth/react';
import { Mail, Phone, Copy, Check, Calendar } from 'lucide-react';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.01)',
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
  border: '1px solid rgba(255, 255, 255, 0.04)',
  borderRadius: '2rem',
  padding: '2.5rem',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
};

const formInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '1.25rem 0.5rem',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  color: '#ffffff',
  fontSize: '0.94rem',
  outline: 'none',
  fontFamily: 'var(--font-sans)',
  transition: 'border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
};

const SOCIAL_LINKS = [
  { 
    label: 'GitHub', 
    href: 'https://github.com/DecryptorX', 
    icon: <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>, 
    sub: 'github.com/DecryptorX' 
  },
  { 
    label: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/ishan-yadav-a22251325', 
    icon: <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>, 
    sub: 'linkedin.com/in/ishan-yadav' 
  },
  { 
    label: 'Email', 
    href: 'mailto:ishanyadav09@outlook.com', 
    icon: <Mail size={15} />, 
    sub: 'ishanyadav09@outlook.com' 
  },
  { 
    label: 'Phone', 
    href: 'tel:+919717432895', 
    icon: <Phone size={15} />, 
    sub: '+91 97174 32895' 
  },
];

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
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Asymmetrical Editorial Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '6.5rem', alignItems: 'start' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              // Say Hello
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', fontFamily: 'var(--font-display)', margin: 0 }}>
              Initiate Contact
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ paddingTop: '1.25rem' }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: 'var(--font-sans)', fontWeight: 400, margin: 0 }}>
              Submit the form below to establish pathways, download resume specifications, or locate direct network directory listings.
            </p>
          </motion.div>
        </div>

        {/* Info & Form Split */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '5rem', alignItems: 'start' }} className="contact-grid">
          
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <form ref={formRef} onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ position: 'relative' }}>
                <input 
                  name="from_name" 
                  required 
                  placeholder="Your Name" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={formInputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = '#ffffff'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }} 
                />
              </div>

              <div style={{ position: 'relative' }}>
                <input 
                  name="reply_to" 
                  required 
                  type="email" 
                  placeholder="Your Email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={formInputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = '#ffffff'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }} 
                />
              </div>

              <div style={{ position: 'relative' }}>
                <textarea 
                  name="message" 
                  required 
                  placeholder="Tell me about your project..." 
                  style={{ ...formInputStyle, minHeight: 120, resize: 'vertical' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#ffffff'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }} 
                />
              </div>

              {/* Submit button */}
              <div style={{ paddingTop: '1.5rem' }}>
                <motion.button 
                  type="submit" 
                  disabled={formStatus === 'sending'} 
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                  style={{
                    padding: '1rem 3rem',
                    cursor: formStatus === 'sending' ? 'not-allowed' : 'pointer',
                    opacity: formStatus === 'sending' ? 0.7 : 1,
                  }}
                >
                  {formStatus === 'sending' ? 'TRANSMITTING…' : formStatus === 'sent' ? 'MESSAGE SECURED ✓' : formStatus === 'error' ? 'RETRY SEND' : 'SEND TRANSMISSION'}
                </motion.button>
              </div>

              {formStatus === 'error' && (
                <p style={{ color: 'var(--accent-emerald)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                  Error transmitting. Direct pathway: ishanyadav09@outlook.com
                </p>
              )}
            </form>
          </motion.div>

          {/* Right Column: Availability, CV, Actions */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
          >
            {/* Availability Status */}
            <div style={{ ...cardStyle, padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--accent-emerald)',
                  boxShadow: '0 0 10px var(--accent-emerald)',
                  display: 'inline-block',
                  animation: 'blink 2s ease-in-out infinite'
                }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Available for Work
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                Actively seeking Cybersecurity Analyst, SOC Operations, or Software Developer positions.
              </p>
            </div>

            {/* Resume Download Box */}
            <div style={{ ...cardStyle, padding: '2rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>Curriculum Vitae</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Download my ATS-optimized professional resume summarizing technical skills and credentials.
              </p>
              <button 
                onClick={openModal} 
                className="btn-primary"
                style={{ padding: '0.7rem 1.6rem', fontSize: '0.8rem' }}
              >
                Download CV
              </button>
            </div>

            {/* Speed Actions Card */}
            <div style={{ ...cardStyle, padding: '2rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>Speed Actions</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Copy credentials to your clipboard instantly or request a video meeting slot.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('ishanyadav09@outlook.com');
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="btn-secondary"
                  style={{
                    padding: '0.55rem 1rem', fontSize: '0.78rem',
                    background: copied ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.02)',
                    color: copied ? '#050506' : '#ffffff',
                    borderColor: copied ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.06)'
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Email Copied!' : 'Copy Email'}
                </button>
                <button
                  onClick={() => alert('Booking scheduler integrated! Calendly interface will open here soon.')}
                  className="btn-secondary"
                  style={{
                    padding: '0.55rem 1rem', fontSize: '0.78rem',
                  }}
                >
                  <Calendar size={12} /> Schedule a Chat
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
                    justifyContent: 'space-between',
                    padding: '1.15rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: '1rem',
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{link.icon}</span>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, fontFamily: 'var(--font-display)' }}>{link.label}</h4>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', margin: '0.15rem 0 0', fontFamily: 'var(--font-mono)' }}>{link.sub}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>↗</span>
                </a>
              ))}
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
