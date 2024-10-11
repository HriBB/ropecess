import 'vite/client.d.ts'

import type { Picture } from 'vite-imagetools'

interface LQIP {
  lqip: string
  width: number
  height: number
  src: string
}

interface OutputMetadata {
  src: string // URL of the generated image
  width: number // Width of the image
  height: number // Height of the image
  format: string // Format of the generated image

  // The following options are the same as sharps input options
  space: string // Name of colour space interpretation
  channels: number // Number of bands e.g. 3 for sRGB, 4 for CMYK
  density: number //  Number of pixels per inch
  depth: string // Name of pixel depth format
  hasAlpha: boolean // presence of an alpha transparency channel
  hasProfile: boolean // presence of an embedded ICC profile
  isProgressive: boolean // indicating whether the image is interlaced using a progressive scan
}

/**
 * Augment the global Vite client module
 *
 * Adds support for importing images with the `imagetools` query parameter.
 *
 * @see https://github.com/JonasKruckenberg/imagetools/issues/160
 * @see https://vitejs.dev/guide/api-plugin.html#typescript-for-custom-events
 */
declare module 'vite/client.d.ts' {
  declare module '*&as=meta' {
    const imageData: OutputMetadata[]
    export default imageData
  }
  declare module '*?hero' {
    const imageData: Picture
    export default imageData
  }
  declare module '*?square' {
    const imageData: Picture
    export default imageData
  }
  declare module '*?thumb' {
    const imageData: Picture
    export default imageData
  }
  declare module '*?lqip' {
    const lqip: LQIP
    export default lqip
  }
}
