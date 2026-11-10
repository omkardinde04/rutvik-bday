import React, { useState } from 'react';
import { Play, Info, Heart, Check, Plus } from 'lucide-react';

export default function VideoCard({ video, onPlay, onMoreInfo, isContinueWatching = false }) {
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const themeClass = `nf-poster-art--${video.posterTheme || 'crimson'}`;
  const sender = video.senderName || video.personName || 'Friends & Family';
  const isAwaitingUpload = Boolean(video.isPlaceholder);
  const isSampleReel = Boolean(video.isSamplePreview);

  const handleCardClick = (e) => {
    // Prevent triggering when clicking mini buttons specifically
    if (e.target.closest('button')) return;
    onPlay(video);
  };

  return (
    <article
      className="nf-video-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`Play ${video.title} - ${sender}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPlay(video);
        }
      }}
    >
      {/* 16:9 Media Aspect Container */}
      <div className="nf-card-media">
        {video.thumbnail && !imageError ? (
          <>
            <img
              className="nf-card-img"
              src={video.thumbnail}
              alt={video.title}
              onError={() => setImageError(true)}
              loading="lazy"
            />
            {(isAwaitingUpload || isSampleReel) && (
              <span
                style={{
                  position: 'absolute',
                  top: '0.55rem',
                  right: '0.55rem',
                  zIndex: 3,
                  background: isAwaitingUpload ? 'rgba(20, 20, 20, 0.85)' : 'rgba(16, 185, 129, 0.88)',
                  border: isAwaitingUpload ? '1px solid rgba(251, 191, 36, 0.55)' : '1px solid rgba(255, 255, 255, 0.3)',
                  color: isAwaitingUpload ? '#fbbf24' : '#ffffff',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  padding: '0.18rem 0.48rem',
                  borderRadius: '3px',
                }}
              >
                {isAwaitingUpload ? 'AWAITING VIDEO' : 'STADIUM SAMPLE'}
              </span>
            )}
          </>
        ) : (
          /* Bespoke Studio Poster Graphic Fallback */
          <div className={`nf-poster-art ${themeClass}`}>
            <div className="nf-poster-pattern" />

            <div className="nf-poster-top-bar">
              <div className="nf-poster-n">
                <span className="nf-poster-n-box">N</span>
                <span>ORIGINAL</span>
              </div>
              <span
                className="nf-poster-tag"
                style={
                  isAwaitingUpload
                    ? { borderColor: 'rgba(251, 191, 36, 0.5)', color: '#fbbf24' }
                    : undefined
                }
              >
                {isAwaitingUpload ? 'COMING SOON' : video.tag || 'SERIES'}
              </span>
            </div>

            <div className="nf-poster-center-title">
              {video.title}
            </div>

            <div className="nf-poster-bottom">
              <span>{sender}</span>
              <span>{video.duration}</span>
            </div>
          </div>
        )}

        {/* Hover Center Play Button Overlay */}
        <div className="nf-card-play-overlay">
          <div className="nf-card-play-circle">
            <Play size={20} fill="#ffffff" />
          </div>
        </div>

        {/* Continue Watching Red Progress Bar */}
        {(isContinueWatching || video.progressPercent > 0) && (
          <div className="nf-progress-track">
            <div
              className="nf-progress-fill"
              style={{ width: `${video.progressPercent || 25}%` }}
            />
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="nf-card-body">
        <div className="nf-card-meta-row">
          <span className="nf-card-ep">{video.episodeNumber}</span>
          <span style={{ color: '#46d369' }}>{video.matchScore}</span>
          <span>{video.duration}</span>
        </div>

        <h3 className="nf-card-title" title={video.title}>
          {video.title}
        </h3>

        <div className="nf-card-person">
          From: {sender}
        </div>

        <p className="nf-card-desc">
          {video.description}
        </p>

        {/* Card Quick Action Bar */}
        <div className="nf-card-actions">
          <div className="nf-card-action-btns">
            <button
              type="button"
              className="nf-mini-btn play-primary"
              onClick={(e) => {
                e.stopPropagation();
                onPlay(video);
              }}
              title="Play Video"
              aria-label="Play Video"
            >
              <Play size={14} fill="currentColor" />
            </button>

            <button
              type="button"
              className="nf-mini-btn"
              onClick={(e) => {
                e.stopPropagation();
                onMoreInfo(video);
              }}
              title="More Info"
              aria-label="More Information"
            >
              <Info size={14} />
            </button>
          </div>

          <button
            type="button"
            className={`nf-mini-btn ${isLiked ? 'liked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            title={isLiked ? 'Loved' : 'Love this moment'}
            aria-label="Love this moment"
          >
            <Heart size={14} fill={isLiked ? '#E50914' : 'none'} color={isLiked ? '#E50914' : '#ffffff'} />
          </button>
        </div>
      </div>
    </article>
  );
}

