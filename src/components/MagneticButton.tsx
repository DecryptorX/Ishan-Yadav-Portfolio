"use client";
import React, { useRef } from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode };

export default function MagneticButton({ children, ...props }: Props) {
  const ref = useRef<HTMLButtonElement | null>(null);

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 8;
    const y = (e.clientY - rect.top - rect.height / 2) / 8;
    el.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  }

  return (
    <button
      {...props}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${props.className || ''} transform will-change-transform`}
    >
      {children}
    </button>
  );
}
