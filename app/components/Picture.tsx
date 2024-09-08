import { Fragment, useEffect, useState } from 'react'
import { cls } from '~/utils/cls'

export type ImageSet = {
  default: string
  formats: {
    [key: string]: Record<string, string>
  }
  meta: Record<string, any> | null // eslint-disable-line @typescript-eslint/no-explicit-any
  placeholder: string
  sizes: {
    [key: string]: Record<string, string>
  }
}

export type ImageSets = Record<string, ImageSet>

export type PictureProps = {
  alt: string
  set: ImageSet
  sizes?: string
  imgClass?: string
  pictureClass?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
}

//if (!set) throw new Error('missing prop `set`')
export function Picture({
  alt,
  imgClass,
  pictureClass,
  set,
  sizes,
  width,
  height,
  loading = 'lazy',
}: PictureProps) {
  const formats = Object.keys(set.formats)

  //console.log({ width, height, sizes, formats, set })

  return (
    <picture
      className={cls('web-image-gen-picture aspect-video w-full', pictureClass)}
    >
      {formats.map((format) => {
        const formatSizes = set.formats[format]
        const srcset = Object.keys(formatSizes)
          .map((size) => `${formatSizes[size]} ${size}w`)
          .join(', ')

        return (
          <Fragment key={format}>
            {format !== formats.at(-1) ? (
              <source srcSet={srcset} sizes={sizes} type={`image/${format}`} />
            ) : (
              <img
                alt={alt}
                className={cls('web-image-gen-img', imgClass)}
                sizes={sizes}
                srcSet={srcset}
                src={set.default}
                width={width}
                height={height}
                loading={loading}
              />
            )}
          </Fragment>
        )
      })}
    </picture>
  )
}

/*
<noscript>
  <style>
    .web-image-gen-picture .web-image-gen-img.lazyload {
      display: none;
    }
  </style>
  <img
    {alt}
    class="web-image-gen-img {imgClass}"
    src={set.default}
    {width}
    {height}
  />
</noscript>
*/
