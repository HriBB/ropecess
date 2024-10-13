import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import lqip from 'vite-plugin-lqip'
import tsconfigPaths from 'vite-tsconfig-paths'

import { imagetools } from './imagetools'

export default defineConfig({
  plugins: [
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
  ],
})
