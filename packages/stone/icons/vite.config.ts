import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const external = [
  /^@radix-ui/,
  /^react$/,
  /^react\//,
  /^react-dom$/,
  /^react-dom\//,
  /^@ink\/stone/,
  /^lit$/,
];

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
    }),
  ],
  build: {
    target: 'es2022',
    outDir: 'dist',
    minify: false,
    sourcemap: true,
    lib: {
      entry: {
        rc: resolve(__dirname, 'icons/auto/24/rc.ts'),
        lit: resolve(__dirname, 'icons/auto/24/lit.ts'),
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external,
    },
  },
});
