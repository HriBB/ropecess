import { MetaFunction } from 'react-router'

import { getMeta } from '~/utils/meta'
import { type Locale, useLocale, useLocalizeHref } from '~/utils/i18n'

import { Hero } from '~/components/Hero'
import { Container } from '~/components/Container'

import { CallToAction } from '~/components/CallToAction'
import { Picture } from '~/components/Picture'
import { Lightbox, LightboxTrigger, LightboxContent } from '~/components/Lightbox'

import {
  data,
  serviceImages,
  howWeWorkImages,
  whyChooseImages,
} from '~/content/height-cleaning'

export const meta: MetaFunction = ({ matches, location }) => {
  const rootData = matches[0]?.data as { locale: Locale; env: { APP_URL: string } }
  const locale = rootData?.locale ?? 'en'
  return getMeta({
    ...data[locale].meta,
    locale,
    pathname: location.pathname,
    appUrl: rootData?.env?.APP_URL,
  })
}

function ImageGrid({
  images,
  alt,
}: {
  images: { thumb: any; full: any; lqip: any }[]
  alt: string
}) {
  return (
    <Lightbox>
      <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-3">
        {images.map((img, i) => (
          <LightboxTrigger key={i} index={i}>
            <Picture
              picture={img.thumb}
              lqip={img.lqip}
              alt={alt}
              className="aspect-square w-full object-cover"
              sizes="(max-width:767px) 100vw, 400px"
              loading="lazy"
            />
          </LightboxTrigger>
        ))}
      </div>
      <LightboxContent
        images={images.map((img) => ({
          picture: img.full,
          lqip: img.lqip,
          alt,
        }))}
      />
    </Lightbox>
  )
}

export default function HeightCleaning() {
  const locale = useLocale()
  const lh = useLocalizeHref()
  const d = data[locale]

  return (
    <main>
      <Hero>
        <Hero.BackgroundPicture
          picture={d.hero.image}
          lqip={d.hero.lqip}
          alt={d.hero.imageAlt}
        />
        <Hero.Content>
          <Hero.Title>
            <span>
              {d.hero.title[0]} <br /> {d.hero.title[1]}
            </span>
          </Hero.Title>
        </Hero.Content>
      </Hero>

      <Container size="md" className="py-24">
        <header className="mb-20">
          <p className="text-lg">{d.intro}</p>
        </header>

        <section className="mb-20">
          <h2 className="mb-12 text-3xl font-bold">{d.ourServices.title}</h2>

          {d.ourServices.services.map((service, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="mb-4">{service.text}</p>
              <ul className="mb-8 ml-8 list-disc space-y-2">
                {'items' in service &&
                  service.items?.map((item, i) => <li key={i}>{item}</li>)}
                {'richItems' in service &&
                  service.richItems?.map((item, i) => (
                    <li key={i}>
                      <span className="font-bold">{item.bold}</span> {item.text}
                    </li>
                  ))}
              </ul>
              <ImageGrid
                images={serviceImages[idx]}
                alt={service.imageAlt}
              />
            </div>
          ))}
        </section>

        <section className="mb-20">
          <h2 className="mb-4 text-3xl font-bold">{d.howWeWork.title}</h2>
          <p className="mb-6">{d.howWeWork.text}</p>
          <ul className="mb-8 ml-8 list-disc space-y-4">
            {d.howWeWork.items.map((item, i) => (
              <li key={i}>
                <span className="font-bold">{item.bold}</span> {item.text}
              </li>
            ))}
          </ul>
          <ImageGrid images={howWeWorkImages} alt={d.howWeWork.imageAlt} />
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-bold">{d.whyChoose.title}</h2>
          <ul className="mb-8 ml-8 list-disc space-y-2">
            {d.whyChoose.items.map((item, i) => (
              <li key={i}>
                <span className="font-bold">{item.bold}</span> {item.text}
              </li>
            ))}
          </ul>
          <ImageGrid images={whyChooseImages} alt={d.whyChoose.imageAlt} />
        </section>

        <CallToAction
          text={d.cta.text}
          link={{ ...d.cta.link, to: lh(d.cta.link.to) }}
        />
      </Container>
    </main>
  )
}
