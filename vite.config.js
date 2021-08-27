import { resolve } from 'path';
import { defineConfig } from 'vite';

import { extractor } from './scripts/resolveFrontMatter';

/* Plugins */
import Vue from '@vitejs/plugin-vue';
import Legacy from '@vitejs/plugin-legacy';
import Builtins from 'rollup-plugin-node-builtins';
import SvgLoader from 'vite-plugin-svg-icons';
import eslint from '@rollup/plugin-eslint';
import Markdown from 'vite-plugin-md';
import Pages from 'vite-plugin-pages';
import prism from 'markdown-it-prism';

const resolveAbsolute = dir => resolve(__dirname, dir);

export default defineConfig({
  base: '/',

  server: {
    open: true
  },

  /* Plugins */
  plugins: [

    /* Vue */
    Vue({
      include: [
        /\.vue$/,
        /\.md$/
      ]
    }),

    /* Legacy Environment Support */
    Legacy({
      targets: [
        'defaults'
      ]
    }),

    /* Markdown Renderer */
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      wrapperComponent: 'PostContainer',
      markdownItUses: [
        prism
      ]
    }),

    /* Route Generator */
    Pages({
      pagesDir: 'src/pages',
      importMode () {
        return 'async';
      },
      extendRoute (route) {
        if (route.component.endsWith('.md')) {

          return {
            ...route,
            meta: {
              frontmatter: extractor(route.component)
            }
          }
        }
      },
      extensions: [
        'vue',
        'md'
      ],
      syncIndex: true,
      replaceSquareBrackets: true
    }),

    /* runtime eslint parsing */
    {
      ...eslint({
        include: 'src/**/*.+(js)'
      }),
      enforce: 'pre'
    },

    SvgLoader({
      iconDirs: [resolve(process.cwd(), 'src/data/icons')],
      symbolId: 'icon-[dir]-[name]'
    })

  ],

  /* Alias Resolution */
  resolve: {
    alias: {
      '@': resolveAbsolute('./src'),
      '@pkg': resolveAbsolute('./package.json'),
      '@settings': resolveAbsolute('./settings')
    }
  },

  /* Rollup Overrides */
  rollupInputOptions: {
    preserveEntrySignatures: 'strict',
    plugins: [
      {
        ...Builtins({
          /* nodejs stdlib polyfills */
          process: true,
          util: true,
          require: true
        }),
        name: 'rollup-plugin-node-builtins'
      }
    ]
  },

  /* Auto-Import */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/styles/index';`
      }
    }
  },

  /* Build Configurations */
  build: {
    // < limit to base64 string
    assetsInlineLimit: 10000
  },

  // TODO -> optimizeDeps

});
