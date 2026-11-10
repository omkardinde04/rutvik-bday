import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getAvailableCustomThumbnails() {
  try {
    const dir = path.join(__dirname, 'public', 'images', 'thumbnails', 'friends');
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
      .map((name) => name.toLowerCase());
  } catch {
    return [];
  }
}

export default defineConfig({
  plugins: [react()],
  define: {
    __CUSTOM_FRIEND_THUMBNAILS__: JSON.stringify(getAvailableCustomThumbnails()),
  },
  server: {
    port: 5173,
    open: false,
  },
});
