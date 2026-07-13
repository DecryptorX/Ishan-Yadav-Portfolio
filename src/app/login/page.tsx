"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { signIn, useSession, getProviders } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

const IS_DEV = process.env.NODE_ENV !== 'production';

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
  const { status, data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const authError = searchParams.get('error');

  const [providers, setProviders] = useState<Record<string, unknown> | null>(null);
  const [providersLoaded, setProvidersLoaded] = useState(false);
  const [devName, setDevName] = useState('');
  const [devEmail, setDevEmail] = useState('');

  // Discover which real providers the server actually registered.
  useEffect(() => {
    let active = true;
    getProviders()
      .then((p) => {
        if (active) {
          setProviders(p as Record<string, unknown> | null);
          setProvidersLoaded(true);
        }
      })
      .catch(() => active && setProvidersLoaded(true));
    return () => {
      active = false;
    };
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      const isAdmin = session?.user?.role === 'admin' || (session?.user as any)?.isAdmin;
      if (isAdmin) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [status, session, router]);

  const linkedinAvailable = Boolean(providers && providers['linkedin']);
  const credentialsAvailable = Boolean(providers && providers['credentials']);

  const handleDevSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      name: devName || 'Guest Developer',
      email: devEmail || 'guest@portfolio.local',
      callbackUrl: '/login',
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
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={cardStyle}
    >
      {/* Glowing badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.8rem', borderRadius: 999, border: '1px solid rgba(0,255,136,0.2)', background: 'rgba(0,255,136,0.03)', color: '#00ff88', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.5rem', marginInline: 'auto' }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 6px #00ff88', animation: 'pulse-dot-login 2s infinite' }} />
        Secure Gateway
      </div>

      <h1 style={{ fontSize: '1.75rem', fontWeight: 850, color: '#f1f5f9', letterSpacing: '-0.04em', marginBottom: '0.4rem' }}>Welcome Back</h1>
      <p style={{ fontSize: '0.85rem', color: 'rgba(148,163,184,0.65)', marginBottom: '2rem' }}>Sign in with LinkedIn to continue.</p>

      {/* OAuth error surfaced by NextAuth (e.g. OAuthCallback) */}
      {authError && (
        <div style={{ marginBottom: '1.25rem', padding: '0.65rem 0.85rem', borderRadius: '0.6rem', border: '1px solid rgba(255,95,86,0.3)', background: 'rgba(255,95,86,0.06)', color: '#ff8a80', fontSize: '0.76rem', textAlign: 'left' }}>
          Authentication failed ({authError}). Please try again or contact the site owner.
        </div>
      )}

      {/* Provider area */}
      {!providersLoaded ? (
        <div style={{ minHeight: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,255,136,0.6)', fontFamily: 'monospace', fontSize: '0.8rem' }}>
          Resolving providers…
        </div>
      ) : linkedinAvailable ? (
        <button
          onClick={() => signIn('linkedin', { callbackUrl: '/login' })}
          style={{
            width: '100%',
            padding: '0.85rem 1.25rem',
            borderRadius: '0.75rem',
            background: '#00ff88',
            color: '#04160d',
            fontWeight: 800,
            fontSize: '0.9rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 15px rgba(0, 255, 136, 0.2)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 136, 0.32)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 255, 136, 0.2)'; }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0z" /></svg>
          Sign In with LinkedIn
        </button>
      ) : (
        /* No real provider configured — show a clear configuration error, never mock. */
        <div style={{ padding: '1.1rem', borderRadius: '0.75rem', border: '1px solid rgba(255, 184, 0, 0.25)', background: 'rgba(255, 184, 0, 0.04)', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffb800', fontWeight: 800, fontSize: '0.82rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '1rem' }}>⚠</span> Authentication not configured
          </div>
          <p style={{ fontSize: '0.78rem', color: 'rgba(226,232,240,0.7)', lineHeight: 1.6, margin: 0 }}>
            LinkedIn OAuth is not available in this environment. The site owner needs to set{' '}
            <code style={{ color: '#00ff88' }}>LINKEDIN_CLIENT_ID</code>,{' '}
            <code style={{ color: '#00ff88' }}>LINKEDIN_CLIENT_SECRET</code>,{' '}
            <code style={{ color: '#00ff88' }}>AUTH_SECRET</code> and{' '}
            <code style={{ color: '#00ff88' }}>AUTH_URL</code> in the deployment environment.
          </p>
        </div>
      )}

      {/* Developer bypass — LOCAL DEV ONLY (never rendered/available in production) */}
      {IS_DEV && credentialsAvailable && (
        <>
          <div style={{ margin: '1.5rem 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.15)', fontSize: '0.7rem', letterSpacing: '0.05em', fontWeight: 700, textTransform: 'uppercase' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            dev bypass (local only)
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          </div>

          <form onSubmit={handleDevSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left' }}>
            <input
              type="text"
              placeholder="Test name"
              value={devName}
              onChange={(e) => setDevName(e.target.value)}
              style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '0.4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', color: '#fff', fontSize: '0.8rem', outline: 'none' }}
            />
            <input
              type="email"
              placeholder="test@local"
              value={devEmail}
              onChange={(e) => setDevEmail(e.target.value)}
              style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '0.4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', color: '#fff', fontSize: '0.8rem', outline: 'none' }}
            />
            <button
              type="submit"
              style={{ width: '100%', padding: '0.6rem', borderRadius: '0.4rem', background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.2)', color: '#00ff88', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s', marginTop: '0.25rem' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,255,136,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,255,136,0.05)'; }}
            >
              Authenticate developer session
            </button>
          </form>
        </>
      )}

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

      <Suspense fallback={<div style={{ color: '#00ff88', fontFamily: 'monospace' }}>Loading authentication parameters...</div>}>
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
