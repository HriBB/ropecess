import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { setupPlugins as responsiveImages } from '@responsive-image/vite-plugin'

installGlobals({ nativeFetch: true })

declare module '@remix-run/server-runtime' {
  interface Future {
    unstable_singleFetch: true
  }
}

export default defineConfig({
  plugins: [
    responsiveImages({
      include: /^[^?]+\.jpg\?.*responsive.*$/,
      w: [320, 640, 750, 828, 1080, 1200, 1920],
      format:
        process.env.NODE_ENV === 'production'
          ? ['jpeg', 'webp', 'avif']
          : ['jpeg', 'webp'],
    }),
    remix({
      future: {
        unstable_singleFetch: true,
        unstable_optimizeDeps: true,
      },
    }),
    tsconfigPaths(),
  ],
})
