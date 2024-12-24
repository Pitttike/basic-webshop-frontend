import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Add watch options to handle file changes in Docker
    watch: {
      usePolling: true,
    },
  },
})