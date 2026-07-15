'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface HeroGlitchTitleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function HeroGlitchTitle({ text, className, style }: HeroGlitchTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const reqRef = useRef<number>();

  useEffect(() => {
    let lastUpdate = 0;
    const fpsInterval = 1000 / 15; // 15 fps for the "frame skips" effect during active glitch

    const loop = (timestamp: number) => {
      const t = Date.now() % 7000;
      const isGlitching = t < 2000;

      if (containerRef.current) {
        if (isGlitching) {
          containerRef.current.classList.add('is-glitching');
          
          // Throttled updates to simulate 15fps frame skipping
          if (timestamp - lastUpdate > fpsInterval) {
            lastUpdate = timestamp;
            
            // Random container scale and rotation
            const s = 0.98 + Math.random() * 0.04;
            const r = (Math.random() - 0.5) * 2;
            containerRef.current.style.transform = `scale(${s}) rotate(${r}deg)`;
            
            // Heavy SVG distortion
            if (turbulenceRef.current && displacementRef.current) {
              // High base frequency for noise, up to 0.1
              const bfX = Math.random() * 0.08 + 0.02;
              const bfY = Math.random() * 0.04 + 0.01;
              turbulenceRef.current.setAttribute('baseFrequency', `${bfX} ${bfY}`);
              
              // Extreme displacement scaling occasionally
              const displaceScale = Math.random() > 0.8 ? Math.random() * 60 + 20 : Math.random() * 15;
              displacementRef.current.setAttribute('scale', displaceScale.toString());
            }

            // Occasional heavy bloom
            const blur = Math.random() > 0.8 ? Math.random() * 10 + 5 : Math.random() * 2;
            const bloomOpacity = Math.random() > 0.7 ? 1 : 0;
            containerRef.current.style.setProperty('--glitch-blur', `${blur}px`);
            containerRef.current.style.setProperty('--glitch-bloom', `${bloomOpacity}`);
          }
        } else {
          // Rest period (5 seconds)
          containerRef.current.classList.remove('is-glitching');
          containerRef.current.style.transform = 'none';
          
          if (turbulenceRef.current && displacementRef.current) {
            turbulenceRef.current.setAttribute('baseFrequency', '0');
            displacementRef.current.setAttribute('scale', '0');
          }
        }
      }

      reqRef.current = requestAnimationFrame(loop);
    };

    reqRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(reqRef.current!);
  }, []);

  return (
    <h1 
      ref={containerRef}
      className={`hero-glitch-container ${className || ''}`}
      style={style}
    >
      {/* SVG Filters for displacement/turbulence */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="glitch-svg-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence 
              ref={turbulenceRef}
              type="fractalNoise" 
              baseFrequency="0 0" 
              numOctaves="2" 
              result="warp" 
            />
            <feDisplacementMap 
              ref={displacementRef}
              in="SourceGraphic" 
              in2="warp" 
              scale="0" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      <motion.span
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="hero-glitch-text"
        data-text={text}
      >
        {text}
      </motion.span>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-glitch-container {
          position: relative;
          display: inline-block;
          will-change: transform, filter;
          --glitch-blur: 0px;
          --glitch-bloom: 0;
        }

        .hero-glitch-text {
          position: relative;
          display: inline-block;
          white-space: nowrap;
          color: #ffffff;
          /* Apply SVG filter only when glitching */
        }
        
        .is-glitching .hero-glitch-text {
          filter: url(#glitch-svg-filter) blur(var(--glitch-blur));
        }

        /* Ghost Layers */
        .hero-glitch-text::before,
        .hero-glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          pointer-events: none;
          will-change: clip-path, transform;
        }

        /* Emerald Green Layer */
        .hero-glitch-text::before {
          color: #34F5A3;
          text-shadow: 2px 0 0 #000000;
          z-index: -1;
        }

        /* Black / White shadow Layer */
        .hero-glitch-text::after {
          color: #000000;
          text-shadow: -2px 0 0 #ffffff, 4px 0 0 #34F5A3;
          z-index: -2;
        }

        /* Scanline Overlay */
        .hero-glitch-text::selection {
          background: transparent;
        }

        .is-glitching .hero-glitch-text::before {
          animation: glitch-slice-green 2s infinite step-end;
          opacity: 1;
        }

        .is-glitching .hero-glitch-text::after {
          animation: glitch-slice-black 2s infinite step-end;
          opacity: 1;
        }

        /* CSS Tearing Animations */
        @keyframes glitch-slice-green {
          0.0% { clip-path: inset(31.4% 0 56.8% 0); transform: translate3d(22.5px, 0, 0); }
          5.0% { clip-path: inset(88.5% 0 7.5% 0); transform: translate3d(-39.3px, 0, 0); }
          10.0% { clip-path: inset(64.2% 0 30.0% 0); transform: translate3d(9.1px, 0, 0); }
          15.0% { clip-path: inset(50.3% 0 38.7% 0); transform: translate3d(85.5px, 0, 0); }
          20.0% { clip-path: inset(68.3% 0 20.1% 0); transform: translate3d(-61.9px, 0, 0); }
          25.0% { clip-path: inset(16.7% 0 72.4% 0); transform: translate3d(24.5px, 0, 0); }
          30.0% { clip-path: inset(22.7% 0 63.6% 0); transform: translate3d(31.5px, 0, 0); }
          35.0% { clip-path: inset(33.5% 0 55.8% 0); transform: translate3d(-15.2px, 0, 0); }
          40.0% { clip-path: inset(49.3% 0 41.1% 0); transform: translate3d(14.2px, 0, 0); }
          45.0% { clip-path: inset(23.4% 0 73.0% 0); transform: translate3d(46.6px, 0, 0); }
          50.0% { clip-path: inset(37.5% 0 49.7% 0); transform: translate3d(36.6px, 0, 0); }
          55.0% { clip-path: inset(27.3% 0 61.2% 0); transform: translate3d(0.0px, 0, 0); }
          60.0% { clip-path: inset(85.5% 0 4.7% 0); transform: translate3d(-7.9px, 0, 0); }
          65.0% { clip-path: inset(75.1% 0 11.6% 0); transform: translate3d(-25.0px, 0, 0); }
          70.0% { clip-path: inset(65.8% 0 29.6% 0); transform: translate3d(52.8px, 0, 0); }
          75.0% { clip-path: inset(60.7% 0 25.8% 0); transform: translate3d(122.0px, 0, 0); }
          80.0% { clip-path: inset(73.0% 0 12.1% 0); transform: translate3d(-145.2px, 0, 0); }
          85.0% { clip-path: inset(9.2% 0 84.6% 0); transform: translate3d(-24.0px, 0, 0); }
          90.0% { clip-path: inset(88.4% 0 2.3% 0); transform: translate3d(16.5px, 0, 0); }
          95.0% { clip-path: inset(39.1% 0 50.0% 0); transform: translate3d(-66.4px, 0, 0); }
          100% { clip-path: inset(0 0 0 0); transform: none; }
        }

        @keyframes glitch-slice-black {
          0.0% { clip-path: inset(79.9% 0 15.5% 0); transform: translate3d(75.9px, 0, 0); }
          5.0% { clip-path: inset(89.6% 0 0.8% 0); transform: translate3d(67.3px, 0, 0); }
          10.0% { clip-path: inset(15.7% 0 71.0% 0); transform: translate3d(71.4px, 0, 0); }
          15.0% { clip-path: inset(3.9% 0 89.6% 0); transform: translate3d(51.9px, 0, 0); }
          20.0% { clip-path: inset(13.1% 0 81.5% 0); transform: translate3d(-14.4px, 0, 0); }
          25.0% { clip-path: inset(33.0% 0 63.8% 0); transform: translate3d(73.5px, 0, 0); }
          30.0% { clip-path: inset(54.4% 0 32.5% 0); transform: translate3d(-13.7px, 0, 0); }
          35.0% { clip-path: inset(71.9% 0 23.4% 0); transform: translate3d(-31.8px, 0, 0); }
          40.0% { clip-path: inset(74.4% 0 11.6% 0); transform: translate3d(-16.0px, 0, 0); }
          45.0% { clip-path: inset(53.4% 0 41.9% 0); transform: translate3d(43.0px, 0, 0); }
          50.0% { clip-path: inset(31.3% 0 59.1% 0); transform: translate3d(-38.7px, 0, 0); }
          55.0% { clip-path: inset(14.6% 0 77.5% 0); transform: translate3d(49.5px, 0, 0); }
          60.0% { clip-path: inset(23.4% 0 63.4% 0); transform: translate3d(20.3px, 0, 0); }
          65.0% { clip-path: inset(35.3% 0 62.5% 0); transform: translate3d(18.2px, 0, 0); }
          70.0% { clip-path: inset(75.3% 0 22.4% 0); transform: translate3d(-40.3px, 0, 0); }
          75.0% { clip-path: inset(56.0% 0 30.4% 0); transform: translate3d(71.2px, 0, 0); }
          80.0% { clip-path: inset(13.2% 0 78.3% 0); transform: translate3d(76.9px, 0, 0); }
          85.0% { clip-path: inset(67.1% 0 27.8% 0); transform: translate3d(23.0px, 0, 0); }
          90.0% { clip-path: inset(93.2% 0 3.7% 0); transform: translate3d(-67.7px, 0, 0); }
          95.0% { clip-path: inset(53.3% 0 40.0% 0); transform: translate3d(59.3px, 0, 0); }
          100% { clip-path: inset(0 0 0 0); transform: none; }
        }
        
        /* Scanlines and static noise - only during glitch */
        .is-glitching .hero-glitch-container::after {
          content: "";
          position: absolute;
          top: 0;
          left: -10%;
          width: 120%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.2) 0px,
            rgba(0,0,0,0.2) 2px,
            transparent 2px,
            transparent 4px
          );
          pointer-events: none;
          z-index: 10;
          animation: scanline-move 2s linear infinite;
        }

        @keyframes scanline-move {
          0% { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
        
        /* Bloom */
        .is-glitching .hero-glitch-container::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: transparent;
          text-shadow: 0 0 20px rgba(52, 245, 163, 0.8);
          opacity: var(--glitch-bloom);
          pointer-events: none;
          z-index: 5;
        }
      `}} />
    </h1>
  );
}
