import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronRight } from 'lucide-react';
import '../styles/stadium-intro.css';

export default function StadiumIntro({
  onEnter,
  isMuted = false,
  hasInteracted = false,
  onUserInteract,
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const ballWrapperRef = useRef(null);
  const ballImgRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const supportingRef = useRef(null);
  const btnWrapperRef = useRef(null);

  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);

  const timelineRef = useRef(null);
  const rotationTweenRef = useRef(null);
  const isMutedRef = useRef(isMuted);
  const hasCompletedVideoRef = useRef(false);

  const effectiveMuted = hasInteracted ? isMuted : true;

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (videoRef.current && hasInteracted) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, hasInteracted]);

  // Mount / unmount playback & StrictMode resource lifecycle cleanup
  useEffect(() => {
    let isCancelled = false;
    hasCompletedVideoRef.current = false;
    const vid = videoRef.current;
    if (vid && !isVideoFinished) {
      vid.currentTime = 0;
      vid.muted = effectiveMuted;
      const attempt = vid.play();
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch((err) => {
          if (isCancelled || err?.name === 'AbortError') return;
          vid.muted = true;
          vid.play().catch(() => {});
        });
      }
    }

    return () => {
      isCancelled = true;
      hasCompletedVideoRef.current = true;
      if (vid) {
        vid.pause();
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (rotationTweenRef.current) {
        rotationTweenRef.current.kill();
        rotationTweenRef.current = null;
      }
    };
  }, []);

  // Unlock unmuted audio smoothly after initial visitor interaction without showing a sound gate
  useEffect(() => {
    if (hasInteracted) return undefined;
    const handleFirstInteraction = () => {
      if (onUserInteract) onUserInteract();
      if (videoRef.current && !isMutedRef.current) {
        videoRef.current.muted = false;
      }
    };
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true, passive: true });
    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted, onUserInteract]);

  /**
   * Sequence executed once video ends + 500ms black-screen pause
   */
  const startFootballAndTextSequence = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Start continuous smooth rotation on the football image
    if (!prefersReducedMotion && ballImgRef.current) {
      rotationTweenRef.current = gsap.to(ballImgRef.current, {
        rotation: 360,
        duration: 16,
        repeat: -1,
        ease: 'none'
      });
    }

    const tl = gsap.timeline();
    timelineRef.current = tl;

    if (prefersReducedMotion) {
      if (ballWrapperRef.current) {
        gsap.set(ballWrapperRef.current, { opacity: 1, y: 0, scale: 1 });
      }
      gsap.set([titleRef.current, subtitleRef.current, supportingRef.current, btnWrapperRef.current], {
        opacity: 1,
        y: 0
      });
      return;
    }

    // Set initial position: completely off-screen below the bottom
    if (ballWrapperRef.current) {
      gsap.set(ballWrapperRef.current, {
        y: '80vh',
        scale: 0.45,
        opacity: 0
      });
    }

    // Phase 3: Short pure-black pause of ~500ms
    tl.to({}, { duration: 0.5 });

    // Phase 4: Large football rises from the bottom into the bottom half
    if (ballWrapperRef.current) {
      tl.to(ballWrapperRef.current, {
        y: 0,
        scale: 1.0,
        opacity: 1,
        duration: 1.8,
        ease: 'power3.out'
      }, 0.5);
    }

    // Phase 5: Birthday Typography Reveal in UPPER HALF (0 - 50vh)
    // 1. Main Heading ("EVERY LEGEND HAS A STORY")
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power2.out'
    }, 2.0);

    // 2. Subtitle ("SPECIAL BIRTHDAY TRIBUTE")
    tl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out'
    }, 2.5);

    // 3. Supporting Birthday Text ("RUTVIK'S CHAPTER • MATCHDAY EDITION")
    tl.to(supportingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out'
    }, 2.9);

    // 4. ENTER THE STADIUM Button (appears last)
    tl.to(btnWrapperRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'back.out(1.4)'
    }, 3.4);
  };

  /**
   * Native video ended event handler (idempotent under StrictMode / duplicate events)
   */
  const handleVideoEnded = () => {
    if (hasCompletedVideoRef.current) return;
    hasCompletedVideoRef.current = true;
    setIsVideoFinished(true);
    startFootballAndTextSequence();
  };

  /**
   * Fallback if video fails to play
   */
  const handleVideoError = () => {
    if (hasCompletedVideoRef.current) return;
    hasCompletedVideoRef.current = true;
    console.warn('Intro video playback encountered an error; proceeding to football sequence.');
    setIsVideoFinished(true);
    startFootballAndTextSequence();
  };

  /**
   * Recover playback safely if a slow connection buffered on initial load
   */
  const handleVideoCanPlay = () => {
    const vid = videoRef.current;
    if (!vid || hasCompletedVideoRef.current || !vid.paused) return;
    vid.muted = effectiveMuted;
    const attempt = vid.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch((err) => {
        if (err?.name === 'AbortError' || hasCompletedVideoRef.current) return;
        vid.muted = true;
        vid.play().catch(() => {});
      });
    }
  };

  /**
   * Exit transition into main stadium website
   */
  const handleEnterClick = () => {
    if (isTransitioningOut) return;
    setIsTransitioningOut(true);
    if (onUserInteract) onUserInteract();
    if (onEnter) onEnter();
  };

  useEffect(() => {
    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      if (rotationTweenRef.current) rotationTweenRef.current.kill();
    };
  }, []);

  return (
    <div className="stadium-intro-container" ref={containerRef}>
      {/* Phase 2: Fullscreen 100vw x 100vh Friend's Football Video */}
      {!isVideoFinished && (
        <>
          <video
            ref={videoRef}
            className="stadium-intro-video"
            src="/assets/intro/friend-football.mp4"
            autoPlay
            muted={effectiveMuted}
            playsInline
            preload="auto"
            onCanPlay={handleVideoCanPlay}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
          />
          <div className="stadium-intro-watermark-detail" aria-hidden="true" />
        </>
      )}

      {/* Phase 4: Large Rotating Football from attached photo */}
      <div className="stadium-intro-ball-wrapper" ref={ballWrapperRef}>
        <div className="stadium-intro-ball-glow" />
        <img
          ref={ballImgRef}
          className="stadium-intro-ball-img"
          src="/assets/intro/football.png"
          alt="Black and White Football"
        />
      </div>

      {/* Subtle Vignette Overlay */}
      <div className="stadium-intro-vignette" />

      {/* Phase 5: Birthday Typography in UPPER HALF (0 - 50vh) */}
      <div className="stadium-intro-ui">
        {/* 1. Main Heading */}
        <h1 className="stadium-intro-title" ref={titleRef}>
          EVERY LEGEND<br />HAS A STORY
        </h1>

        {/* 2. Subtitle */}
        <p className="stadium-intro-subtitle" ref={subtitleRef}>
          SPECIAL BIRTHDAY TRIBUTE
        </p>

        {/* 3. Supporting Birthday Text */}
        <p className="stadium-intro-supporting" ref={supportingRef}>
          RUTVIK'S CHAPTER • MATCHDAY EDITION
        </p>

        {/* 4. ENTER THE STADIUM Button */}
        <div className="stadium-intro-btn-wrapper" ref={btnWrapperRef}>
          <button
            className="stadium-intro-btn"
            onClick={handleEnterClick}
            aria-label="Enter the Stadium"
          >
            <span>ENTER THE STADIUM</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
