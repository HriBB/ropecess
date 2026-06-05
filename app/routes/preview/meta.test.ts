import { describe, it, expect } from 'vitest'
import { getPreviewMeta } from './meta'

describe('getPreviewMeta', () => {
  it('includes title', () => {
    const meta = getPreviewMeta('Ropecess Preview')
    const titleEntry = meta.find((m) => 'title' in m)
    expect(titleEntry).toEqual({ title: 'Ropecess Preview' })
  })

  it('includes noindex robots meta', () => {
    const meta = getPreviewMeta('Any Title')
    const robots = meta.find(
      (m) => 'name' in m && m.name === 'robots',
    ) as Record<string, string> | undefined
    expect(robots).toBeDefined()
    expect(robots?.content).toContain('noindex')
  })

  it('does not include a canonical link', () => {
    const meta = getPreviewMeta('Any Title')
    const canonical = meta.find(
      (m) => 'rel' in m && (m as Record<string, string>).rel === 'canonical',
    )
    expect(canonical).toBeUndefined()
  })

  it('does not include og:url', () => {
    const meta = getPreviewMeta('Any Title')
    const ogUrl = meta.find(
      (m) =>
        'property' in m &&
        (m as Record<string, string>).property === 'og:url',
    )
    expect(ogUrl).toBeUndefined()
  })

  it('does not include hreflang alternate links', () => {
    const meta = getPreviewMeta('Any Title')
    const alternate = meta.find(
      (m) =>
        'rel' in m && (m as Record<string, string>).rel === 'alternate',
    )
    expect(alternate).toBeUndefined()
  })
})
