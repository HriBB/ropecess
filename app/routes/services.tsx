import { Link, MetaFunction } from 'react-router'

import { getMeta } from '~/utils/meta'
import { type Locale, useLocale, useLocalizeHref } from '~/utils/i18n'

import { Hero } from '~/components/Hero'
import { Container } from '~/components/Container'
import { Picture } from '~/components/Picture'

import { data } from '~/content/services'

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

export default function Services() {
  const locale = useLocale()
  const localizeHref = useLocalizeHref()
  const d = data[locale]

  return (
    <main>
      <Hero>
        <Hero.BackgroundPicture
          picture={d.hero.image}
          lqip={d.hero.lqip}
          alt={d.hero.imageAlt}
        />
        <Hero.Content className="lg:mr-10">
          <Hero.Title>{d.hero.title}</Hero.Title>
        </Hero.Content>
      </Hero>

      <section className="py-24">
        <Container size="md">
          <div className="flex flex-col gap-24">
            {d.items.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="flex flex-col gap-5 md:flex-row md:gap-10"
              >
                <Picture
                  picture={service.image}
                  lqip={service.lqip}
                  alt={service.title}
                  className="aspect- object-cover md:w-[400px]"
                  sizes="(max-width:767px) 100vw, 400px"
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col items-start justify-center gap-3">
                  <h2 className="text-2xl font-medium">
                    {'to' in service && service.to ? (
                      <Link to={localizeHref(service.to)}>{service.title}</Link>
                    ) : (
                      <a href={`#${service.id}`}>{service.title}</a>
                    )}
                  </h2>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
