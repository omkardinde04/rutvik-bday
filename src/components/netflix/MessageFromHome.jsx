import React from 'react';
import { Play, Info, Heart } from 'lucide-react';
import { PARENTS_VIDEO } from '../../data/videoCatalog';
import VideoCard from './VideoCard';

export default function MessageFromHome({ onPlay, onMoreInfo }) {
  return (
    <section
      className="nf-home-message-section"
      id="section-message-from-home"
      aria-label="A Message From Home"
      style={{ padding: '1.5rem 4% 3rem' }}
    >
      <header className="nf-carousel-header" style={{ padding: 0, marginBottom: '1.1rem' }}>
        <div className="nf-carousel-title-group">
          <h2 className="nf-carousel-title">A MESSAGE FROM HOME</h2>
          <span className="nf-carousel-subtitle">
            {PARENTS_VIDEO.subtitle}
          </span>
        </div>
      </header>

      <div
        style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, #181818 55%, #141414 100%)',
          border: '1px solid rgba(255, 255, 255, 0.09)',
          borderRadius: '10px',
          padding: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '2.25rem',
        }}
      >
        <VideoCard
          video={PARENTS_VIDEO}
          onPlay={onPlay}
          onMoreInfo={onMoreInfo}
        />

        <div style={{ flex: '1 1 320px', maxWidth: '580px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              color: '#fbbf24',
              textTransform: 'uppercase',
              marginBottom: '0.65rem',
            }}
          >
            <Heart size={14} fill="#fbbf24" />
            <span>FAMILY FEATURE • {PARENTS_VIDEO.personName}</span>
          </div>

          <h3
            className="nf-display-font"
            style={{
              fontSize: 'clamp(1.9rem, 3.4vw, 2.75rem)',
              lineHeight: 0.96,
              color: '#ffffff',
              marginBottom: '0.75rem',
            }}
          >
            {PARENTS_VIDEO.title}
          </h3>

          <p
            style={{
              fontSize: '0.96rem',
              lineHeight: 1.6,
              color: '#d4d4d4',
              marginBottom: '1.5rem',
            }}
          >
            {PARENTS_VIDEO.subtitle}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <button
              type="button"
              className="nf-btn-play"
              style={{ padding: '0.65rem 1.45rem', fontSize: '0.94rem' }}
              onClick={() => onPlay(PARENTS_VIDEO)}
            >
              <Play size={17} fill="#141414" />
              <span>PLAY</span>
            </button>

            <button
              type="button"
              className="nf-btn-info"
              style={{ padding: '0.65rem 1.35rem', fontSize: '0.94rem' }}
              onClick={() => onMoreInfo(PARENTS_VIDEO)}
            >
              <Info size={17} />
              <span>MORE INFO</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
