import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  X,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Film,
} from 'lucide-react';
import { saveWatchProgress, getSavedWatchProgress } from '../../data/videoCatalog';

function formatTime(seconds) {
  if (isNaN(seconds) || !Number.isFinite(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function CinematicVideoPlayer({ video, onClose, onVideoEnded }) {
  const videoRef = useRef(null);
  const playerShellRef = useRef(null);
  const lastSavedSecRef = useRef(-1);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeVideoSrc, setActiveVideoSrc] = useState(video?.videoUrl || '');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const sender = video?.senderName || video?.personName || 'Friends & Family';
  const category = video?.category || video?.collection || 'Birthday Special';
  const isShowingSample = Boolean(isPreviewMode || video?.isSamplePreview);

  // Initialize source
  useEffect(() => {
    setActiveVideoSrc(video?.videoUrl || '');
    setHasError(false);
    setIsPreviewMode(false);
    lastSavedSecRef.current = -1;
  }, [video]);

  // Handle Fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Persist progress and close cleanly
  const handleClosePlayer = () => {
    if (video && videoRef.current && !hasError && !isPreviewMode) {
      const curr = videoRef.current.currentTime || currentTime;
      const dur = videoRef.current.duration || duration || video.durationSeconds || 60;
      if (curr > 0) {
        saveWatchProgress(video.id, curr, dur);
      }
    }
    onClose();
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClosePlayer();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'ArrowRight') {
        seekRelative(5);
      } else if (e.key === 'ArrowLeft') {
        seekRelative(-5);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, currentTime, duration, hasError, isPreviewMode]);

  // Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Seek relative
  const seekRelative = (delta) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.min(
      videoRef.current.duration || 100,
      Math.max(0, videoRef.current.currentTime + delta)
    );
  };

  // Scrubber change
  const handleSeekChange = (e) => {
    const target = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = target;
      setCurrentTime(target);
      if (video && !isPreviewMode) {
        saveWatchProgress(video.id, target, videoRef.current.duration || duration || 60);
      }
    }
  };

  // Time update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || duration || 0;
    setCurrentTime(curr);

    // Save progress cleanly at most every 2 seconds (never for sample fallback reels)
    const sec = Math.floor(curr);
    if (video && !isPreviewMode && sec > 0 && sec % 2 === 0 && lastSavedSecRef.current !== sec) {
      lastSavedSecRef.current = sec;
      saveWatchProgress(video.id, curr, dur);
    }
  };

  // Loaded metadata
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    const dur = videoRef.current.duration;
    setDuration(dur);
    setHasError(false);

    if (video && !isPreviewMode) {
      const savedEntry = getSavedWatchProgress(video.id);
      const savedSeconds = video.watchedSeconds || savedEntry?.watchedSeconds || 0;

      // Restore saved position if available and not at end
      if (savedSeconds > 0 && savedSeconds < dur - 2) {
        videoRef.current.currentTime = savedSeconds;
        setCurrentTime(savedSeconds);
      } else {
        saveWatchProgress(video.id, 1, dur);
      }
    }

    // Auto-play when opened
    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Autoplay may be blocked by browser policy without user gesture
        setIsPlaying(false);
      });
  };

  // Volume
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    videoRef.current.muted = newMuted;
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!playerShellRef.current) return;
    if (!document.fullscreenElement) {
      playerShellRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Handle Video Error gracefully
  const handleVideoError = () => {
    setHasError(true);
    setIsPlaying(false);
  };

  // Fallback demo reel switch
  const handlePlaySampleReel = () => {
    const fallback = video.sampleVideoUrl || '/assets/intro/friend-football.mp4';
    setActiveVideoSrc(fallback);
    setHasError(false);
    setIsPreviewMode(true);
  };

  return (
    <div
      className="nf-player-overlay"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={`Playing ${video?.title}`}
    >
      <div className="nf-player-shell" ref={playerShellRef}>
        {/* Top HUD with Title & Close */}
        <div className="nf-player-top-bar">
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ color: '#E50914', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.08em' }}>
                {video?.episodeNumber || 'SPECIAL'}
              </span>
              <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.05rem' }}>
                {video?.title}
              </span>
              {isShowingSample && !hasError && (
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    padding: '0.18rem 0.55rem',
                    borderRadius: '3px',
                    background: 'rgba(245, 158, 11, 0.2)',
                    border: '1px solid rgba(245, 158, 11, 0.6)',
                    color: '#fbbf24',
                  }}
                >
                  SAMPLE STADIUM CLIP (NOT UPLOADED WISH)
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.15rem' }}>
              From: {sender}
            </div>
          </div>

          <button
            type="button"
            className="nf-player-close"
            onClick={handleClosePlayer}
            aria-label="Close Video Player"
            title="Close (Esc)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Screen Area */}
        <div className="nf-player-video-stage" onClick={togglePlay}>
          {!hasError ? (
            <video
              ref={videoRef}
              className="nf-player-video"
              src={activeVideoSrc}
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onError={handleVideoError}
              onEnded={() => {
                setIsPlaying(false);
                const finalDur = videoRef.current?.duration || duration || 60;
                if (video && !isPreviewMode) {
                  saveWatchProgress(video.id, finalDur, finalDur);
                }
                onVideoEnded?.();
              }}
            />
          ) : (
            /* Graceful Placeholder for Missing/Upcoming Birthday Videos */
            <div className="nf-missing-video-box" onClick={(e) => e.stopPropagation()}>
              <Film size={46} color="#E50914" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.45rem', color: '#ffffff' }}>
                Birthday Wish Video Slot Ready
              </h3>
              <p style={{ color: '#d1d5db', maxWidth: '480px', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                Awaiting video submission from <strong>{sender}</strong>. Drop an MP4 file into{' '}
                <code style={{ background: 'rgba(255,255,255,0.12)', padding: '0.15rem 0.4rem', borderRadius: '3px', color: '#fbbf24' }}>
                  public{video?.videoUrl}
                </code>{' '}
                to showcase their personal message.
              </p>

              <button
                type="button"
                className="nf-btn-play"
                style={{ fontSize: '0.92rem', padding: '0.65rem 1.45rem' }}
                onClick={handlePlaySampleReel}
              >
                <Sparkles size={16} color="#141414" />
                <span>Play Sample Stadium Reel</span>
              </button>
            </div>
          )}

          {/* Big Center Play Indicator on Pause (when not errored) */}
          {!isPlaying && !hasError && (
            <div
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: 'rgba(20, 20, 20, 0.75)',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Play size={30} fill="#ffffff" style={{ marginLeft: '4px' }} />
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="nf-player-controls" onClick={(e) => e.stopPropagation()}>
          {/* Scrubber Progress Slider */}
          <input
            type="range"
            className="nf-scrubber"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeekChange}
            aria-label="Seek timeline"
          />

          <div className="nf-controls-row">
            <div className="nf-controls-left">
              {/* Play / Pause Toggle */}
              <button
                type="button"
                className="nf-ctrl-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
              </button>

              {/* Seek -10s */}
              <button
                type="button"
                className="nf-ctrl-btn"
                onClick={() => seekRelative(-10)}
                aria-label="Rewind 10 seconds"
                title="Rewind 10s"
              >
                <RotateCcw size={18} />
              </button>

              {/* Volume & Mute */}
              <button
                type="button"
                className="nf-ctrl-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
              >
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <input
                type="range"
                className="nf-volume-slider"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume level"
              />

              {/* Timestamp */}
              <span className="nf-time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="nf-controls-right">
              {isShowingSample && (
                <span style={{ fontSize: '0.72rem', background: '#E50914', color: '#fff', padding: '0.15rem 0.45rem', borderRadius: '3px', fontWeight: 700 }}>
                  SAMPLE PREVIEW
                </span>
              )}

              {/* Fullscreen Button */}
              <button
                type="button"
                className="nf-ctrl-btn"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Episode Storyline Footer */}
        <div className="nf-player-info-bar">
          <div style={{ maxWidth: '780px' }}>
            <div style={{ fontSize: '0.88rem', color: '#e5e5e5', lineHeight: '1.5' }}>
              {video?.description}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.74rem', border: '1px solid rgba(255,255,255,0.2)', padding: '0.2rem 0.5rem', borderRadius: '2px', color: '#9ca3af' }}>
              {category}
            </span>
            <span style={{ fontSize: '0.74rem', border: '1px solid #46d369', padding: '0.2rem 0.5rem', borderRadius: '2px', color: '#46d369' }}>
              {video?.matchScore || '100% Match'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
