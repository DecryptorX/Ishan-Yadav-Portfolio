"use client";
import React, { useEffect, useRef } from 'react';

export default function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf: number;
    let cx = -1000;
    let cy = -1000;
    let tx = -1000;
    let ty = -1000;

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      if (cx === -1000) {
        cx = tx;
        cy = ty;
      }
    }

    function loop() {
      const el = ref.current;
      if (el) {
        // Lerp factor of 0.08 creates a smooth lag behind the default cursor
        cx += (tx - cx) * 0.08;
        cy += (ty - cy) * 0.08;
        el.style.left = cx + 'px';
        el.style.top = cy + 'px';
      }
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #custom-cursor { display: none !important; }
        }
      `}</style>
      <div
        id="custom-cursor"
        ref={ref}
        aria-hidden
        style={{
          position: 'fixed',
          zIndex: 9999,
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'screen',
          willChange: 'left, top',
        }}
      />
    </>
  );
}

