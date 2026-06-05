/**
 * PROTOTYPE — throwaway homepage design exploration. NOT production code.
 *
 * Round 2: five completely new variants with improved homepage architecture —
 * every variant renders the full section stack:
 *   hero → intro → how-we-work → services → height cleaning → space net →
 *   contact (bottom).
 * Extra section data (services/spacenet/contact) lives in ./data.ts, reused
 * from the existing routes. Height-cleaning spotlight data lives in
 * routes/home.tsx (production-owned, survives prototype deletion).
 *
 * Switchable via `?variant=` on the existing `/` route (sub-shape A). The
 * original design renders by default. Floating bottom bar (dev-only) cycles
 * variants; ← / → keys work too.
 *
 * Variants:
 *   a — Airy Organic      (Scandinavian calm: sage accent, rounded, huge air)
 *   b — Exaggerated Minimal (mega serif type, whitespace, safety-orange accent)
 *   c — Editorial Calm    (magazine chapters, mono + amber, sticky labels)
 *   d — Neo-Brutalist     (thick borders, hard shadows, yellow blocks, marquee)
 *   e — Aurora Glass      (gradient mesh, glass panels, neon glow)
 *
 * When a winner is picked: fold it into routes/home.tsx, delete this folder.
 */
import { useSearchParams } from 'react-router'
import type { Picture as PictureType } from 'vite-imagetools'
import { LQIP } from 'types/env'
import type { Locale } from '~/utils/i18n'

import { PrototypeSwitcher } from './PrototypeSwitcher'
import { VariantA } from './VariantA'
import { VariantB } from './VariantB'
import { VariantC } from './VariantC'
import { VariantD } from './VariantD'
import { VariantE } from './VariantE'

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

const GOOGLE_FONTS =
  'https://fonts.googleapis.com/css2?' +
  'family=Albert+Sans:wght@200..700' +
  '&family=Manrope:wght@200..800' +
  '&family=EB+Garamond:ital,wght@0,400..800;1,400..800' +
  '&family=Lato:wght@300;400;700' +
  '&family=Archivo+Black' +
  '&family=Space+Mono:wght@400;700' +
  '&family=Outfit:wght@200..800' +
  '&display=swap'

const variants: Record<
  string,
  { name: string; Component: React.ComponentType<HomeVariantProps> | null }
> = {
  original: { name: 'Original', Component: null },
  a: { name: 'Airy Organic', Component: VariantA },
  b: { name: 'Exaggerated Minimal', Component: VariantB },
  c: { name: 'Editorial Calm', Component: VariantC },
  d: { name: 'Neo-Brutalist', Component: VariantD },
  e: { name: 'Aurora Glass', Component: VariantE },
}

type Props = HomeVariantProps & {
  original: React.ReactNode
}

export function HomePrototype({ d, lh, locale, original }: Props) {
  const [searchParams] = useSearchParams()

  // Never ship the prototype — production always renders the original page.
  if (import.meta.env.PROD) return <>{original}</>

  const param = searchParams.get('variant') ?? 'original'
  const key = param in variants ? param : 'original'
  const { Component } = variants[key]

  return (
    <>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      {Component ? <Component d={d} lh={lh} locale={locale} /> : original}
      <PrototypeSwitcher
        current={key}
        variants={Object.entries(variants).map(([k, v]) => ({
          key: k,
          name: v.name,
        }))}
      />
    </>
  )
}
