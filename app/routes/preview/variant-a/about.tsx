import type { MetaFunction } from 'react-router'
import { useLocation } from 'react-router'
import { getPreviewMeta } from '../meta'
import { parsePreviewPathname } from '../utils'
import { Picture } from '~/components/Picture'
import { data } from '~/content/about'

export const meta: MetaFunction = ({ location }) => {
  const { locale } = parsePreviewPathname(location.pathname)
  const title = locale === 'sl' ? 'Naša zgodba' : 'Our Story'
  return getPreviewMeta(`${title} — Airy Organic`)
}

const font = { fontFamily: "'Albert Sans', sans-serif" } as const
const sageText = 'text-[#4d6950] dark:text-[#a7c4a9]'

export default function VariantAAbout() {
  const { pathname } = useLocation()
  const { locale } = parsePreviewPathname(pathname)
  const d = data[locale]

  return (
    <main style={font}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Picture
          picture={d.hero.image}
          lqip={d.hero.lqip}
          alt={d.hero.imageAlt}
          className="w-full h-[55vh] object-cover"
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base-100/90 flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-16 w-full">
            <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.4em] ${sageText}`}>
              Ropecess
            </p>
            <h1 className="text-4xl font-light leading-tight md:text-5xl">
              {d.hero.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Story sections */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-4xl flex flex-col gap-32">
          {d.items.map((item, i) => (
            <div
              key={item.id}
              className={`flex flex-col gap-16 md:flex-row md:items-center ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <Picture
                picture={item.image}
                lqip={item.lqip}
                alt={item.alt}
                className="w-full md:w-1/2 aspect-square object-cover rounded-[2rem]"
                sizes="(max-width:767px) 100vw, 45vw"
                loading="lazy"
              />
              <div className="flex-1">
                <span
                  className={`mb-6 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${sageText} border-current`}
                >
                  {i + 1}
                </span>
                <p className="text-base leading-loose opacity-70">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
