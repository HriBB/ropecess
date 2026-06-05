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
  return getPreviewMeta(`${title} — Neo-Brutalist`)
}

const black = { fontFamily: "'Archivo Black', sans-serif" } as const
const mono = { fontFamily: "'Space Mono', monospace" } as const
const box = 'border-4 border-base-content shadow-[8px_8px_0_0] shadow-base-content' as const

function ImageRow({ images, alt }: { images: { thumb: any; full: any; lqip: any }[]; alt: string }) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      {images.slice(0, 3).map((img, i) => (
        <Picture
          key={i}
          picture={img.thumb}
          lqip={img.lqip}
          alt={alt}
          className="aspect-square w-full border-4 border-base-content object-cover"
          sizes="(max-width:767px) 33vw, 200px"
          loading="lazy"
        />
      ))}
    </div>
  )
}

export default function VariantDHeightCleaning() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPathname(pathname)
  const d = data[locale]

  return (
    <main style={mono} className="overflow-x-clip">
      {/* Hero */}
      <section className="px-5 pb-10 pt-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <span
            className="-rotate-2 inline-block border-4 border-base-content bg-yellow-300 px-4 py-1.5 text-xs font-bold uppercase text-black mb-8"
            style={mono}
          >
            ★ {locale === 'sl' ? 'STORITEV' : 'SERVICE'} ★
          </span>
          <h1 style={black} className="text-5xl uppercase leading-[0.95] md:text-7xl">
            {d.hero.title[0]} {d.hero.title[1]}
          </h1>
        </div>
      </section>

      {/* Intro — big poster text */}
      <section className="border-t-4 border-base-content bg-yellow-300 px-5 py-12 md:px-10">
        <div className="mx-auto max-w-6xl text-black">
          <p style={black} className="max-w-3xl text-2xl uppercase leading-snug md:text-4xl">
            {d.intro}
          </p>
        </div>
      </section>

      {/* Our services — boxed cards */}
      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2
            style={black}
            className="mb-10 inline-block border-4 border-base-content bg-base-content px-6 py-3 text-2xl uppercase text-base-100"
          >
            {d.ourServices.title}
          </h2>
          <div className="flex flex-col gap-10">
            {d.ourServices.services.map((service, idx) => (
              <div key={idx} className={`${box} bg-base-100 p-6`}>
                <div className="mb-4 flex items-center gap-4 border-b-4 border-base-content pb-4">
                  <span
                    style={black}
                    className="border-4 border-base-content bg-yellow-300 px-3 py-1 text-sm uppercase text-black"
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 style={black} className="text-lg uppercase">
                    {service.title}
                  </h3>
                </div>
                <p className="mb-4 text-xs leading-relaxed opacity-80">{service.text}</p>
                {'items' in service && service.items && (
                  <ul className="flex flex-col gap-1.5 text-xs">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span style={black} className="shrink-0 text-yellow-400 dark:text-yellow-300 font-bold">●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {'richItems' in service && service.richItems && (
                  <ul className="flex flex-col gap-1.5 text-xs">
                    {service.richItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span style={black} className="shrink-0 text-yellow-400 dark:text-yellow-300 font-bold">●</span>
                        <span>
                          <span className="font-bold">{item.bold}</span> {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <ImageRow images={serviceImages[idx]} alt={service.imageAlt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-t-4 border-base-content px-5 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2
            style={black}
            className="mb-8 inline-block -rotate-1 border-4 border-base-content bg-base-content px-6 py-3 text-2xl uppercase text-base-100"
          >
            {d.howWeWork.title}
          </h2>
          <p className="mb-8 text-sm leading-relaxed opacity-80">{d.howWeWork.text}</p>
          <ul className="flex flex-col gap-0">
            {d.howWeWork.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 border-t-4 border-base-content py-5"
              >
                <span
                  style={black}
                  className="shrink-0 border-4 border-base-content bg-yellow-300 px-2 py-0.5 text-xs font-bold uppercase text-black"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-xs leading-relaxed">
                  <span className="font-bold">{item.bold}</span> {item.text}
                </span>
              </li>
            ))}
          </ul>
          <ImageRow images={howWeWorkImages} alt={d.howWeWork.imageAlt} />
        </div>
      </section>

      {/* Why choose — yellow block */}
      <section className="border-t-4 border-base-content bg-yellow-300 px-5 py-16 md:px-10">
        <div className="mx-auto max-w-6xl text-black">
          <h2
            style={black}
            className="mb-8 inline-block border-4 border-black px-6 py-3 text-2xl uppercase"
          >
            {d.whyChoose.title}
          </h2>
          <ul className="flex flex-col gap-0">
            {d.whyChoose.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 border-t-4 border-black py-5"
              >
                <span style={black} className="shrink-0 font-bold">●</span>
                <span className="text-xs leading-relaxed">
                  <span className="font-bold">{item.bold}</span> {item.text}
                </span>
              </li>
            ))}
          </ul>
          <ImageRow images={whyChooseImages} alt={d.whyChoose.imageAlt} />
          <div className="mt-10 border-t-4 border-black pt-10">
            <p style={black} className="mb-6 text-2xl uppercase leading-tight">{d.cta.text}</p>
            <Link
              to={previewHref('contact', token, variant, locale)}
              prefetch="intent"
              style={black}
              className="inline-block border-4 border-black bg-black px-8 py-4 text-sm uppercase text-yellow-300 transition-transform hover:-translate-y-1"
            >
              {d.cta.link.text} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
