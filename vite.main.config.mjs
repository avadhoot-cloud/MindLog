import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: false,
    target: 'node18',
    outDir: '.vite/build',
    lib: {
      entry: 'src/main.js',
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['electron', 'path', 'child_process'],
      output: {
        entryFileNames: '[name].js',
        format: 'cjs'
      }
    }
  }
});