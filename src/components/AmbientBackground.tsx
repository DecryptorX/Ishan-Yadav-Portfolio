"use client";
import React, { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        // Apply global cursor lighting effect to all editorial cards
        const cards = document.querySelectorAll('.card-editorial');
        cards.forEach((c) => {
          const card = c as HTMLElement;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        });

        // Optional global subtle cursor follower for the ambient background
        if (bgRef.current) {
          const w = window.innerWidth;
          const h = window.innerHeight;
          // Calculate percentage for background shifting (0 to 100%)
          const xPct = (e.clientX / w) * 100;
          const yPct = (e.clientY / h) * 100;
          bgRef.current.style.setProperty('--bg-mouse-x', `${xPct}%`);
          bgRef.current.style.setProperty('--bg-mouse-y', `${yPct}%`);
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      ref={bgRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background: `radial-gradient(circle at var(--bg-mouse-x, 50%) var(--bg-mouse-y, 50%), rgba(52, 211, 153, 0.02) 0%, transparent 60%)`,
        transition: 'background 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    />
  );
}
