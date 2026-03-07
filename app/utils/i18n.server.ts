import { type Locale, getLocaleFromPathname } from './i18n'

export function getLocaleFromRequest(request: Request): Locale {
  const url = new URL(request.url)
  return getLocaleFromPathname(url.pathname)
}
