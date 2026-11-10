import React, { useState } from 'react';
import StadiumIntro from './components/StadiumIntro';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import ChroniclesExperience from './components/ChroniclesExperience';
import RuthvikPlusExperience from './components/netflix/RuthvikPlusExperience';
import CinematicIntro, { INTRO_SKIPPED_STORAGE_KEY } from './components/intro/CinematicIntro';
import { Tv } from 'lucide-react';

function resolveInitialMode() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'stadium') return 'stadium';
    if (params.get('view') === 'home' || params.get('skipIntro') === '1') return 'netflix';
    if (window.sessionStorage.getItem(INTRO_SKIPPED_STORAGE_KEY) === 'true') return 'netflix';
  } catch {
    // Default to cinematic opening sequence
  }
  return 'intro';
}

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [experienceMode, setExperienceMode] = useState(resolveInitialMode); // 'intro' | 'netflix' | 'stadium'

  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useSmoothScroll();

  const handleEnterStadium = () => {
    setHasEntered(true);
  };

  if (experienceMode === 'intro') {
    return (
      <CinematicIntro
        onFinishIntro={() => {
          setExperienceMode('netflix');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
    );
  }

  if (experienceMode === 'netflix') {
    return (
      <RuthvikPlusExperience
        onReplayIntro={() => {
          try {
            window.sessionStorage.removeItem(INTRO_SKIPPED_STORAGE_KEY);
          } catch {
            // Ignore storage errors
          }
          setExperienceMode('intro');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onSwitchToStadium={() => {
          setHasEntered(false);
          setExperienceMode('stadium');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--color-pitch-dark)' }}>
      {/* Floating Return to RUTVIK+ Controller */}
      <div
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '1.5rem',
          zIndex: 1100,
        }}
      >
        <button
          type="button"
          onClick={() => {
            setExperienceMode('netflix');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.2rem',
            borderRadius: '9999px',
            background: 'rgba(20, 20, 20, 0.92)',
            border: '1px solid rgba(229, 9, 20, 0.6)',
            color: '#ffffff',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Tv size={15} color="#E50914" />
          <span>Return to RUTVIK+</span>
        </button>
      </div>

      {/* Stadium ambient light & pitch lines */}
      <div className="stadium-atmosphere" />
      <div className="pitch-lines-overlay" />

      {hasEntered ? (
        <ChroniclesExperience />
      ) : (
        <>
          <StadiumIntro onEnter={handleEnterStadium} />
          <Navbar />
          <main style={{ position: 'relative', zIndex: 2, paddingTop: '4.5rem' }}>
            <HeroSection />
          </main>
        </>
      )}
    </div>
  );
}
