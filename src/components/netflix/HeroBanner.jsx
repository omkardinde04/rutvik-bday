import React from 'react';
import { Play, Info, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { HERO_FEATURED_CONTENT } from '../../data/videoCatalog';

export default function HeroBanner({ onPlay, onMoreInfo }) {
  const content = HERO_FEATURED_CONTENT;

  return (
    <section className="nf-hero" id="hero" aria-label="Featured Hero Presentation">
      {/* Background with Existing AI-generated Football Image */}
      <div className="nf-hero-bg-wrapper">
        <img
          className="nf-hero-bg-image"
          src={content.heroImage}
          alt="Rutvik - Football Legend Birthday Feature"
        />
        <div className="nf-hero-ambient-glow" />
        <div className="nf-hero-gradient-left" />
        <div className="nf-hero-gradient-bottom" />
      </div>

      {/* Hero Foreground Content */}
      <div className="nf-hero-content">
        {/* Netflix Original Signature Stamp */}
        <div className="nf-original-badge">
          <span className="nf-n-mark">N</span>
          <span className="nf-original-label">RUTVIK+ ORIGINAL</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="nf-hero-title">
          {content.title}
        </h1>

        {/* Subtitle / Catchphrase */}
        <div className="nf-hero-tagline">
          {content.subTagline}
        </div>

        {/* Streaming Metadata Badges */}
        <div className="nf-hero-meta">
          <span className="nf-match-pill">{content.matchScore}</span>
          <span>{content.year}</span>
          <span className="nf-rating-box">{content.maturityRating}</span>
          <span>{content.duration}</span>
          <span className="nf-hd-box">{content.quality}</span>
        </div>

        {/* Narrative Description */}
        <p className="nf-hero-description">
          {content.tagline} {content.description}
        </p>

        {/* Hero Interactive CTAs */}
        <div className="nf-hero-actions">
          <button
            type="button"
            className="nf-btn-play"
            onClick={() => onPlay(content)}
            aria-label="Play Featured Video"
          >
            <Play size={20} fill="#141414" />
            <span>PLAY</span>
          </button>

          <button
            type="button"
            className="nf-btn-info"
            onClick={() => onMoreInfo(content)}
            aria-label="More Info about Featured Episode"
          >
            <Info size={20} />
            <span>MORE INFO</span>
          </button>
        </div>
      </div>

      {/* Floating Maturity Tag at right side */}
      <div className="nf-hero-maturity-tag" aria-hidden="true">
        <span>{content.maturityRating}</span>
        <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>SPECIAL EDITION</span>
      </div>
    </section>
  );
}

