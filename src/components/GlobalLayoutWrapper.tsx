"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './ui/loader';
import AmbientBackground from './AmbientBackground';

export default function GlobalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  // Track which path the loader is currently covering so we can flip back to
  // "loading" the instant the route changes.
  const [coveredPath, setCoveredPath] = useState(pathname);

  // Adjust state DURING render (React-sanctioned pattern) when the pathname
  // changes. This re-renders immediately BEFORE committing to the DOM, so the
  // destination page never paints for a frame before the loader appears —
  // eliminating the flash on route transitions.
  if (pathname !== coveredPath) {
    setCoveredPath(pathname);
    setLoading(true);
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {loading ? (
        <motion.div
          key="global-loader-container"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999 }}
        >
          <Loader pathname={pathname || '/'} onComplete={() => setLoading(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="global-portfolio-content"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
        >
          <AmbientBackground />
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
