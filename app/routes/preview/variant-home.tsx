import type { MetaFunction } from 'react-router'
import { useLocation } from 'react-router'
import { getPreviewMeta } from './meta'
import { VARIANT_NAMES } from './config'
import type { VariantKey } from './config'
import type { Locale } from '~/utils/i18n'
import { localizeHref } from '~/utils/i18n'
import { data as homeData } from '~/content/home'
import type { HomeVariantProps } from '~/routes/home-prototype'
import { VariantA } from '~/routes/home-prototype/VariantA'
import { VariantB } from '~/routes/home-prototype/VariantB'
import { VariantC } from '~/routes/home-prototype/VariantC'
import { VariantD } from '~/routes/home-prototype/VariantD'
import { VariantE } from '~/routes/home-prototype/VariantE'
import { PreviewSwitcher } from './PreviewSwitcher'

const GOOGLE_FONTS =
  'https://fonts.googleapis.com/css2?' +
  'family=Albert+Sans:wght@200..700' +
  '&family=Manrope:wght@200..800' +
  '&family=EB+Garamond:ital,wght@0,400..800;1,400..800' +
  '&family=Lato:wght@300;400;700' +
  '&family=Archivo+Black' +
  '&family=Space+Mono:wght@400;700' +
  '&family=Outfit:wght@200..800' +
  '&display=swap'

const COMPONENTS: Record<VariantKey, React.ComponentType<HomeVariantProps>> = {
  a: VariantA,
  b: VariantB,
  c: VariantC,
  d: VariantD,
  e: VariantE,
}

// Parse variant key (a-e) and locale from a preview pathname:
// /p/<token>/<variant>/        → en
// /p/<token>/<variant>/sl/     → sl
function parsePreviewPath(pathname: string): {
  token: string
  variant: VariantKey
  locale: Locale
} {
  const segments = pathname.split('/').filter(Boolean)
  // segments: ['p', token, variant] or ['p', token, variant, 'sl']
  const token = segments[1] ?? ''
  const variant = (segments[2] ?? 'a') as VariantKey
  const locale: Locale = segments[3] === 'sl' ? 'sl' : 'en'
  return { token, variant, locale }
}

export const meta: MetaFunction = ({ location }) => {
  const { variant } = parsePreviewPath(location.pathname)
  return getPreviewMeta(`${VARIANT_NAMES[variant]} — Design Preview`)
}

export default function VariantHome() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPath(pathname)
  const d = homeData[locale]
  const lh = (href: string) => localizeHref(href, locale)
  const Component = COMPONENTS[variant]

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <Component d={d} lh={lh} locale={locale} />
      <PreviewSwitcher token={token} variant={variant} locale={locale} />
    </>
  )
}
