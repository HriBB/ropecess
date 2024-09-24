import { useMemo } from 'react'
import type { ImageData, ImageType } from '@responsive-image/core'

export type PictureProps = ImageData & {
  className?: string
  pictureClassName?: string
  alt: string
  width?: number
  height?: number
  sizes?: string
  loading?: 'lazy' | 'eager'
  decoding?: 'auto' | 'async' | 'sync'
  fetchPriority?: 'auto' | 'high' | 'low'
}

const PIXEL_DENSITIES = [1, 2]

const typeScore = new Map<ImageType, number>([
  ['png', 1],
  ['jpeg', 1],
  ['webp', 2],
  ['avif', 3],
])

function sortTypes(a: ImageType, b: ImageType) {
  return (typeScore.get(b) ?? 0) - (typeScore.get(a) ?? 0)
}

export function Picture({
  className,
  pictureClassName,
  alt,
  sizes,
  imageTypes,
  availableWidths,
  loading = 'lazy',
  decoding = 'auto',
  fetchPriority = 'auto',
  imageUrlFor,
  ...props
}: PictureProps) {
  if (!props.aspectRatio) throw new Error('Picture aspectRatio is required')
  if (!availableWidths) throw new Error('Picture availableWidths is required')
  if (!imageTypes) throw new Error('Picture imageTypes is required')
  if (!imageUrlFor) throw new Error('Picture imageUrlFor is required')

  const aspectRatio = props.aspectRatio || 1

  let width = props.width
  let height = props.height

  const isResponsive = width === undefined && height === undefined

  if (!width) {
    if (height) {
      width = Math.round(height * aspectRatio)
    } else {
      width = availableWidths?.[0] || 300
    }
  }

  if (!height && width) {
    height = Math.round(width / aspectRatio)
  }

  const sources = useMemo(() => {
    const types = imageTypes.sort(sortTypes)

    if (isResponsive) {
      return types.map((type) => (
        <source
          key={type}
          srcSet={availableWidths
            ?.map((width) => `${imageUrlFor(width, type)} ${width}w`)
            .join(', ')}
          sizes={sizes}
          type={`image/${type}`}
        />
      ))
    } else {
      return types.map((type) => (
        <source
          key={type}
          srcSet={PIXEL_DENSITIES.map(
            (density) => `${imageUrlFor(width * density, type)} ${density}x`,
          )
            .filter((source) => source !== undefined)
            .join(', ')}
          sizes={sizes}
          type={`image/${type}`}
        />
      ))
    }
  }, [isResponsive, imageTypes, availableWidths, width, sizes, imageUrlFor])

  const src = imageUrlFor(width, 'jpeg')

  return (
    <picture className={pictureClassName}>
      {sources}
      <img
        className={className}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        sizes={sizes}
      />
    </picture>
  )
}
