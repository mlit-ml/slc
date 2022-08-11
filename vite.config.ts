import { defineConfig, loadEnv } from 'vite'
import path from 'path'

import vueI18n from '@intlify/vite-plugin-vue-i18n'

import mkcert from 'vite-plugin-mkcert'

import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    base: process.env.VITE_BASE,
    // server: { https: true, port: '8080' },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      vue(),
      //mkcert(),
      vueI18n({
        include: path.resolve(__dirname, './src/locales/**'),
      }),
      AutoImport({
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],

        // global imports to register
        imports: [
          'vue',
          'vue-router',
          {
            '@vueuse/core': [
              // named imports
              'useMouse', // import { useMouse } from '@vueuse/core',
              // alias
              ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
            ],
          },
        ],

        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: './src/auto-imports.d.ts',
      }),
      VitePWA({
        base: process.env.VITE_BASE,
        includeAssets: ['favicon.png'],
        workbox: {
          cleanupOutdatedCaches: true,
          skipWaiting: false,
          clientsClaim: true,
        },
        manifest: {
          name: 'SLC',
          short_name: 'SLC',
          display: 'standalone',
          background_color: '#fff',
          theme_color: '#fff',
          icons: [
            {
              src: 'logo_144.png',
              sizes: '144x144',
              type: 'image/png',
            },
            {
              src: 'logo_192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'logo_512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'logo_512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),
    ],
  })
}
