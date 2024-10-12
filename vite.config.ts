import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import { imagetools, pictureFormat } from 'vite-imagetools'
import lqip from 'vite-plugin-lqip'
import tsconfigPaths from 'vite-tsconfig-paths'

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
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('hero')) {
          return new URLSearchParams({
            format: 'avif;webp;jpeg',
            w: '640;768;1024;1366;1600;1920',
            as: 'picture',
          })
        }
        if (url.searchParams.has('square')) {
          return new URLSearchParams({
            format: 'avif;webp;jpeg',
            w: '400;600',
            aspect: '1:1',
            as: 'square:400;600',
          })
        }
        if (url.searchParams.has('thumb')) {
          return new URLSearchParams({
            format: 'avif;webp;jpeg',
            w: '400;600',
            aspect: '1:1',
            as: 'picture',
          })
        }
        return new URLSearchParams()
      },
      extendOutputFormats: (builtins) => ({
        ...builtins,
        square: (config) => async (metadatas) => {
          const basePixels = parseInt(config?.[0] || '')
          const usePixels = parseInt(config?.[1] || '') || basePixels
          if (!basePixels) return pictureFormat()(metadatas)

          const out: Record<string, string[]> = {}
          let img: { src: string; w: number; h: number } | null = null

          metadatas.forEach(({ format, src, width, height }) => {
            if (!format || !src || !width || !height) return
            if (!out[format]) out[format] = []
            const density = width / basePixels
            if (format === 'jpeg' && width === usePixels) {
              img = { src, w: width, h: height }
            }
            out[format].push(`${src} ${density}x`)
          })

          if (!img) return pictureFormat()(metadatas)

          const order = ['avif', 'webp', 'jpeg']
          const sources = Object.fromEntries(
            Object.entries(out)
              .map(([format, srcset]) => [format, srcset.join(', ')])
              .sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0])),
          )

          return { sources, img }
        },
      }),
    }),
    reactRouter(),
    tsconfigPaths(),
  ],
})
