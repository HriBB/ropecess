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
  return getPreviewMeta(`${title} — Exaggerated Minimal`)
}

const garamond = { fontFamily: "'EB Garamond', Georgia, serif" } as const
const lato = { fontFamily: "'Lato', sans-serif" } as const
const ORANGE = '#EA580C'

function SectionNumber({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-16 flex items-baseline gap-4" style={lato}>
      <span className="text-sm font-bold text-[#B84009] dark:text-[#F56B14]">
        {n}
      </span>
      <span className="text-xs font-bold uppercase tracking-[0.4em] text-base-content/75">{label}</span>
      <span className="h-px flex-1 bg-base-content/10" />
    </div>
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

export default function VariantBServices() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPathname(pathname)
  const d = data[locale]

  return (
    <main>
      {/* Hero — type only */}
      <section className="px-6 pb-20 pt-36 md:px-12">
        <SectionNumber n="01" label={d.hero.title} />
        <h1
          style={garamond}
          className="max-w-5xl text-[clamp(2.5rem,7vw,7rem)] font-medium leading-[0.95] tracking-[-0.02em]"
        >
          {d.hero.title.split(' ').map((w, i, arr) => (
            <span
              key={i}
              style={i === arr.length - 1 ? { color: ORANGE, fontStyle: 'italic' } : undefined}
            >
              {w}{' '}
            </span>
          ))}
        </h1>
      </section>

      {/* Services — definition list */}
      <section className="px-6 pb-16 md:px-12">
        {d.items.map((item) => {
          const href = resolveItemHref(item, token, variant, locale)
          return (
            <Link
              key={item.id}
              id={item.id}
              to={href}
              prefetch="intent"
              className="group flex items-baseline justify-between gap-6 border-b border-base-content/15 py-8"
            >
              <span
                style={garamond}
                className="text-2xl font-medium transition-colors group-hover:opacity-70 md:text-3xl"
              >
                {item.title}
              </span>
              <span
                className="shrink-0 text-sm font-bold opacity-0 transition-opacity group-hover:opacity-100"
                style={{ ...lato, color: ORANGE }}
              >
                →
              </span>
            </Link>
          )
        })}
      </section>

      {/* All services grid */}
      <section className="bg-base-200 px-6 py-28 md:px-12">
        <SectionNumber n="02" label={locale === 'sl' ? 'Vse storitve' : 'All Services'} />
        <div className="grid gap-px bg-base-content/10 border border-base-content/10">
          {d.services.map((s) => (
            <div key={s.id} className="bg-base-100 p-8">
              <h3 style={garamond} className="mb-3 text-xl font-medium">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-base-content/80" style={lato}>
                {s.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16">
          <Link
            to={previewHref('contact', token, variant, locale)}
            prefetch="intent"
            className="inline-block px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85"
            style={{ ...lato, backgroundColor: ORANGE }}
          >
            {locale === 'sl' ? 'Kontaktirajte nas' : 'Contact Us'}
          </Link>
        </div>
      </section>
    </main>
  )
}
