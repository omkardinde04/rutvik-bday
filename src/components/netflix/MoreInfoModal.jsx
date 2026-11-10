import React, { useEffect } from 'react';
import { X, Play, Heart, Share2, Sparkles } from 'lucide-react';
import { ALL_VIDEOS } from '../../data/videoCatalog';

export default function MoreInfoModal({ item, onClose, onPlayEpisode }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!item) return null;

  const sender = item.senderName || item.personName || 'Friends & Family';
  const categoryLabel = item.category || item.collection || 'Rutvik Originals';

  const matchingEpisodes =
    item.section && item.section !== 'rutvik-originals'
      ? ALL_VIDEOS.filter((v) => v.section === item.section)
      : ALL_VIDEOS.filter((v) => v.section === 'rutvik-originals');

  const sectionTitleMap = {
    'people-behind-the-legend': 'The People Behind The Legend',
    'the-boys': 'The Boys Collection',
    'family-collection': 'Family Collection',
    'football-collection': 'The Football Collection',
    memories: 'Memories & Hall of Fame',
    'special-episodes': 'Special Episodes',
  };
  const episodeListHeading = sectionTitleMap[item.section] || 'Rutvik Originals';

  return (
    <div
      className="nf-modal-backdrop"
      data-lenis-prevent
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} Details`}
    >
      <div className="nf-modal-card">
        {/* Top Modal Hero Header */}
        <div className="nf-modal-hero">
          <img
            className="nf-modal-hero-img"
            src={item.heroImage || '/assets/intro/football.png'}
            alt={item.title}
          />
          <div className="nf-modal-hero-gradient" />

          <button
            type="button"
            className="nf-player-close"
            style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}
            onClick={onClose}
            aria-label="Close Modal"
          >
            <X size={20} />
          </button>

          <div className="nf-modal-hero-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
              <span className="nf-n-mark">N</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', color: '#e5e5e5' }}>
                {item.episodeNumber || 'SERIES'}
              </span>
            </div>

            <h2
              className="nf-display-font"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 0.95, marginBottom: '1rem', color: '#ffffff' }}
            >
              {item.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                className="nf-btn-play"
                style={{ padding: '0.55rem 1.4rem', fontSize: '0.95rem' }}
                onClick={() => onPlayEpisode(item)}
              >
                <Play size={18} fill="#141414" />
                <span>Play</span>
              </button>
            </div>
          </div>
        </div>

        {/* Details & Episode Selection Body */}
        <div className="nf-modal-body">
          <div className="nf-modal-grid">
            {/* Left Synopsis Column */}
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem', marginBottom: '0.9rem', fontSize: '0.88rem', fontWeight: 700 }}>
                <span style={{ color: '#46d369' }}>{item.matchScore || '99% Match'}</span>
                <span style={{ color: '#d4d4d4' }}>{item.year || '2026'}</span>
                <span className="nf-rating-box">{item.maturityRating || 'TV-MA'}</span>
                <span style={{ color: '#d4d4d4' }}>{item.duration || 'Special Edition'}</span>
                <span className="nf-hd-box">4K</span>
              </div>

              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#e5e5e5' }}>
                {item.description}
              </p>
            </div>

            {/* Right Metadata Column */}
            <div style={{ fontSize: '0.84rem', lineHeight: 1.7 }}>
              <div>
                <span style={{ color: '#777777' }}>From: </span>
                <span style={{ color: '#e5e5e5' }}>
                  {item.cast ? item.cast.join(', ') : sender}
                </span>
              </div>
              <div style={{ marginTop: '0.35rem' }}>
                <span style={{ color: '#777777' }}>Collection: </span>
                <span style={{ color: '#e5e5e5' }}>
                  {categoryLabel}
                </span>
              </div>
              <div style={{ marginTop: '0.35rem' }}>
                <span style={{ color: '#777777' }}>Mood: </span>
                <span style={{ color: '#e5e5e5' }}>
                  Heartfelt, Nostalgic, Unfiltered, Legend Status
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Episode List */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                Episodes — {episodeListHeading}
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Season 1</span>
            </div>

            <div>
              {matchingEpisodes.map((ep, idx) => (
                <div
                  key={ep.id}
                  className="nf-episode-list-item"
                  onClick={() => onPlayEpisode(ep)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onPlayEpisode(ep);
                  }}
                >
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#d4d4d4', textAlign: 'center' }}>
                    {idx + 1}
                  </div>

                  <div
                    className={`nf-episode-thumb-mini nf-poster-art nf-poster-art--${ep.posterTheme || 'crimson'}`}
                    style={{
                      height: '76px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <Play size={22} fill="#ffffff" color="#ffffff" />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
                        {ep.title}
                        {ep.isPlaceholder && (
                          <span style={{ marginLeft: '0.5rem', fontSize: '0.66rem', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.45)', padding: '0.1rem 0.35rem', borderRadius: '3px', verticalAlign: 'middle' }}>
                            AWAITING UPLOAD
                          </span>
                        )}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{ep.duration}</span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#46d369', fontWeight: 600, marginBottom: '0.2rem' }}>
                      {ep.senderName || ep.personName}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#b3b3b3', lineHeight: 1.4 }}>
                      {ep.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

