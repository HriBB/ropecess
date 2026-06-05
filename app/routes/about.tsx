import { MetaFunction } from 'react-router'

import { getMeta } from '~/utils/meta'
import { type Locale, useLocale } from '~/utils/i18n'

import { Main } from '~/components/Main'
import { Hero } from '~/components/Hero'
import { Container } from '~/components/Container'
import { Picture } from '~/components/Picture'

import { data } from '~/content/about'

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

export default function About() {
  const locale = useLocale()
  const d = data[locale]

  return (
    <Main>
      <Hero>
        <Hero.BackgroundPicture
          picture={d.hero.image}
          lqip={d.hero.lqip}
          alt={d.hero.imageAlt}
        />
        <Hero.Content className="md:translate-x-[100px] lg:max-w-3xl lg:translate-x-[150px]">
          <Hero.Title className="text-right [word-spacing:9999px]">
            {d.hero.title}
          </Hero.Title>
        </Hero.Content>
      </Hero>

      <section className="py-24">
        <Container size="md">
          <div className="flex flex-col gap-24">
            {d.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 md:flex-row md:gap-10"
              >
                <Picture
                  picture={item.image}
                  lqip={item.lqip}
                  alt={item.alt}
                  className="aspect-square md:w-[400px]"
                  sizes="(max-width:767px) 100vw, 400px"
                  loading="lazy"
                />
                <p className="flex-1">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </Main>
  )
}
