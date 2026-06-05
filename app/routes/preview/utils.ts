import type { Locale } from '~/utils/i18n'
import type { VariantKey } from './config'

// Parse token, variant key, and locale from any preview pathname.
// Works for both home (/p/<tok>/<v>/, /p/<tok>/<v>/sl/) and
// inner pages (/p/<tok>/<v>/<page>/, /p/<tok>/<v>/sl/<page>/).
export function parsePreviewPathname(pathname: string): {
  token: string
  variant: VariantKey
  locale: Locale
} {
  const segments = pathname.split('/').filter(Boolean)
  const token = segments[1] ?? ''
  const variant = (segments[2] ?? 'a') as VariantKey
  const locale: Locale = segments[3] === 'sl' ? 'sl' : 'en'
  return { token, variant, locale }
}

// Build a URL that stays within the preview subtree.
// page = '' → variant home; page = 'about' → /p/<tok>/<v>/about/ etc.
export function previewHref(
  page: string,
  token: string,
  variant: VariantKey,
  locale: Locale,
): string {
  const ls = locale === 'sl' ? '/sl' : ''
  if (!page) return `/p/${token}/${variant}${ls}/`
  return `/p/${token}/${variant}${ls}/${page}/`
}

// Toggle locale while preserving the current page within the preview subtree.
export function getPreviewAlternateUrl(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean)
  const isSl = segments[3] === 'sl'
  const before = segments.slice(0, 3)
  const after = isSl ? segments.slice(4) : segments.slice(3)
  const parts = targetLocale === 'sl' ? [...before, 'sl', ...after] : [...before, ...after]
  return '/' + parts.join('/') + '/'
}
