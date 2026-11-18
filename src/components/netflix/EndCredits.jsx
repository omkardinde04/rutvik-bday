import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Clapperboard, FastForward } from 'lucide-react';
import { END_CREDITS_DATA } from '../../data/friendsCredits';

export default function EndCredits() {
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [keyReset, setKeyReset] = useState(0);

  const togglePause = () => setIsPaused(!isPaused);

  const handleRestart = () => {
    setKeyReset((prev) => prev + 1);
    setIsPaused(false);
  };

  const toggleSpeed = () => {
    setSpeedMultiplier((prev) => (prev === 1 ? 2 : 1));
  };

  const rollDuration = speedMultiplier === 2 ? 16 : 32;

  return (
    <section className="nf-credits-section" id="end-credits" aria-label="Cinematic End Credits">
      <div className="nf-credits-box">
        {/* Controls Bar */}
        <div className="nf-credits-controls">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Clapperboard size={20} color="#E50914" />
            <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.06em', color: '#ffffff' }}>
              OFFICIAL PRODUCTION CREDITS
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              type="button"
              className="nf-mini-btn"
              onClick={toggleSpeed}
              title={`Playback speed: ${speedMultiplier}x`}
            >
              <span style={{ fontSize: '0.72rem', fontWeight: 800 }}>{speedMultiplier}x</span>
            </button>

            <button
              type="button"
              className="nf-mini-btn"
              onClick={togglePause}
              title={isPaused ? 'Resume credits' : 'Pause credits'}
            >
              {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
            </button>

            <button
              type="button"
              className="nf-mini-btn"
              onClick={handleRestart}
              title="Restart credits"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Viewport with Starfield / Black Background */}
        <div className="nf-credits-viewport">
          <div
            key={keyReset}
            className={`nf-credits-roll ${isPaused ? 'paused' : ''}`}
            style={{ animationDuration: `${rollDuration}s` }}
          >
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontFamily: 'Bebas Neue, Impact, sans-serif', fontSize: '2.4rem', color: '#E50914', letterSpacing: '0.08em' }}>
                RUTVIK+
              </div>
              <div style={{ fontSize: '0.82rem', color: '#9ca3af', letterSpacing: '0.2em' }}>
                A BIRTHDAY ORIGINAL PRODUCTION
              </div>
            </div>

            {END_CREDITS_DATA.map((group) => (
              <div className="nf-credit-group" key={group.sectionTitle}>
                <div className="nf-credit-heading">{group.sectionTitle}</div>
                {group.items.map((item) => (
                  <div className="nf-credit-row" key={item.role}>
                    <div className="nf-credit-role">{item.role}</div>
                    <div className="nf-credit-name">{item.name}</div>
                  </div>
                ))}
              </div>
            ))}

            <div style={{ marginTop: '3.5rem', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.9rem', color: '#e5e5e5', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                “Distance is temporary. Brotherhood is forever.”
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fbbf24' }}>
                HAPPY BIRTHDAY CAPTAIN RUTVIK!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

