"use client";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const initializedRef = useRef(false);

  useEffect(() => {
    // Generate or fetch unique client visitor ID
    let visitorId = localStorage.getItem('visitor_telemetry_id');
    if (!visitorId) {
      visitorId = 'visitor_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem('visitor_telemetry_id', visitorId);
    }

    const registerVisit = async () => {
      try {
        const resolution = `${window.screen.width}x${window.screen.height}`;
        const themePref = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        
        await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: visitorId,
            source: 'anonymous',
            resolution,
            themePref
          }),
        });
        
        // Log the initial page view hit
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitorId,
            page: pathname || '/',
            action: 'page_view'
          }),
        });
      } catch (err) {
        console.error('Analytics failure:', err);
      }
    };

    if (!initializedRef.current) {
      initializedRef.current = true;
      registerVisit();
    } else {
      // Track page views on route updates
      const logPageView = async () => {
        try {
          await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              visitorId,
              page: pathname || '/',
              action: 'page_view'
            }),
          });
        } catch (e) {
          console.error(e);
        }
      };
      logPageView();
    }
  }, [pathname]);

  return null;
}
