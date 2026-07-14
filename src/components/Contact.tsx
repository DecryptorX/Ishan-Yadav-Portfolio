"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/DecryptorX', sub: 'github.com/DecryptorX' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ishan-yadav-a22251325', sub: 'linkedin.com/in/ishan-yadav' },
  { label: 'Email', href: 'mailto:ishanyadav09@outlook.com', sub: 'ishanyadav09@outlook.com' },
  { label: 'Phone', href: 'tel:+919717432895', sub: '+91 97174 32895' },
];

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

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('from_name'),
      email: formData.get('reply_to'),
      subject: 'Portfolio Contact Form Submission',
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      setStatus('sent');
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ background: 'var(--bg)', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="section-container">
        
        {/* Asymmetrical Editorial Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '6.5rem', alignItems: 'start' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              // Say Hello
            </p>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', fontFamily: 'var(--font-display)', margin: 0 }}>
              Initiate Contact
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ paddingTop: '1.25rem' }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: 'var(--font-sans)', fontWeight: 400, margin: 0 }}>
              Have an opening, an interesting security challenge, or a software system to build? Reach out using the form below or standard directory pathways.
            </p>
          </motion.div>
        </div>

        {/* Content Columns: Form & Directories */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '6rem', alignItems: 'start' }} className="contact-grid">
          
          {/* Minimal Form Column */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <form ref={formRef} onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ position: 'relative' }}>
                <input 
                  name="from_name" 
                  required 
                  placeholder="Your Name" 
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
                  disabled={status === 'sending'} 
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '1rem 3rem', 
                    borderRadius: '9999px', 
                    fontWeight: 700, 
                    fontSize: '0.85rem',
                    background: '#ffffff',
                    color: '#070708', 
                    border: 'none', 
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                    opacity: status === 'sending' ? 0.7 : 1,
                  }}
                >
                  {status === 'sending' ? 'TRANSMITTING…' : status === 'sent' ? 'MESSAGE SECURED ✓' : status === 'error' ? 'RETRY SEND' : 'SEND TRANSMISSION'}
                </motion.button>
              </div>

              {status === 'error' && (
                <p style={{ color: '#ff6b6b', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                  Error encountered. Direct pathway: ishanyadav09@outlook.com
                </p>
              )}
            </form>
          </motion.div>

          {/* Directory Listings Column */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {LINKS.map((l, index) => (
              <a 
                key={l.label} 
                href={l.href} 
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center', 
                  padding: '1.5rem 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                  color: 'inherit',
                  textDecoration: 'none',
                  transition: 'border-color 0.3s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; }}
              >
                <div>
                  <p style={{ fontWeight: 650, color: '#ffffff', fontSize: '0.94rem', fontFamily: 'var(--font-display)', margin: 0 }}>
                    {l.label}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', fontFamily: 'var(--font-mono)', margin: '0.35rem 0 0' }}>
                    {l.sub}
                  </p>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>↗</span>
              </a>
            ))}
          </motion.div>

        </div>

      </div>

      <style>{`
        @media (max-width: 820px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </section>
  );
}
