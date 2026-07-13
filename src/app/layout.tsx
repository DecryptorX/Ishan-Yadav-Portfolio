import '../styles/globals.css';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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

export const metadata = {
  title: 'Ishan Yadav — Portfolio',
  description: 'Cybersecurity Enthusiast | Software Developer | Computer Science Student',
  icons: '/favicon.ico',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <ModalProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
              <GlobalLayoutWrapper>
                <FallingPattern
                  className="fixed inset-0 z-0 pointer-events-none"
                  color="#00ff88"
                  duration={55}
                  density={2}
                  blurIntensity="2px"
                  opacity={0.05}
                />
                <Header />
                <main className="relative z-10">
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
                <CVModal />
                <Cursor />
                <CommandPalette />
                <KonamiListener />
                <AnalyticsTracker />
              </GlobalLayoutWrapper>
            </ThemeProvider>
          </ModalProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}

