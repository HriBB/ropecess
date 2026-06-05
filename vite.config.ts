import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import lqip from 'vite-plugin-lqip'
import tailwindcss from '@tailwindcss/vite'
import netlifyReactRouter from '@netlify/vite-plugin-react-router'
import netlify from '@netlify/vite-plugin'

import { imagetools } from './imagetools'

export default defineConfig({
  plugins: [
    tailwindcss(),
    /**
     * Vite plugin for generating LQIP (Low Quality Image Placeholder) images
     *
     * @see https://github.com/drwpow/vite-plugin-lqip
     */
    lqip(),
    /**
     * Vite plugin for image processing
     *
     * @see https://github.com/JonasKruckenberg/imagetools
     */
    imagetools(),
    /**
     * React Router
     *
     * @see https://reactrouter.com/dev/guides/start/installation
     */
    reactRouter(),
    netlifyReactRouter(),
    netlify(),
  ],
  resolve: {
    // Native replacement for vite-tsconfig-paths (Vite 8+)
    tsconfigPaths: true,
  },
  build: {
    target: 'ES2022',
    // lightningcss (Vite 8 default CSS minifier) can't parse JS targets
    // like ES2022 — give it explicit browser versions instead
    cssTarget: ['chrome107', 'edge107', 'firefox104', 'safari16'],
  },
})
