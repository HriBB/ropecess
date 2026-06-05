import type { Picture as PictureType } from 'vite-imagetools'
import { LQIP } from 'types/env'
import type { Locale } from '~/utils/i18n'

export type HomeVariantData = {
  hero: {
    title: string
    image: PictureType
    lqip: LQIP
    imageAlt: string
    link: { to: string; text: string }
  }
  intro: { id: string; title: string; text: string }
  howWeWork: {
    title: string
    items: {
      id: string
      title: string
      image: PictureType
      lqip: LQIP
      text: string
    }[]
  }
  // height-cleaning spotlight — owner-requested page gets a homepage section
  heightCleaning: {
    id: string
    title: string
    text: string
    items: string[]
    images: { image: PictureType; lqip: LQIP; alt: string }[]
    link: { to: string; text: string }
  }
  cta: { text: string; link: { to: string; text: string } }
}

export type HomeVariantProps = {
  d: HomeVariantData
  lh: (href: string) => string
  locale: Locale
}
