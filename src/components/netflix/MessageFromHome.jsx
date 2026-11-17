import React from 'react';
import { Play, Info, Heart } from 'lucide-react';
import { FAMILY_VIDEOS } from '../../data/videoCatalog';
import VideoCard from './VideoCard';

export default function MessageFromHome({ onPlay, onMoreInfo, videos = FAMILY_VIDEOS }) {
  const familyEpisodes = Array.isArray(videos) && videos.length > 0 ? videos : FAMILY_VIDEOS;
  const momEpisode = familyEpisodes[0];
  const dadEpisode = familyEpisodes[1] || momEpisode;

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
            A message from the two people who mean the world.
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
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}
        >
          {familyEpisodes.map((ep) => (
            <VideoCard
              key={ep.id}
              video={ep}
              onPlay={onPlay}
              onMoreInfo={onMoreInfo}
            />
          ))}
        </div>

        <div style={{ flex: '1 1 280px', maxWidth: '520px' }}>
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
            <span>FAMILY FEATURE • MOM & DAD</span>
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
            MOM & DAD
          </h3>

          <p
            style={{
              fontSize: '0.96rem',
              lineHeight: 1.6,
              color: '#d4d4d4',
              marginBottom: '1.5rem',
            }}
          >
            A message from the two people who mean the world.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            {momEpisode && (
              <button
                type="button"
                className="nf-btn-play"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.94rem' }}
                onClick={() => onPlay(momEpisode)}
              >
                <Play size={17} fill="#141414" />
                <span>PLAY MOM</span>
              </button>
            )}

            {dadEpisode && dadEpisode.id !== momEpisode?.id && (
              <button
                type="button"
                className="nf-btn-play"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.94rem' }}
                onClick={() => onPlay(dadEpisode)}
              >
                <Play size={17} fill="#141414" />
                <span>PLAY DAD</span>
              </button>
            )}

            {momEpisode && (
              <button
                type="button"
                className="nf-btn-info"
                style={{ padding: '0.65rem 1.35rem', fontSize: '0.94rem' }}
                onClick={() => onMoreInfo(momEpisode)}
              >
                <Info size={17} />
                <span>MORE INFO</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

