import React, { useState } from 'react';
import { Play, Sparkles, PartyPopper, Shield, RotateCcw } from 'lucide-react';
import { ALL_VIDEOS } from '../../data/videoCatalog';
import VideoCard from './VideoCard';

const CONFETTI_COLORS = ['#E50914', '#fbbf24', '#10b981', '#38bdf8', '#ffffff', '#ec4899'];

export default function GrandFinale({ onPlayFinaleVideo, onMoreInfo, onOpenStadium, onReplayIntro }) {
  const [celebrateActive, setCelebrateActive] = useState(false);

  const finaleVideo = ALL_VIDEOS.find((v) => v.id === 'spec-finale') || ALL_VIDEOS[0];

  const confettiPieces = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${(i * 3.7) % 100}%`,
    delay: `${(i * 0.14) % 3}s`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  }));

  return (
    <section className="nf-finale-section" id="finale" aria-label="Grand Finale Birthday Surprise">
      {/* Section Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 className="nf-carousel-title">GRAND FINALE</h2>
        <span className="nf-carousel-subtitle">
          The combined birthday tribute and final celebration
        </span>
      </div>

      {/* Featured Finale Episode Card */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'flex-start' }}>
        <VideoCard
          video={finaleVideo}
          onPlay={onPlayFinaleVideo}
          onMoreInfo={onMoreInfo}
        />
      </div>

      <div className="nf-finale-card">
        {/* Confetti Layer when celebration is triggered */}
        {celebrateActive && (
          <div className="nf-confetti-burst" aria-hidden="true">
            {confettiPieces.map((piece) => (
              <div
                key={piece.id}
                className="nf-confetti-piece"
                style={{
                  left: piece.left,
                  animationDelay: piece.delay,
                  backgroundColor: piece.color,
                }}
              />
            ))}
          </div>
        )}

        <div style={{ position: 'relative', zIndex: 5, maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', borderRadius: '999px', background: 'rgba(229, 9, 20, 0.16)', border: '1px solid rgba(229, 9, 20, 0.45)', color: '#ff6b6b', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.16em', marginBottom: '1.5rem' }}>
            <Sparkles size={14} />
            <span>THE GRAND FINALE</span>
          </div>

          <p className="nf-finale-quote">
            “Distance may separate us, but memories keep us together.”
          </p>

          <p style={{ fontSize: '0.95rem', color: '#9ca3af', letterSpacing: '0.08em', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 600 }}>
            Distance is temporary. Brotherhood is forever.
          </p>

          <h2 className="nf-finale-headline">
            HAPPY BIRTHDAY, RUTVIK ❤️
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            <button
              type="button"
              className="nf-btn-play"
              onClick={() => onPlayFinaleVideo(finaleVideo)}
            >
              <Play size={18} fill="#141414" />
              <span>WATCH COMBINED TRIBUTE</span>
            </button>

            <button
              type="button"
              className="nf-btn-info"
              onClick={() => setCelebrateActive(!celebrateActive)}
            >
              <PartyPopper size={18} color="#fbbf24" />
              <span>{celebrateActive ? 'CELEBRATING! 🎉' : 'POP BIRTHDAY CONFETTI'}</span>
            </button>

            {onReplayIntro && (
              <button
                type="button"
                className="nf-btn-info"
                onClick={onReplayIntro}
              >
                <RotateCcw size={18} color="#38bdf8" />
                <span>REPLAY OPENING INTRO</span>
              </button>
            )}

            <button
              type="button"
              className="nf-btn-info"
              onClick={onOpenStadium}
            >
              <Shield size={18} color="#10b981" />
              <span>OPEN STADIUM EDITION</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

