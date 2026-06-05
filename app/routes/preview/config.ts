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

export function buildPreviewRoutes(token: string | undefined): RouteConfigEntry[] {
  if (!token) return []

  return [
    layout('routes/preview/layout.tsx', [
      route(`/p/${token}/`, 'routes/preview/launcher.tsx', {
        id: 'preview-launcher',
      }),
      ...VARIANT_KEYS.flatMap((v) => [
        route(`/p/${token}/${v}/`, 'routes/preview/variant-home.tsx', {
          id: `preview-${v}-en`,
        }),
        route(`/p/${token}/${v}/sl/`, 'routes/preview/variant-home.tsx', {
          id: `preview-${v}-sl`,
        }),
      ]),
    ]),
  ]
}
