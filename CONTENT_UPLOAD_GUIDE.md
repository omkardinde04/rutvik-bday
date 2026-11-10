# RUTHVIK+ Content Upload & Integration Guide

This guide explains how to upload birthday MP4 videos and custom thumbnails from friends and family without editing any React UI components or touching Stadium Edition files.

---

## 1. Catalog Classification Overview (32 Existing Entries)

### A. Existing Stadium Sample Clips (`isPlaceholder: false`, `isSamplePreview: true`)
These 5 entries reference pre-existing Stadium Edition MP4s under `public/assets/intro/` and display a `STADIUM SAMPLE` / `SAMPLE STADIUM CLIP` notice so they are never confused with uploaded birthday wishes:

| ID | Title | Section | Video Path | Thumbnail Path |
|---|---|---|---|---|
| `hero-rutvik-universe` | THE RUTVIK UNIVERSE | Hero Banner | `/assets/intro/Intro.mp4` | `/assets/intro/football.png` |
| `football-1` | The Playmaker’s Cut | Football Collection | `/assets/intro/friend-football.mp4` | `/assets/intro/football.png` |
| `football-2` | World Champion Inspiration | Football Collection | `/assets/intro/messi-feature.mp4` | `/assets/intro/football.png` |
| `football-3` | Stadium Curtain Raiser | Football Collection | `/assets/intro/curtain-opening.mp4` | `/assets/intro/football.png` |
| `football-4` | Director’s Turf Anthem | Football Collection | `/assets/intro/Intro.mp4` | `/assets/intro/football.png` |

### B. Birthday Wish Placeholder Slots (`isPlaceholder: true`, `isSamplePreview: false`)
These 27 slots show `COMING SOON` / `AWAITING UPLOAD` / `AWAITING VIDEO` labels until actual MP4 files are uploaded and marked `isPlaceholder: false`:

| ID | Episode Title | Section | Collection | Expected Video Filename (`public/videos/...`) | Suggested Thumbnail (`public/thumbnails/...`) |
|---|---|---|---|---|---|
| `legend-s01e01` | Gargi: The Plot Twist | `people-behind-the-legend` | `The People Behind The Legend` | `/videos/legend-s01e01-gargi.mp4` | `/thumbnails/legend-s01e01-gargi.jpg` |
| `legend-s01e02` | Manasi: The Unfiltered Truth | `people-behind-the-legend` | `The People Behind The Legend` | `/videos/legend-s01e02-manasi.mp4` | `/thumbnails/legend-s01e02-manasi.jpg` |
| `legend-s01e03` | Ria: The Unexpected Story | `people-behind-the-legend` | `The People Behind The Legend` | `/videos/legend-s01e03-ria.mp4` | `/thumbnails/legend-s01e03-ria.jpg` |
| `legend-s01e04` | Aarish: The Wild Card | `people-behind-the-legend` | `The People Behind The Legend` | `/videos/legend-s01e04-aarish.mp4` | `/thumbnails/legend-s01e04-aarish.jpg` |
| `legend-s01e05` | Durve: The OG Chronicles | `people-behind-the-legend` | `The People Behind The Legend` | `/videos/legend-s01e05-durve.mp4` | `/thumbnails/legend-s01e05-durve.jpg` |
| `legend-s01e06` | Omkar: No Filter | `people-behind-the-legend` | `The People Behind The Legend` | `/videos/legend-s01e06-omkar.mp4` | `/thumbnails/legend-s01e06-omkar.jpg` |
| `legend-s01e07` | Aditya: The Final Warning | `people-behind-the-legend` | `The People Behind The Legend` | `/videos/legend-s01e07-aditya.mp4` | `/thumbnails/legend-s01e07-aditya.jpg` |
| `legend-s01e08` | Kasar: The Closing Chapter | `people-behind-the-legend` | `The People Behind The Legend` | `/videos/legend-s01e08-kasar.mp4` | `/thumbnails/legend-s01e08-kasar.jpg` |
| `orig-ep1` | The OG Gang | `rutvik-originals` | `The Boys` | `/videos/ep1-og-gang.mp4` | `/thumbnails/ep1-og-gang.jpg` |
| `orig-ep2` | Messages From Across The World | `rutvik-originals` | `Long Distance Wishes` | `/videos/ep2-worldwide.mp4` | `/thumbnails/ep2-worldwide.jpg` |
| `orig-ep3` | Emotional Damage | `rutvik-originals` | `Special Birthday Messages` | `/videos/ep3-emotional-damage.mp4` | `/thumbnails/ep3-emotional-damage.jpg` |
| `orig-ep4` | The Roast Session | `rutvik-originals` | `College Friends` | `/videos/ep4-roast-session.mp4` | `/thumbnails/ep4-roast-session.jpg` |
| `orig-ep5` | From India With Love | `rutvik-originals` | `Family Collection` | `/videos/ep5-india-love.mp4` | `/thumbnails/ep5-india-love.jpg` |
| `orig-ep6` | The Birthday Special | `rutvik-originals` | `Special Birthday Messages` | `/videos/ep6-birthday-special.mp4` | `/thumbnails/ep6-birthday-special.jpg` |
| `boys-1` | Late Night Pitch Debates | `the-boys` | `The Boys` | `/videos/boys-1.mp4` | `/thumbnails/boys-1.jpg` |
| `boys-2` | The Goa Plan That Survived | `the-boys` | `The Boys` | `/videos/boys-2.mp4` | `/thumbnails/boys-2.jpg` |
| `boys-3` | Midnight Biryani Protocol | `the-boys` | `College Friends` | `/videos/boys-3.mp4` | `/thumbnails/boys-3.jpg` |
| `boys-4` | Wingman Chronicles | `the-boys` | `The Boys` | `/videos/boys-4.mp4` | `/thumbnails/boys-4.jpg` |
| `family-1` | Home Sweet Home | `family-collection` | `Family Collection` | `/videos/family-1.mp4` | `/thumbnails/family-1.jpg` |
| `family-2` | Sibling Rivalry & Love | `family-collection` | `Family Collection` | `/videos/family-2.mp4` | `/thumbnails/family-2.jpg` |
| `family-3` | Family Reunion Wishes | `family-collection` | `Family Collection` | `/videos/family-3.mp4` | `/thumbnails/family-3.jpg` |
| `mem-1` | First Year Flashbacks | `memories` | `College Friends` | `/videos/mem-1.mp4` | `/thumbnails/mem-1.jpg` |
| `mem-2` | Convocation & Milestones | `memories` | `College Friends` | `/videos/mem-2.mp4` | `/thumbnails/mem-2.jpg` |
| `mem-3` | Timezones Can’t Stop Us | `memories` | `Long Distance Wishes` | `/videos/mem-3.mp4` | `/thumbnails/mem-3.jpg` |
| `spec-trailer` | The Official Birthday Trailer | `special-episodes` | `Special Birthday Messages` | `/videos/birthday-trailer.mp4` | `/thumbnails/birthday-trailer.jpg` (currently uses `/assets/intro/football.png`) |
| `spec-1` | Behind The Scenes & Bloopers | `special-episodes` | `Special Birthday Messages` | `/videos/spec-bloopers.mp4` | `/thumbnails/spec-bloopers.jpg` |
| `spec-finale` | Combined Birthday Tribute | `special-episodes` | `Special Birthday Messages` | `/videos/grand-finale-tribute.mp4` | `/thumbnails/grand-finale-tribute.jpg` (currently uses `/assets/intro/football.png`) |

---

## 2. How to Activate an Existing Placeholder Slot

1. Place the friend or family member's `.mp4` file in `public/videos/` matching the path in the table above (e.g., `public/videos/ep1-og-gang.mp4`).
   > **Note on large files:** If an MP4 is too large for GitHub (> 50–100 MB), upload it to external video hosting (Cloudinary, S3, Cloudflare R2/Stream) and paste the HTTPS `.mp4` URL directly into `videoUrl`.
2. *(Optional)* Place a `16:9` thumbnail (`.jpg`, `.png`, or `.webp`) in `public/thumbnails/` and update `thumbnail: '/thumbnails/filename.jpg'` in [`src/data/videoCatalog.js`](src/data/videoCatalog.js). Leaving `thumbnail: null` displays bespoke studio poster art automatically.
3. Open [`src/data/videoCatalog.js`](src/data/videoCatalog.js), locate the matching entry by `id`, and update:
   - `isPlaceholder: false` *(automatically removes `COMING SOON`, `AWAITING VIDEO`, and `AWAITING UPLOAD` badges everywhere)*
   - `personName` (or `senderName`)
   - `duration` & `durationSeconds`
   - `description`

---

## 3. How to Add a Brand-New Friend or Family Video

Append a new entry object inside `ALL_VIDEOS` in [`src/data/videoCatalog.js`](src/data/videoCatalog.js):

```js
{
  id: 'family-4', // MUST BE UNIQUE
  episodeNumber: 'FAM. 04',
  title: 'Birthday Wishes from Aunt & Uncle',
  personName: 'Sender Name',
  collection: 'Family Collection', // Keeps Family separate from Friends
  section: 'family-collection',    // Targets FAMILY COLLECTION carousel
  duration: '02:15',
  durationSeconds: 135,
  matchScore: '100% Match',
  year: '2026',
  maturityRating: 'ALL',
  tag: 'FAMILY WISH',
  posterTheme: 'emerald',
  thumbnail: '/thumbnails/family-4.jpg', // or null
  videoUrl: '/videos/family-4.mp4',
  isPlaceholder: false,
  description: 'Personal birthday message description.',
}
```

### Independent Carousel Routing Rules
- **Friends (`THE BOYS` carousel):** Set `section: 'the-boys'` and `collection: 'The Boys'`.
- **Family (`FAMILY COLLECTION` carousel):** Set `section: 'family-collection'` and `collection: 'Family Collection'`.
- **College / Long Distance (`MEMORIES & HALL OF FAME` carousel):** Set `section: 'memories'` and `collection: 'College Friends'` or `'Long Distance Wishes'`.
- **Combined Finale (`spec-finale`):** Drop the combined MP4 at `public/videos/grand-finale-tribute.mp4` (or update `videoUrl` on `spec-finale`) and set `isPlaceholder: false`. Both the **SPECIAL EPISODES** row and the **WATCH COMBINED TRIBUTE** button in the Grand Finale section will play it immediately.

---

## 4. Verification Before Sharing
Run locally to verify zero console errors or broken links:
```bash
npm run dev
npm run build
```

