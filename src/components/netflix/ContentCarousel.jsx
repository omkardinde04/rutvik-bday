import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VideoCard from './VideoCard';

export default function ContentCarousel({
  id,
  title,
  subtitle,
  videos = [],
  onPlay,
  onMoreInfo,
  isContinueWatching = false,
}) {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (!trackRef.current) return;
    const scrollAmount = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!videos || videos.length === 0) return null;

  return (
    <section className="nf-carousel-section" id={`row-${id}`} aria-label={title}>
      <header className="nf-carousel-header">
        <div className="nf-carousel-title-group">
          <h2 className="nf-carousel-title">{title}</h2>
          {subtitle && <span className="nf-carousel-subtitle">{subtitle}</span>}
        </div>
      </header>

      <div className="nf-carousel-wrapper">
        {/* Left Paddle */}
        <button
          type="button"
          className="nf-paddle left"
          onClick={() => scroll('left')}
          aria-label={`Scroll ${title} left`}
        >
          <ChevronLeft size={32} />
        </button>

        {/* Horizontal Track */}
        <div className="nf-carousel-track" ref={trackRef}>
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={onPlay}
              onMoreInfo={onMoreInfo}
              isContinueWatching={isContinueWatching}
            />
          ))}
        </div>

        {/* Right Paddle */}
        <button
          type="button"
          className="nf-paddle right"
          onClick={() => scroll('right')}
          aria-label={`Scroll ${title} right`}
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </section>
  );
}

