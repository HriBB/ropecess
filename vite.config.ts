import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import minipic from 'vite-plugin-minipic'

installGlobals({ nativeFetch: true })

export default defineConfig({
  plugins: [
    minipic({
      sharpOptions: {
        png: {
          quality: 70,
        },
        jpg: {
          quality: 70,
        },
        gif: {},
        jpeg: {
          quality: 70,
        },
        webp: {
          quality: 70,
        },
        avif: {
          quality: 70,
        },
      },
      convert: [{ from: 'jpg', to: 'webp' }],
      cache: false,
      exclude: [],
      include: [],
    }),
    remix({
      future: {
        unstable_singleFetch: true,
      },
    }),
    tsconfigPaths(),
  ],
})
