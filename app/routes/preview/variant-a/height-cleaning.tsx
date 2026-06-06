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
  return getPreviewMeta(`${title} — Airy Organic`)
}

const font = { fontFamily: "'Albert Sans', sans-serif" } as const
const sageText = 'text-[#4d6950] dark:text-[#a7c4a9]'
const sageBg =
  'bg-[#5f7c61] text-white hover:bg-[#4d664f] dark:bg-[#a7c4a9] dark:text-[#1c241d] dark:hover:bg-[#c0d6c1]'

function ServiceImageRow({
  images,
  alt,
}: {
  images: { thumb: any; full: any; lqip: any }[]
  alt: string
}) {
  return (
    <div className="mt-8 mb-16 grid grid-cols-3 gap-4">
      {images.slice(0, 3).map((img, i) => (
        <Picture
          key={i}
          picture={img.thumb}
          lqip={img.lqip}
          alt={alt}
          className="aspect-square w-full object-cover rounded-[1.5rem]"
          sizes="(max-width:767px) 33vw, 200px"
          loading="lazy"
        />
      ))}
    </div>
  )
}

export default function VariantAHeightCleaning() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPathname(pathname)
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
              {d.hero.title[0]}
              <br />
              {d.hero.title[1]}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="mx-auto max-w-4xl">
          {/* Intro */}
          <p className="mb-24 text-lg leading-loose opacity-70 text-center max-w-2xl mx-auto">
            {d.intro}
          </p>

          {/* Our services */}
          <h2 className={`mb-16 text-2xl font-light tracking-tight md:text-3xl ${sageText}`}>
            {d.ourServices.title}
          </h2>
          {d.ourServices.services.map((service, idx) => (
            <div key={idx} className="mb-24">
              <h3 className="mb-4 text-xl font-medium">{service.title}</h3>
              <p className="mb-6 text-sm leading-loose opacity-70">{service.text}</p>
              {'items' in service && service.items && (
                <ul className="mb-8 ml-6 list-disc space-y-2 text-sm opacity-70">
                  {service.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )}
              {'richItems' in service && service.richItems && (
                <ul className="mb-8 ml-6 list-disc space-y-2 text-sm opacity-70">
                  {service.richItems.map((item, i) => (
                    <li key={i}>
                      <span className="font-semibold">{item.bold}</span> {item.text}
                    </li>
                  ))}
                </ul>
              )}
              <ServiceImageRow images={serviceImages[idx]} alt={service.imageAlt} />
            </div>
          ))}

          {/* How we work */}
          <h2 className={`mb-8 text-2xl font-light tracking-tight md:text-3xl ${sageText}`}>
            {d.howWeWork.title}
          </h2>
          <p className="mb-8 text-sm leading-loose opacity-70">{d.howWeWork.text}</p>
          <ul className="mb-16 ml-6 list-disc space-y-3 text-sm opacity-70">
            {d.howWeWork.items.map((item, i) => (
              <li key={i}>
                <span className="font-semibold">{item.bold}</span> {item.text}
              </li>
            ))}
          </ul>
          <ServiceImageRow images={howWeWorkImages} alt={d.howWeWork.imageAlt} />

          {/* Why choose */}
          <h2 className={`mb-8 text-2xl font-light tracking-tight md:text-3xl ${sageText}`}>
            {d.whyChoose.title}
          </h2>
          <ul className="mb-16 ml-6 list-disc space-y-2 text-sm opacity-70">
            {d.whyChoose.items.map((item, i) => (
              <li key={i}>
                <span className="font-semibold">{item.bold}</span> {item.text}
              </li>
            ))}
          </ul>
          <ServiceImageRow images={whyChooseImages} alt={d.whyChoose.imageAlt} />

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="mb-8 text-sm leading-loose opacity-70">{d.cta.text}</p>
            <Link
              to={previewHref('contact', token, variant, locale)}
              prefetch="intent"
              className={`rounded-full px-10 py-4 text-sm font-semibold transition-colors ${sageBg}`}
            >
              {d.cta.link.text}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
