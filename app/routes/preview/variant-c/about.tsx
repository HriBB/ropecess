import type { MetaFunction } from 'react-router'
import { useLocation } from 'react-router'
import { getPreviewMeta } from '../meta'
import { parsePreviewPathname } from '../utils'
import { Picture } from '~/components/Picture'
import { data } from '~/content/about'

export const meta: MetaFunction = ({ location }) => {
  const { locale } = parsePreviewPathname(location.pathname)
  const title = locale === 'sl' ? 'Naša zgodba' : 'Our Story'
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

export default function VariantCAbout() {
  const { pathname } = useLocation()
  const { locale } = parsePreviewPathname(pathname)
  const d = data[locale]

  return (
    <main style={font}>
      {/* Hero — minimal type */}
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

      {/* Banner image — framed in whitespace */}
      <section className="px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Picture
            picture={d.hero.image}
            lqip={d.hero.lqip}
            alt={d.hero.imageAlt}
            className="w-full aspect-[21/9] object-cover"
            loading="eager"
            fetchPriority="high"
            sizes="(max-width:1151px) 100vw, 1152px"
          />
          <p className="mt-4 text-xs uppercase tracking-[0.25em] opacity-40">{d.hero.imageAlt}</p>
        </div>
      </section>

      {/* Story chapters */}
      {d.items.map((item, i) => (
        <Chapter key={item.id} label={String(i + 1).padStart(2, '0')} muted={i % 2 === 1}>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr]">
            <div className={i % 2 === 1 ? 'md:order-2' : ''}>
              <Picture
                picture={item.image}
                lqip={item.lqip}
                alt={item.alt}
                className="w-full object-cover"
                loading="lazy"
                sizes="(max-width:767px) 100vw, 35vw"
              />
            </div>
            <div className={i % 2 === 1 ? 'md:order-1' : ''}>
              <p className="text-sm leading-loose opacity-70">{item.text}</p>
            </div>
          </div>
        </Chapter>
      ))}
    </main>
  )
}
