import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // load the environment variables based on the mode
  const env = loadEnv(mode, process.cwd(), '');

  if (!env.VITE_API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not defined in the environment variables');
  }
  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
        }
      }
    }
  };
});
