import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  if (mode === 'production' && (!env.VITE_STRIPE_PUBLISHABLE_KEY || env.VITE_STRIPE_PUBLISHABLE_KEY.includes('your_stripe'))) {
    throw new Error('Missing VITE_STRIPE_PUBLISHABLE_KEY for production build.');
  }

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5001',
          changeOrigin: true,
        },
        '/socket.io': {
          target: 'http://127.0.0.1:5001',
          ws: true,
        },
      },
    },
  };
});
