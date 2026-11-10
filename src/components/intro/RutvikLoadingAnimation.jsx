import React, { useEffect, useState } from 'react';

/**
 * Synthesizes an original cinematic startup chord swell using Web Audio API.
 * Completely independent original synthesis (no proprietary audio assets).
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
    masterGain.gain.exponentialRampToValueAtTime(0.28, now + 0.35);
    masterGain.gain.exponentialRampToValueAtTime(0.18, now + 1.25);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.25);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, now);
    filter.frequency.exponentialRampToValueAtTime(1800, now + 0.65);
    filter.frequency.exponentialRampToValueAtTime(420, now + 2.2);

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    // Original warm harmonic voicing (D2 sub, A2, E3, F#3, A3)
    const tones = [
      { freq: 73.42, type: 'sine', gain: 0.45 },
      { freq: 110.0, type: 'triangle', gain: 0.25 },
      { freq: 164.81, type: 'sine', gain: 0.2 },
      { freq: 220.0, type: 'triangle', gain: 0.14 },
      { freq: 440.0, type: 'sine', gain: 0.08 },
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
      osc.stop(now + 2.3);
    });

    return ctx;
  } catch {
    return null;
  }
}

export default function RutvikLoadingAnimation({ isMuted = false, onComplete }) {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let audioCtx = null;

    if (!isMuted) {
      audioCtx = playOriginalStartupSound();
    }

    const fadeDelay = prefersReducedMotion ? 350 : 1900;
    const doneDelay = prefersReducedMotion ? 700 : 2350;

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
      <div className="ci-loading-beam" aria-hidden="true" />

      <div className="ci-loading-wordmark">
        <span>RUTVIK</span>
        <span className="ci-loading-plus">+</span>
      </div>

      <div className="ci-loading-sub">
        LOADING YOUR UNIVERSE
      </div>
    </div>
  );
}
