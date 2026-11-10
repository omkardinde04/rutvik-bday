import React, { useEffect, useState } from 'react';

/**
 * Synthesizes an original cinematic startup sound using Web Audio API.
 * Completely independent synthesis (no proprietary Netflix audio recording).
 */
function playOriginalStartupSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;

    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.32, now + 0.35);
    masterGain.gain.exponentialRampToValueAtTime(0.22, now + 1.35);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.55);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);
    filter.frequency.exponentialRampToValueAtTime(2100, now + 0.7);
    filter.frequency.exponentialRampToValueAtTime(380, now + 2.5);

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    // Original deep sub impact + warm harmonic fifth/ninth swell
    const tones = [
      { freq: 65.41, type: 'sine', gain: 0.48 },
      { freq: 98.0, type: 'triangle', gain: 0.28 },
      { freq: 146.83, type: 'sine', gain: 0.22 },
      { freq: 196.0, type: 'triangle', gain: 0.15 },
      { freq: 392.0, type: 'sine', gain: 0.08 },
    ];

    tones.forEach(({ freq, type, gain }) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      oscGain.gain.setValueAtTime(gain, now);
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start(now);
      osc.stop(now + 2.6);
    });

    return ctx;
  } catch {
    return null;
  }
}

const RIBBON_STRIPES = Array.from({ length: 12 }, (_, idx) => idx);

export default function RutvikLoadingAnimation({ isMuted = false, onComplete }) {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let audioCtx = null;

    if (!isMuted) {
      audioCtx = playOriginalStartupSound();
    }

    const fadeDelay = prefersReducedMotion ? 400 : 2150;
    const doneDelay = prefersReducedMotion ? 750 : 2650;

    const fadeTimer = window.setTimeout(() => setFadingOut(true), fadeDelay);
    const doneTimer = window.setTimeout(() => {
      onComplete?.();
    }, doneDelay);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
      if (audioCtx && audioCtx.state !== 'closed') {
        audioCtx.close().catch(() => {});
      }
    };
  }, [isMuted, onComplete]);

  return (
    <div
      className={`ci-loading-stage ${fadingOut ? 'fading-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading RUTVIK+"
    >
      {/* Dramatic Red Ambient Lighting */}
      <div className="ci-loading-ambient" aria-hidden="true" />

      {/* Central Vertical Red Light Reveal */}
      <div className="ci-vertical-light-blade" aria-hidden="true" />

      {/* Animated Red Curtain / Spectral Ribbons */}
      <div className="ci-ribbon-field" aria-hidden="true">
        {RIBBON_STRIPES.map((i) => (
          <div className="ci-ribbon-stripe" key={i} />
        ))}
      </div>

      {/* Emerging RUTVIK+ Wordmark */}
      <div className="ci-loading-wordmark">
        <span>RUTVIK</span>
        <span className="ci-loading-plus">+</span>
      </div>

      <div className="ci-loading-sub">
        PRIVATE STREAMING EDITION
      </div>
    </div>
  );
}
