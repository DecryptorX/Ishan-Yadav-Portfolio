import React from 'react';

/**
 * Route-segment Suspense fallback. The real terminal loader lives in
 * GlobalLayoutWrapper (fixed, z-index 99999) and covers everything, so this
 * only needs to be a solid black screen — it prevents any white/spinner flash
 * from ever peeking through during server rendering.
 */
export default function Loading() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        background: '#09090b',
        zIndex: 40,
      }}
    />
  );
}
