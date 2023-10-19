import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],

  server: {
    port: 3000,
  },
  css: {
    modules: {
      // generateScopedName: 'tkd_[local]_[hash:base64:2]',
      generateScopedName: 'tkd_[local]',
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
});
