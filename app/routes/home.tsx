import { Link, MetaFunction } from 'react-router'

import { getMeta } from '~/utils/meta'
import { type Locale, useLocale, useLocalizeHref } from '~/utils/i18n'

import { Main } from '~/components/Main'
import { Hero } from '~/components/Hero'
import { Button } from '~/components/Button'
import { Picture } from '~/components/Picture'
import { Container } from '~/components/Container'
import { CallToAction } from '~/components/CallToAction'

// PROTOTYPE — homepage design exploration, dev-only (see home-prototype/index.tsx)
import { HomePrototype, type HomeVariantProps } from './home-prototype'

import { data } from '~/content/home'

export const meta: MetaFunction = ({ matches, location }) => {
  const rootData = matches[0]?.data as {
    locale: Locale
    env: { APP_URL: string }
  }
  const locale = rootData?.locale ?? 'en'
  return getMeta({
    ...data[locale].meta,
    locale,
    pathname: location.pathname,
    appUrl: rootData?.env?.APP_URL,
  })
}

export default function Index() {
  const locale = useLocale()
  const lh = useLocalizeHref()
  const d = data[locale]

  // PROTOTYPE — `?variant=a|b|c|d|e` swaps the rendering; original by default.
  return (
    <HomePrototype
      d={d}
      lh={lh}
      locale={locale}
      original={<OriginalHome d={d} lh={lh} locale={locale} />}
    />
  )
}

function OriginalHome({ d, lh }: HomeVariantProps) {
  return (
    <Main>
      <Hero>
        <Hero.BackgroundPicture
          picture={d.hero.image}
          lqip={d.hero.lqip}
          alt={d.hero.imageAlt}
        />
        <Hero.Content>
          <Hero.Title>{d.hero.title}</Hero.Title>
          <Button
            as={Link}
            to={lh(d.hero.link.to)}
            color="primary"
            size="lg"
            prefetch="intent"
          >
            {d.hero.link.text}
          </Button>
        </Hero.Content>
      </Hero>

      <section className="bg-base-200 py-24" id={d.intro.id}>
        <Container className="flex flex-col gap-24">
          <div className="flex flex-col items-start md:items-center">
            <Main.H2>
              <a href={`#${d.intro.id}`}>{d.intro.title}</a>
            </Main.H2>
            <p className="max-w-3xl text-left text-xl leading-normal md:text-center">
              {d.intro.text}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-20 md:grid-cols-3 md:gap-20">
            {d.howWeWork.items.map((item) => (
              <div
                key={item.id}
                id={item.id}
                className="flex flex-1 flex-col gap-2 md:gap-6"
              >
                <Picture
                  picture={item.image}
                  lqip={item.lqip}
                  alt={item.title}
                  className="w-full"
                  loading="lazy"
                  sizes="(max-width:767px) 100vw, 400px"
                />
                <Main.H3 className="mb-0">
                  <a href={`#${item.id}`}>{item.title}</a>
                </Main.H3>
                {item.text && <p>{item.text}</p>}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* height-cleaning spotlight — dedicated section at the owner's request */}
      <section className="py-24" id={d.heightCleaning.id}>
        <Container className="flex flex-col gap-16">
          <div className="flex flex-col items-start md:items-center">
            <Main.H2>
              <a href={`#${d.heightCleaning.id}`}>{d.heightCleaning.title}</a>
            </Main.H2>
            <p className="max-w-3xl text-left text-xl leading-normal md:text-center">
              {d.heightCleaning.text}
            </p>
            <ul className="mt-8 flex flex-wrap gap-3 md:justify-center">
              {d.heightCleaning.items.map((item) => (
                <li key={item} className="badge badge-outline badge-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {d.heightCleaning.images.map((img) => (
              <Picture
                key={img.alt}
                picture={img.image}
                lqip={img.lqip}
                alt={img.alt}
                className="aspect-square w-full object-cover"
                loading="lazy"
                sizes="(max-width:767px) 100vw, 400px"
              />
            ))}
          </div>
          <div className="flex md:justify-center">
            <Button
              as={Link}
              to={lh(d.heightCleaning.link.to)}
              color="primary"
              size="lg"
              prefetch="intent"
            >
              {d.heightCleaning.link.text}
            </Button>
          </div>
        </Container>
      </section>

      <CallToAction
        text={d.cta.text}
        link={{ ...d.cta.link, to: lh(d.cta.link.to) }}
      />
    </Main>
  )
}
