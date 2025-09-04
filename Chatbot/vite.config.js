import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure root is current directory
  build: {
    outDir: 'dist', // Vercel expects this as default output
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html') // Ensure entry point is correct
    }
  },
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Optional: cleaner imports
    }
  }
})
