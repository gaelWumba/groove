import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/deezer': {
        target: 'https://api.deezer.com', // Deezer API base URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/deezer/, '') // Adjust path if needed
      },
    },
  },
})
