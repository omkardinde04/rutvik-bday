import React from 'react';
import { Play, RotateCcw } from 'lucide-react';

export default function RutvikReveal({ onEnter, onReplay }) {
  return (
    <section
      className="ci-reveal-stage"
      role="region"
      aria-label="RUTVIK+ Reveal"
    >
      <div className="ci-reveal-glow-ring" aria-hidden="true" />

      <div className="ci-reveal-kicker">
        A PERSONALIZED BIRTHDAY EXPERIENCE
      </div>

      <h1 className="ci-reveal-logo">
        RUTVIK<span>+</span>
      </h1>

      <p className="ci-reveal-tagline">
        YOUR STORY. YOUR PEOPLE. YOUR PLATFORM.
      </p>

      <button
        type="button"
        className="ci-enter-btn"
        onClick={onEnter}
        aria-label="Enter RUTVIK+"
      >
        <Play size={20} fill="currentColor" />
        <span>ENTER RUTVIK+</span>
      </button>

      {onReplay && (
        <button
          type="button"
          className="ci-replay-link"
          onClick={onReplay}
          aria-label="Replay Opening Sequence"
        >
          <RotateCcw size={14} />
          <span>Replay Opening Sequence</span>
        </button>
      )}
    </section>
  );
}

