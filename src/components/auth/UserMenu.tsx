"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!session?.user) {
    return (
      <Link href="/login" style={{
        padding: '0.45rem 1rem', borderRadius: '0.4rem', fontSize: '0.8rem', fontWeight: 800,
        background: 'rgba(255,255,255,0.04)', color: '#fff', border: '1px solid rgba(255,255,255,0.08)',
        textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer'
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#00ff88'; e.currentTarget.style.color = '#00ff88'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
      >
        Sign In
      </Link>
    );
  }

  // Whitelist admin verification check
  const isAdminUser = session.user.id === process.env.NEXT_PUBLIC_ADMIN_LINKEDIN_ID || 
                      session.user.id === 'ishan-yadav' || // dev convenience
                      session.user.email === 'ishanyadav09@outlook.com' ||
                      session.user.email === process.env.NEXT_PUBLIC_ADMIN_LINKEDIN_EMAIL;

  const userImage = session.user.image;
  const userName = session.user.name ?? 'User';

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      
      {/* Avatar Node */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.5rem', outline: 'none'
        }}
      >
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden',
          background: 'conic-gradient(from 0deg, #00ff88, #00e5ff, #00ff88)', padding: '1px',
          boxShadow: '0 0 10px rgba(0,255,136,0.1)'
        }}>
          {userImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={userImage} alt={userName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#111', color: '#00ff88', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900 }}>
              {userName[0].toUpperCase()}
            </div>
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 5 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute', right: 0, width: '180px',
              background: 'rgba(17, 17, 17, 0.95)', backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '0.75rem', padding: '0.5rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)', zIndex: 100
            }}
          >
            {/* Header info */}
            <div style={{ padding: '0.4rem 0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.4rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName}</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(148,163,184,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{session.user.email}</div>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              
              <Link href="/" onClick={() => setIsOpen(false)} style={{ display: 'block', padding: '0.4rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.78rem', color: 'rgba(226,232,240,0.8)', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#00ff88'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(226,232,240,0.8)'; }}>
                👤 Profile Info
              </Link>
              
              <a href="https://github.com/DecryptorX" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '0.4rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.78rem', color: 'rgba(226,232,240,0.8)', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#00ff88'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(226,232,240,0.8)'; }}>
                ⌥ GitHub Profile
              </a>
              
              <a href="https://www.linkedin.com/in/ishan-yadav-a22251325" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '0.4rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.78rem', color: 'rgba(226,232,240,0.8)', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#00ff88'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(226,232,240,0.8)'; }}>
                🔗 LinkedIn Connect
              </a>

              {isAdminUser && (
                <Link href="/admin" onClick={() => setIsOpen(false)} style={{ display: 'block', padding: '0.4rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.78rem', color: '#00e5ff', fontWeight: 800, textDecoration: 'none', transition: 'background 0.2s', border: '1px solid rgba(0,229,255,0.15)', background: 'rgba(0,229,255,0.03)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.03)'; }}>
                  🛡️ Admin Panel
                </Link>
              )}

              <button 
                onClick={() => { setIsOpen(false); signOut(); }}
                style={{
                  width: '100%', textAlign: 'left', border: 'none', background: 'none',
                  padding: '0.4rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.78rem',
                  color: '#ff5f56', cursor: 'pointer', transition: 'background 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,95,86,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                🚪 Sign Out
              </button>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
