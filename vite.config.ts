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
    lqip(),
    imagetools(),
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
