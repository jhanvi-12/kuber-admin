import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const DOCS_BUCKET_ORIGIN = 'https://kuber-prod-docs.s3.ap-south-1.amazonaws.com';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      // The docs bucket has no CORS rules, so driver documents are streamed
      // through a same-origin path to allow client-side blob downloads.
      '/driver-docs': {
        target: DOCS_BUCKET_ORIGIN,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/driver-docs/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('leaflet') || id.includes('react-leaflet')) {
              return 'vendor-leaflet';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor-others';
          }
        },
      },
    },
  },
});
