import React, { useState, useCallback } from 'react';
import '../../styles/cinematic-intro.css';
import IntroVideoPlayer from './IntroVideoPlayer';
import RutvikReveal from './RutvikReveal';
import RutvikLoadingAnimation from './RutvikLoadingAnimation';

export const INTRO_STEPS = {
  WELCOME: 'WELCOME',
  VIDEO_1: 'INTRO_VIDEO_1',
  VIDEO_2: 'INTRO_VIDEO_2',
  VIDEO_3: 'INTRO_VIDEO_3',
  REVEAL: 'RUTVIK_REVEAL',
  LOADING: 'RUTVIK_LOADING',
  HOMEPAGE: 'NETFLIX_HOMEPAGE',
};

const STEP_TO_VIDEO_INDEX = {
  [INTRO_STEPS.VIDEO_1]: 0,
  [INTRO_STEPS.VIDEO_2]: 1,
  [INTRO_STEPS.VIDEO_3]: 2,
};

export const INTRO_SKIPPED_STORAGE_KEY = 'rutvik_plus_intro_skipped';

export default function CinematicIntro({ onFinishIntro, initialStep = INTRO_STEPS.WELCOME }) {
  const [step, setStep] = useState(initialStep);
  const [isMuted, setIsMuted] = useState(false);

  const handleStartSequence = useCallback(() => {
    setStep(INTRO_STEPS.VIDEO_1);
  }, []);

  const handleVideoEnded = useCallback((videoIdx) => {
    if (videoIdx === 0) {
      setStep(INTRO_STEPS.VIDEO_2);
    } else if (videoIdx === 1) {
      setStep(INTRO_STEPS.VIDEO_3);
    } else {
      setStep(INTRO_STEPS.REVEAL);
    }
  }, []);

  const handleSkip = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_SKIPPED_STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors in private browsing
    }
    setStep(INTRO_STEPS.REVEAL);
  }, []);

  const handleReplay = useCallback(() => {
    try {
      window.sessionStorage.removeItem(INTRO_SKIPPED_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    setStep(INTRO_STEPS.VIDEO_1);
  }, []);

  const handleEnterPlatform = useCallback(() => {
    setStep(INTRO_STEPS.LOADING);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    onFinishIntro?.();
  }, [onFinishIntro]);

  const activeIndex =
    step in STEP_TO_VIDEO_INDEX ? STEP_TO_VIDEO_INDEX[step] : -1;

  return (
    <div className="ci-root" data-intro-step={step}>
      {step !== INTRO_STEPS.LOADING ? (
        <IntroVideoPlayer
          step={step}
          activeIndex={activeIndex}
          isMuted={isMuted}
          onToggleMute={setIsMuted}
          onStart={handleStartSequence}
          onVideoEnded={handleVideoEnded}
          onSkip={handleSkip}
          onReplay={handleReplay}
          revealOverlay={
            <RutvikReveal
              onEnter={handleEnterPlatform}
              onReplay={handleReplay}
            />
          }
        />
      ) : (
        <RutvikLoadingAnimation
          isMuted={isMuted}
          onComplete={handleLoadingComplete}
        />
      )}
    </div>
  );
}
