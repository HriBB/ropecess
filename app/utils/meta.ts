import { Picture } from 'vite-imagetools'
import {
  type Locale,
  defaultLocale,
  ogLocales,
  getAlternateUrl,
} from '~/utils/i18n'

export type MetaProps = {
  title: string
  description?: string
  image?: Picture
  locale?: Locale
  pathname?: string
  appUrl?: string
}

const name = 'Ropecess'

export function getMeta({
  title,
  description,
  image,
  locale = defaultLocale,
  pathname,
  appUrl = '',
}: MetaProps) {
  const props: Record<string, string>[] = []

  const canonicalUrl = pathname ? `${appUrl}${pathname}` : undefined
  const enUrl = pathname
    ? `${appUrl}${getAlternateUrl(pathname, 'en')}`
    : undefined
  const slUrl = pathname
    ? `${appUrl}${getAlternateUrl(pathname, 'sl')}`
    : undefined

  //
  // General
  //
  props.push({ title })
  if (description) props.push({ name: 'description', content: description })

  //
  // Canonical & Hreflang
  //
  if (canonicalUrl) {
    props.push({ tagName: 'link', rel: 'canonical', href: canonicalUrl })
  }
  if (enUrl) {
    props.push({
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'en',
      href: enUrl,
    })
    props.push({
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: enUrl,
    })
  }
  if (slUrl) {
    props.push({
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'sl',
      href: slUrl,
    })
  }

  //
  // Open Graph
  //
  props.push({ property: 'og:site_name', content: name })
  props.push({ property: 'og:type', content: 'website' })
  props.push({ property: 'og:title', content: title })
  props.push({ property: 'og:locale', content: ogLocales[locale] })
  if (canonicalUrl)
    props.push({ property: 'og:url', content: canonicalUrl })
  if (description)
    props.push({ property: 'og:description', content: description })
  if (image) props.push({ property: 'og:image', content: image.img.src })

  //
  // Twitter
  //
  props.push({ property: 'twitter:card', content: 'summary_large_image' })
  props.push({ property: 'twitter:creator', content: name })
  props.push({ property: 'twitter:title', content: title })
  if (description)
    props.push({ property: 'twitter:description', content: description })
  if (image) props.push({ property: 'twitter:image', content: image.img.src })

  return props
}
