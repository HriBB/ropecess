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

function ImageRow({ images, alt }: { images: { thumb: any; full: any; lqip: any }[]; alt: string }) {
  return (
    <div className="mt-8 mb-20 grid grid-cols-3 gap-2">
      {images.slice(0, 3).map((img, i) => (
        <Picture
          key={i}
          picture={img.thumb}
          lqip={img.lqip}
          alt={alt}
          className="aspect-square w-full object-cover"
          sizes="(max-width:767px) 33vw, 200px"
          loading="lazy"
        />
      ))}
    </div>
  )
}

export default function VariantBHeightCleaning() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPathname(pathname)
  const d = data[locale]

  return (
    <main>
      {/* Hero — type only */}
      <section className="px-6 pb-20 pt-36 md:px-12">
        <SectionNumber n="01" label={d.hero.title[0]} />
        <h1
          style={garamond}
          className="max-w-5xl text-[clamp(2rem,6vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em]"
        >
          <span>{d.hero.title[0]} </span>
          <span style={{ color: ORANGE, fontStyle: 'italic' }}>{d.hero.title[1]}</span>
        </h1>
      </section>

      <section className="px-6 pb-32 md:px-12">
        {/* Intro */}
        <p
          style={garamond}
          className="mb-24 text-2xl leading-relaxed opacity-70 max-w-3xl md:text-3xl"
        >
          {d.intro}
        </p>

        {/* Our services */}
        <SectionNumber n="02" label={d.ourServices.title} />
        {d.ourServices.services.map((service, idx) => (
          <div key={idx} className="mb-24">
            <div className="mb-6 border-b border-base-content/15 pb-6">
              <span className="mr-4 text-xs font-bold text-base-content/75" style={lato}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span style={garamond} className="text-2xl font-medium md:text-3xl">
                {service.title}
              </span>
            </div>
            <p className="mb-6 text-sm leading-loose opacity-70" style={lato}>
              {service.text}
            </p>
            {'items' in service && service.items && (
              <ul className="mb-8 ml-6 list-disc space-y-2 text-sm opacity-70" style={lato}>
                {service.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            )}
            {'richItems' in service && service.richItems && (
              <ul className="mb-8 ml-6 list-disc space-y-2 text-sm opacity-70" style={lato}>
                {service.richItems.map((item, i) => (
                  <li key={i}>
                    <span className="font-bold">{item.bold}</span> {item.text}
                  </li>
                ))}
              </ul>
            )}
            <ImageRow images={serviceImages[idx]} alt={service.imageAlt} />
          </div>
        ))}

        {/* How we work */}
        <SectionNumber n="03" label={d.howWeWork.title} />
        <p className="mb-8 text-sm leading-loose opacity-70" style={lato}>
          {d.howWeWork.text}
        </p>
        <ul className="mb-10 ml-6 list-disc space-y-3 text-sm opacity-70" style={lato}>
          {d.howWeWork.items.map((item, i) => (
            <li key={i}>
              <span className="font-bold">{item.bold}</span> {item.text}
            </li>
          ))}
        </ul>
        <ImageRow images={howWeWorkImages} alt={d.howWeWork.imageAlt} />

        {/* Why choose */}
        <SectionNumber n="04" label={d.whyChoose.title} />
        <ul className="mb-10 ml-6 list-disc space-y-2 text-sm opacity-70" style={lato}>
          {d.whyChoose.items.map((item, i) => (
            <li key={i}>
              <span className="font-bold">{item.bold}</span> {item.text}
            </li>
          ))}
        </ul>
        <ImageRow images={whyChooseImages} alt={d.whyChoose.imageAlt} />

        {/* CTA */}
        <div className="mt-16 border-t border-base-content/10 pt-16 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p
            style={garamond}
            className="text-2xl font-medium leading-relaxed max-w-xl md:text-3xl"
          >
            {d.cta.text}
          </p>
          <Link
            to={previewHref('contact', token, variant, locale)}
            prefetch="intent"
            className="inline-block shrink-0 px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85"
            style={{ ...lato, backgroundColor: ORANGE }}
          >
            {d.cta.link.text}
          </Link>
        </div>
      </section>
    </main>
  )
}
