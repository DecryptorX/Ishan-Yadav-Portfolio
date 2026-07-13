"use client";
import React, { Suspense, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

const cardStyle: React.CSSProperties = {
  background: 'rgba(17, 17, 17, 0.8)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '1.5rem',
  padding: '2.5rem 2rem',
  maxWidth: '440px',
  width: '100%',
  textAlign: 'center',
  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 255, 136, 0.04)',
  position: 'relative',
  overflow: 'hidden',
};

function LoginCard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [devName, setDevName] = useState('');
  const [devEmail, setDevEmail] = useState('');

  // Redirect if already authenticated
  React.useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleDevSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      name: devName || 'Guest Developer',
      email: devEmail || 'guest@portfolio.local',
      callbackUrl
    });
  };

  if (status === 'loading' || status === 'authenticated') {
    return (
      <div style={{ minHeight: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00ff88', fontFamily: 'monospace' }}>
        Verifying security parameters...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={cardStyle}
    >
      {/* Glowing badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.8rem', borderRadius: 999, border: '1px solid rgba(0,255,136,0.2)', background: 'rgba(0,255,136,0.03)', color: '#00ff88', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.5rem', marginInline: 'auto' }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 6px #00ff88', animation: 'pulse-dot-login 2s infinite' }} />
        Secure Gateway
      </div>

      <h1 style={{ fontSize: '1.75rem', fontWeight: 850, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '0.4rem' }}>Welcome Back</h1>
      <p style={{ fontSize: '0.85rem', color: 'rgba(148,163,184,0.65)', marginBottom: '2rem' }}>Authenticate to continue.</p>

      {/* OAuth Providers Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        
        {/* LinkedIn (Primary, visually highlighted) */}
        <button
          onClick={() => signIn('linkedin', { callbackUrl })}
          style={{
            padding: '0.8rem 1.25rem',
            borderRadius: '0.75rem',
            background: '#00ff88',
            color: '#000',
            fontWeight: 800,
            fontSize: '0.85rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            transition: 'all 0.2s',
            boxShadow: '0 4px 15px rgba(0, 255, 136, 0.2)'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 136, 0.35)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 255, 136, 0.2)'; }}
        >
          <span>🔗</span> Sign In with LinkedIn
        </button>

        {/* GitHub */}
        <button
          onClick={() => signIn('github', { callbackUrl })}
          style={{
            padding: '0.8rem 1.25rem',
            borderRadius: '0.75rem',
            background: 'rgba(255,255,255,0.03)',
            color: '#f1f5f9',
            fontWeight: 700,
            fontSize: '0.85rem',
            border: '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
        >
          <span>⌥</span> Sign In with GitHub
        </button>

        {/* Google */}
        <button
          onClick={() => signIn('google', { callbackUrl })}
          style={{
            padding: '0.8rem 1.25rem',
            borderRadius: '0.75rem',
            background: 'transparent',
            color: 'rgba(226,232,240,0.85)',
            fontWeight: 700,
            fontSize: '0.85rem',
            border: '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
        >
          <span>✨</span> Google Sign-In
        </button>

      </div>

      {/* Dev Bypass Divider */}
      <div style={{ margin: '1.5rem 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.15)', fontSize: '0.7rem', letterSpacing: '0.05em', fontWeight: 700, textTransform: 'uppercase' }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
        or developer bypass
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Credentials form */}
      <form onSubmit={handleDevSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left' }}>
        <div>
          <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.2rem', fontWeight: 700 }}>Test Name</label>
          <input
            type="text"
            placeholder="Ishan Yadav"
            value={devName}
            onChange={e => setDevName(e.target.value)}
            style={{
              width: '100%', padding: '0.55rem 0.75rem', borderRadius: '0.4rem', background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)', color: '#fff', fontSize: '0.8rem', outline: 'none'
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.2rem', fontWeight: 700 }}>Test Email (Use outlook for Admin)</label>
          <input
            type="email"
            placeholder="ishanyadav09@outlook.com"
            value={devEmail}
            onChange={e => setDevEmail(e.target.value)}
            style={{
              width: '100%', padding: '0.55rem 0.75rem', borderRadius: '0.4rem', background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)', color: '#fff', fontSize: '0.8rem', outline: 'none'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%', padding: '0.6rem', borderRadius: '0.4rem', background: 'rgba(0,255,136,0.05)',
            border: '1px solid rgba(0,255,136,0.2)', color: '#00ff88', fontWeight: 800,
            fontSize: '0.78rem', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s', marginTop: '0.25rem'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,136,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,255,136,0.05)'; }}
        >
          🔑 Authenticate Developer Session
        </button>
      </form>

      <div style={{ marginTop: '1.75rem', fontSize: '0.7rem', color: 'rgba(148,163,184,0.4)' }}>
        By authenticating, you establish a secure session profile.
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#09090b', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background ambient glows */}
      <div aria-hidden style={{ position: 'absolute', top: '20%', left: '20%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '20%', right: '20%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <Suspense fallback={
        <div style={{ color: '#00ff88', fontFamily: 'monospace' }}>
          Loading authentication parameters...
        </div>
      }>
        <LoginCard />
      </Suspense>

      <style>{`
        @keyframes pulse-dot-login {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.8); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
