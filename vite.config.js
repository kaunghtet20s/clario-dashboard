import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mockAuthApi } from './mock/auth-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  // `mockAuthApi` serves /api/auth/* in dev & preview. Drop it for a real backend.
  plugins: [react(), mockAuthApi()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
