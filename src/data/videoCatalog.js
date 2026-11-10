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

/**
 * COLLECTION 1: THE PEOPLE BEHIND THE LEGEND (8 Individual Friend Episodes)
 */
export const FRIENDS_VIDEOS = [
  {
    id: 'legend-s01e01',
    episodeNumber: 'S01 E01',
    title: 'Gargi: The Plot Twist',
    personName: 'Gargi',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '--:--',
    durationSeconds: 0,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 01',
    posterTheme: 'crimson',
    thumbnail: null,
    expectedThumbnail: '/thumbnails/legend-s01e01-gargi.jpg',
    videoUrl: '/videos/legend-s01e01-gargi.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: true,
    status: 'awaiting-upload',
    placeholderBadge: 'AWAITING UPLOAD',
    description:
      'Season 1, Episode 1 of The People Behind The Legend featuring Gargi.',
  },
  {
    id: 'legend-s01e02',
    episodeNumber: 'S01 E02',
    title: 'Manasi: The Unfiltered Truth',
    personName: 'Manasi',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '--:--',
    durationSeconds: 0,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 02',
    posterTheme: 'violet',
    thumbnail: null,
    expectedThumbnail: '/thumbnails/legend-s01e02-manasi.jpg',
    videoUrl: '/videos/legend-s01e02-manasi.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: true,
    status: 'awaiting-upload',
    placeholderBadge: 'AWAITING UPLOAD',
    description:
      'Season 1, Episode 2 of The People Behind The Legend featuring Manasi.',
  },
  {
    id: 'legend-s01e03',
    episodeNumber: 'S01 E03',
    title: 'Ria: The Unexpected Story',
    personName: 'Ria',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '--:--',
    durationSeconds: 0,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 03',
    posterTheme: 'ocean',
    thumbnail: null,
    expectedThumbnail: '/thumbnails/legend-s01e03-ria.jpg',
    videoUrl: '/videos/legend-s01e03-ria.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: true,
    status: 'awaiting-upload',
    placeholderBadge: 'AWAITING UPLOAD',
    description:
      'Season 1, Episode 3 of The People Behind The Legend featuring Ria.',
  },
  {
    id: 'legend-s01e04',
    episodeNumber: 'S01 E04',
    title: 'Aarish: The Wild Card',
    personName: 'Aarish',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '--:--',
    durationSeconds: 0,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 04',
    posterTheme: 'amber',
    thumbnail: null,
    expectedThumbnail: '/thumbnails/legend-s01e04-aarish.jpg',
    videoUrl: '/videos/legend-s01e04-aarish.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: true,
    status: 'awaiting-upload',
    placeholderBadge: 'AWAITING UPLOAD',
    description:
      'Season 1, Episode 4 of The People Behind The Legend featuring Aarish.',
  },
  {
    id: 'legend-s01e05',
    episodeNumber: 'S01 E05',
    title: 'Durve: The OG Chronicles',
    personName: 'Durve',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '--:--',
    durationSeconds: 0,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 05',
    posterTheme: 'emerald',
    thumbnail: null,
    expectedThumbnail: '/thumbnails/legend-s01e05-durve.jpg',
    videoUrl: '/videos/legend-s01e05-durve.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: true,
    status: 'awaiting-upload',
    placeholderBadge: 'AWAITING UPLOAD',
    description:
      'Season 1, Episode 5 of The People Behind The Legend featuring Durve.',
  },
  {
    id: 'legend-s01e06',
    episodeNumber: 'S01 E06',
    title: 'Omkar: No Filter',
    personName: 'Omkar',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '--:--',
    durationSeconds: 0,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 06',
    posterTheme: 'midnight',
    thumbnail: null,
    expectedThumbnail: '/thumbnails/legend-s01e06-omkar.jpg',
    videoUrl: '/videos/legend-s01e06-omkar.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: true,
    status: 'awaiting-upload',
    placeholderBadge: 'AWAITING UPLOAD',
    description:
      'Season 1, Episode 6 of The People Behind The Legend featuring Omkar.',
  },
  {
    id: 'legend-s01e07',
    episodeNumber: 'S01 E07',
    title: 'Aditya: The Final Warning',
    personName: 'Aditya',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '--:--',
    durationSeconds: 0,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 07',
    posterTheme: 'inferno',
    thumbnail: null,
    expectedThumbnail: '/thumbnails/legend-s01e07-aditya.jpg',
    videoUrl: '/videos/legend-s01e07-aditya.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: true,
    status: 'awaiting-upload',
    placeholderBadge: 'AWAITING UPLOAD',
    description:
      'Season 1, Episode 7 of The People Behind The Legend featuring Aditya.',
  },
  {
    id: 'legend-s01e08',
    episodeNumber: 'S01 E08',
    title: 'Kasar: The Closing Chapter',
    personName: 'Kasar',
    collection: 'The People Behind The Legend',
    section: 'people-behind-the-legend',
    duration: '--:--',
    durationSeconds: 0,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'EPISODE 08',
    posterTheme: 'gold',
    thumbnail: null,
    expectedThumbnail: '/thumbnails/legend-s01e08-kasar.jpg',
    videoUrl: '/videos/legend-s01e08-kasar.mp4',
    sampleVideoUrl: null,
    disableSampleFallback: true,
    isPlaceholder: true,
    status: 'awaiting-upload',
    placeholderBadge: 'AWAITING UPLOAD',
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
    subtitle: 'Eight individual birthday episodes from the inner circle',
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
