"use client";
import React from 'react';

export default function ParticleBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g>
          <circle className="animate-blob" cx="120" cy="80" r="120" fill="url(#g1)" />
          <circle className="animate-blob animation-delay-2000" cx="680" cy="420" r="100" fill="#6366F133" />
          <circle className="animate-blob animation-delay-4000" cx="400" cy="300" r="140" fill="#00E5FF22" />
        </g>
      </svg>
      <style>{`
        .animate-blob{ transform-origin: center; animation: blob 8s infinite; }
        .animation-delay-2000{ animation-delay: 2s; }
        .animation-delay-4000{ animation-delay: 4s; }
        @keyframes blob{
          0%{ transform: translateY(0px) scale(1); }
          33%{ transform: translateY(-20px) scale(1.05); }
          66%{ transform: translateY(10px) scale(0.95); }
          100%{ transform: translateY(0px) scale(1); }
        }
      `}</style>
    </div>
  );
}
