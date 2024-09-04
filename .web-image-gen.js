const { resolve } = require('path')

/** @type {import('web-image-gen').Config} */
module.exports = {
  // Images config.
  images: {
    // Output formats - Ordered!
    //  First entry should be newest modern format, last entry should
    //  be most widely supported older fallback format.
    formats: ['avif', 'webp', 'jpg'],

    // Output width sizes in pixels.
    sizes: [640, 800, 1024, 1440, 1920],

    // Default single generated image to fallback on or use outside imageset.
    //  Must refer to a format and size defined above.
    default: {
      format: 'jpg',
      size: 800,
    },

    // Static assets folder.
    static: resolve('public'),

    // Images subdir underneath the <static> folder above.
    //  Original source subdirs and images will be read from within.
    //  Generated image files will be created within (under <slug> dir).
    //  Root of web-serving path in browser.
    images: 'images',

    // Subdir to generate images in (under `<static>/<images>/subdir/` above).
    slug: '_gen',

    // Version update for browser cache-busting
    version: Date.now().toString(),
  },

  // Manifests config
  manifests: {
    // Manifest output format. One of `json`, `js`, or `ts`.
    format: 'ts',

    // Web app source code path for code dealing with static image assets.
    //  Where manifests and subdir will be generated.
    src: resolve('app/images'),

    // Subdir to put generated manifests in (under <src> above).
    slug: '_gen',
  },
}
