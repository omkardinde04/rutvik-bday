import React, { useState } from 'react';
import StadiumIntro from './components/StadiumIntro';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { RotateCcw } from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useSmoothScroll();

  const handleEnterStadium = () => {
    setHasEntered(true);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--color-pitch-dark)' }}>
      {/* Stadium ambient light & pitch lines */}
      <div className="stadium-atmosphere" />
      <div className="pitch-lines-overlay" />

      {/* Cinematic Fullscreen Stadium Intro */}
      {!hasEntered && (
        <StadiumIntro onEnter={handleEnterStadium} />
      )}

      {/* Global Header */}
      <Navbar />

      <main style={{ position: 'relative', zIndex: 2, paddingTop: '4.5rem' }}>
        {/* Intro Replay Controller (Available after entering) */}
        {hasEntered && (
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 999
          }}>
            <button
              onClick={() => setHasEntered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '9999px',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#38bdf8',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <RotateCcw size={15} />
              <span>Replay Intro</span>
            </button>
          </div>
        )}

        {/* Phase 3: Matchday Hero Section */}
        <HeroSection />
      </main>
    </div>
  );
}
