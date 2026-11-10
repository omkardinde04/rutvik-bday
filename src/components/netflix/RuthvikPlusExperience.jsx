import React, { useState, useMemo } from 'react';
import '../../styles/netflix.css';
import {
  ALL_VIDEOS,
  FRIENDS_VIDEOS,
  HERO_FEATURED_CONTENT,
  PARENTS_VIDEO,
  getSavedWatchProgress,
} from '../../data/videoCatalog';
import NetflixNavbar from './NetflixNavbar';
import HeroBanner from './HeroBanner';
import ContentCarousel from './ContentCarousel';
import VideoCard from './VideoCard';
import MessageFromHome from './MessageFromHome';
import CinematicVideoPlayer from './CinematicVideoPlayer';
import MoreInfoModal from './MoreInfoModal';

export default function RuthvikPlusExperience({ onReplayIntro }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [moreInfoItem, setMoreInfoItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('home');
  const [progressTick, setProgressTick] = useState(0);

  const handlePlayVideo = (video) => {
    setMoreInfoItem(null);
    setActiveVideo(video);
  };

  const handleClosePlayer = () => {
    setActiveVideo(null);
    setProgressTick((prev) => prev + 1);
  };

  const handleScrollToSection = (sectionId) => {
    setSearchQuery('');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        const yOffset = -76;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  const friendsWithProgress = useMemo(() => {
    void progressTick;
    return FRIENDS_VIDEOS.map((video) => {
      const saved = getSavedWatchProgress(video.id);
      return saved ? { ...video, ...saved } : video;
    });
  }, [progressTick]);

  const parentsWithProgress = useMemo(() => {
    void progressTick;
    const saved = getSavedWatchProgress(PARENTS_VIDEO.id);
    return saved ? { ...PARENTS_VIDEO, ...saved } : PARENTS_VIDEO;
  }, [progressTick]);

  // Search filtering across the 9 birthday videos (8 friends + 1 parents)
  const searchResults = useMemo(() => {
    void progressTick;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return [...friendsWithProgress, parentsWithProgress].filter(
      (v) =>
        (v.title || '').toLowerCase().includes(q) ||
        (v.senderName || v.personName || '').toLowerCase().includes(q) ||
        (v.category || v.collection || '').toLowerCase().includes(q) ||
        (v.description || '').toLowerCase().includes(q)
    );
  }, [searchQuery, friendsWithProgress, parentsWithProgress, progressTick]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="rutvik-netflix-root">
      {/* 1. Minimal Netflix-Inspired Navbar with RUTVIK+ Branding */}
      <NetflixNavbar
        activeCategory={activeNav}
        onSelectCategory={setActiveNav}
        onReplayIntro={onReplayIntro}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onScrollToSection={handleScrollToSection}
      />

      {isSearching ? (
        <main className="nf-search-results-section">
          <h2 className="nf-carousel-title" style={{ marginBottom: '0.5rem' }}>
            Search results for “{searchQuery}”
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
            Found {searchResults.length} {searchResults.length === 1 ? 'episode' : 'episodes'}
          </p>

          {searchResults.length > 0 ? (
            <div className="nf-search-grid">
              {searchResults.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPlay={handlePlayVideo}
                  onMoreInfo={setMoreInfoItem}
                />
              ))}
            </div>
          ) : (
            <div style={{ padding: '4rem 0', textAlign: 'center', color: '#9ca3af' }}>
              No matching episodes found. Try searching a friend’s name (e.g., “Gargi”, “Manasi”, “Kasar”) or “Parents”.
            </div>
          )}
        </main>
      ) : (
        <main>
          {/* 2. Existing Cinematic Hero Banner */}
          <HeroBanner
            onPlay={() => handlePlayVideo(HERO_FEATURED_CONTENT)}
            onMoreInfo={setMoreInfoItem}
          />

          <div className="nf-main-sections" style={{ marginTop: '-24px' }}>
            {/* 3. Collection 1: THE PEOPLE BEHIND THE LEGEND (8 Individual Episodes) */}
            <ContentCarousel
              id="people-behind-the-legend"
              title="THE PEOPLE BEHIND THE LEGEND"
              subtitle="Eight people. Countless memories."
              videos={friendsWithProgress}
              onPlay={handlePlayVideo}
              onMoreInfo={setMoreInfoItem}
            />

            {/* 4. Collection 2: A MESSAGE FROM HOME (Dedicated Parents' Video) */}
            <MessageFromHome
              video={parentsWithProgress}
              onPlay={handlePlayVideo}
              onMoreInfo={setMoreInfoItem}
            />
          </div>
        </main>
      )}

      {/* 5. Minimal Footer with RUTVIK+ Branding */}
      <footer className="nf-footer">
        <div>
          <strong style={{ color: '#E50914', letterSpacing: '0.06em' }}>RUTVIK+</strong>
          <span> • A Special Collection, Made Just For You.</span>
        </div>
        <div>
          Crafted exclusively for Rutvik • 2026 Birthday Edition
        </div>
      </footer>

      {/* Video Player Modal */}
      {activeVideo && (
        <CinematicVideoPlayer
          video={activeVideo}
          onClose={handleClosePlayer}
        />
      )}

      {/* More Info Details Modal */}
      {moreInfoItem && (
        <MoreInfoModal
          item={moreInfoItem}
          onClose={() => setMoreInfoItem(null)}
          onPlayEpisode={handlePlayVideo}
        />
      )}
    </div>
  );
}
