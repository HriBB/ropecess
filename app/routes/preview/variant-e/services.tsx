/**
 * Variant E — "Aurora Glass" — Services page.
 * Snap-scroll rail of glass service cards; frosted all-services grid.
 */
import type { MetaFunction } from 'react-router'
import { Link, useLocation } from 'react-router'
import { getPreviewMeta } from '../meta'
import { parsePreviewPathname, previewHref } from '../utils'
import { Picture } from '~/components/Picture'
import { data } from '~/content/services'
import type { VariantKey } from '../config'
import type { Locale } from '~/utils/i18n'

export const meta: MetaFunction = ({ location }) => {
  const { locale } = parsePreviewPathname(location.pathname)
  const title = locale === 'sl' ? 'Storitve' : 'Services'
  return getPreviewMeta(`${title} — Aurora Glass`)
}

const outfit = { fontFamily: "'Outfit', sans-serif" } as const
const glass =
  'rounded-3xl border border-base-content/10 bg-base-100/60 shadow-xl backdrop-blur-xl' as const

function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-0 right-[10%] h-[28rem] w-[28rem] rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />
      <div className="absolute top-[50%] left-[5%] h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-500/10" />
    </div>
  )
}

function resolveItemHref(
  item: { id: string },
  token: string,
  variant: VariantKey,
  locale: Locale,
): string {
  if (item.id === 'professional-height-cleaning') {
    return previewHref('height-cleaning', token, variant, locale)
  }
  return previewHref('services', token, variant, locale) + `#${item.id}`
}

export default function VariantEServices() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPathname(pathname)
  const d = data[locale]

  return (
    <main style={outfit} className="relative overflow-x-clip">
      <Blobs />

      {/* Hero */}
      <section className="relative px-4 pb-10 pt-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="mb-6 inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 dark:text-cyan-300">
            {d.hero.title}
          </span>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            {d.hero.title}
          </h1>
        </div>
      </section>

      {/* Featured services — glass cards, snap-scroll on mobile */}
      <section className="relative py-10">
        <div className="mx-auto mb-8 max-w-7xl px-4 md:px-8">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {locale === 'sl' ? 'Izbrane storitve' : 'Featured services'}
          </h2>
        </div>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:px-8">
          {d.items.map((item, i) => (
            <Link
              key={item.id}
              id={item.id}
              to={resolveItemHref(item, token, variant, locale)}
              prefetch="intent"
              className={`${glass} group min-w-[80%] snap-center overflow-hidden p-3 transition-transform hover:-translate-y-1 sm:min-w-[45%] lg:min-w-[22%]`}
            >
              <Picture
                picture={item.image}
                lqip={item.lqip}
                alt={item.title}
                className="mb-4 aspect-[4/3] w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
                sizes="(max-width:639px) 80vw, 25vw"
              />
              <div className="px-3 pb-4">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-400 dark:text-fuchsia-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-2 text-lg font-bold leading-tight">{item.title}</h3>
                <p className="text-xs leading-relaxed opacity-70">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All services — frosted grid */}
      <section className="relative px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
            {locale === 'sl' ? 'Vse storitve' : 'All services'}
          </h2>
          <div className={`${glass} divide-y divide-base-content/10`}>
            {d.services.map((s, i) => (
              <div key={s.id} className="flex items-start gap-6 p-6">
                <span className="mt-0.5 shrink-0 text-xs font-bold text-fuchsia-400 dark:text-fuchsia-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="mb-1.5 font-semibold">{s.title}</h3>
                  <p className="text-xs leading-relaxed opacity-70">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to={previewHref('contact', token, variant, locale)}
              prefetch="intent"
              className="inline-block rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/30 transition-transform hover:scale-105"
            >
              {locale === 'sl' ? 'Kontaktirajte nas →' : 'Contact us →'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
