import { LQIP } from 'types/env'
import { Picture as PictureType } from 'vite-imagetools'

export type PictureProps = {
  picture: PictureType
  alt: string
  lqip?: LQIP
  style?: React.CSSProperties
  className?: string
  pictureClassName?: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  decoding?: 'sync' | 'async' | 'auto'
  fetchPriority?: 'high' | 'low' | 'auto'
}

const order = ['avif', 'webp', 'jpeg']

const sortSources = ([k1]: string[], [k2]: string[]) =>
  order.indexOf(k1) - order.indexOf(k2)

export function Picture({
  picture,
  lqip,
  style,
  className,
  pictureClassName,
  alt,
  ...props
}: PictureProps) {
  return (
    <picture className={pictureClassName}>
      {Object.entries(picture.sources)
        .sort(sortSources)
        .map(([key, value]) => (
          <source key={key} srcSet={value} type={`image/${key}`} />
        ))}

      <img
        className={className}
        src={picture.img.src}
        alt={alt}
        width={picture.img.w}
        height={picture.img.h}
        style={{
          ...style,
          ...(lqip
            ? {
                backgroundImage: `url("${lqip.lqip}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {}),
        }}
        {...props}
      />
    </picture>
  )
}
