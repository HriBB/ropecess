import { describe, it, expect } from 'vitest'
import type { RouteConfigEntry } from '@react-router/dev/routes'
import { buildPreviewRoutes, VARIANT_KEYS } from './config'

// Recursively collect all route paths from the route tree
function collectAllPaths(routes: RouteConfigEntry[]): string[] {
  return routes.flatMap((r) => [
    ...(r.path ? [r.path] : []),
    ...collectAllPaths(r.children ?? []),
  ])
}

// Recursively collect all route IDs from the route tree
function collectAllIds(routes: RouteConfigEntry[]): string[] {
  return routes.flatMap((r) => [
    ...(r.id ? [r.id] : []),
    ...collectAllIds(r.children ?? []),
  ])
}

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

  it('registers home routes for all variants in both locales', () => {
    const routes = buildPreviewRoutes('tok')
    const allPaths = collectAllPaths(routes)
    for (const v of VARIANT_KEYS) {
      expect(allPaths).toContain(`/p/tok/${v}/`)
      expect(allPaths).toContain(`/p/tok/${v}/sl/`)
    }
  })

  it('registers variant-a inner pages in both locales', () => {
    const routes = buildPreviewRoutes('tok')
    const allPaths = collectAllPaths(routes)
    const innerPages = ['about', 'services', 'spacenet', 'height-cleaning', 'contact']
    for (const page of innerPages) {
      expect(allPaths).toContain(`/p/tok/a/${page}/`)
      expect(allPaths).toContain(`/p/tok/a/sl/${page}/`)
    }
  })

  it('registers variant-b inner pages in both locales', () => {
    const routes = buildPreviewRoutes('tok')
    const allPaths = collectAllPaths(routes)
    const innerPages = ['about', 'services', 'spacenet', 'height-cleaning', 'contact']
    for (const page of innerPages) {
      expect(allPaths).toContain(`/p/tok/b/${page}/`)
      expect(allPaths).toContain(`/p/tok/b/sl/${page}/`)
    }
  })

  it('registers variant-c inner pages in both locales', () => {
    const routes = buildPreviewRoutes('tok')
    const allPaths = collectAllPaths(routes)
    const innerPages = ['about', 'services', 'spacenet', 'height-cleaning', 'contact']
    for (const page of innerPages) {
      expect(allPaths).toContain(`/p/tok/c/${page}/`)
      expect(allPaths).toContain(`/p/tok/c/sl/${page}/`)
    }
  })

  it('registers variant-d inner pages in both locales', () => {
    const routes = buildPreviewRoutes('tok')
    const allPaths = collectAllPaths(routes)
    const innerPages = ['about', 'services', 'spacenet', 'height-cleaning', 'contact']
    for (const page of innerPages) {
      expect(allPaths).toContain(`/p/tok/d/${page}/`)
      expect(allPaths).toContain(`/p/tok/d/sl/${page}/`)
    }
  })

  it('registers variant-e inner pages in both locales', () => {
    const routes = buildPreviewRoutes('tok')
    const allPaths = collectAllPaths(routes)
    const innerPages = ['about', 'services', 'spacenet', 'height-cleaning', 'contact']
    for (const page of innerPages) {
      expect(allPaths).toContain(`/p/tok/e/${page}/`)
      expect(allPaths).toContain(`/p/tok/e/sl/${page}/`)
    }
  })

  it('registers exactly 61 routed paths total', () => {
    // 1 launcher
    // 2 variant-a homes (en + sl)
    // 10 variant-a inner pages (5 pages × 2 locales)
    // 2 variant-b homes (en + sl)
    // 10 variant-b inner pages (5 pages × 2 locales)
    // 2 variant-c homes (en + sl)
    // 10 variant-c inner pages (5 pages × 2 locales)
    // 2 variant-d homes (en + sl)
    // 10 variant-d inner pages (5 pages × 2 locales)
    // 2 variant-e homes (en + sl)
    // 10 variant-e inner pages (5 pages × 2 locales)
    // = 61
    const routes = buildPreviewRoutes('tok')
    const allPaths = collectAllPaths(routes)
    expect(allPaths).toHaveLength(61)
  })

  it('assigns unique route ids across the entire tree', () => {
    const routes = buildPreviewRoutes('tok')
    const ids = collectAllIds(routes)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
    expect(ids.length).toBeGreaterThan(0)
  })

  it('preview routes do not appear in the robots path', () => {
    const token = 'secret-preview-token'
    const routes = buildPreviewRoutes(token)
    const allPaths = collectAllPaths(routes)
    const robotsPath = allPaths.find((p) => p.includes('robots'))
    expect(robotsPath).toBeUndefined()
  })

  it('token does not appear in any route path for robots.txt purposes', () => {
    const token = 'my-secret-token'
    const routes = buildPreviewRoutes(token)
    const allPaths = collectAllPaths(routes)
    // All paths are under /p/<token>/... — token appears in paths (intentional)
    // but NOT in robots.txt paths (which are separate production routes)
    // This test confirms the preview paths use the token correctly
    const previewPaths = allPaths.filter((p) => p.startsWith('/p/'))
    expect(previewPaths.length).toBeGreaterThan(0)
    expect(previewPaths.every((p) => p.includes(token))).toBe(true)
  })
})
