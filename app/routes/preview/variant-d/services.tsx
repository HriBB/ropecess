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
  return getPreviewMeta(`${title} — Neo-Brutalist`)
}

const black = { fontFamily: "'Archivo Black', sans-serif" } as const
const mono = { fontFamily: "'Space Mono', monospace" } as const
const box = 'border-4 border-base-content shadow-[8px_8px_0_0] shadow-base-content' as const

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

export default function VariantDServices() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPathname(pathname)
  const d = data[locale]

  return (
    <main style={mono} className="overflow-x-clip">
      {/* Hero */}
      <section className="px-5 pb-10 pt-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <span
            className="-rotate-1 inline-block border-4 border-base-content bg-yellow-300 px-4 py-1.5 text-xs font-bold uppercase text-black mb-8"
            style={mono}
          >
            ★ {d.hero.title} ★
          </span>
          <h1 style={black} className="text-5xl uppercase leading-[0.95] md:text-7xl">
            {d.hero.title}
          </h1>
        </div>
      </section>

      {/* Featured services — numbered poster list */}
      <section className="px-5 py-12 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2
            style={black}
            className="mb-10 inline-block border-4 border-base-content bg-base-content px-6 py-3 text-2xl uppercase text-base-100"
          >
            {locale === 'sl' ? 'IZBRANE STORITVE' : 'FEATURED SERVICES'}
          </h2>
          <div className="flex flex-col">
            {d.items.map((item, i) => (
              <Link
                key={item.id}
                id={item.id}
                to={resolveItemHref(item, token, variant, locale)}
                prefetch="intent"
                className={`${box} group mb-6 flex items-start gap-6 bg-base-100 p-6 transition-transform hover:-translate-y-1`}
              >
                <span
                  style={black}
                  className="shrink-0 border-4 border-base-content bg-yellow-300 px-3 py-1 text-sm uppercase text-black"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 style={black} className="mb-2 text-lg uppercase">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed opacity-70">{item.description}</p>
                </div>
                <Picture
                  picture={item.image}
                  lqip={item.lqip}
                  alt={item.title}
                  className="hidden h-20 w-20 border-4 border-base-content object-cover md:block"
                  loading="lazy"
                  sizes="80px"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All services — definition list */}
      <section className="border-t-4 border-base-content bg-yellow-300 px-5 py-16 md:px-10">
        <div className="mx-auto max-w-6xl text-black">
          <h2
            style={black}
            className="mb-10 border-4 border-black px-6 py-3 inline-block text-2xl uppercase"
          >
            {locale === 'sl' ? 'VSE STORITVE' : 'ALL SERVICES'}
          </h2>
          <div className="flex flex-col">
            {d.services.map((s, i) => (
              <div key={s.id} className="flex flex-col gap-2 border-t-4 border-black py-6 last:border-b-4">
                <div className="flex items-baseline gap-6">
                  <span
                    style={black}
                    className="shrink-0 text-xs border-4 border-black bg-black px-2 py-0.5 text-yellow-300 font-bold"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 style={black} className="text-base uppercase">
                    {s.title}
                  </h3>
                </div>
                <p className="ml-[52px] text-xs leading-relaxed opacity-80">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              to={previewHref('contact', token, variant, locale)}
              prefetch="intent"
              style={black}
              className="inline-block border-4 border-black bg-black px-8 py-4 text-sm uppercase text-yellow-300 transition-transform hover:-translate-y-1"
            >
              {locale === 'sl' ? 'KONTAKTIRAJTE NAS →' : 'CONTACT US →'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
