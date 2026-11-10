import React, { useEffect, useRef, useState } from 'react';

const TOTAL_DURATION_MS = 4150;
const REDUCED_MOTION_DURATION_MS = 900;

/**
 * Original 4-second multi-stage Web Audio composition synchronized to Acts 1-5:
 * - 0.05s: Deep cinema sub impact + rising atmospheric air whoosh
 * - 0.50s - 2.35s: Accelerating harmonic tension sweep matching prismatic streaks
 * - 2.40s: Tightly synchronized resonant boom + resolved major-ninth reveal chord
 * - 3.25s - 4.00s: Natural cinematic decay
 */
function playCinematicLogoAudio() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;

    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.28, now + 0.12);
    masterGain.gain.exponentialRampToValueAtTime(0.24, now + 2.2);
    masterGain.gain.exponentialRampToValueAtTime(0.42, now + 2.44);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.95);
    masterGain.connect(ctx.destination);

    // 1. Act 1 Opening Sub-Bass Pulse (0.04s)
    const introSub = ctx.createOscillator();
    const introSubGain = ctx.createGain();
    introSub.type = 'sine';
    introSub.frequency.setValueAtTime(68, now + 0.04);
    introSub.frequency.exponentialRampToValueAtTime(38, now + 0.75);
    introSubGain.gain.setValueAtTime(0.001, now + 0.04);
    introSubGain.gain.exponentialRampToValueAtTime(0.55, now + 0.14);
    introSubGain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
    introSub.connect(introSubGain);
    introSubGain.connect(masterGain);
    introSub.start(now + 0.04);
    introSub.stop(now + 1.15);

    // 2. Act 2-3 Rising Filtered Noise Whoosh & Harmonic Tension Swell (0.45s -> 2.40s)
    const bufferSize = Math.floor(ctx.sampleRate * 2.2);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.04 * white) / 1.04;
      lastOut = output[i];
    }

    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.Q.value = 1.6;
    noiseFilter.frequency.setValueAtTime(180, now + 0.4);
    noiseFilter.frequency.exponentialRampToValueAtTime(2200, now + 2.38);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now + 0.4);
    noiseGain.gain.exponentialRampToValueAtTime(0.28, now + 2.2);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.55);

    noiseSrc.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseSrc.start(now + 0.4);
    noiseSrc.stop(now + 2.6);

    // 3. Act 4 Peak Reveal Impact Boom + Warm Orchestral Chord (2.40s)
    const impactTime = now + 2.38;
    const impactSub = ctx.createOscillator();
    const impactSubGain = ctx.createGain();
    impactSub.type = 'sine';
    impactSub.frequency.setValueAtTime(92, impactTime);
    impactSub.frequency.exponentialRampToValueAtTime(41, impactTime + 0.9);
    impactSubGain.gain.setValueAtTime(0.001, impactTime);
    impactSubGain.gain.exponentialRampToValueAtTime(0.7, impactTime + 0.045);
    impactSubGain.gain.exponentialRampToValueAtTime(0.001, impactTime + 1.55);
    impactSub.connect(impactSubGain);
    impactSubGain.connect(masterGain);
    impactSub.start(impactTime);
    impactSub.stop(impactTime + 1.6);

    // Rich harmonic chord tones synced with logo emergence
    const chordFilter = ctx.createBiquadFilter();
    chordFilter.type = 'lowpass';
    chordFilter.frequency.setValueAtTime(2400, impactTime);
    chordFilter.frequency.exponentialRampToValueAtTime(520, now + 3.9);
    chordFilter.connect(masterGain);

    const chordVoices = [
      { freq: 73.42, type: 'triangle', gain: 0.24 }, // D2
      { freq: 110.0, type: 'sine', gain: 0.22 },     // A2
      { freq: 146.83, type: 'triangle', gain: 0.18 },// D3
      { freq: 220.0, type: 'sine', gain: 0.16 },     // A3
      { freq: 329.63, type: 'sine', gain: 0.11 },    // E4
      { freq: 369.99, type: 'sine', gain: 0.08 },    // F#4
    ];

    chordVoices.forEach(({ freq, type, gain }) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, impactTime - 0.1);
      g.gain.setValueAtTime(0.001, impactTime - 0.1);
      g.gain.exponentialRampToValueAtTime(gain, impactTime + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 3.9);
      osc.connect(g);
      g.connect(chordFilter);
      osc.start(impactTime - 0.1);
      osc.stop(now + 3.95);
    });

    return ctx;
  } catch {
    return null;
  }
}

/**
 * Generates deterministic streak definitions so every run is smooth and crisp.
 */
function createStreakData(count = 72) {
  const redPalette = ['#7a040a', '#b20710', '#e50914', '#ff2935', '#ff5733'];
  const prismPalette = [
    '#e50914',
    '#ff3d2e',
    '#f59e0b',
    '#fb923c',
    '#f43f5e',
    '#ec4899',
    '#a855f7',
    '#3b82f6',
    '#38bdf8',
    '#ffffff',
  ];

  return Array.from({ length: count }, (_, i) => {
    const norm = (i / (count - 1)) * 2 - 1; // -1 to 1 spread
    const jitter = Math.sin(i * 12.9898) * 0.18;
    const isCore = Math.abs(norm) < 0.22;
    return {
      norm: norm + jitter * 0.25,
      width: isCore ? 2 + (i % 5) * 2.2 : 2 + (i % 7) * 3.4,
      speed: 1.2 + (i % 6) * 0.45,
      phase: (i * 0.73) % (Math.PI * 2),
      alpha: isCore ? 0.85 : 0.45 + (i % 4) * 0.14,
      redColor: redPalette[i % redPalette.length],
      prismColor: prismPalette[i % prismPalette.length],
      isCore,
    };
  });
}

export default function RutvikLoadingAnimation({ isMuted = false, onComplete }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('act1'); // 'act1' | 'act2' | 'act3' | 'act4' | 'act5' | 'fadeout'

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let audioCtx = null;

    if (!isMuted && !prefersReducedMotion) {
      audioCtx = playCinematicLogoAudio();
    }

    if (prefersReducedMotion) {
      setPhase('act4');
      const fadeT = window.setTimeout(() => setPhase('fadeout'), REDUCED_MOTION_DURATION_MS - 300);
      const doneT = window.setTimeout(() => onComplete?.(), REDUCED_MOTION_DURATION_MS);
      return () => {
        window.clearTimeout(fadeT);
        window.clearTimeout(doneT);
      };
    }

    const streaks = createStreakData(78);
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;
    let rafId = null;
    const startTime = performance.now();

    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const renderFrame = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / TOTAL_DURATION_MS);

      // Update React phase states cleanly at exact act boundaries
      if (elapsed < 380) {
        setPhase((prev) => (prev !== 'act1' ? 'act1' : prev));
      } else if (elapsed < 1350) {
        setPhase((prev) => (prev !== 'act2' ? 'act2' : prev));
      } else if (elapsed < 2350) {
        setPhase((prev) => (prev !== 'act3' ? 'act3' : prev));
      } else if (elapsed < 3250) {
        setPhase((prev) => (prev !== 'act4' ? 'act4' : prev));
      } else if (elapsed < 3750) {
        setPhase((prev) => (prev !== 'act5' ? 'act5' : prev));
      } else {
        setPhase((prev) => (prev !== 'fadeout' ? 'fadeout' : prev));
      }

      if (ctx && canvas) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const cx = w / 2;
        const cy = h / 2;

        // Clear to pure pitch black
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);

        // Act 1 -> Act 4 Central Red Ambient Depth Bloom
        if (elapsed >= 120) {
          const bloomAlpha =
            elapsed < 2400
              ? Math.min(0.45, ((elapsed - 120) / 1400) * 0.45)
              : Math.max(0.12, 0.45 - ((elapsed - 2400) / 1200) * 0.35);

          const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, Math.max(w, h) * 0.55);
          grad.addColorStop(0, `rgba(229, 9, 20, ${bloomAlpha})`);
          grad.addColorStop(0.4, `rgba(140, 5, 12, ${bloomAlpha * 0.45})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, w, h);
        }

        // Act 2 & Act 3 Vertical Streaks & Dimensional Red Shapes (0.32s -> 2.75s)
        if (elapsed >= 300 && elapsed <= 2850) {
          ctx.globalCompositeOperation = 'lighter';

          // Act 2 narrow core (0.3s -> 1.35s) expands rapidly into Act 3 full-width prism (1.35s -> 2.4s)
          const act2Prog = Math.min(1, Math.max(0, (elapsed - 300) / 1050));
          const act3Prog = Math.min(1, Math.max(0, (elapsed - 1300) / 1050));
          const fadeOutStreaks = elapsed > 2350 ? Math.max(0, 1 - (elapsed - 2350) / 500) : 1;

          // Perspective horizontal spread factor
          const spreadFactor = 0.055 + Math.pow(act3Prog, 1.55) * 0.92;
          const intensity = Math.min(1, act2Prog * 1.4) * fadeOutStreaks;

          // Dimensional red geometric shapes in Act 2 -> early Act 3
          if (elapsed > 450 && elapsed < 1950) {
            const shapeProg = (elapsed - 450) / 1500;
            const scale = 0.7 + shapeProg * 2.4;
            const shapeAlpha =
              shapeProg < 0.5
                ? (shapeProg / 0.5) * 0.38
                : (1 - (shapeProg - 0.5) / 0.5) * 0.38;

            ctx.save();
            ctx.translate(cx, cy);
            ctx.scale(scale, scale);

            // Left dimensional red pillar
            ctx.fillStyle = `rgba(178, 7, 16, ${shapeAlpha})`;
            ctx.fillRect(-52, -h * 0.32, 24, h * 0.64);

            // Right dimensional red pillar
            ctx.fillStyle = `rgba(178, 7, 16, ${shapeAlpha})`;
            ctx.fillRect(28, -h * 0.32, 24, h * 0.64);

            // Diagonal crimson ribbon beam
            ctx.beginPath();
            ctx.moveTo(-52, -h * 0.32);
            ctx.lineTo(-26, -h * 0.32);
            ctx.lineTo(52, h * 0.32);
            ctx.lineTo(26, h * 0.32);
            ctx.closePath();
            ctx.fillStyle = `rgba(229, 9, 20, ${shapeAlpha * 1.35})`;
            ctx.fill();
            ctx.restore();
          }

          // Vertical Light Streaks
          streaks.forEach((s) => {
            const x = cx + s.norm * (w * 0.56) * spreadFactor;
            if (x < -80 || x > w + 80) return;

            const streakWidth =
              s.width * (0.55 + act3Prog * 1.35) * (1 + Math.abs(s.norm) * act3Prog * 0.9);

            // Blend from pure red streaks (Act 2) to vibrant prismatic streaks (Act 3)
            const usePrism = act3Prog > 0.16 && !s.isCore;
            const color = usePrism ? s.prismColor : s.redColor;

            const pulse = 0.72 + 0.28 * Math.sin(elapsed * 0.012 * s.speed + s.phase);
            const alpha = s.alpha * intensity * pulse * (act3Prog > 0.15 ? 0.78 : 0.72);

            const vGrad = ctx.createLinearGradient(x, 0, x, h);
            vGrad.addColorStop(0, 'rgba(0,0,0,0)');
            vGrad.addColorStop(0.06, color);
            vGrad.addColorStop(0.5, color);
            vGrad.addColorStop(0.94, color);
            vGrad.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.globalAlpha = alpha;
            ctx.fillStyle = vGrad;
            ctx.fillRect(x - streakWidth / 2, 0, streakWidth, h);

            // Razor-thin hot center filament using the same soft edge-to-edge gradient
            if (s.isCore || act3Prog > 0.45) {
              const coreGrad = ctx.createLinearGradient(x, 0, x, h);
              coreGrad.addColorStop(0, 'rgba(255,255,255,0)');
              coreGrad.addColorStop(0.1, 'rgba(255,255,255,0.9)');
              coreGrad.addColorStop(0.9, 'rgba(255,255,255,0.9)');
              coreGrad.addColorStop(1, 'rgba(255,255,255,0)');

              ctx.globalAlpha = alpha * (s.isCore ? 0.3 : 0.14);
              ctx.fillStyle = coreGrad;
              const coreW = Math.min(2.8, Math.max(1, streakWidth * 0.14));
              ctx.fillRect(x - coreW / 2, 0, coreW, h);
            }
          });

          ctx.globalAlpha = 1;
        }

        // Act 4 Radial Crimson Flash Burst at Logo Lock-in (2.35s -> 3.0s)
        if (elapsed >= 2320 && elapsed <= 3050) {
          ctx.globalCompositeOperation = 'lighter';
          const burstAge = (elapsed - 2320) / 730;
          const burstAlpha = (1 - burstAge) * 0.42;
          const flareGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * (0.28 + burstAge * 0.35));
          flareGrad.addColorStop(0, `rgba(255, 80, 80, ${burstAlpha})`);
          flareGrad.addColorStop(0.35, `rgba(229, 9, 20, ${burstAlpha * 0.65})`);
          flareGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = flareGrad;
          ctx.fillRect(0, 0, w, h);
        }
      }

      if (elapsed < TOTAL_DURATION_MS) {
        rafId = requestAnimationFrame(renderFrame);
      } else {
        onComplete?.();
      }
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
      if (audioCtx && audioCtx.state !== 'closed') {
        audioCtx.close().catch(() => {});
      }
    };
  }, [isMuted, onComplete]);

  const showWordmark = phase === 'act4' || phase === 'act5' || phase === 'fadeout';

  return (
    <div
      className={`ci-logo-anim-stage ${phase === 'fadeout' ? 'fading-out' : ''}`}
      data-logo-phase={phase}
      role="status"
      aria-live="polite"
      aria-label="RUTVIK+ Brand Reveal"
    >
      {/* 60FPS HiDPI Canvas for Vertical Light Streaks, Prismatic Expansion & Dimensional Planes */}
      <canvas ref={canvasRef} className="ci-logo-canvas" aria-hidden="true" />

      {/* Dramatic Dimensional RUTVIK+ Wordmark Reveal (Act 4 & Act 5) */}
      <div className={`ci-wordmark-lockup ${showWordmark ? 'revealed' : ''}`}>
        <div className="ci-wordmark-backdrop-glow" aria-hidden="true" />

        <div className="ci-wordmark-3d" aria-label="RUTVIK+">
          <span className="ci-wordmark-shadow" aria-hidden="true">
            RUTVIK<span className="ci-wordmark-plus">+</span>
          </span>
          <span className="ci-wordmark-face">
            RUTVIK<span className="ci-wordmark-plus ci-wordmark-plus--lit">+</span>
          </span>
        </div>
      </div>
    </div>
  );
}
