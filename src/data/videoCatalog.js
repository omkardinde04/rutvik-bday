/**
 * RUTHVIK+ Video Catalog & Collections Configuration
 *
 * HOW TO ADD A NEW BIRTHDAY VIDEO (No UI code changes required):
 * 1. Place the MP4 file in `public/videos/` (e.g., `public/videos/rohan-wish.mp4`).
 * 2. (Optional) Place a custom thumbnail in `public/thumbnails/` (e.g., `public/thumbnails/rohan-thumb.jpg`).
 * 3. Add a new object to `ALL_VIDEOS` below using a unique `id`:
 *    {
 *      id: 'unique-episode-id',
 *      episodeNumber: 'EP. 05',
 *      title: 'Birthday Wish Title',
 *      personName: 'Sender Name',          // (or `senderName`)
 *      collection: 'The Boys',             // 'The Boys' | 'Family Collection' | 'College Friends' | 'Long Distance Wishes' | 'Special Birthday Messages'
 *      section: 'the-boys',                // 'rutvik-originals' | 'the-boys' | 'family-collection' | 'football-collection' | 'memories' | 'special-episodes'
 *      duration: '02:30',
 *      durationSeconds: 150,
 *      matchScore: '100% Match',
 *      year: '2026',
 *      maturityRating: 'ALL',
 *      tag: 'BIRTHDAY WISH',
 *      posterTheme: 'crimson',             // Fallback poster style if thumbnail is null
 *      thumbnail: '/thumbnails/rohan-thumb.jpg', // Or `null` for studio poster graphic
 *      videoUrl: '/videos/rohan-wish.mp4',
 *      isPlaceholder: false,               // Set to `false` once the actual MP4 is uploaded
 *      description: 'Short description of the message or memory.',
 *    }
 *
 * External CDN/hosting URLs (Cloudinary, S3, Cloudflare Stream) are also supported for `videoUrl` & `thumbnail`.
 */

export const HERO_FEATURED_CONTENT = {
  id: 'hero-rutvik-universe',
  title: 'THE RUTVIK UNIVERSE',
  subtitle: 'RUTVIK ORIGINALS',
  tagline: 'A collection of memories, laughter, and birthday wishes from the people who matter most.',
  subTagline: 'One legend. Countless memories. One special birthday.',
  matchScore: '99% Match',
  year: '2026',
  maturityRating: 'TV-MA',
  duration: 'Season 1 • 6 Episodes',
  quality: '4K Ultra HD',
  collection: 'Rutvik Originals',
  videoUrl: '/assets/intro/Intro.mp4',
  fallbackVideoUrl: '/assets/intro/friend-football.mp4',
  heroImage: '/assets/intro/football.png',
  thumbnail: '/assets/intro/football.png',
  episodeNumber: 'FEATURE',
  posterTheme: 'crimson',
  personName: 'All Friends & Family',
  isSamplePreview: true, // Stadium intro highlight preview (not a combined friend wish video)
  description:
    'From late-night football debates and unforgettable road trips to messages across time zones — experience the ultimate birthday anthology celebrating Rutvik. Every episode brings together the people who made the journey unforgettable.',
  cast: ['The OG Gang', 'Family', 'College Crew', 'Football Squad'],
  genres: ['Birthday Anthology', 'Brotherhood', 'Sports Drama', 'Comedy'],
};

export const EPISODE_COLLECTIONS = [
  { id: 'all', label: 'All Collections' },
  { id: 'The Boys', label: 'The Boys' },
  { id: 'Family Collection', label: 'Family Collection' },
  { id: 'College Friends', label: 'College Friends' },
  { id: 'Long Distance Wishes', label: 'Long Distance Wishes' },
  { id: 'Special Birthday Messages', label: 'Special Birthday Messages' },
];

export const ALL_VIDEOS = [
  // --- RUTVIK ORIGINALS (Core 6 Birthday Episodes) ---
  {
    id: 'orig-ep1',
    episodeNumber: 'EP. 01',
    title: 'The OG Gang',
    personName: 'The Core Squad',
    collection: 'The Boys',
    section: 'rutvik-originals',
    duration: '05:42',
    durationSeconds: 342,
    matchScore: '99% Match',
    year: '2026',
    maturityRating: '18+',
    tag: 'TOP 10',
    accentColor: '#E50914',
    posterTheme: 'crimson',
    thumbnail: null,
    videoUrl: '/videos/ep1-og-gang.mp4',
    sampleVideoUrl: '/assets/intro/friend-football.mp4',
    isPlaceholder: true,
    description:
      'Unfiltered birthday chaos, legendary inside jokes, and raw appreciation from the day-one brothers who started it all.',
  },
  {
    id: 'orig-ep2',
    episodeNumber: 'EP. 02',
    title: 'Messages From Across The World',
    personName: 'Global Friends & Crew',
    collection: 'Long Distance Wishes',
    section: 'rutvik-originals',
    duration: '07:18',
    durationSeconds: 438,
    matchScore: '98% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'NEW EPISODE',
    accentColor: '#38bdf8',
    posterTheme: 'midnight',
    thumbnail: null,
    videoUrl: '/videos/ep2-worldwide.mp4',
    sampleVideoUrl: '/assets/intro/curtain-opening.mp4',
    isPlaceholder: true,
    description:
      'Different time zones, same brotherhood. Heartfelt video drops recorded across cities and continents for your special day.',
  },
  {
    id: 'orig-ep3',
    episodeNumber: 'EP. 03',
    title: 'Emotional Damage',
    personName: 'Close Circle',
    collection: 'Special Birthday Messages',
    section: 'rutvik-originals',
    duration: '04:55',
    durationSeconds: 295,
    matchScore: '97% Match',
    year: '2026',
    maturityRating: '16+',
    tag: 'HEARTFELT',
    accentColor: '#f59e0b',
    posterTheme: 'amber',
    thumbnail: null,
    videoUrl: '/videos/ep3-emotional-damage.mp4',
    sampleVideoUrl: '/assets/intro/messi-feature.mp4',
    isPlaceholder: true,
    description:
      'Put the tissues nearby. No jokes for five minutes — just honest stories about how much you mean to the crew.',
  },
  {
    id: 'orig-ep4',
    episodeNumber: 'EP. 04',
    title: 'The Roast Session',
    personName: 'Hostel & College Crew',
    collection: 'College Friends',
    section: 'rutvik-originals',
    duration: '06:30',
    durationSeconds: 390,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'TV-MA',
    tag: 'COMEDY',
    accentColor: '#ef4444',
    posterTheme: 'inferno',
    thumbnail: null,
    videoUrl: '/videos/ep4-roast-session.mp4',
    sampleVideoUrl: '/assets/intro/Intro.mp4',
    isPlaceholder: true,
    description:
      'Zero mercy, maximum love. A rapid-fire compilation of embarrassing stories, questionable decisions, and legendary comebacks.',
  },
  {
    id: 'orig-ep5',
    episodeNumber: 'EP. 05',
    title: 'From India With Love',
    personName: 'Family & Home Team',
    collection: 'Family Collection',
    section: 'rutvik-originals',
    duration: '08:10',
    durationSeconds: 490,
    matchScore: '99% Match',
    year: '2026',
    maturityRating: 'PG',
    tag: 'FAMILY PICK',
    accentColor: '#10b981',
    posterTheme: 'emerald',
    thumbnail: null,
    videoUrl: '/videos/ep5-india-love.mp4',
    sampleVideoUrl: '/assets/intro/curtain-opening.mp4',
    isPlaceholder: true,
    description:
      'Warm wishes, blessings, and nostalgic childhood stories straight from home to remind you where your story began.',
  },
  {
    id: 'orig-ep6',
    episodeNumber: 'EP. 06',
    title: 'The Birthday Special',
    personName: 'Everyone Together',
    collection: 'Special Birthday Messages',
    section: 'rutvik-originals',
    duration: '09:45',
    durationSeconds: 585,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'FINALE',
    accentColor: '#E50914',
    posterTheme: 'gold',
    thumbnail: null,
    videoUrl: '/videos/ep6-birthday-special.mp4',
    sampleVideoUrl: '/assets/intro/Intro.mp4',
    isPlaceholder: true,
    description:
      'The grand birthday centerpiece combining a synchronized toast, final messages, and an unforgettable group send-off.',
  },

  // --- THE BOYS ---
  {
    id: 'boys-1',
    episodeNumber: 'EP. 01',
    title: 'Late Night Pitch Debates',
    personName: 'Football & Chai Gang',
    collection: 'The Boys',
    section: 'the-boys',
    duration: '03:20',
    durationSeconds: 200,
    matchScore: '96% Match',
    year: '2026',
    maturityRating: '16+',
    tag: 'UNFILTERED',
    posterTheme: 'slate',
    thumbnail: null,
    videoUrl: '/videos/boys-1.mp4',
    sampleVideoUrl: '/assets/intro/friend-football.mp4',
    isPlaceholder: true,
    description:
      'Three hours of arguing over tactical formations instead of sleeping.',
  },
  {
    id: 'boys-2',
    episodeNumber: 'EP. 02',
    title: 'The Goa Plan That Survived',
    personName: 'Roadtrip Crew',
    collection: 'The Boys',
    section: 'the-boys',
    duration: '04:10',
    durationSeconds: 250,
    matchScore: '98% Match',
    year: '2026',
    maturityRating: '18+',
    tag: 'LEGENDARY',
    posterTheme: 'ocean',
    thumbnail: null,
    videoUrl: '/videos/boys-2.mp4',
    sampleVideoUrl: '/assets/intro/Intro.mp4',
    isPlaceholder: true,
    description:
      'Against all group-chat odds, this crew actually made memories happen.',
  },
  {
    id: 'boys-3',
    episodeNumber: 'EP. 03',
    title: 'Midnight Biryani Protocol',
    personName: 'Hostel Block B',
    collection: 'College Friends',
    section: 'the-boys',
    duration: '02:50',
    durationSeconds: 170,
    matchScore: '95% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'CLASSIC',
    posterTheme: 'amber',
    thumbnail: null,
    videoUrl: '/videos/boys-3.mp4',
    sampleVideoUrl: '/assets/intro/curtain-opening.mp4',
    isPlaceholder: true,
    description:
      'No deadline or morning lecture could stop the 1 AM food mission.',
  },
  {
    id: 'boys-4',
    episodeNumber: 'EP. 04',
    title: 'Wingman Chronicles',
    personName: 'Day-One Bros',
    collection: 'The Boys',
    section: 'the-boys',
    duration: '03:45',
    durationSeconds: 225,
    matchScore: '97% Match',
    year: '2026',
    maturityRating: '16+',
    tag: 'MUST WATCH',
    posterTheme: 'crimson',
    thumbnail: null,
    videoUrl: '/videos/boys-4.mp4',
    sampleVideoUrl: '/assets/intro/messi-feature.mp4',
    isPlaceholder: true,
    description:
      'Highlight reel of unmatched loyalty, questionable advice, and pure laughs.',
  },

  // --- FAMILY COLLECTION ---
  {
    id: 'family-1',
    episodeNumber: 'FAM. 01',
    title: 'Home Sweet Home',
    personName: 'Parents',
    collection: 'Family Collection',
    section: 'family-collection',
    duration: '05:15',
    durationSeconds: 315,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'HEARTFELT',
    posterTheme: 'emerald',
    thumbnail: null,
    videoUrl: '/videos/family-1.mp4',
    sampleVideoUrl: '/assets/intro/curtain-opening.mp4',
    isPlaceholder: true,
    description:
      'Blessings, pride, and timeless love from the ones who cheered first.',
  },
  {
    id: 'family-2',
    episodeNumber: 'FAM. 02',
    title: 'Sibling Rivalry & Love',
    personName: 'Siblings & Cousins',
    collection: 'Family Collection',
    section: 'family-collection',
    duration: '04:05',
    durationSeconds: 245,
    matchScore: '99% Match',
    year: '2026',
    maturityRating: 'PG',
    tag: 'FUNNY',
    posterTheme: 'violet',
    thumbnail: null,
    videoUrl: '/videos/family-2.mp4',
    sampleVideoUrl: '/assets/intro/Intro.mp4',
    isPlaceholder: true,
    description:
      'Expect 50% embarrassing childhood photos and 50% genuine appreciation.',
  },
  {
    id: 'family-3',
    episodeNumber: 'FAM. 03',
    title: 'Family Reunion Wishes',
    personName: 'Extended Family',
    collection: 'Family Collection',
    section: 'family-collection',
    duration: '06:00',
    durationSeconds: 360,
    matchScore: '98% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'SPECIAL',
    posterTheme: 'gold',
    thumbnail: null,
    videoUrl: '/videos/family-3.mp4',
    sampleVideoUrl: '/assets/intro/curtain-opening.mp4',
    isPlaceholder: true,
    description:
      'Warm birthday greetings gathered from every branch of the family tree.',
  },

  // --- THE FOOTBALL COLLECTION (Existing Valid MP4 Clips from Stadium Edition) ---
  {
    id: 'football-1',
    episodeNumber: 'MATCH 01',
    title: 'The Playmaker’s Cut',
    personName: 'Rutvik FC Pitch Reel',
    collection: 'The Boys',
    section: 'football-collection',
    duration: '00:10',
    durationSeconds: 10,
    matchScore: '99% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'STADIUM REEL',
    posterTheme: 'pitch',
    thumbnail: '/assets/intro/football.png',
    videoUrl: '/assets/intro/friend-football.mp4',
    sampleVideoUrl: '/assets/intro/friend-football.mp4',
    isPlaceholder: false,
    isSamplePreview: true,
    description:
      'Existing matchday footage from Stadium Edition. Watch Rutvik commanding midfield space under the stadium floodlights.',
  },
  {
    id: 'football-2',
    episodeNumber: 'MATCH 02',
    title: 'World Champion Inspiration',
    personName: 'Football Tribute',
    collection: 'Special Birthday Messages',
    section: 'football-collection',
    duration: '00:10',
    durationSeconds: 10,
    matchScore: '99% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'STADIUM REEL',
    posterTheme: 'ocean',
    thumbnail: '/assets/intro/football.png',
    videoUrl: '/assets/intro/messi-feature.mp4',
    sampleVideoUrl: '/assets/intro/messi-feature.mp4',
    isPlaceholder: false,
    isSamplePreview: true,
    description:
      'Existing tribute clip from Stadium Edition celebrating relentless resilience and champion mentality.',
  },
  {
    id: 'football-3',
    episodeNumber: 'MATCH 03',
    title: 'Stadium Curtain Raiser',
    personName: 'Matchday Intro',
    collection: 'Special Birthday Messages',
    section: 'football-collection',
    duration: '00:10',
    durationSeconds: 10,
    matchScore: '97% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'STADIUM REEL',
    posterTheme: 'crimson',
    thumbnail: '/assets/intro/football.png',
    videoUrl: '/assets/intro/curtain-opening.mp4',
    sampleVideoUrl: '/assets/intro/curtain-opening.mp4',
    isPlaceholder: false,
    isSamplePreview: true,
    description:
      'Existing theatrical stadium curtain-opening clip setting the stage for Captain Rutvik’s birthday showcase.',
  },
  {
    id: 'football-4',
    episodeNumber: 'MATCH 04',
    title: 'Director’s Turf Anthem',
    personName: 'Full Intro Montage',
    collection: 'The Boys',
    section: 'football-collection',
    duration: '00:10',
    durationSeconds: 10,
    matchScore: '98% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'STADIUM REEL',
    posterTheme: 'emerald',
    thumbnail: '/assets/intro/football.png',
    videoUrl: '/assets/intro/Intro.mp4',
    sampleVideoUrl: '/assets/intro/Intro.mp4',
    isPlaceholder: false,
    isSamplePreview: true,
    description:
      'Existing stadium intro montage blending floodlight energy, matchday atmosphere, and squad spirit.',
  },

  // --- MEMORIES & HALL OF FAME ---
  {
    id: 'mem-1',
    episodeNumber: 'MEM. 01',
    title: 'First Year Flashbacks',
    personName: 'College Friends',
    collection: 'College Friends',
    section: 'memories',
    duration: '04:30',
    durationSeconds: 270,
    matchScore: '96% Match',
    year: '2026',
    maturityRating: 'PG',
    tag: 'THROWBACK',
    posterTheme: 'midnight',
    thumbnail: null,
    videoUrl: '/videos/mem-1.mp4',
    sampleVideoUrl: '/assets/intro/Intro.mp4',
    isPlaceholder: true,
    description:
      'Where awkward introductions turned into lifelong friendship.',
  },
  {
    id: 'mem-2',
    episodeNumber: 'MEM. 02',
    title: 'Convocation & Milestones',
    personName: 'Campus Batchmates',
    collection: 'College Friends',
    section: 'memories',
    duration: '03:55',
    durationSeconds: 235,
    matchScore: '98% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'HALL OF FAME',
    posterTheme: 'gold',
    thumbnail: null,
    videoUrl: '/videos/mem-2.mp4',
    sampleVideoUrl: '/assets/intro/curtain-opening.mp4',
    isPlaceholder: true,
    description:
      'Celebrating the wins, late-night submissions, and unforgettable milestones.',
  },
  {
    id: 'mem-3',
    episodeNumber: 'MEM. 03',
    title: 'Timezones Can’t Stop Us',
    personName: 'International Crew',
    collection: 'Long Distance Wishes',
    section: 'memories',
    duration: '05:10',
    durationSeconds: 310,
    matchScore: '99% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'GLOBAL',
    posterTheme: 'ocean',
    thumbnail: null,
    videoUrl: '/videos/mem-3.mp4',
    sampleVideoUrl: '/assets/intro/messi-feature.mp4',
    isPlaceholder: true,
    description:
      'Long-distance video calls and candid throwback highlights across borders.',
  },

  // --- SPECIAL EPISODES & BIRTHDAY TRAILER ---
  {
    id: 'spec-trailer',
    episodeNumber: 'TRAILER',
    title: 'The Official Birthday Trailer',
    personName: 'Production Crew',
    collection: 'Special Birthday Messages',
    section: 'special-episodes',
    duration: '01:40',
    durationSeconds: 100,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'TEASER',
    posterTheme: 'crimson',
    thumbnail: '/assets/intro/football.png',
    videoUrl: '/videos/birthday-trailer.mp4',
    sampleVideoUrl: '/assets/intro/Intro.mp4',
    isPlaceholder: true,
    description:
      'The official teaser welcoming Rutvik to his dedicated birthday streaming universe.',
  },
  {
    id: 'spec-1',
    episodeNumber: 'BONUS 01',
    title: 'Behind The Scenes & Bloopers',
    personName: 'Everyone',
    collection: 'Special Birthday Messages',
    section: 'special-episodes',
    duration: '04:20',
    durationSeconds: 260,
    matchScore: '98% Match',
    year: '2026',
    maturityRating: 'TV-MA',
    tag: 'OUTTAKES',
    posterTheme: 'inferno',
    thumbnail: null,
    videoUrl: '/videos/spec-bloopers.mp4',
    sampleVideoUrl: '/assets/intro/friend-football.mp4',
    isPlaceholder: true,
    description:
      'All the forgotten lines, accidental camera drops, and hilarious takes we kept.',
  },
  {
    id: 'spec-finale',
    episodeNumber: 'FINALE',
    title: 'Combined Birthday Tribute',
    personName: 'Friends & Family United',
    collection: 'Special Birthday Messages',
    section: 'special-episodes',
    duration: '12:00',
    durationSeconds: 720,
    matchScore: '100% Match',
    year: '2026',
    maturityRating: 'ALL',
    tag: 'GRAND FINALE',
    posterTheme: 'gold',
    thumbnail: '/assets/intro/football.png',
    videoUrl: '/videos/grand-finale-tribute.mp4',
    sampleVideoUrl: '/assets/intro/curtain-opening.mp4',
    isPlaceholder: true,
    description:
      'The combined full-length birthday finale featuring every friend and family member together on one screen.',
  },
];

export const SECTION_ROWS = [
  {
    id: 'rutvik-originals',
    title: 'RUTVIK ORIGINALS',
    subtitle: 'Signature birthday episodes crafted by the people closest to you',
    filter: (video) => video.section === 'rutvik-originals',
  },
  {
    id: 'the-boys',
    title: 'THE BOYS',
    subtitle: 'Day-one brotherhood, late-night chaos, and unfiltered wishes',
    filter: (video) =>
      (video.section === 'the-boys' ||
        (video.collection || video.category) === 'The Boys') &&
      video.section !== 'family-collection' &&
      (video.collection || video.category) !== 'Family Collection',
  },
  {
    id: 'family-collection',
    title: 'FAMILY COLLECTION',
    subtitle: 'Heartfelt messages and blessings straight from home',
    filter: (video) =>
      (video.section === 'family-collection' ||
        (video.collection || video.category) === 'Family Collection') &&
      video.section !== 'the-boys' &&
      (video.collection || video.category) !== 'The Boys',
  },
  {
    id: 'football-collection',
    title: 'THE FOOTBALL COLLECTION',
    subtitle: 'Matchday legacy, pitch vision, and champion highlights',
    filter: (video) => video.section === 'football-collection',
  },
  {
    id: 'memories',
    title: 'MEMORIES & HALL OF FAME',
    subtitle: 'College classics, unforgettable trips, and timeless milestones',
    filter: (video) =>
      video.section === 'memories' ||
      (video.collection || video.category) === 'College Friends' ||
      (video.collection || video.category) === 'Long Distance Wishes',
  },
  {
    id: 'special-episodes',
    title: 'SPECIAL EPISODES',
    subtitle: 'Trailers, bonus outtakes, and the grand birthday tribute',
    filter: (video) =>
      video.section === 'special-episodes' ||
      ((video.collection || video.category) === 'Special Birthday Messages' &&
        video.section !== 'rutvik-originals' &&
        video.section !== 'football-collection'),
  },
];

export const CONTINUE_WATCHING_STORAGE_KEY = 'ruthvik_plus_continue_watching_v1';

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
