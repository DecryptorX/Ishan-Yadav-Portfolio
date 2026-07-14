import '../styles/globals.css';
import React from 'react';
import FallingPattern from '../components/ui/falling-pattern';
import { ThemeProvider } from 'next-themes';
import SessionWrapper from '../components/SessionWrapper';
import { ModalProvider } from '../context/modal';
import CVModal from '../components/CVModal';
import Cursor from '../components/Cursor';
import PageTransition from '../components/PageTransition';
import CommandPalette from '../components/CommandPalette';
import KonamiListener from '../components/KonamiListener';
import AnalyticsTracker from '../components/AnalyticsTracker';
import GlobalLayoutWrapper from '../components/GlobalLayoutWrapper';
import LenisProvider from '../components/LenisProvider';

export const metadata = {
  title: 'Ishan Yadav — Portfolio',
  description: 'Cybersecurity Enthusiast | Software Developer | Computer Science Student',
  icons: '/favicon.ico',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.location.pathname === '/') {
                document.documentElement.classList.add('lock-scroll');
                document.body.classList.add('lock-scroll');
              }
            `,
          }}
        />
      </head>
      <body>
        <SessionWrapper>
          <ModalProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
              <LenisProvider>
                <GlobalLayoutWrapper>
                  <FallingPattern
                    className="fixed inset-0 z-0 pointer-events-none"
                    color="#ffffff"
                    duration={80}
                    density={0.25}
                    blurIntensity="3px"
                    opacity={0.015}
                  />
                  <main className="relative z-10">
                    <PageTransition>{children}</PageTransition>
                  </main>
                  <CVModal />
                  <Cursor />
                  <CommandPalette />
                  <KonamiListener />
                  <AnalyticsTracker />
                </GlobalLayoutWrapper>
              </LenisProvider>
            </ThemeProvider>
          </ModalProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
