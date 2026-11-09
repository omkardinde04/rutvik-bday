import React, { useState } from 'react';
import StadiumIntro from './components/StadiumIntro';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import ChroniclesExperience from './components/ChroniclesExperience';

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
