"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './ui/loader';

export default function GlobalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // Trigger loading animation on every route/pathname change
  useEffect(() => {
    setLoading(true);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="global-loader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999 }}
        >
          <Loader pathname={pathname || '/'} onComplete={() => setLoading(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="global-portfolio-content"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
