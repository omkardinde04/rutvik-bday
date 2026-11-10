import React, { useState, useEffect, useMemo } from 'react';
import '../../styles/netflix.css';
import {
  ALL_VIDEOS,
  EPISODE_COLLECTIONS,
  SECTION_ROWS,
  HERO_FEATURED_CONTENT,
  getContinueWatchingItems,
} from '../../data/videoCatalog';
import NetflixNavbar from './NetflixNavbar';
import HeroBanner from './HeroBanner';
import ContentCarousel from './ContentCarousel';
import VideoCard from './VideoCard';
import CinematicVideoPlayer from './CinematicVideoPlayer';
import MoreInfoModal from './MoreInfoModal';
import FootballCollection from './FootballCollection';
import BirthdayTrailer from './BirthdayTrailer';
import FriendshipWall from './FriendshipWall';
import EndCredits from './EndCredits';
import GrandFinale from './GrandFinale';

export default function RuthvikPlusExperience({ onSwitchToStadium }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [moreInfoItem, setMoreInfoItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [activeNav, setActiveNav] = useState('home');
  const [continueWatching, setContinueWatching] = useState([]);

  const loadContinueWatching = () => {
    const stored = getContinueWatchingItems();
    if (stored.length > 0) {
      setContinueWatching(stored);
    } else {
      // Seed only real existing Stadium Edition footage on first visit (never unuploaded wish placeholders)
      const starters = [
        { ...ALL_VIDEOS.find((v) => v.id === 'football-1'), progressPercent: 35 },
      ].filter((v) => Boolean(v && v.id));
      setContinueWatching(starters);
    }
  };

  useEffect(() => {
    loadContinueWatching();
  }, []);

  const handlePlayVideo = (video) => {
    setMoreInfoItem(null);
    setActiveVideo(video);
  };

  const handleClosePlayer = () => {
    setActiveVideo(null);
    loadContinueWatching();
  };

  const handleScrollToSection = (sectionId) => {
    setSearchQuery('');
    setSelectedCollection('all');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        const yOffset = -76;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  // Search filtering
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return ALL_VIDEOS.filter(
      (v) =>
        (v.title || '').toLowerCase().includes(q) ||
        (v.senderName || v.personName || '').toLowerCase().includes(q) ||
        (v.category || v.collection || '').toLowerCase().includes(q) ||
        (v.description || '').toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Collection pill filtering
  const collectionFilteredVideos = useMemo(() => {
    if (selectedCollection === 'all') return [];
    return ALL_VIDEOS.filter((v) => (v.category || v.collection) === selectedCollection);
  }, [selectedCollection]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="ruthvik-netflix-root">
      {/* Netflix-style Navigation */}
      <NetflixNavbar
        activeCategory={activeNav}
        onSelectCategory={setActiveNav}
        onOpenStadium={onSwitchToStadium}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPlayTrailer={() => handlePlayVideo(HERO_FEATURED_CONTENT)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Search Mode View */}
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
              No matching birthday episodes or friends found. Try searching “OG Gang”, “Family”, or “Football”.
            </div>
          )}
        </main>
      ) : (
        <main>
          {/* Full-Width Cinematic Hero Banner with Existing AI Football Image */}
          <HeroBanner
            onPlay={handlePlayVideo}
            onMoreInfo={setMoreInfoItem}
          />

          {/* Configurable Collection Filter Pills */}
          <div className="nf-collections-filter-bar" aria-label="Filter Collections">
            {EPISODE_COLLECTIONS.map((col) => (
              <button
                key={col.id}
                type="button"
                className={`nf-filter-pill ${selectedCollection === col.id ? 'active' : ''}`}
                onClick={() => setSelectedCollection(col.id)}
              >
                {col.label}
              </button>
            ))}
          </div>

          <div className="nf-main-sections">
            {/* If a specific collection filter pill is active, show filtered view */}
            {selectedCollection !== 'all' ? (
              <section style={{ padding: '1rem 4% 3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <h2 className="nf-carousel-title">{selectedCollection}</h2>
                  <button
                    type="button"
                    className="nf-filter-pill"
                    onClick={() => setSelectedCollection('all')}
                  >
                    Show All Sections
                  </button>
                </div>
                <div className="nf-search-grid">
                  {collectionFilteredVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onPlay={handlePlayVideo}
                      onMoreInfo={setMoreInfoItem}
                    />
                  ))}
                </div>
              </section>
            ) : (
              <>
                {/* Section 1: CONTINUE WATCHING */}
                <ContentCarousel
                  id="continue-watching"
                  title="CONTINUE WATCHING FOR RUTVIK"
                  subtitle="Pick up right where you left off"
                  videos={continueWatching}
                  onPlay={handlePlayVideo}
                  onMoreInfo={setMoreInfoItem}
                  isContinueWatching={true}
                />

                {/* Section 2: RUTVIK ORIGINALS */}
                <ContentCarousel
                  id={SECTION_ROWS[0].id}
                  title={SECTION_ROWS[0].title}
                  subtitle={SECTION_ROWS[0].subtitle}
                  videos={ALL_VIDEOS.filter(SECTION_ROWS[0].filter)}
                  onPlay={handlePlayVideo}
                  onMoreInfo={setMoreInfoItem}
                />

                {/* Section 2B: THE PEOPLE BEHIND THE LEGEND */}
                <ContentCarousel
                  id={SECTION_ROWS[6].id}
                  title={SECTION_ROWS[6].title}
                  subtitle={SECTION_ROWS[6].subtitle}
                  videos={ALL_VIDEOS.filter(SECTION_ROWS[6].filter)}
                  onPlay={handlePlayVideo}
                  onMoreInfo={setMoreInfoItem}
                />

                {/* Section 3: THE BOYS */}
                <ContentCarousel
                  id={SECTION_ROWS[1].id}
                  title={SECTION_ROWS[1].title}
                  subtitle={SECTION_ROWS[1].subtitle}
                  videos={ALL_VIDEOS.filter(SECTION_ROWS[1].filter)}
                  onPlay={handlePlayVideo}
                  onMoreInfo={setMoreInfoItem}
                />

                {/* Section 4: FAMILY COLLECTION */}
                <ContentCarousel
                  id={SECTION_ROWS[2].id}
                  title={SECTION_ROWS[2].title}
                  subtitle={SECTION_ROWS[2].subtitle}
                  videos={ALL_VIDEOS.filter(SECTION_ROWS[2].filter)}
                  onPlay={handlePlayVideo}
                  onMoreInfo={setMoreInfoItem}
                />

                {/* Section 5: THE FOOTBALL COLLECTION + G.O.A.T. SPOTLIGHT */}
                <ContentCarousel
                  id={SECTION_ROWS[3].id}
                  title={SECTION_ROWS[3].title}
                  subtitle={SECTION_ROWS[3].subtitle}
                  videos={ALL_VIDEOS.filter(SECTION_ROWS[3].filter)}
                  onPlay={handlePlayVideo}
                  onMoreInfo={setMoreInfoItem}
                />

                <FootballCollection
                  onPlayEpisode={handlePlayVideo}
                  onOpenStadium={onSwitchToStadium}
                />

                {/* Section 6: MEMORIES & HALL OF FAME */}
                <ContentCarousel
                  id={SECTION_ROWS[4].id}
                  title={SECTION_ROWS[4].title}
                  subtitle={SECTION_ROWS[4].subtitle}
                  videos={ALL_VIDEOS.filter(SECTION_ROWS[4].filter)}
                  onPlay={handlePlayVideo}
                  onMoreInfo={setMoreInfoItem}
                />

                {/* Section 7: SPECIAL EPISODES & BIRTHDAY TRAILER */}
                <ContentCarousel
                  id={SECTION_ROWS[5].id}
                  title={SECTION_ROWS[5].title}
                  subtitle={SECTION_ROWS[5].subtitle}
                  videos={ALL_VIDEOS.filter(SECTION_ROWS[5].filter)}
                  onPlay={handlePlayVideo}
                  onMoreInfo={setMoreInfoItem}
                />

                <BirthdayTrailer onPlayTrailer={handlePlayVideo} />

                {/* Personalization: Friendship & Family Wall */}
                <FriendshipWall />

                {/* Cinematic Rolling End Credits */}
                <EndCredits />

                {/* Grand Finale Celebration */}
                <GrandFinale
                  onPlayFinaleVideo={handlePlayVideo}
                  onOpenStadium={onSwitchToStadium}
                />
              </>
            )}
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="nf-footer">
        <div>
          <strong style={{ color: '#E50914', letterSpacing: '0.06em' }}>RUTHVIK+</strong>
          <span> • A Special Collection, Made Just For You.</span>
        </div>
        <div>
          Crafted with brotherhood & football spirit • 2026 Birthday Edition
        </div>
      </footer>

      {/* Video Player Modal */}
      {activeVideo && (
        <CinematicVideoPlayer
          video={activeVideo}
          onClose={handleClosePlayer}
          onVideoEnded={loadContinueWatching}
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

