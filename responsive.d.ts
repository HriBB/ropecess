import 'vite/client.d.ts'
import type { ImageData } from '@responsive-image/core'

/**
 * Augment the global Vite client module
 *
 * Adds support for importing images with the `?responsive` query parameter.
 *
 * @see https://vitejs.dev/guide/api-plugin.html#typescript-for-custom-events
 */
declare module 'vite/client.d.ts' {
  declare module '*?responsive' {
    const imageData: ImageData
    export default imageData
  }
}
