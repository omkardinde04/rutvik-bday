import React, { useState, useCallback, useEffect } from 'react';
import { Volume2, VolumeX, SkipForward, Play } from 'lucide-react';
import StadiumIntro from './components/StadiumIntro';
import ChroniclesExperience from './components/ChroniclesExperience';
import RuthvikPlusExperience from './components/netflix/RuthvikPlusExperience';
import CinematicIntro, {
  INTRO_STEPS,
  INTRO_SKIPPED_STORAGE_KEY,
} from './components/intro/CinematicIntro';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import './styles/cinematic-intro.css';

export default function App() {
  // Always initialize from Step 1 ('welcome') on every fresh load, refresh, or new tab.
  const [experienceMode, setExperienceMode] = useState('welcome'); // 'welcome' | 'stadium' | 'reveal' | 'netflix'
  const [stadiumStep, setStadiumStep] = useState('intro'); // 'intro' | 'chronicles'
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useSmoothScroll();

  // Clear any legacy session flag so refreshes never bypass the opening sequence.
  useEffect(() => {
    try {
      window.sessionStorage.removeItem(INTRO_SKIPPED_STORAGE_KEY);
    } catch {
      // Ignore storage errors in private browsing
    }
  }, []);

  const unlockAudioContext = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
        window.setTimeout(() => {
          ctx.close().catch(() => {});
        }, 200);
      }
    } catch {
      // Ignore audio unlock errors on restricted browsers
    }
  };

  const handleStartOpening = useCallback(() => {
    unlockAudioContext();
    setHasInteracted(true);
    setIsMuted(false);
    setStadiumStep('intro');
    setExperienceMode('stadium');
  }, []);

  const handleUserInteract = useCallback(() => {
    setHasInteracted(true);
  }, []);

  const handleToggleHudMute = useCallback(() => {
    setHasInteracted((prevInteracted) => {
      if (!prevInteracted) {
        setIsMuted(false);
        return true;
      }
      setIsMuted((prevMuted) => !prevMuted);
      return true;
    });
  }, []);

  const handleEnterStadium = useCallback(() => {
    setHasInteracted(true);
    setStadiumStep('chronicles');
  }, []);

  const handleChroniclesComplete = useCallback(() => {
    setHasInteracted(true);
    setExperienceMode('reveal');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSkipOpening = useCallback(() => {
    // Follow the intended reveal flow (Skip Intro -> RUTVIK+ Reveal -> Logo Animation -> Homepage)
    setHasInteracted(true);
    setExperienceMode('reveal');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleFinishOpening = useCallback(() => {
    setExperienceMode('netflix');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleReplayOpening = useCallback(() => {
    setHasInteracted(true);
    setStadiumStep('intro');
    setExperienceMode('welcome');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  if (experienceMode === 'welcome') {
    return (
      <div className="ci-root" data-intro-step="WELCOME">
        <div className="ci-welcome-screen" role="dialog" aria-label="Welcome to RUTVIK+">
          <div className="ci-welcome-kicker">RUTVIK+ PREMIERE</div>
          <h1 className="ci-welcome-title">THE STAGE IS SET. ARE YOU READY?</h1>
          <p className="ci-welcome-sub">
            One legend. Countless memories. Experience Rutvik&apos;s Stadium Edition tribute before entering RUTVIK+.
          </p>

          <button
            type="button"
            className="ci-start-btn"
            onClick={handleStartOpening}
            aria-label="Start Opening Sequence - Let's Go!"
          >
            <Play size={20} fill="currentColor" />
            <span>LET&apos;S GO!</span>
          </button>
        </div>
      </div>
    );
  }

  if (experienceMode === 'reveal') {
    return (
      <CinematicIntro
        key="rutvik-reveal"
        initialStep={INTRO_STEPS.REVEAL}
        initialMuted={isMuted}
        onReplaySequence={handleReplayOpening}
        onFinishIntro={handleFinishOpening}
      />
    );
  }

  if (experienceMode === 'netflix') {
    return (
      <RuthvikPlusExperience onReplayIntro={handleReplayOpening} />
    );
  }

  const effectiveMuted = hasInteracted ? isMuted : true;

  return (
    <div
      data-opening-stage={stadiumStep}
      style={{ position: 'relative', minHeight: '100vh', background: 'var(--color-pitch-dark)' }}
    >
      {/* Stadium ambient light & pitch lines */}
      <div className="stadium-atmosphere" />
      <div className="pitch-lines-overlay" />

      {/* Subtle Floating Opening Controls (No audio gate modal) */}
      <div
        className="ci-controls-cluster"
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1.25rem',
          zIndex: 1200,
        }}
      >
        <button
          type="button"
          className="ci-hud-btn"
          onClick={handleToggleHudMute}
          aria-label={effectiveMuted ? 'Unmute Opening Sound' : 'Mute Opening Sound'}
          title={effectiveMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {effectiveMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <button
          type="button"
          className="ci-hud-btn ci-hud-btn--skip"
          onClick={handleSkipOpening}
          aria-label="Skip intro to RUTVIK+ reveal"
        >
          <SkipForward size={15} />
          <span>Skip Intro</span>
        </button>
      </div>

      {stadiumStep === 'chronicles' ? (
        <ChroniclesExperience
          key="chronicles-opening"
          isMuted={isMuted}
          hasInteracted={hasInteracted}
          onComplete={handleChroniclesComplete}
        />
      ) : (
        <StadiumIntro
          key="stadium-opening"
          onEnter={handleEnterStadium}
          isMuted={isMuted}
          hasInteracted={hasInteracted}
          onUserInteract={handleUserInteract}
        />
      )}
    </div>
  );
}
