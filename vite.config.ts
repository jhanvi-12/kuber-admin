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
});
