/**
 * Variant E — "Aurora Glass" — Professional Height Cleaning page.
 * Glass-panelled service cards, frosted process steps, neon CTA.
 */
import type { MetaFunction } from 'react-router'
import { Link, useLocation } from 'react-router'
import { getPreviewMeta } from '../meta'
import { parsePreviewPathname, previewHref } from '../utils'
import { Picture } from '~/components/Picture'
import {
  data,
  serviceImages,
  howWeWorkImages,
  whyChooseImages,
} from '~/content/height-cleaning'

export const meta: MetaFunction = ({ location }) => {
  const { locale } = parsePreviewPathname(location.pathname)
  const title = locale === 'sl' ? 'Čiščenje na višini' : 'Professional Height Cleaning'
  return getPreviewMeta(`${title} — Aurora Glass`)
}

const outfit = { fontFamily: "'Outfit', sans-serif" } as const
const glass =
  'rounded-3xl border border-base-content/10 bg-base-100/60 shadow-xl backdrop-blur-xl' as const

function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-20 right-[15%] h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />
      <div className="absolute top-[35%] left-[5%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-500/10" />
      <div className="absolute bottom-[10%] right-[10%] h-64 w-64 rounded-full bg-amber-300/20 blur-3xl dark:bg-indigo-500/10" />
    </div>
  )
}

export default function VariantEHeightCleaning() {
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
            {locale === 'sl' ? 'Storitev' : 'Service'}
          </span>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            {d.hero.title[0]}
            <br />
            <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              {d.hero.title[1]}
            </span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="relative px-4 py-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className={`${glass} p-8 md:p-12`}>
            <p className="text-lg font-medium leading-relaxed opacity-80">{d.intro}</p>
          </div>
        </div>
      </section>

      {/* Our services — glass cards */}
      <section className="relative px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
            {d.ourServices.title}
          </h2>
          <div className="flex flex-col gap-6">
            {d.ourServices.services.map((service, idx) => (
              <div key={idx} className={`${glass} overflow-hidden`}>
                <div className="p-6 md:p-8">
                  <div className="mb-5 flex items-center gap-4">
                    <span className="rounded-full bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/20 px-3 py-1 text-xs font-bold text-fuchsia-700 dark:text-fuchsia-300">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-bold">{service.title}</h3>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed opacity-75">{service.text}</p>
                  {'items' in service && service.items && (
                    <ul className="flex flex-col gap-2">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <span className="mt-0.5 shrink-0 text-fuchsia-700 dark:text-fuchsia-300">
                            ✦
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {'richItems' in service && service.richItems && (
                    <ul className="flex flex-col gap-2">
                      {service.richItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <span className="mt-0.5 shrink-0 text-fuchsia-700 dark:text-fuchsia-300">
                            ✦
                          </span>
                          <span>
                            <span className="font-semibold">{item.bold}</span> {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* Image row */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {serviceImages[idx]?.slice(0, 3).map((img, i) => (
                      <Picture
                        key={i}
                        picture={img.thumb}
                        lqip={img.lqip}
                        alt={service.imageAlt}
                        className="aspect-square w-full rounded-2xl object-cover"
                        sizes="(max-width:767px) 33vw, 200px"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work — frosted step list */}
      <section className="relative px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
            {d.howWeWork.title}
          </h2>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed opacity-75">{d.howWeWork.text}</p>
          <div className={`${glass} divide-y divide-base-content/10`}>
            {d.howWeWork.items.map((item, i) => (
              <div key={i} className="flex items-start gap-5 p-6">
                <span className="mt-0.5 shrink-0 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/20 px-3 py-1 text-xs font-bold text-fuchsia-700 dark:text-fuchsia-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold">{item.bold}</span> {item.text}
                </p>
              </div>
            ))}
          </div>
          {/* How we work images */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {howWeWorkImages.slice(0, 3).map((img, i) => (
              <Picture
                key={i}
                picture={img.thumb}
                lqip={img.lqip}
                alt={d.howWeWork.imageAlt}
                className="aspect-square w-full rounded-2xl object-cover"
                sizes="(max-width:767px) 33vw, 200px"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose — glass cards grid */}
      <section className="relative px-4 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
            {d.whyChoose.title}
          </h2>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {d.whyChoose.items.map((item, i) => (
              <div
                key={i}
                className={`${glass} flex flex-col gap-2 p-6 transition-transform hover:-translate-y-1`}
              >
                <span className="text-fuchsia-700 dark:text-fuchsia-300">✦</span>
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold">{item.bold}</span> {item.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {whyChooseImages.slice(0, 3).map((img, i) => (
              <Picture
                key={i}
                picture={img.thumb}
                lqip={img.lqip}
                alt={d.whyChoose.imageAlt}
                className="aspect-square w-full rounded-2xl object-cover"
                sizes="(max-width:767px) 33vw, 200px"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-4 pb-24 pt-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className={`${glass} p-8 text-center md:p-12`}>
            <p className="mb-6 text-2xl font-bold leading-snug tracking-tight md:text-3xl">
              {d.cta.text}
            </p>
            <Link
              to={previewHref('contact', token, variant, locale)}
              prefetch="intent"
              className="inline-block rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/30 transition-transform hover:scale-105"
            >
              {d.cta.link.text} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
