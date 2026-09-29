import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  // Относительные пути — удобно для GitHub Pages и любого static-hosting.
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
    },
  },
  server: {
    // В dev ходим на GREEN-API через прокси — проще смотреть Network и нет CORS-сюрпризов.
    proxy: {
      '/green-api': {
        target: 'https://api.green-api.com',
        changeOrigin: true,
        rewrite: (requestPath) => requestPath.replace(/^\/green-api/, '/v3'),
      },
    },
  },
  build: {
    // SVG с цветами вида #3B9702 ломаются в data: URI — отдаём отдельными файлами.
    assetsInlineLimit: 0,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
});
