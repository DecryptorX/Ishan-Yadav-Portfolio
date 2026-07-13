"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LayoutDashboard, LogOut, ExternalLink, User } from 'lucide-react';

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
        padding: '0.45rem 1.15rem',
        borderRadius: '9999px',
        fontSize: '0.8rem',
        fontWeight: 700,
        background: 'rgba(0, 255, 136, 0.06)',
        color: '#00ff88',
        border: '1px solid rgba(0, 255, 136, 0.2)',
        textDecoration: 'none',
        transition: 'all 0.2s',
        cursor: 'pointer',
        boxShadow: '0 0 10px rgba(0, 255, 136, 0.05)'
      }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 255, 136, 0.12)'; e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.45)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0, 255, 136, 0.06)'; e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.2)'; }}
      >
        Sign In
      </Link>
    );
  }

  const isAdminUser = session.user.role === 'admin';
  const userImage = session.user.image;
  const userName = session.user.name ?? 'User';

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>

      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open user menu"
        aria-expanded={isOpen}
        style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.5rem', outline: 'none'
        }}
      >
        <div style={{
          width: '34px', height: '34px', borderRadius: '50%', overflow: 'hidden',
          background: 'conic-gradient(from 0deg, #00ff88, #00e5ff, #00ff88)', padding: '1.5px',
          boxShadow: '0 0 12px rgba(0,255,136,0.15)',
          transition: 'transform 0.2s'
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
        >
          {userImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={userImage} alt={userName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#111', color: '#00ff88', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 900 }}>
              {userName[0].toUpperCase()}
            </div>
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 4 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', right: 0, width: '210px',
              background: 'rgba(9, 9, 11, 0.96)', backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '1rem', padding: '0.6rem',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 255, 136, 0.03)', zIndex: 100
            }}
          >
            {/* Header info */}
            <div style={{ padding: '0.4rem 0.6rem', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.45rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName}</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(148,163,184,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{session.user.email}</div>
              {isAdminUser && (
                <div style={{ marginTop: '0.3rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.15rem 0.45rem', borderRadius: '9999px', background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.15)', fontSize: '0.62rem', fontWeight: 800, color: '#00e5ff', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Admin
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>

              {/* Profile */}
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0.6rem',
                  borderRadius: '0.5rem', fontSize: '0.78rem', color: 'rgba(226,232,240,0.85)',
                  textDecoration: 'none', transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(226,232,240,0.85)'; }}
              >
                <User size={14} />
                Profile
              </Link>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/ishan-yadav-a22251325"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0.6rem',
                  borderRadius: '0.5rem', fontSize: '0.78rem', color: 'rgba(226,232,240,0.85)',
                  textDecoration: 'none', transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(226,232,240,0.85)'; }}
              >
                <ExternalLink size={14} />
                LinkedIn
              </a>

              {/* Admin Dashboard — shown only when role === "admin" */}
              {isAdminUser && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0.6rem',
                    borderRadius: '0.5rem', fontSize: '0.78rem', color: '#00e5ff', fontWeight: 700,
                    textDecoration: 'none', transition: 'background 0.2s', background: 'rgba(0,229,255,0.03)',
                    border: '1px solid rgba(0,229,255,0.08)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.03)'; }}
                >
                  <LayoutDashboard size={14} />
                  Admin Dashboard
                </Link>
              )}

              <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0.2rem 0' }} />

              {/* Logout */}
              <button
                onClick={() => { setIsOpen(false); signOut({ callbackUrl: '/' }); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem',
                  textAlign: 'left', border: 'none', background: 'none',
                  padding: '0.45rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.78rem',
                  color: '#ff5f56', cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,95,86,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <LogOut size={14} />
                Logout
              </button>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
