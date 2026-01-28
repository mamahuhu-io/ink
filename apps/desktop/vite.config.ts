import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vite';

const r = (path: string) => resolve(__dirname, path);

export default defineConfig({
  plugins: [
    // SWC must run FIRST to transform decorators before other plugins
    swc.vite({
      // Include packages directory for SWC transformation
      include: [/\.tsx?$/, /packages\/.*\.tsx?$/],
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
          decorators: true,
        },
        target: 'es2022',
        transform: {
          useDefineForClassFields: false,
          decoratorVersion: '2022-03',
          react: {
            runtime: 'automatic',
          },
        },
      },
    }),
    react(),
    vanillaExtractPlugin({
      esbuildOptions: {
        target: 'es2022',
      },
    }),
  ],
  optimizeDeps: {
    include: ['yjs', 'lib0', 'lit', '@preact/signals-core', 'rxjs'],
    exclude: ['@ink/stone-gfx-turbo-renderer'],
    esbuildOptions: {
      target: 'es2022',
    },
  },
  server: {
    watch: {
      ignored: ['**/packages/stone/integration-test/**'],
    },
  },
  resolve: {
    dedupe: [
      'yjs',
      'lib0',
      'lit',
      '@preact/signals-core',
      'rxjs',
      '@ink/stone-store',
      '@ink/stone-std',
      '@ink/stone-global',
      '@ink/stone-sync',
    ],
    alias: {
      // ============ Stone 框架 ============
      '@ink/stone-store': r('../../packages/stone/framework/store/src'),
      '@ink/stone-std': r('../../packages/stone/framework/std/src'),
      '@ink/stone-global': r('../../packages/stone/framework/global/src'),
      '@ink/stone-sync': r('../../packages/stone/framework/sync/src'),

      // ============ Stone 核心 ============
      '@ink/stone-core': r('../../packages/stone/core/src'),
      '@ink/stone-model': r('../../packages/stone/model/src'),
      '@ink/stone-shared': r('../../packages/stone/shared/src'),
      '@ink/stone-components': r('../../packages/stone/components/src'),
      '@ink/stone-rich-text': r('../../packages/stone/rich-text/src'),
      '@ink/stone-foundation': r('../../packages/stone/foundation/src'),
      '@ink/stone-ext-loader': r('../../packages/stone/ext-loader/src'),

      // ============ Stone 块类型 ============
      '@ink/stone-block-root': r('../../packages/stone/blocks/root/src'),
      '@ink/stone-block-paragraph': r('../../packages/stone/blocks/paragraph/src'),
      '@ink/stone-block-code': r('../../packages/stone/blocks/code/src'),
      '@ink/stone-block-list': r('../../packages/stone/blocks/list/src'),
      '@ink/stone-block-note': r('../../packages/stone/blocks/note/src'),
      '@ink/stone-block-divider': r('../../packages/stone/blocks/divider/src'),
      '@ink/stone-block-image': r('../../packages/stone/blocks/image/src'),
      '@ink/stone-block-attachment': r('../../packages/stone/blocks/attachment/src'),
      '@ink/stone-block-latex': r('../../packages/stone/blocks/latex/src'),
      '@ink/stone-block-mermaid': r('../../packages/stone/blocks/mermaid/src'),
      '@ink/stone-block-table': r('../../packages/stone/blocks/table/src'),
      '@ink/stone-block-embed-doc': r('../../packages/stone/blocks/embed-doc/src'),

      // ============ Stone Inlines ============
      '@ink/stone-inline-preset': r('../../packages/stone/inlines/preset/src'),
      '@ink/stone-inline-link': r('../../packages/stone/inlines/link/src'),
      '@ink/stone-inline-latex': r('../../packages/stone/inlines/latex/src'),
      '@ink/stone-inline-reference': r('../../packages/stone/inlines/reference/src'),
      '@ink/stone-inline-footnote': r('../../packages/stone/inlines/footnote/src'),

      // ============ Stone Widgets ============
      '@ink/stone-widget-slash-menu': r('../../packages/stone/widgets/slash-menu/src'),
      '@ink/stone-widget-toolbar': r('../../packages/stone/widgets/toolbar/src'),
      '@ink/stone-widget-linked-doc': r('../../packages/stone/widgets/linked-doc/src'),
      '@ink/stone-widget-drag-handle': r('../../packages/stone/widgets/drag-handle/src'),
      '@ink/stone-widget-keyboard-toolbar': r('../../packages/stone/widgets/keyboard-toolbar/src'),
      '@ink/stone-widget-page-dragging-area': r(
        '../../packages/stone/widgets/page-dragging-area/src',
      ),
      '@ink/stone-widget-scroll-anchoring': r('../../packages/stone/widgets/scroll-anchoring/src'),

      // ============ Stone Fragments ============
      '@ink/stone-fragment-doc-title': r('../../packages/stone/fragments/doc-title/src'),
      '@ink/stone-fragment-outline': r('../../packages/stone/fragments/outline/src'),
      '@ink/stone-fragment-adapter-panel': r('../../packages/stone/fragments/adapter-panel/src'),

      // ============ Stone 其他 ============
      '@ink/stone-icons/lit': r('../../packages/stone/icons/dist/lit.mjs'),
      '@ink/stone-icons/rc': r('../../packages/stone/icons/dist/rc.mjs'),
      '@ink/stone-theme': r('../../packages/stone/theme'),
    },
  },
  build: {
    target: 'esnext',
    // Remove console.log in production build (keep console.error/warn for debugging)
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log'],
    },
  },
  worker: {
    format: 'es',
    plugins: () => [
      swc.vite({
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: false,
            decorators: false,
          },
          target: 'es2022',
        },
      }),
    ],
  },
  esbuild: {
    target: 'es2022',
  },
});
