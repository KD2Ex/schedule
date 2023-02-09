import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  build: {
    // Relative to the root
    outDir: '../dist',
  },
});