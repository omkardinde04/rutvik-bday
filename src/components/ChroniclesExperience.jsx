import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, RotateCcw } from 'lucide-react';
import '../styles/chronicles.css';

const CURTAIN_START_TIME = 0.55;
const CURTAIN_END_TIME = 8.9;

export default function ChroniclesExperience({
  onComplete,
  isMuted = false,
  hasInteracted = false,
}) {
  const [phase, setPhase] = useState('curtain');
  const [videoError, setVideoError] = useState(false);
  const [curtainAttempt, setCurtainAttempt] = useState(0);
  const [messiAttempt, setMessiAttempt] = useState(0);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const curtainTransitionedRef = useRef(false);
  const messiTransitionedRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const curtainVideoRef = useRef(null);
  const messiVideoRef = useRef(null);
  const messageRef = useRef(null);

  const effectiveMuted = hasInteracted ? isMuted : true;

  useEffect(() => {
    if (curtainVideoRef.current) {
      curtainVideoRef.current.muted = effectiveMuted;
    }
    if (messiVideoRef.current) {
      messiVideoRef.current.muted = effectiveMuted;
    }
  }, [effectiveMuted]);

  const attemptVideoPlay = (vid, expectedPhase) => {
    if (!vid) return;
    vid.muted = effectiveMuted;
    const p = vid.play();
    if (p && typeof p.catch === 'function') {
      p.catch((err) => {
        if (err?.name === 'AbortError' || phaseRef.current !== expectedPhase) return;
        vid.muted = true;
        vid.play().catch(() => {});
      });
    }
  };

  useEffect(() => {
    if (phase === 'curtain' && curtainVideoRef.current) {
      attemptVideoPlay(curtainVideoRef.current, 'curtain');
    } else if (phase === 'messi' && messiVideoRef.current) {
      attemptVideoPlay(messiVideoRef.current, 'messi');
    }
  }, [phase, curtainAttempt, messiAttempt]);

  const triggerComplete = () => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    if (curtainVideoRef.current) {
      curtainVideoRef.current.pause();
    }
    if (messiVideoRef.current) {
      messiVideoRef.current.pause();
    }
    onComplete?.();
  };

  const advanceToMessage = () => {
    if (phaseRef.current !== 'curtain' || curtainTransitionedRef.current) return;
    curtainTransitionedRef.current = true;
    setVideoError(false);
    setPhase('message');
  };

  const handleCurtainMetadata = (event) => {
    const video = event.currentTarget;
    if (video.duration > CURTAIN_END_TIME && video.currentTime < CURTAIN_START_TIME) {
      video.currentTime = CURTAIN_START_TIME;
    }
  };

  const handleCurtainTimeUpdate = (event) => {
    if (phaseRef.current !== 'curtain' || curtainTransitionedRef.current) return;
    if (event.currentTarget.currentTime >= CURTAIN_END_TIME) {
      event.currentTarget.pause();
      advanceToMessage();
    }
  };

  const handleMessiEnded = () => {
    if (phaseRef.current !== 'messi' || messiTransitionedRef.current) return;
    messiTransitionedRef.current = true;
    setVideoError(false);
    triggerComplete();
  };

  useLayoutEffect(() => {
    if (phase !== 'message') return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      gsap.timeline({ onComplete: () => setPhase('messi') })
        .fromTo(messageRef.current, {
          autoAlpha: 0,
          scale: 0.92,
          y: 22
        }, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: prefersReducedMotion ? 0.01 : 1.1,
          ease: 'power3.out'
        })
        .to({}, { duration: 2.25 })
        .to(messageRef.current, {
          autoAlpha: 0,
          scale: 1.035,
          y: -10,
          duration: prefersReducedMotion ? 0.01 : 1,
          ease: 'power2.inOut'
        });
    }, messageRef);

    return () => context.revert();
  }, [phase]);

  useEffect(() => () => {
    if (curtainVideoRef.current) {
      curtainVideoRef.current.pause();
    }
    if (messiVideoRef.current) {
      messiVideoRef.current.pause();
    }
  }, []);

  const retryVideo = () => {
    setVideoError(false);
    if (phase === 'curtain') {
      curtainTransitionedRef.current = false;
      setCurtainAttempt((currentAttempt) => currentAttempt + 1);
    } else {
      messiTransitionedRef.current = false;
      setMessiAttempt((currentAttempt) => currentAttempt + 1);
    }
  };

  const isCurtain = phase === 'curtain';
  const isMessage = phase === 'message';
  const isMessi = phase === 'messi';

  return (
    <section className="chronicles-video-stage chronicles-video-stage--curtain">
      <video
        ref={curtainVideoRef}
        key={`curtain-${curtainAttempt}`}
        className="curtain-video"
        src="/assets/intro/curtain-opening.mp4"
        autoPlay
        muted={effectiveMuted}
        playsInline
        preload="auto"
        aria-label="Stadium curtain-opening video"
        onCanPlay={() => {
          if (phaseRef.current === 'curtain' && curtainVideoRef.current?.paused) {
            attemptVideoPlay(curtainVideoRef.current, 'curtain');
          }
        }}
        onLoadedMetadata={handleCurtainMetadata}
        onTimeUpdate={handleCurtainTimeUpdate}
        onEnded={advanceToMessage}
        onError={() => {
          if (phaseRef.current === 'curtain') setVideoError(true);
        }}
      />

      <div className="curtain-film-grain" aria-hidden="true" />
      <div className="curtain-watermark-detail" aria-hidden="true" />

      {isMessage && (
        <div className="messi-reveal">
          <h1 className="messi-reveal-title" ref={messageRef}>
            LET&apos;S RELIVE THE BEST MOMENT OF YOUR LIFE.
          </h1>
        </div>
      )}

      {isMessi && (
        <div className="messi-reveal">
          <div className="messi-feature-frame">
            <video
              ref={messiVideoRef}
              key={`messi-${messiAttempt}`}
              className="messi-feature-video"
              src="/assets/intro/messi-feature.mp4"
              autoPlay
              muted={effectiveMuted}
              playsInline
              controls
              preload="auto"
              aria-label="Messi World Cup victory video"
              onCanPlay={() => {
                if (phaseRef.current === 'messi' && messiVideoRef.current?.paused) {
                  attemptVideoPlay(messiVideoRef.current, 'messi');
                }
              }}
              onEnded={handleMessiEnded}
              onError={() => {
                if (phaseRef.current === 'messi') setVideoError(true);
              }}
            />
          </div>
        </div>
      )}

      {videoError && (
        <div className="video-error-panel" role="alert">
          <p>THIS VIDEO COULDN&apos;T BE PLAYED</p>
          <span>Check the video file and try again, or continue to the next chapter.</span>
          <div className="video-error-actions">
            <button type="button" onClick={retryVideo}>
              <RotateCcw size={15} /> Try again
            </button>
            <button type="button" onClick={isCurtain ? advanceToMessage : handleMessiEnded}>
              Continue <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
