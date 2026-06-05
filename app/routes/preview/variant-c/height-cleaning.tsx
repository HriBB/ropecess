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

function ImageRow({ images, alt }: { images: { thumb: any; full: any; lqip: any }[]; alt: string }) {
  return (
    <div className="mt-10 mb-16 grid grid-cols-3 gap-3">
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

export default function VariantCHeightCleaning() {
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
            {d.hero.title[0]}
          </p>
          <h1 className="max-w-3xl text-5xl font-extralight leading-[1.08] tracking-tight md:text-7xl">
            {d.hero.title[0]} {d.hero.title[1]}
          </h1>
        </div>
      </section>

      {/* Intro */}
      <Chapter label={locale === 'sl' ? 'Uvod' : 'Overview'}>
        <p className="text-2xl font-extralight leading-relaxed tracking-tight opacity-70 max-w-3xl md:text-3xl">
          {d.intro}
        </p>
      </Chapter>

      {/* Our services */}
      <Chapter label={d.ourServices.title} muted>
        <div className="flex flex-col gap-20">
          {d.ourServices.services.map((service, idx) => (
            <div key={idx}>
              <div className="mb-6 flex items-baseline gap-6 border-b border-base-content/10 pb-6">
                <span className="w-8 shrink-0 text-xs font-bold text-amber-500">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl font-extralight tracking-tight">{service.title}</h3>
              </div>
              <p className="mb-6 ml-14 text-sm leading-loose opacity-70">{service.text}</p>
              {'items' in service && service.items && (
                <ul className="mb-8 ml-14 flex flex-col gap-2 text-sm opacity-70">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {'richItems' in service && service.richItems && (
                <ul className="mb-8 ml-14 flex flex-col gap-2 text-sm opacity-70">
                  {service.richItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      <span>
                        <span className="font-medium">{item.bold}</span> {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <ImageRow images={serviceImages[idx]} alt={service.imageAlt} />
            </div>
          ))}
        </div>
      </Chapter>

      {/* How we work */}
      <Chapter label={d.howWeWork.title}>
        <p className="mb-8 text-sm leading-loose opacity-70">{d.howWeWork.text}</p>
        <ul className="mb-10 flex flex-col gap-3 text-sm opacity-70">
          {d.howWeWork.items.map((item, i) => (
            <li key={i} className="flex items-start gap-4 border-t border-base-content/10 pt-4">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              <span>
                <span className="font-medium">{item.bold}</span> {item.text}
              </span>
            </li>
          ))}
        </ul>
        <ImageRow images={howWeWorkImages} alt={d.howWeWork.imageAlt} />
      </Chapter>

      {/* Why choose */}
      <Chapter label={d.whyChoose.title} muted>
        <ul className="mb-10 flex flex-col gap-3 text-sm opacity-70">
          {d.whyChoose.items.map((item, i) => (
            <li key={i} className="flex items-start gap-4 border-t border-base-content/10 pt-4">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              <span>
                <span className="font-medium">{item.bold}</span> {item.text}
              </span>
            </li>
          ))}
        </ul>
        <ImageRow images={whyChooseImages} alt={d.whyChoose.imageAlt} />
        <div className="mt-16 border-t border-base-content/10 pt-16 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-2xl font-extralight leading-relaxed max-w-xl md:text-3xl">
            {d.cta.text}
          </p>
          <Link
            to={previewHref('contact', token, variant, locale)}
            prefetch="intent"
            className="group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-black transition-transform group-hover:scale-110">
              →
            </span>
            {d.cta.link.text}
          </Link>
        </div>
      </Chapter>
    </main>
  )
}
