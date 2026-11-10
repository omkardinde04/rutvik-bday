/**
 * RUTVIK+ Video Catalog Configuration
 *
 * Strictly contains the two personalized birthday collections (9 videos total):
 * 1. FRIENDS_VIDEOS — "THE PEOPLE BEHIND THE LEGEND" (8 individual episodes: S01 E01 - S01 E08)
 * 2. PARENTS_VIDEO  — "A MESSAGE FROM HOME" (1 dedicated parents' featured episode)
 *
 * To activate an episode once the MP4 file arrives:
 * 1. Place the MP4 inside `public/videos/` matching `videoUrl` (or set an external HTTPS MP4 URL).
 * 2. (Optional) Place a custom thumbnail in `public/thumbnails/` and set `thumbnail: '/thumbnails/...'`.
 * 3. Change `isPlaceholder: false`, remove `status: 'awaiting-upload'`, and update `duration`.
 */

export const HERO_FEATURED_CONTENT = {
  id: 'hero-rutvik-universe',
  title: 'THE RUTVIK UNIVERSE',
  subtitle: 'RUTVIK+ ORIGINAL',
  tagline: 'A collection of memories, laughter, and birthday wishes from the people who matter most.',
  subTagline: 'One legend. Countless memories. One special birthday.',
  matchScore: '100% Match',
  year: '2026',
  maturityRating: 'ALL',
  duration: '9 Birthday Features',
  quality: '4K Ultra HD',
  collection: 'The People Behind The Legend',
  videoUrl: '/assets/intro/Intro.mp4',
  fallbackVideoUrl: '/assets/intro/friend-football.mp4',
  heroImage: '/assets/intro/football.png',
  thumbnail: '/assets/intro/football.png',
  episodeNumber: 'FEATURE',
  posterTheme: 'crimson',
  personName: 'Friends & Family',
  isSamplePreview: true,
  description:
    'A private streaming collection created exclusively for Rutvik — featuring eight episodes from his closest friends and a special message from home.',
  cast: ['Gargi', 'Manasi', 'Ria', 'Aarish', 'Durve', 'Omkar', 'Aditya', 'Kasar', 'Mom & Dad'],
  genres: ['Birthday Tribute', 'Brotherhood', 'Family'],
};

/* global __CUSTOM_FRIEND_THUMBNAILS__ */

const CUSTOM_FRIEND_FILES = new Set(
  typeof __CUSTOM_FRIEND_THUMBNAILS__ !== 'undefined' && Array.isArray(__CUSTOM_FRIEND_THUMBNAILS__)
    ? __CUSTOM_FRIEND_THUMBNAILS__
    : []
);

/**
 * Resolves custom personal thumbnail paths under `/images/thumbnails/friends/`
 * and keeps safe temporary fallbacks until personal photographs are uploaded.
 */
function resolveFriendThumbMeta(slug, fallbackThumbnail = null) {
  const filename = `${slug}.jpg`.toLowerCase();
  const customThumbnail = `/images/thumbnails/friends/${slug}.jpg`;
  const hasCustomThumbnail = CUSTOM_FRIEND_FILES.has(filename);
  return {
    customThumbnail,
    fallbackThumbnail,
    hasCustomThumbnail,
    thumbnailStatus: hasCustomThumbnail ? 'custom' : 'pending',
    thumbnail: hasCustomThumbnail ? customThumbnail : fallbackThumbnail,
    expectedThumbnail: customThumbnail,
  };
}

/**
 * Returns the active thumbnail image URL for any episode across cards, modals, and Continue Watching.
 */
export function getEpisodeThumbnail(episode) {
  if (!episode) return null;
  if (episode.hasCustomThumbnail && episode.customThumbnail) {
    return episode.customThumbnail;
  }
  return episode.thumbnail || episode.fallbackThumbnail || null;
}

/**
 * COLLECTION 1: THE PEOPLE BEHIND THE LEGEND (8 Individual Friend Episodes)
 */
export const FRIENDS_VIDEOS = [
  {
    id: 'legend-s01e01',
    episodeNumber: 'S01 E01',
    title: 'Gargi',
    personName: 'Gargi',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '01:25',
    durationSeconds: 85,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 01',
    posterTheme: 'crimson',
    ...resolveFriendThumbMeta('gargi', '/images/thumbnails/friends/gargi.jpg'),
    videoUrl: '/videos/core-members/gargi.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: false,
    isSamplePreview: false,
    status: 'available',
    placeholderBadge: null,
    description:
      'Season 1, Episode 1 of The People Behind The Legend featuring Gargi.',
  },
  {
    id: 'legend-s01e02',
    episodeNumber: 'S01 E02',
    title: 'Manasi',
    personName: 'Manasi',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '00:53',
    durationSeconds: 53,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 02',
    posterTheme: 'violet',
    ...resolveFriendThumbMeta('manasi', '/thumbnails/core-members/manasi.jpg'),
    videoUrl: '/videos/core-members/manasi.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: false,
    isSamplePreview: false,
    status: 'available',
    placeholderBadge: null,
    description:
      'Season 1, Episode 2 of The People Behind The Legend featuring Manasi.',
  },
  {
    id: 'legend-s01e03',
    episodeNumber: 'S01 E03',
    title: 'Ria',
    personName: 'Ria',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '00:31',
    durationSeconds: 31,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 03',
    posterTheme: 'ocean',
    ...resolveFriendThumbMeta('ria', '/thumbnails/core-members/ria.jpg'),
    videoUrl: '/videos/core-members/ria.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: false,
    isSamplePreview: false,
    status: 'available',
    placeholderBadge: null,
    description:
      'Season 1, Episode 3 of The People Behind The Legend featuring Ria.',
  },
  {
    id: 'legend-s01e04',
    episodeNumber: 'S01 E04',
    title: 'Aarish',
    personName: 'Aarish',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '01:15',
    durationSeconds: 75,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 04',
    posterTheme: 'amber',
    ...resolveFriendThumbMeta('aarish', '/thumbnails/core-members/aarish.jpg'),
    videoUrl: '/videos/core-members/aarish.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: false,
    isSamplePreview: false,
    status: 'available',
    placeholderBadge: null,
    description:
      'Season 1, Episode 4 of The People Behind The Legend featuring Aarish.',
  },
  {
    id: 'legend-s01e05',
    episodeNumber: 'S01 E05',
    title: 'Durve',
    personName: 'Durve',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '00:45',
    durationSeconds: 45,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 05',
    posterTheme: 'emerald',
    ...resolveFriendThumbMeta('durve', '/thumbnails/core-members/durve.jpg'),
    videoUrl: '/videos/core-members/durve.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: false,
    isSamplePreview: false,
    status: 'available',
    placeholderBadge: null,
    description:
      'Season 1, Episode 5 of The People Behind The Legend featuring Durve.',
  },
  {
    id: 'legend-s01e06',
    episodeNumber: 'S01 E06',
    title: 'Omkar',
    personName: 'Omkar',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '00:28',
    durationSeconds: 28,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 06',
    posterTheme: 'midnight',
    ...resolveFriendThumbMeta('omkar', '/thumbnails/core-members/omkar.jpg'),
    videoUrl: '/videos/core-members/omkar.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: false,
    isSamplePreview: false,
    status: 'available',
    placeholderBadge: null,
    description:
      'Season 1, Episode 6 of The People Behind The Legend featuring Omkar.',
  },
  {
    id: 'legend-s01e07',
    episodeNumber: 'S01 E07',
    title: 'Aditya',
    personName: 'Aditya',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '00:49',
    durationSeconds: 49,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 07',
    posterTheme: 'inferno',
    ...resolveFriendThumbMeta('aditya', '/thumbnails/core-members/aditya.jpg'),
    videoUrl: '/videos/core-members/aditya.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: false,
    isSamplePreview: false,
    status: 'available',
    placeholderBadge: null,
    description:
      'Season 1, Episode 7 of The People Behind The Legend featuring Aditya.',
  },
  {
    id: 'legend-s01e08',
    episodeNumber: 'S01 E08',
    title: 'Kasar',
    personName: 'Kasar',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '01:10',
    durationSeconds: 70,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 08',
    posterTheme: 'gold',
    ...resolveFriendThumbMeta('kasar', '/thumbnails/core-members/kasar.jpg'),
    videoUrl: '/videos/core-members/kasar.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: false,
    isSamplePreview: false,
    status: 'available',
    placeholderBadge: null,
    description:
      'Season 1, Episode 8 of The People Behind The Legend featuring Kasar.',
  },
];

/**
 * COLLECTION 2: A MESSAGE FROM HOME (Dedicated Parents' Birthday Episode)
 */
export const PARENTS_VIDEO = {
  id: 'parents-most-special-message',
  episodeNumber: 'FEATURED',
  title: 'THE MOST SPECIAL MESSAGE',
  subtitle: 'A message from the two people who mean the world.',
  personName: 'Parents',
  collection: 'A Message From Home',
  section: 'message-from-home',
  duration: '--:--',
  durationSeconds: 0,
  matchScore: '100% Match',
  year: '2026',
  maturityRating: 'ALL',
  tag: 'FROM HOME',
  posterTheme: 'gold',
  thumbnail: null,
  expectedThumbnail: '/thumbnails/parents-special-message.jpg',
  videoUrl: '/videos/parents-special-message.mp4',
  sampleVideoUrl: null,
  disableSampleFallback: true,
  isPlaceholder: true,
  status: 'awaiting-upload',
  placeholderBadge: 'AWAITING UPLOAD',
  description: 'A message from the two people who mean the world.',
};

export const ALL_VIDEOS = [...FRIENDS_VIDEOS, PARENTS_VIDEO];

export const EPISODE_COLLECTIONS = [
  { id: 'all', label: 'All Collections' },
  { id: 'The People Behind The Legend', label: 'The People Behind The Legend' },
  { id: 'A Message From Home', label: 'A Message From Home' },
];

export const SECTION_ROWS = [
  {
    id: 'people-behind-the-legend',
    title: 'THE PEOPLE BEHIND THE LEGEND',
    subtitle: 'Eight people. Countless memories.',
    filter: (video) => video.section === 'people-behind-the-legend',
  },
  {
    id: 'message-from-home',
    title: 'A MESSAGE FROM HOME',
    subtitle: 'A message from the two people who mean the world.',
    filter: (video) => video.section === 'message-from-home',
  },
];

export const CONTINUE_WATCHING_STORAGE_KEY = 'rutvik_plus_continue_watching_v1';

/**
 * Retrieves saved watch history for a single video by ID.
 */
export function getSavedWatchProgress(videoId) {
  try {
    const raw = window.localStorage.getItem(CONTINUE_WATCHING_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.find((item) => item.id === videoId) || null;
  } catch {
    return null;
  }
}

/**
 * Retrieves saved watch history from localStorage cleanly.
 */
export function getContinueWatchingItems() {
  try {
    const raw = window.localStorage.getItem(CONTINUE_WATCHING_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const catalog = [HERO_FEATURED_CONTENT, ...ALL_VIDEOS];
    return parsed
      .map((entry) => {
        const video = catalog.find((v) => v.id === entry.id);
        if (!video) return null;
        return {
          ...video,
          watchedSeconds: entry.watchedSeconds || 0,
          progressPercent: entry.progressPercent || 0,
          lastWatchedAt: entry.lastWatchedAt || 0,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.lastWatchedAt - a.lastWatchedAt);
  } catch {
    return [];
  }
}

/**
 * Persists watch progress for an episode into localStorage.
 */
export function saveWatchProgress(videoId, currentTime, duration) {
  try {
    const raw = window.localStorage.getItem(CONTINUE_WATCHING_STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(existing) ? existing : [];

    const safeDuration = duration && Number.isFinite(duration) && duration > 0 ? duration : 60;
    const progressPercent = Math.min(100, Math.max(4, Math.round((currentTime / safeDuration) * 100)));

    const filtered = list.filter((item) => item.id !== videoId);
    const updated = [
      {
        id: videoId,
        watchedSeconds: Math.floor(currentTime),
        progressPercent,
        lastWatchedAt: Date.now(),
      },
      ...filtered,
    ].slice(0, 10);

    window.localStorage.setItem(CONTINUE_WATCHING_STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
}
