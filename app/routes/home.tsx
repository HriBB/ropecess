import { Link, MetaFunction } from 'react-router'

import { getMeta } from '~/utils/meta'
import { type Locale, useLocale, useLocalizeHref } from '~/utils/i18n'

import { Main } from '~/components/Main'
import { Hero } from '~/components/Hero'
import { Button } from '~/components/Button'
import { Picture } from '~/components/Picture'
import { Container } from '~/components/Container'
import { CallToAction } from '~/components/CallToAction'

import bannerImage from '~/images/home/banner.jpg?hero'
import bannerLqip from '~/images/home/banner.jpg?lqip'
import workPlanImage from '~/images/home/work-plan.jpg?square'
import workPlanLqip from '~/images/home/work-plan.jpg?lqip'
import accessPlanImage from '~/images/home/access-plan.jpg?square'
import accessPlanLqip from '~/images/home/access-plan.jpg?lqip'
import ourServicesImage from '~/images/home/our-services.jpg?square'
import ourServicesLqip from '~/images/home/our-services.jpg?lqip'

const data = {
  en: {
    meta: {
      title: 'Ropecess',
      description:
        'Ropecess delivers top-quality construction and specialized access services, ensuring safety, precision, and reliability in every project.',
      image: bannerImage,
    },
    hero: {
      title: 'Plan your next rope access project',
      image: bannerImage,
      lqip: bannerLqip,
      imageAlt: 'Construction frame',
      link: {
        to: '/contact',
        text: 'Contact Us',
      },
    },
    intro: {
      id: 'welcome',
      title: 'Welcome to Ropecess',
      text: 'At Ropecess, we deliver top-quality construction and specialized access services, ensuring safety, precision, and reliability in every project.',
    },
    howWeWork: {
      title: 'How We Work',
      items: [
        {
          id: 'work-plan',
          title: 'Work Plan',
          image: workPlanImage,
          lqip: workPlanLqip,
          text: 'Our Work Plan ensures every project is completed on time, within budget, and to the highest standards. We carefully plan, manage timelines, allocate resources, and mitigate risks, keeping you informed at every step.',
        },
        {
          id: 'access-plan',
          title: 'Access Plan',
          image: accessPlanImage,
          lqip: accessPlanLqip,
          text: 'Our Access Plan prioritizes safety and efficiency. We use advanced rope access and innovative methods to safely reach challenging areas, minimizing disruptions and reducing costs while maintaining top safety standards.',
        },
        {
          id: 'our-services',
          title: 'Our Services',
          image: ourServicesImage,
          lqip: ourServicesLqip,
          text: 'We offer a wide range of specialized construction and access services to cater to various industry needs.',
        },
      ],
    },
    cta: {
      text: 'Contact us today to see how Ropecess can help bring your project to life.',
      link: {
        to: '/contact',
        text: 'Contact Us',
      },
    },
  },
  sl: {
    meta: {
      title: 'Ropecess',
      description:
        'Ropecess zagotavlja visokokakovostne gradbene in specializirane dostopne storitve z varnostjo, natančnostjo in zanesljivostjo pri vsakem projektu.',
      image: bannerImage,
    },
    hero: {
      title: 'Načrtujte svoj naslednji projekt z Ropecess',
      image: bannerImage,
      lqip: bannerLqip,
      imageAlt: 'Gradbeni oder',
      link: {
        to: '/contact',
        text: 'Kontaktirajte nas',
      },
    },
    intro: {
      id: 'welcome',
      title: 'Dobrodošli v Ropecess',
      text: 'V podjetju Ropecess zagotavljamo visokokakovostne gradbene in specializirane dostopne storitve z varnostjo, natančnostjo in zanesljivostjo pri vsakem projektu.',
    },
    howWeWork: {
      title: 'Kako delamo',
      items: [
        {
          id: 'work-plan',
          title: 'Delovni načrt',
          image: workPlanImage,
          lqip: workPlanLqip,
          text: 'Naš delovni načrt zagotavlja, da je vsak projekt zaključen pravočasno, v okviru proračuna in po najvišjih standardih. Skrbno načrtujemo, upravljamo časovnice, razporejamo vire in zmanjšujemo tveganja ter vas obveščamo na vsakem koraku.',
        },
        {
          id: 'access-plan',
          title: 'Načrt dostopa',
          image: accessPlanImage,
          lqip: accessPlanLqip,
          text: 'Naš načrt dostopa daje prednost varnosti in učinkovitosti. Uporabljamo napredni vrvni dostop in inovativne metode za varno doseganje zahtevnih območij, zmanjšujemo motnje in znižujemo stroške ob ohranjanju najvišjih varnostnih standardov.',
        },
        {
          id: 'our-services',
          title: 'Naše storitve',
          image: ourServicesImage,
          lqip: ourServicesLqip,
          text: 'Ponujamo širok nabor specializiranih gradbenih in dostopnih storitev za različne industrijske potrebe.',
        },
      ],
    },
    cta: {
      text: 'Kontaktirajte nas še danes in odkrijte, kako vam Ropecess lahko pomaga uresničiti vaš projekt.',
      link: {
        to: '/contact',
        text: 'Kontaktirajte nas',
      },
    },
  },
}

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

      <CallToAction
        text={d.cta.text}
        link={{ ...d.cta.link, to: lh(d.cta.link.to) }}
      />
    </Main>
  )
}
