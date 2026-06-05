/**
 * Variant E — "Aurora Glass" — About page.
 * Gradient-mesh atmosphere, frosted glass story cards, soft editorial rhythm.
 */
import type { MetaFunction } from 'react-router'
import { useLocation } from 'react-router'
import { getPreviewMeta } from '../meta'
import { parsePreviewPathname } from '../utils'
import { Picture } from '~/components/Picture'
import { data } from '~/content/about'

export const meta: MetaFunction = ({ location }) => {
  const { locale } = parsePreviewPathname(location.pathname)
  const title = locale === 'sl' ? 'Naša zgodba' : 'Our Story'
  return getPreviewMeta(`${title} — Aurora Glass`)
}

const outfit = { fontFamily: "'Outfit', sans-serif" } as const
const glass =
  'rounded-3xl border border-base-content/10 bg-base-100/60 shadow-xl backdrop-blur-xl' as const

function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 left-[5%] h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />
      <div className="absolute top-[40%] right-[5%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-500/10" />
    </div>
  )
}

export default function VariantEAbout() {
  const { pathname } = useLocation()
  const { locale } = parsePreviewPathname(pathname)
  const d = data[locale]

  return (
    <main style={outfit} className="relative overflow-x-clip">
      <Blobs />

      {/* Hero */}
      <section className="relative px-4 pb-10 pt-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="mb-6 inline-block rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400 dark:text-fuchsia-300">
            {locale === 'sl' ? 'O nas' : 'About us'}
          </span>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            {d.hero.title}
          </h1>
        </div>
      </section>

      {/* Banner image — glass-framed */}
      <section className="relative px-4 py-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className={`${glass} overflow-hidden`}>
            <Picture
              picture={d.hero.image}
              lqip={d.hero.lqip}
              alt={d.hero.imageAlt}
              className="w-full aspect-[21/9] object-cover"
              loading="eager"
              fetchPriority="high"
              sizes="(max-width:1279px) 100vw, 1280px"
            />
          </div>
        </div>
      </section>

      {/* Story chapters — alternating glass cards */}
      {d.items.map((item, i) => (
        <section key={item.id} className="relative px-4 py-8 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div
              className={`${glass} grid overflow-hidden ${
                i % 2 === 0 ? 'md:grid-cols-[1fr_1.3fr]' : 'md:grid-cols-[1.3fr_1fr]'
              }`}
            >
              <div className={i % 2 === 0 ? '' : 'md:order-2'}>
                <Picture
                  picture={item.image}
                  lqip={item.lqip}
                  alt={item.alt}
                  className="h-64 w-full object-cover md:h-full"
                  loading="lazy"
                  sizes="(max-width:767px) 100vw, 45vw"
                />
              </div>
              <div
                className={`flex flex-col justify-center gap-5 p-8 md:p-12 ${i % 2 === 0 ? '' : 'md:order-1'}`}
              >
                <span className="w-fit rounded-full bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/20 px-4 py-1 text-xs font-bold text-fuchsia-400 dark:text-fuchsia-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm leading-relaxed opacity-80">{item.text}</p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
