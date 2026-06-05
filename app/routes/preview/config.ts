import { layout, route } from '@react-router/dev/routes'
import type { RouteConfigEntry } from '@react-router/dev/routes'

export const VARIANT_KEYS = ['a', 'b', 'c', 'd', 'e'] as const
export type VariantKey = (typeof VARIANT_KEYS)[number]

export const VARIANT_NAMES: Record<VariantKey, string> = {
  a: 'Airy Organic',
  b: 'Exaggerated Minimal',
  c: 'Editorial Calm',
  d: 'Neo-Brutalist',
  e: 'Aurora Glass',
}

const VARIANT_A_INNER_PAGES = [
  'about',
  'services',
  'spacenet',
  'height-cleaning',
  'contact',
] as const

type VariantAPage = (typeof VARIANT_A_INNER_PAGES)[number]

const VARIANT_A_ROUTE_FILES: Record<VariantAPage, string> = {
  about: 'routes/preview/variant-a/about.tsx',
  services: 'routes/preview/variant-a/services.tsx',
  spacenet: 'routes/preview/variant-a/spacenet.tsx',
  'height-cleaning': 'routes/preview/variant-a/height-cleaning.tsx',
  contact: 'routes/preview/variant-a/contact.tsx',
}

export function buildPreviewRoutes(token: string | undefined): RouteConfigEntry[] {
  if (!token) return []

  return [
    layout('routes/preview/layout.tsx', [
      route(`/p/${token}/`, 'routes/preview/launcher.tsx', {
        id: 'preview-launcher',
      }),

      // Variant A — Airy Organic — home + all inner pages under its own layout
      layout('routes/preview/variant-a/layout.tsx', [
        route(`/p/${token}/a/`, 'routes/preview/variant-a/home.tsx', { id: 'preview-a-en' }),
        route(`/p/${token}/a/sl/`, 'routes/preview/variant-a/home.tsx', { id: 'preview-a-sl' }),
        ...VARIANT_A_INNER_PAGES.flatMap((page) => [
          route(`/p/${token}/a/${page}/`, VARIANT_A_ROUTE_FILES[page], {
            id: `preview-a-${page}-en`,
          }),
          route(`/p/${token}/a/sl/${page}/`, VARIANT_A_ROUTE_FILES[page], {
            id: `preview-a-${page}-sl`,
          }),
        ]),
      ]),

      // Variants B–E — home pages only (dedicated layouts come in S6–S9)
      ...(['b', 'c', 'd', 'e'] as const).flatMap((v) => [
        route(`/p/${token}/${v}/`, 'routes/preview/variant-home.tsx', { id: `preview-${v}-en` }),
        route(`/p/${token}/${v}/sl/`, 'routes/preview/variant-home.tsx', { id: `preview-${v}-sl` }),
      ]),
    ]),
  ]
}
