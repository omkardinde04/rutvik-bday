import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, SkipForward, RotateCcw, Play, AlertCircle } from 'lucide-react';

const CURTAIN_START_TIME = 0.55;
const CURTAIN_END_TIME = 8.9;

export const INTRO_SEQUENCE = [
  {
    stepKey: 'INTRO_VIDEO_1',
    actLabel: 'ACT I • THE PLAYMAKER',
    src: '/assets/intro/friend-football.mp4',
  },
  {
    stepKey: 'INTRO_VIDEO_2',
    actLabel: 'ACT II • CURTAINS RISING',
    src: '/assets/intro/curtain-opening.mp4',
  },
  {
    stepKey: 'INTRO_VIDEO_3',
    actLabel: 'ACT III • WORLD CHAMPION',
    src: '/assets/intro/messi-feature.mp4',
  },
];

export default function IntroVideoPlayer({
  step,
  activeIndex,
  isMuted,
  onToggleMute,
  onStart,
  onVideoEnded,
  onSkip,
  onReplay,
  revealOverlay,
}) {
  const videoRefs = useRef([]);
  const curtainTransitionedRef = useRef(false);
  const [segmentProgress, setSegmentProgress] = useState([0, 0, 0]);
  const [errorIndex, setErrorIndex] = useState(null);

  const isWelcome = step === 'WELCOME';
  const isReveal = step === 'RUTVIK_REVEAL';
  const isVideoPhase = activeIndex >= 0 && activeIndex <= 2;

  // Keep mute attribute synced across all video layers
  useEffect(() => {
    videoRefs.current.forEach((vid) => {
      if (vid) vid.muted = isMuted;
    });
  }, [isMuted]);

  // Park curtain video cleanly at opened frame when jumping to Reveal or entering Stage 3
  const parkCurtainAtOpenedFrame = () => {
    const curtainVid = videoRefs.current[1];
    if (!curtainVid) return;
    try {
      curtainVid.pause();
      if (curtainVid.duration && curtainVid.duration >= CURTAIN_END_TIME) {
        curtainVid.currentTime = CURTAIN_END_TIME;
      } else if (curtainVid.readyState >= 1 && curtainVid.duration) {
        curtainVid.currentTime = Math.max(0, curtainVid.duration - 0.1);
      }
    } catch {
      // Ignore seek errors before metadata
    }
  };

  // Control playback when step / activeIndex changes
  useEffect(() => {
    if (isWelcome) {
      curtainTransitionedRef.current = false;
      setErrorIndex(null);
      videoRefs.current.forEach((vid) => {
        if (vid) {
          vid.pause();
          vid.currentTime = 0;
        }
      });
      return;
    }

    if (isReveal) {
      parkCurtainAtOpenedFrame();
      if (videoRefs.current[0]) videoRefs.current[0].pause();
      if (videoRefs.current[2]) videoRefs.current[2].pause();
      return;
    }

    setErrorIndex(null);

    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx !== activeIndex) {
        // Leave curtain video parked cleanly at opened frame during Video 3
        if (idx === 1 && activeIndex === 2) {
          parkCurtainAtOpenedFrame();
        } else {
          vid.pause();
          if (idx > activeIndex) {
            vid.currentTime = idx === 1 ? CURTAIN_START_TIME : 0;
          }
        }
      }
    });

    const activeVideo = videoRefs.current[activeIndex];
    if (!activeVideo) return;

    if (activeIndex === 1) {
      curtainTransitionedRef.current = false;
      if (activeVideo.currentTime < CURTAIN_START_TIME) {
        try {
          activeVideo.currentTime = CURTAIN_START_TIME;
        } catch {
          // Handled in onLoadedMetadata
        }
      }
    } else {
      activeVideo.currentTime = 0;
    }

    activeVideo.muted = isMuted;
    const playPromise = activeVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Gracefully fallback to muted playback if browser strictly blocks unmuted play
        activeVideo.muted = true;
        onToggleMute(true);
        activeVideo.play().catch(() => {});
      });
    }
  }, [step, activeIndex]);

  // Synchronous user-gesture unlock inside LET'S GO! click handler
  const handleStartClick = () => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === 0) {
        vid.muted = isMuted;
        vid.currentTime = 0;
        vid.play().catch(() => {
          vid.muted = true;
          onToggleMute(true);
          vid.play().catch(() => {});
        });
      } else {
        // Prime Video 2 and Video 3 quietly during click gesture for seamless transition on mobile
        vid.muted = true;
        const p = vid.play();
        if (p && typeof p.then === 'function') {
          p.then(() => {
            vid.pause();
            vid.currentTime = idx === 1 ? CURTAIN_START_TIME : 0;
            vid.muted = isMuted;
          }).catch(() => {
            vid.muted = isMuted;
          });
        }
      }
    });
    onStart();
  };

  const handleCurtainMetadata = (e) => {
    const vid = e.currentTarget;
    if (isReveal || activeIndex === 2) {
      parkCurtainAtOpenedFrame();
    } else if (vid.duration > CURTAIN_END_TIME && vid.currentTime < CURTAIN_START_TIME) {
      vid.currentTime = CURTAIN_START_TIME;
    }
  };

  const handleTimeUpdate = (idx, e) => {
    if (idx !== activeIndex || isWelcome || isReveal) return;
    const el = e.currentTarget;

    if (idx === 1) {
      const span = CURTAIN_END_TIME - CURTAIN_START_TIME;
      const pct = Math.min(100, Math.max(0, ((el.currentTime - CURTAIN_START_TIME) / span) * 100));
      setSegmentProgress((prev) => {
        const next = [...prev];
        next[1] = pct;
        return next;
      });
      if (el.currentTime >= CURTAIN_END_TIME && !curtainTransitionedRef.current) {
        curtainTransitionedRef.current = true;
        el.pause();
        onVideoEnded(1);
      }
      return;
    }

    const pct = el.duration > 0 ? Math.min(100, (el.currentTime / el.duration) * 100) : 0;
    setSegmentProgress((prev) => {
      const next = [...prev];
      next[idx] = pct;
      return next;
    });
  };

  const handleEnded = (idx) => {
    if (idx !== activeIndex || isWelcome || isReveal) return;
    if (idx === 1) {
      if (curtainTransitionedRef.current) return;
      curtainTransitionedRef.current = true;
    }
    setSegmentProgress((prev) => {
      const next = [...prev];
      next[idx] = 100;
      return next;
    });
    onVideoEnded(idx);
  };

  const handleLocalReplay = () => {
    curtainTransitionedRef.current = false;
    setSegmentProgress([0, 0, 0]);
    setErrorIndex(null);
    onReplay();
    if (activeIndex === 0 && videoRefs.current[0]) {
      const v = videoRefs.current[0];
      v.currentTime = 0;
      v.muted = isMuted;
      v.play().catch(() => {});
    }
  };

  const handleSkipClick = () => {
    parkCurtainAtOpenedFrame();
    onSkip();
  };

  return (
    <div className="ci-video-stage" role="region" aria-label="RUTVIK+ Cinematic Opening Sequence">
      {/* LAYER 0: Video 1 — Rutvik with Football */}
      <div className={`ci-video-layer ${isVideoPhase && activeIndex === 0 ? 'active' : ''}`}>
        <video
          ref={(el) => {
            videoRefs.current[0] = el;
          }}
          className="ci-video-el"
          src={INTRO_SEQUENCE[0].src}
          preload="auto"
          playsInline
          muted={isMuted}
          onTimeUpdate={(e) => handleTimeUpdate(0, e)}
          onEnded={() => handleEnded(0)}
          onError={() => {
            if (activeIndex === 0) setErrorIndex(0);
          }}
        />
      </div>

      {/* LAYER 1: Video 2 — Curtain Opening (stays visible behind Video 3 & Reveal) */}
      <div
        className={`ci-video-layer ${
          isVideoPhase && activeIndex === 1
            ? 'active'
            : (isVideoPhase && activeIndex === 2) || isReveal
            ? 'curtain-open-backdrop'
            : ''
        }`}
      >
        <video
          ref={(el) => {
            videoRefs.current[1] = el;
          }}
          className="ci-video-el ci-video-el--curtain"
          src={INTRO_SEQUENCE[1].src}
          preload="auto"
          playsInline
          muted={isMuted}
          onLoadedMetadata={handleCurtainMetadata}
          onTimeUpdate={(e) => handleTimeUpdate(1, e)}
          onEnded={() => handleEnded(1)}
          onError={() => {
            if (activeIndex === 1) setErrorIndex(1);
          }}
        />
      </div>

      {/* LAYER 2: Video 3 — Messi Trophy Video Inside Opened Curtain Stage */}
      <div className={`ci-video-layer ${isVideoPhase && activeIndex === 2 ? 'active' : ''}`} style={{ zIndex: 3 }}>
        <div className="ci-curtain-stage-frame">
          <video
            ref={(el) => {
              videoRefs.current[2] = el;
            }}
            className="ci-video-el"
            src={INTRO_SEQUENCE[2].src}
            preload="auto"
            playsInline
            muted={isMuted}
            onTimeUpdate={(e) => handleTimeUpdate(2, e)}
            onEnded={() => handleEnded(2)}
            onError={() => {
              if (activeIndex === 2) setErrorIndex(2);
            }}
          />
        </div>
      </div>

      <div className="ci-vignette" aria-hidden="true" />

      {/* Top HUD Controls during Video Phases */}
      {isVideoPhase && (
        <div className="ci-top-hud">
          <div className="ci-brand-status">
            <div className="ci-brand-row">
              <div className="ci-mini-logo">
                RUTVIK<span>+</span>
              </div>
              <span className="ci-act-label">
                0{activeIndex + 1} / 03 • {INTRO_SEQUENCE[activeIndex]?.actLabel}
              </span>
            </div>

            <div className="ci-segments" aria-label="Intro progress">
              {INTRO_SEQUENCE.map((_, idx) => {
                const fillPct =
                  idx < activeIndex ? 100 : idx === activeIndex ? segmentProgress[idx] : 0;
                return (
                  <div className="ci-segment-track" key={idx}>
                    <div className="ci-segment-fill" style={{ width: `${fillPct}%` }} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ci-controls-cluster">
            <button
              type="button"
              className="ci-hud-btn"
              onClick={() => onToggleMute(!isMuted)}
              aria-label={isMuted ? 'Unmute intro audio' : 'Mute intro audio'}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isMuted ? 'Unmute' : 'Sound On'}</span>
            </button>

            <button
              type="button"
              className="ci-hud-btn"
              onClick={handleLocalReplay}
              aria-label="Replay intro from start"
              title="Replay Intro"
            >
              <RotateCcw size={15} />
              <span>Replay</span>
            </button>

            <button
              type="button"
              className="ci-hud-btn ci-hud-btn--skip"
              onClick={handleSkipClick}
              aria-label="Skip intro to RUTVIK+ reveal"
            >
              <SkipForward size={15} />
              <span>Skip Intro</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Clean Welcome Screen with LET'S GO! Button */}
      {isWelcome && (
        <div className="ci-welcome-screen" role="dialog" aria-label="Welcome to RUTVIK+">
          <div className="ci-welcome-kicker">RUTVIK+ PREMIERE</div>
          <h1 className="ci-welcome-title">A SPECIAL BIRTHDAY TRIBUTE</h1>
          <p className="ci-welcome-sub">
            One legend. Countless memories. Experience a private cinematic streaming tribute crafted just for you.
          </p>

          <button
            type="button"
            className="ci-start-btn"
            onClick={handleStartClick}
            aria-label="Start Experience - Let's Go!"
          >
            <Play size={20} fill="currentColor" />
            <span>LET&apos;S GO!</span>
          </button>
        </div>
      )}

      {/* Reveal Overlay Inside Opened Curtain Stage */}
      {isReveal && revealOverlay}

      {/* Missing / Errored Video Graceful Fallback */}
      {errorIndex !== null && (
        <div className="ci-welcome-screen" role="alert">
          <AlertCircle size={40} color="#E50914" style={{ marginBottom: '0.85rem' }} />
          <h2 className="ci-welcome-title" style={{ fontSize: '2.2rem' }}>
            VIDEO PLAYBACK INTERRUPTED
          </h2>
          <p className="ci-welcome-sub">
            Could not load chapter {errorIndex + 1} cleanly. Continue to the next chapter or skip ahead.
          </p>
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              className="ci-start-btn"
              onClick={() => {
                setErrorIndex(null);
                onVideoEnded(errorIndex);
              }}
            >
              <Play size={18} fill="#ffffff" />
              <span>CONTINUE SEQUENCE</span>
            </button>
            <button
              type="button"
              className="ci-hud-btn"
              onClick={handleSkipClick}
            >
              <span>Skip to RUTVIK+</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
