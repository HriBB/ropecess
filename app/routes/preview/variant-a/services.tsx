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
  return getPreviewMeta(`${title} — Airy Organic`)
}

const font = { fontFamily: "'Albert Sans', sans-serif" } as const
const sageText = 'text-[#5f7c61] dark:text-[#a7c4a9]'
const sageBg =
  'bg-[#5f7c61] text-white hover:bg-[#4d664f] dark:bg-[#a7c4a9] dark:text-[#1c241d] dark:hover:bg-[#c0d6c1]'

function resolveItemHref(
  item: { id: string; to?: string },
  token: string,
  variant: VariantKey,
  locale: Locale,
): string {
  if (item.id === 'professional-height-cleaning') {
    return previewHref('height-cleaning', token, variant, locale)
  }
  return previewHref('services', token, variant, locale) + `#${item.id}`
}

export default function VariantAServices() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPathname(pathname)
  const d = data[locale]

  return (
    <main style={font}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Picture
          picture={d.hero.image}
          lqip={d.hero.lqip}
          alt={d.hero.imageAlt}
          className="w-full h-[45vh] object-cover"
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base-100/90 flex items-end">
          <div className="max-w-6xl mx-auto px-6 pb-12 w-full">
            <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.4em] ${sageText}`}>
              Ropecess
            </p>
            <h1 className="text-4xl font-light leading-tight md:text-5xl">
              {d.hero.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Service list */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col">
            {d.items.map((item) => {
              const href = resolveItemHref(item, token, variant, locale)
              return (
                <Link
                  key={item.id}
                  id={item.id}
                  to={href}
                  prefetch="intent"
                  className="group flex items-center gap-8 border-t border-base-content/10 py-8 last:border-b"
                >
                  <Picture
                    picture={item.image}
                    lqip={item.lqip}
                    alt={item.title}
                    className="h-20 w-20 shrink-0 rounded-full object-cover"
                    loading="lazy"
                    sizes="80px"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-medium">{item.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed opacity-60">
                      {item.description}
                    </p>
                  </div>
                  <span
                    className={`text-xl opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 ${sageText}`}
                  >
                    →
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional services grid */}
      <section className="bg-base-200 px-6 py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-16 text-center text-3xl font-light tracking-tight">
            {locale === 'sl' ? 'Vse storitve' : 'All Services'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {d.services.map((s) => (
              <div
                key={s.id}
                className="rounded-[1.5rem] border border-base-content/10 bg-base-100 p-6"
              >
                <h3 className="mb-2 font-medium">{s.title}</h3>
                <p className="text-sm leading-relaxed opacity-60">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              to={previewHref('contact', token, variant, locale)}
              prefetch="intent"
              className={`rounded-full px-10 py-4 text-sm font-semibold transition-colors ${sageBg}`}
            >
              {locale === 'sl' ? 'Kontaktirajte nas' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
