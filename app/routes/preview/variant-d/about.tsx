import type { MetaFunction } from 'react-router'
import { useLocation } from 'react-router'
import { getPreviewMeta } from '../meta'
import { parsePreviewPathname } from '../utils'
import { Picture } from '~/components/Picture'
import { data } from '~/content/about'

export const meta: MetaFunction = ({ location }) => {
  const { locale } = parsePreviewPathname(location.pathname)
  const title = locale === 'sl' ? 'Naša zgodba' : 'Our Story'
  return getPreviewMeta(`${title} — Neo-Brutalist`)
}

const black = { fontFamily: "'Archivo Black', sans-serif" } as const
const mono = { fontFamily: "'Space Mono', monospace" } as const
const box = 'border-4 border-base-content shadow-[8px_8px_0_0] shadow-base-content' as const

export default function VariantDAbout() {
  const { pathname } = useLocation()
  const { locale } = parsePreviewPathname(pathname)
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
            ★ {locale === 'sl' ? 'O NAS' : 'ABOUT US'} ★
          </span>
          <h1
            style={black}
            className="text-5xl uppercase leading-[0.95] md:text-7xl"
          >
            {d.hero.title}
          </h1>
        </div>
      </section>

      {/* Banner — hard-boxed */}
      <section className="px-5 py-8 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className={box}>
            <Picture
              picture={d.hero.image}
              lqip={d.hero.lqip}
              alt={d.hero.imageAlt}
              className="w-full aspect-[21/9] object-cover"
              loading="eager"
              fetchPriority="high"
              sizes="(max-width:1151px) 100vw, 1152px"
            />
          </div>
        </div>
      </section>

      {/* Story items — alternating offset poster cards */}
      {d.items.map((item, i) => (
        <section key={item.id} className="px-5 py-12 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div
              className={`${box} grid bg-base-100 ${
                i % 2 === 0 ? 'md:grid-cols-[1fr_1.2fr]' : 'md:grid-cols-[1.2fr_1fr]'
              }`}
            >
              <div className={i % 2 === 0 ? '' : 'md:order-2'}>
                <Picture
                  picture={item.image}
                  lqip={item.lqip}
                  alt={item.alt}
                  className="h-64 w-full border-b-4 border-base-content object-cover md:h-full md:border-b-0 md:border-r-4"
                  loading="lazy"
                  sizes="(max-width:767px) 100vw, 40vw"
                />
              </div>
              <div className={`flex flex-col justify-center gap-5 p-8 ${i % 2 === 0 ? '' : 'md:order-1'}`}>
                <span
                  className="inline-block w-fit border-4 border-base-content bg-base-content px-4 py-1 text-xs font-bold uppercase text-base-100"
                  style={black}
                >
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
