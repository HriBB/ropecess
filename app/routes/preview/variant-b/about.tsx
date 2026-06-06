import type { MetaFunction } from 'react-router'
import { useLocation } from 'react-router'
import { getPreviewMeta } from '../meta'
import { parsePreviewPathname } from '../utils'
import { Picture } from '~/components/Picture'
import { data } from '~/content/about'

export const meta: MetaFunction = ({ location }) => {
  const { locale } = parsePreviewPathname(location.pathname)
  const title = locale === 'sl' ? 'Naša zgodba' : 'Our Story'
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

export default function VariantBAbout() {
  const { pathname } = useLocation()
  const { locale } = parsePreviewPathname(pathname)
  const d = data[locale]

  return (
    <main>
      {/* Hero — type only, no image */}
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

      {/* Story items */}
      <section className="px-6 pb-32 md:px-12">
        <div className="flex flex-col gap-24">
          {d.items.map((item, i) => (
            <div
              key={item.id}
              className={`flex flex-col gap-12 md:flex-row md:items-center ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1">
                <span
                  className="mb-6 block text-xs font-bold uppercase tracking-[0.3em] text-base-content/75"
                  style={lato}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p
                  style={garamond}
                  className="text-xl leading-relaxed md:text-2xl"
                >
                  {item.text}
                </p>
              </div>
              <Picture
                picture={item.image}
                lqip={item.lqip}
                alt={item.alt}
                className="w-full md:w-5/12 aspect-square object-cover"
                sizes="(max-width:767px) 100vw, 40vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
