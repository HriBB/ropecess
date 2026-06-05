import { describe, it, expect } from 'vitest'
import type { RouteConfigEntry } from '@react-router/dev/routes'
import { buildPreviewRoutes, VARIANT_KEYS } from './config'

describe('buildPreviewRoutes', () => {
  it('returns empty array when token is undefined', () => {
    expect(buildPreviewRoutes(undefined)).toEqual([])
  })

  it('returns empty array when token is empty string', () => {
    expect(buildPreviewRoutes('')).toEqual([])
  })

  it('returns non-empty route config when token is provided', () => {
    const routes = buildPreviewRoutes('test-token')
    expect(routes).toHaveLength(1) // one layout root
  })

  it('registers launcher route at /p/<token>/', () => {
    const routes = buildPreviewRoutes('abc123')
    const root = routes[0] as RouteConfigEntry
    const children: RouteConfigEntry[] = root.children ?? []
    const launcher = children.find((r) => r.path === '/p/abc123/')
    expect(launcher).toBeDefined()
  })

  it('registers both locales for each variant', () => {
    const routes = buildPreviewRoutes('tok')
    const root = routes[0] as RouteConfigEntry
    const children: RouteConfigEntry[] = root.children ?? []
    const paths = children.map((r) => r.path)

    for (const v of VARIANT_KEYS) {
      expect(paths).toContain(`/p/tok/${v}/`)
      expect(paths).toContain(`/p/tok/${v}/sl/`)
    }
  })

  it('registers exactly 1 launcher + 10 variant home routes', () => {
    const routes = buildPreviewRoutes('tok')
    const root = routes[0] as RouteConfigEntry
    // 1 launcher + 5 variants × 2 locales = 11
    expect(root.children).toHaveLength(11)
  })

  it('assigns unique route ids', () => {
    const routes = buildPreviewRoutes('tok')
    const root = routes[0] as RouteConfigEntry
    const children: RouteConfigEntry[] = root.children ?? []
    const ids = children.map((r) => r.id).filter(Boolean)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('preview routes do not appear in the robots path', () => {
    const token = 'secret-preview-token'
    const routes = buildPreviewRoutes(token)
    const root = routes[0] as RouteConfigEntry
    const children: RouteConfigEntry[] = root.children ?? []
    const robotsRoute = children.find((r) =>
      typeof r.path === 'string' && r.path.includes('robots'),
    )
    expect(robotsRoute).toBeUndefined()
  })
})
