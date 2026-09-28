import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// `--mode preview` builds a self-contained copy for a shareable preview link:
// relative asset paths and in-memory routing (no server rewrites needed).
export default defineConfig(({ mode }) => ({
  base: mode === 'preview' ? './' : '/',
  build: mode === 'preview' ? { outDir: 'preview-dist' } : undefined,
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
}));
