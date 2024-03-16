import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const domain = new URL(process.env.VITE_URL).hostname;
  const config = {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
          cookieDomainRewrite: domain,
        },
      },
    },
  };
  return defineConfig(config);
};