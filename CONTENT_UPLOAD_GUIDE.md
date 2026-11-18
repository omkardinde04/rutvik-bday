# RUTVIK+ Content Upload & Integration Guide

This guide explains how to upload the nine birthday MP4 videos and custom thumbnails without modifying any UI components or Stadium Edition files.

---

## 1. Catalog Overview (9 Personalized Birthday Slots)

### A. Collection 1 — THE PEOPLE BEHIND THE LEGEND (8 Friends)
All eight slots display `AWAITING UPLOAD` until the actual friend videos are placed in `public/videos/` and marked `isPlaceholder: false` inside [`src/data/videoCatalog.js`](src/data/videoCatalog.js):

| ID | Episode | Title | Sender | Video Path (`public/videos/...`) | Thumbnail Path (`public/thumbnails/...`) |
|---|---|---|---|---|---|
| `legend-s01e01` | `S01 E01` | Gargi: The Plot Twist | `Gargi` | `/videos/legend-s01e01-gargi.mp4` | `/thumbnails/legend-s01e01-gargi.jpg` |
| `legend-s01e02` | `S01 E02` | Manasi: The Unfiltered Truth | `Manasi` | `/videos/legend-s01e02-manasi.mp4` | `/thumbnails/legend-s01e02-manasi.jpg` |
| `legend-s01e03` | `S01 E03` | Ria: The Unexpected Story | `Ria` | `/videos/legend-s01e03-ria.mp4` | `/thumbnails/legend-s01e03-ria.jpg` |
| `legend-s01e04` | `S01 E04` | Aarish: The Wild Card | `Aarish` | `/videos/legend-s01e04-aarish.mp4` | `/thumbnails/legend-s01e04-aarish.jpg` |
| `legend-s01e05` | `S01 E05` | Durve: The OG Chronicles | `Durve` | `/videos/legend-s01e05-durve.mp4` | `/thumbnails/legend-s01e05-durve.jpg` |
| `legend-s01e06` | `S01 E06` | Omkar: No Filter | `Omkar` | `/videos/legend-s01e06-omkar.mp4` | `/thumbnails/legend-s01e06-omkar.jpg` |
| `legend-s01e07` | `S01 E07` | Aditya: The Final Warning | `Aditya` | `/videos/legend-s01e07-aditya.mp4` | `/thumbnails/legend-s01e07-aditya.jpg` |
| `legend-s01e08` | `S01 E08` | Kasar: The Closing Chapter | `Kasar` | `/videos/legend-s01e08-kasar.mp4` | `/thumbnails/legend-s01e08-kasar.jpg` |

### B. Collection 2 — A MESSAGE FROM HOME (Parents)

| ID | Episode | Title | Sender | Video Path (`public/videos/...`) | Thumbnail Path (`public/thumbnails/...`) |
|---|---|---|---|---|---|
| `parents-most-special-message` | `FEATURED` | THE MOST SPECIAL MESSAGE | `Parents` | `/videos/parents-special-message.mp4` | `/thumbnails/parents-special-message.jpg` |

---

## 2. How to Activate a Video Once Received

1. Drop the MP4 file into `public/videos/` matching the path above (or set `videoUrl` to an external CDN URL such as Cloudinary, S3, or Cloudflare R2 if the file is large).
2. *(Optional)* Drop a `16:9` thumbnail into `public/thumbnails/` and set `thumbnail: '/thumbnails/your-file.jpg'` on that entry. Leaving `thumbnail: null` displays bespoke studio poster art automatically.
3. Open [`src/data/videoCatalog.js`](src/data/videoCatalog.js), locate the entry (`FRIENDS_VIDEOS` or `PARENTS_VIDEO`), and update:
   - `isPlaceholder: false`
   - Remove `status: 'awaiting-upload'`
   - Set `duration` and `durationSeconds`

---

## 3. Verification
```bash
npm run dev
npm run build
```
