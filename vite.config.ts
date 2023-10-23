import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import terser from '@rollup/plugin-terser';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    terser({
      keep_fnames: true,
    }),
  ],
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
    // minify: false,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
});
