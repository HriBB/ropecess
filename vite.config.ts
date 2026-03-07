import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import lqip from 'vite-plugin-lqip'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import devtoolsJson from 'vite-plugin-devtools-json'
import netlifyReactRouter from '@netlify/vite-plugin-react-router'
import netlify from '@netlify/vite-plugin'

import { imagetools } from './imagetools'

export default defineConfig({
  plugins: [
    devtoolsJson(),
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
    /**
     * Vite plugin for resolving tsconfig paths
     *
     * @see https://github.com/dividab/tsconfig-paths
     */
    tsconfigPaths(),
    netlifyReactRouter(),
    netlify(),
  ],
  build: {
    target: 'ES2022',
  },
})
