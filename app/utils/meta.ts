import { Picture } from 'vite-imagetools'

export type MetaProps = {
  title: string
  description?: string
  image?: Picture
}

const name = 'Ropecess'

export function getMeta({ title, description, image }: MetaProps) {
  const props = []

  //
  // General
  //
  props.push({ title })
  if (description) props.push({ name: 'description', content: description })

  //
  // Open Graph
  //
  props.push({ property: 'og:site_name', content: name })
  props.push({ property: 'og:type', content: 'website' })
  props.push({ property: 'og:title', content: title })
  props.push({ property: 'og:locale', content: 'en' })
  //props.push({ property: 'og:url', content: url })
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
