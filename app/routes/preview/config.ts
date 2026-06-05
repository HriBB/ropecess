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

const VARIANT_C_ROUTE_FILES: Record<InnerPage, string> = {
  about: 'routes/preview/variant-c/about.tsx',
  services: 'routes/preview/variant-c/services.tsx',
  spacenet: 'routes/preview/variant-c/spacenet.tsx',
  'height-cleaning': 'routes/preview/variant-c/height-cleaning.tsx',
  contact: 'routes/preview/variant-c/contact.tsx',
}

const VARIANT_D_ROUTE_FILES: Record<InnerPage, string> = {
  about: 'routes/preview/variant-d/about.tsx',
  services: 'routes/preview/variant-d/services.tsx',
  spacenet: 'routes/preview/variant-d/spacenet.tsx',
  'height-cleaning': 'routes/preview/variant-d/height-cleaning.tsx',
  contact: 'routes/preview/variant-d/contact.tsx',
}

const VARIANT_E_ROUTE_FILES: Record<InnerPage, string> = {
  about: 'routes/preview/variant-e/about.tsx',
  services: 'routes/preview/variant-e/services.tsx',
  spacenet: 'routes/preview/variant-e/spacenet.tsx',
  'height-cleaning': 'routes/preview/variant-e/height-cleaning.tsx',
  contact: 'routes/preview/variant-e/contact.tsx',
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

      // Variant C — Editorial Calm — home + all inner pages under its own layout
      layout('routes/preview/variant-c/layout.tsx', [
        route(`/p/${token}/c/`, 'routes/preview/variant-c/home.tsx', { id: 'preview-c-en' }),
        route(`/p/${token}/c/sl/`, 'routes/preview/variant-c/home.tsx', { id: 'preview-c-sl' }),
        ...INNER_PAGES.flatMap((page) => [
          route(`/p/${token}/c/${page}/`, VARIANT_C_ROUTE_FILES[page], {
            id: `preview-c-${page}-en`,
          }),
          route(`/p/${token}/c/sl/${page}/`, VARIANT_C_ROUTE_FILES[page], {
            id: `preview-c-${page}-sl`,
          }),
        ]),
      ]),

      // Variant D — Neo-Brutalist — home + all inner pages under its own layout
      layout('routes/preview/variant-d/layout.tsx', [
        route(`/p/${token}/d/`, 'routes/preview/variant-d/home.tsx', { id: 'preview-d-en' }),
        route(`/p/${token}/d/sl/`, 'routes/preview/variant-d/home.tsx', { id: 'preview-d-sl' }),
        ...INNER_PAGES.flatMap((page) => [
          route(`/p/${token}/d/${page}/`, VARIANT_D_ROUTE_FILES[page], {
            id: `preview-d-${page}-en`,
          }),
          route(`/p/${token}/d/sl/${page}/`, VARIANT_D_ROUTE_FILES[page], {
            id: `preview-d-${page}-sl`,
          }),
        ]),
      ]),

      // Variant E — Aurora Glass — home + all inner pages under its own layout
      layout('routes/preview/variant-e/layout.tsx', [
        route(`/p/${token}/e/`, 'routes/preview/variant-e/home.tsx', { id: 'preview-e-en' }),
        route(`/p/${token}/e/sl/`, 'routes/preview/variant-e/home.tsx', { id: 'preview-e-sl' }),
        ...INNER_PAGES.flatMap((page) => [
          route(`/p/${token}/e/${page}/`, VARIANT_E_ROUTE_FILES[page], {
            id: `preview-e-${page}-en`,
          }),
          route(`/p/${token}/e/sl/${page}/`, VARIANT_E_ROUTE_FILES[page], {
            id: `preview-e-${page}-sl`,
          }),
        ]),
      ]),
    ]),
  ]
}
