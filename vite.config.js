import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend.rajproperty.site/',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'https://backend.rajproperty.site/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: [
            'react-router-dom',
            'framer-motion',
            'lottie-web',
            'axios',
            'firebase/app',
            'firebase/auth',
            'firebase/firestore'
            // Add other big node_modules if needed
          ],
        },
      },
    },
    build: {
      sourcemap: true,
    },
    // Optionally, lower warning for chunk size
    chunkSizeWarningLimit: 800,
  }
})
