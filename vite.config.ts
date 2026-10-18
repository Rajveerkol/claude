import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { handleChatApiRoute } from './server/geminiRouter.ts';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';

  return {
    plugins: [
      react(),
      {
        name: 'gemini-api-proxy',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url ? req.url.split('?')[0] : '';
            if (url === '/api/chat') {
              handleChatApiRoute(req, res, apiKey);
            } else {
              next();
            }
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url ? req.url.split('?')[0] : '';
            if (url === '/api/chat') {
              handleChatApiRoute(req, res, apiKey);
            } else {
              next();
            }
          });
        },
      },
    ],
  };
});
