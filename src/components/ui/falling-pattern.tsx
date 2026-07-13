"use client";
import React, { useEffect, useRef, useState } from "react";

export type FallingPatternProps = {
  className?: string;
  color?: string;
  duration?: number;   // seconds for a particle to travel full height
  density?: number;    // relative multiplier; 1 = default
  blurIntensity?: string; // CSS blur value
  opacity?: number;    // max glyph opacity (0-1); keeps background text faint
};

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;   // px/frame
  opacity: number;
  char: string;
};

const CHARS = "01ABCDEFabcdef<>{}[]|/\\:;@#".split("");

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function FallingPattern({
  className = "",
  color = "#00ff88",
  duration = 80,
  density = 2,
  blurIntensity = "0.5rem",
  opacity = 0.7,
}: FallingPatternProps) {
  // Keep the max glyph opacity in a ref so the RAF draw loop always reads the
  // latest value without needing to be in the effect's dependency array.
  const opacityRef = useRef(opacity);
  opacityRef.current = opacity;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const [reduced, setReduced] = useState(false);

  // Detect reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── Resize handler ─────────────────────────────────────────── */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    /* ── Build particle pool ───────────────────────────────────── */
    const init = () => {
      const mobile = window.innerWidth < 768;
      // density=2, mobile halved again, cap at 120
      const count = Math.min(
        120,
        Math.round(density * (mobile ? 30 : 60))
      );
      // base speed so duration seconds = full viewport height
      const baseSpeed = canvas.height / (duration * 60);

      particlesRef.current = Array.from({ length: count }, () =>
        makeParticle(canvas.width, canvas.height, baseSpeed, true)
      );
    };

    const makeParticle = (
      w: number,
      h: number,
      baseSpeed: number,
      scatter = false
    ): Particle => ({
      x: Math.random() * w,
      y: scatter ? Math.random() * h : -20,
      size: 13 + Math.random() * 10,
      speed: baseSpeed * (0.4 + Math.random() * 1.2),
      opacity: opacityRef.current * (0.5 + Math.random() * 0.5),
      char: randomFrom(CHARS),
    });

    /* ── Parse hex colour to rgb ───────────────────────────────── */
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r},${g},${b}`;
    };
    const rgb = hexToRgb(color.startsWith("#") ? color : "#00ff88");

    /* ── Draw loop ─────────────────────────────────────────────── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const h = canvas.height;
      const w = canvas.width;
      const baseSpeed = h / (duration * 60);

      particlesRef.current.forEach((p) => {
        // Fade in top 15%, full mid, fade out bottom 15%
        const relY = p.y / h;
        let fade = 1;
        if (relY < 0.15) fade = relY / 0.15;
        else if (relY > 0.85) fade = (1 - relY) / 0.15;

        ctx.globalAlpha = Math.max(0, p.opacity * fade);
        ctx.fillStyle = `rgba(${rgb},1)`;
        ctx.font = `${p.size}px monospace`;
        ctx.fillText(p.char, p.x, p.y);

        // Occasionally change character for flicker effect
        if (Math.random() < 0.005) p.char = randomFrom(CHARS);

        p.y += p.speed;

        // Reset when off screen
        if (p.y > h + 20) {
          p.x = Math.random() * w;
          p.y = -20;
          p.size = 13 + Math.random() * 10;
          p.speed = baseSpeed * (0.4 + Math.random() * 1.2);
          p.opacity = opacityRef.current * (0.5 + Math.random() * 0.5);
          p.char = randomFrom(CHARS);
        }
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [color, density, duration, reduced]);

  if (reduced) {
    // Static very-subtle gradient for reduced-motion users
    return (
      <div
        aria-hidden
        className={className}
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${color}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{
        filter: `blur(${blurIntensity})`,
        pointerEvents: "none",
      }}
    />
  );
}
