import type { MetaFunction } from 'react-router'
import { useLocation } from 'react-router'
import { getPreviewMeta } from '../meta'
import { parsePreviewPathname, previewHref } from '../utils'
import { data as homeData } from '~/content/home'
import { VariantD } from '~/routes/home-prototype/VariantD'
import { VARIANT_NAMES } from '../config'
import type { VariantKey } from '../config'
import type { Locale } from '~/utils/i18n'

export const meta: MetaFunction = () => {
  return getPreviewMeta(`${VARIANT_NAMES['d']} — Design Preview`)
}

function makePreviewLh(token: string, variant: VariantKey, locale: Locale) {
  const map: Record<string, string> = {
    '/': previewHref('', token, variant, locale),
    '/about': previewHref('about', token, variant, locale),
    '/contact': previewHref('contact', token, variant, locale),
    '/services': previewHref('services', token, variant, locale),
    '/spacenet': previewHref('spacenet', token, variant, locale),
    '/professional-height-cleaning': previewHref('height-cleaning', token, variant, locale),
  }
  return (href: string): string => map[href] ?? previewHref('', token, variant, locale)
}

export default function VariantDHome() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPathname(pathname)
  const d = homeData[locale]
  const lh = makePreviewLh(token, variant, locale)

  return <VariantD d={d} lh={lh} locale={locale} />
}
