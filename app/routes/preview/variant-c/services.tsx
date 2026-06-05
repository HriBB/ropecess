import type { MetaFunction } from 'react-router'
import { Link, useLocation } from 'react-router'
import { getPreviewMeta } from '../meta'
import { parsePreviewPathname, previewHref } from '../utils'
import { data } from '~/content/services'
import type { VariantKey } from '../config'
import type { Locale } from '~/utils/i18n'

export const meta: MetaFunction = ({ location }) => {
  const { locale } = parsePreviewPathname(location.pathname)
  const title = locale === 'sl' ? 'Storitve' : 'Services'
  return getPreviewMeta(`${title} — Editorial Calm`)
}

const font = { fontFamily: "'Manrope', sans-serif" } as const

function Chapter({
  label,
  children,
  muted,
}: {
  label: string
  children: React.ReactNode
  muted?: boolean
}) {
  return (
    <section
      className={`border-t border-base-content/10 px-6 py-36 md:px-12 ${muted ? 'bg-base-200' : ''}`}
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[220px_1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] opacity-50 lg:sticky lg:top-28">
            <span className="mr-3 inline-block h-2 w-2 rounded-full bg-amber-500" />
            {label}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}

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

export default function VariantCServices() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPathname(pathname)
  const d = data[locale]

  return (
    <main style={font}>
      {/* Hero */}
      <section className="px-6 pb-20 pt-36 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.35em] opacity-50">
            <span className="mr-3 inline-block h-2 w-2 rounded-full bg-amber-500" />
            {d.hero.title}
          </p>
          <h1 className="max-w-3xl text-5xl font-extralight leading-[1.08] tracking-tight md:text-7xl">
            {d.hero.title}
          </h1>
        </div>
      </section>

      {/* Featured services — numbered list */}
      <Chapter label={locale === 'sl' ? 'Izbrane storitve' : 'Featured'}>
        <div className="flex flex-col">
          {d.items.map((item, i) => (
            <Link
              key={item.id}
              id={item.id}
              to={resolveItemHref(item, token, variant, locale)}
              prefetch="intent"
              className="group flex items-baseline gap-8 border-t border-base-content/10 py-7 transition-opacity hover:opacity-60"
            >
              <span className="w-8 shrink-0 text-xs font-bold text-amber-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 text-xl font-light tracking-tight md:text-2xl">
                {item.title}
              </span>
              <span className="hidden max-w-xs text-xs leading-relaxed opacity-50 md:block">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      </Chapter>

      {/* All services — magazine-chapter style */}
      <Chapter label={locale === 'sl' ? 'Vse storitve' : 'All Services'} muted>
        <div className="flex flex-col">
          {d.services.map((s, i) => (
            <div
              key={s.id}
              className="flex flex-col gap-2 border-t border-base-content/10 py-8 last:border-b"
            >
              <div className="flex items-baseline gap-6">
                <span className="w-8 shrink-0 text-xs font-bold text-amber-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-extralight tracking-tight">{s.title}</h3>
              </div>
              <p className="ml-14 text-sm leading-relaxed opacity-60">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-16">
          <Link
            to={previewHref('contact', token, variant, locale)}
            prefetch="intent"
            className="group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-black transition-transform group-hover:scale-110">
              →
            </span>
            {locale === 'sl' ? 'Kontaktirajte nas' : 'Contact Us'}
          </Link>
        </div>
      </Chapter>
    </main>
  )
}
