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

const INNER_PAGES = [
  'about',
  'services',
  'spacenet',
  'height-cleaning',
  'contact',
] as const

type InnerPage = (typeof INNER_PAGES)[number]

const VARIANT_A_ROUTE_FILES: Record<InnerPage, string> = {
  about: 'routes/preview/variant-a/about.tsx',
  services: 'routes/preview/variant-a/services.tsx',
  spacenet: 'routes/preview/variant-a/spacenet.tsx',
  'height-cleaning': 'routes/preview/variant-a/height-cleaning.tsx',
  contact: 'routes/preview/variant-a/contact.tsx',
}

const VARIANT_B_ROUTE_FILES: Record<InnerPage, string> = {
  about: 'routes/preview/variant-b/about.tsx',
  services: 'routes/preview/variant-b/services.tsx',
  spacenet: 'routes/preview/variant-b/spacenet.tsx',
  'height-cleaning': 'routes/preview/variant-b/height-cleaning.tsx',
  contact: 'routes/preview/variant-b/contact.tsx',
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
        ...INNER_PAGES.flatMap((page) => [
          route(`/p/${token}/a/${page}/`, VARIANT_A_ROUTE_FILES[page], {
            id: `preview-a-${page}-en`,
          }),
          route(`/p/${token}/a/sl/${page}/`, VARIANT_A_ROUTE_FILES[page], {
            id: `preview-a-${page}-sl`,
          }),
        ]),
      ]),

      // Variant B — Exaggerated Minimal — home + all inner pages under its own layout
      layout('routes/preview/variant-b/layout.tsx', [
        route(`/p/${token}/b/`, 'routes/preview/variant-b/home.tsx', { id: 'preview-b-en' }),
        route(`/p/${token}/b/sl/`, 'routes/preview/variant-b/home.tsx', { id: 'preview-b-sl' }),
        ...INNER_PAGES.flatMap((page) => [
          route(`/p/${token}/b/${page}/`, VARIANT_B_ROUTE_FILES[page], {
            id: `preview-b-${page}-en`,
          }),
          route(`/p/${token}/b/sl/${page}/`, VARIANT_B_ROUTE_FILES[page], {
            id: `preview-b-${page}-sl`,
          }),
        ]),
      ]),

      // Variants C–E — home pages only (dedicated layouts come in S7–S9)
      ...(['c', 'd', 'e'] as const).flatMap((v) => [
        route(`/p/${token}/${v}/`, 'routes/preview/variant-home.tsx', { id: `preview-${v}-en` }),
        route(`/p/${token}/${v}/sl/`, 'routes/preview/variant-home.tsx', { id: `preview-${v}-sl` }),
      ]),
    ]),
  ]
}
