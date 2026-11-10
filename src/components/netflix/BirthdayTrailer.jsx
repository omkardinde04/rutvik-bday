import React from 'react';
import { Play, Film, Sparkles } from 'lucide-react';
import { ALL_VIDEOS } from '../../data/videoCatalog';

export default function BirthdayTrailer({ onPlayTrailer }) {
  const trailerVideo = ALL_VIDEOS.find((v) => v.id === 'spec-trailer') || ALL_VIDEOS[0];

  return (
    <section style={{ padding: '2rem 4%' }} id="birthday-trailer" aria-label="The Official Birthday Trailer">
      <div
        style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'linear-gradient(90deg, #181818 0%, #101010 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          alignItems: 'center',
        }}
      >
        {/* Left Info Side */}
        <div style={{ padding: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.18em', color: '#E50914', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            <Film size={15} />
            <span>OFFICIAL TEASER TRAILER</span>
          </div>

          <h2 className="nf-display-font" style={{ fontSize: 'clamp(2rem, 3.6vw, 2.9rem)', color: '#ffffff', lineHeight: 0.96, marginBottom: '0.85rem' }}>
            WELCOME TO THE RUTVIK UNIVERSE
          </h2>

          <p style={{ fontSize: '0.92rem', color: '#b3b3b3', lineHeight: 1.55, marginBottom: '1.5rem' }}>
            {trailerVideo.description}
          </p>

          <button
            type="button"
            className="nf-btn-play"
            style={{ fontSize: '0.95rem', padding: '0.7rem 1.5rem' }}
            onClick={() => onPlayTrailer(trailerVideo)}
          >
            <Play size={17} fill="#141414" />
            <span>WATCH TEASER TRAILER</span>
          </button>
        </div>

        {/* Right Preview Poster Side */}
        <div
          style={{
            position: 'relative',
            minHeight: '260px',
            height: '100%',
            background: '#050505',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
          onClick={() => onPlayTrailer(trailerVideo)}
          role="button"
          tabIndex={0}
          aria-label="Play Birthday Trailer"
        >
          <img
            src="/assets/intro/football.png"
            alt="Birthday Trailer Preview"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '320px',
              objectFit: 'cover',
              opacity: 0.45,
              filter: 'contrast(1.1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(229, 9, 20, 0.18) 0%, rgba(0, 0, 0, 0.7) 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.65rem',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#E50914',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 30px rgba(229, 9, 20, 0.6)',
              }}
            >
              <Play size={26} fill="#ffffff" color="#ffffff" style={{ marginLeft: '3px' }} />
            </div>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.14em', color: '#ffffff' }}>
              PLAY TRAILER ({trailerVideo.duration})
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

