import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, SkipForward, RotateCcw, Play, AlertCircle } from 'lucide-react';

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
  activeIndex,
  isMuted,
  onToggleMute,
  onVideoEnded,
  onSkip,
  onReplay,
}) {
  const videoRefs = useRef([]);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [segmentProgress, setSegmentProgress] = useState([0, 0, 0]);
  const [errorIndex, setErrorIndex] = useState(null);

  // Sync mute attribute across all video layers
  useEffect(() => {
    videoRefs.current.forEach((vid) => {
      if (vid) vid.muted = isMuted;
    });
  }, [isMuted]);

  // Play active video cleanly and pause inactive ones
  useEffect(() => {
    setErrorIndex(null);

    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx !== activeIndex) {
        vid.pause();
        if (idx > activeIndex) {
          vid.currentTime = 0;
        }
      }
    });

    const activeVideo = videoRefs.current[activeIndex];
    if (!activeVideo) return;

    activeVideo.muted = isMuted;
    activeVideo.currentTime = 0;

    const playPromise = activeVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise
        .then(() => {
          setAutoplayBlocked(false);
        })
        .catch(() => {
          // Autoplay with audio was blocked by browser policy
          setAutoplayBlocked(true);
        });
    }
  }, [activeIndex]);

  // Prime inactive video elements within user gesture so mobile Safari/WebKit allows seamless unmuted transition
  const primeUpcomingVideos = (mutedTarget) => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid || idx <= activeIndex) return;
      vid.muted = true;
      const p = vid.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          vid.pause();
          vid.currentTime = 0;
          vid.muted = mutedTarget;
        }).catch(() => {
          vid.muted = mutedTarget;
        });
      }
    });
  };

  const handleEnableSoundAndPlay = () => {
    if (isMuted) onToggleMute(false);
    setAutoplayBlocked(false);
    primeUpcomingVideos(false);

    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo) {
      activeVideo.muted = false;
      activeVideo.currentTime = 0;
      activeVideo.play().catch(() => {
        // Fallback if audio device unavailable
        activeVideo.muted = true;
        onToggleMute(true);
        activeVideo.play().catch(() => {});
      });
    }
  };

  const handleContinueMuted = () => {
    onToggleMute(true);
    setAutoplayBlocked(false);
    primeUpcomingVideos(true);

    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo) {
      activeVideo.muted = true;
      activeVideo.currentTime = 0;
      activeVideo.play().catch(() => {});
    }
  };

  const handleTimeUpdate = (idx, e) => {
    if (idx !== activeIndex) return;
    const el = e.currentTarget;
    const pct = el.duration > 0 ? Math.min(100, (el.currentTime / el.duration) * 100) : 0;
    setSegmentProgress((prev) => {
      const next = [...prev];
      next[idx] = pct;
      return next;
    });
  };

  const handleLocalReplay = () => {
    setSegmentProgress([0, 0, 0]);
    setAutoplayBlocked(false);
    setErrorIndex(null);
    onReplay();
    // Ensure Video 1 restarts immediately if already on index 0
    if (activeIndex === 0 && videoRefs.current[0]) {
      const v = videoRefs.current[0];
      v.currentTime = 0;
      v.muted = isMuted;
      v.play().catch(() => setAutoplayBlocked(true));
    }
  };

  const handleEnded = (idx) => {
    if (idx !== activeIndex) return;
    setSegmentProgress((prev) => {
      const next = [...prev];
      next[idx] = 100;
      return next;
    });
    onVideoEnded(idx);
  };

  return (
    <div className="ci-video-stage" role="region" aria-label="RUTVIK+ Cinematic Opening Sequence">
      {/* Pre-mounted Video Layers for Seamless Crossfade Transitions */}
      {INTRO_SEQUENCE.map((item, idx) => (
        <div
          key={item.stepKey}
          className={`ci-video-layer ${idx === activeIndex ? 'active' : ''}`}
        >
          <video
            ref={(el) => {
              videoRefs.current[idx] = el;
            }}
            className="ci-video-el"
            src={item.src}
            preload="auto"
            playsInline
            muted={isMuted}
            onTimeUpdate={(e) => handleTimeUpdate(idx, e)}
            onEnded={() => handleEnded(idx)}
            onError={() => {
              if (idx === activeIndex) setErrorIndex(idx);
            }}
          />
        </div>
      ))}

      <div className="ci-vignette" aria-hidden="true" />

      {/* Top Controls & 3-Act Progress HUD */}
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
            onClick={onSkip}
            aria-label="Skip intro to RUTVIK+ reveal"
          >
            <SkipForward size={15} />
            <span>Skip Intro</span>
          </button>
        </div>
      </div>

      {/* Browser Autoplay Restriction Gate */}
      {autoplayBlocked && errorIndex === null && (
        <div className="ci-autoplay-gate" role="dialog" aria-label="Enable Audio for Cinematic Intro">
          <div className="ci-gate-badge">RUTVIK+ PREMIERE</div>
          <h1 className="ci-gate-title">A SPECIAL BIRTHDAY EXPERIENCE</h1>
          <p className="ci-gate-sub">
            Enable sound to experience the full three-chapter cinematic opening with its original audio tracks.
          </p>

          <button
            type="button"
            className="ci-gate-primary"
            onClick={handleEnableSoundAndPlay}
          >
            <Volume2 size={20} />
            <span>ENABLE SOUND & ENTER EXPERIENCE</span>
          </button>

          <button
            type="button"
            className="ci-gate-secondary"
            onClick={handleContinueMuted}
          >
            Continue without sound
          </button>
        </div>
      )}

      {/* Missing / Errored Video Graceful Fallback */}
      {errorIndex !== null && (
        <div className="ci-autoplay-gate" role="alert">
          <AlertCircle size={40} color="#E50914" style={{ marginBottom: '0.85rem' }} />
          <h2 className="ci-gate-title" style={{ fontSize: '2rem' }}>
            VIDEO PLAYBACK INTERRUPTED
          </h2>
          <p className="ci-gate-sub">
            Could not load chapter {errorIndex + 1} cleanly. You can continue directly to the next chapter or skip to RUTVIK+.
          </p>
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              className="ci-gate-primary"
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
              onClick={onSkip}
            >
              <span>Skip to RUTVIK+</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
