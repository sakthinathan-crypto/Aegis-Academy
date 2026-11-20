import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'path';
import {defineConfig} from 'vite';

function detectMascotAsset(): string | null {
  const candidates = [
    '/images/aegis-bot.webp',
    '/images/aegis-bot.png',
    '/images/aegis-bot.jpeg',
    '/images/aegis-bot.jpg',
    '/aegis-bot.webp',
    '/aegis-bot.png',
  ];

  for (const webPath of candidates) {
    const absPath = path.resolve(process.cwd(), 'public', webPath.slice(1));
    try {
      const stat = fs.statSync(absPath);
      if (stat.isFile() && stat.size > 0) {
        return webPath;
      }
    } catch {
      // File not present yet
    }
  }
  return null;
}

export default defineConfig(() => {
  const mascotAsset = detectMascotAsset();

  return {
    plugins: [react(), tailwindcss()],
    define: {
      __AEGIS_BOT_ASSET__: JSON.stringify(mascotAsset),
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
