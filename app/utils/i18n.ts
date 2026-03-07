import { useRootData } from '~/utils/data'

export type Locale = 'en' | 'sl'

export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'sl']

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  sl: 'Slovenščina',
}

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  sl: '🇸🇮',
}

export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  sl: 'sl_SI',
}

export function useLocale(): Locale {
  const data = useRootData()
  return data?.locale || defaultLocale
}

export function localizeHref(href: string, locale: Locale): string {
  if (locale === defaultLocale) return href
  if (href === '/') return `/${locale}`
  if (href.startsWith('/')) return `/${locale}${href}`
  return href
}

export function useLocalizeHref() {
  const locale = useLocale()
  return (href: string) => localizeHref(href, locale)
}

export function getAlternateUrl(
  pathname: string,
  targetLocale: Locale,
): string {
  const isSlPath = pathname.startsWith('/sl/') || pathname === '/sl'
  const basePath = isSlPath
    ? pathname.replace(/^\/sl/, '') || '/'
    : pathname

  if (targetLocale === defaultLocale) return basePath
  return basePath === '/' ? '/sl' : `/sl${basePath}`
}

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname.startsWith('/sl/') || pathname === '/sl') return 'sl'
  return defaultLocale
}
