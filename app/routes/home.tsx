import { Link, MetaFunction } from 'react-router'

//import type * as Route from './+types.home'
import { getMeta } from '~/utils/meta'

import { Main } from '~/components/Main'
import { Hero } from '~/components/Hero'
import { Button } from '~/components/Button'
import { Picture } from '~/components/Picture'
import { Container } from '~/components/Container'

import bannerImage from '~/images/home/banner.jpg?hero'
import bannerLqip from '~/images/home/banner.jpg?lqip'
import workPlanImage from '~/images/home/work-plan.jpg?square'
import workPlanLqip from '~/images/home/work-plan.jpg?lqip'
import accessPlanImage from '~/images/home/access-plan.jpg?square'
import accessPlanLqip from '~/images/home/access-plan.jpg?lqip'
import ourServicesImage from '~/images/home/our-services.jpg?square'
import ourServicesLqip from '~/images/home/our-services.jpg?lqip'

const data = {
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
  services: {
    title: 'Our Services',
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
  outro: {
    text: 'Contact us today to see how Ropecess can help bring your project to life.',
    link: {
      to: '/contact',
      text: 'Contact Us',
    },
  },
}

export const meta: MetaFunction = () => getMeta(data.meta)

export default function Index() {
  return (
    <Main>
      <Hero>
        <Hero.BackgroundPicture
          picture={data.hero.image}
          lqip={data.hero.lqip}
          alt={data.hero.imageAlt}
        />
        <Hero.Content>
          <Hero.Title>{data.hero.title}</Hero.Title>
          <Button
            as={Link}
            to={data.hero.link.to}
            color="primary"
            size="lg"
            prefetch="viewport"
          >
            {data.hero.link.text}
          </Button>
        </Hero.Content>
      </Hero>

      <section className="bg-base-200 py-24" id={data.intro.id}>
        <Container className="flex flex-col gap-24">
          <div className="flex flex-col items-start md:items-center">
            <Main.H2>
              <a href={`#${data.intro.id}`}>{data.intro.title}</a>
            </Main.H2>
            <p className="max-w-3xl text-left text-xl leading-normal md:text-center">
              {data.intro.text}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-20 md:grid-cols-3 md:gap-20">
            {data.services.items.map((item) => (
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

      <section className="py-24">
        <Container className="flex flex-col items-center gap-10">
          <p className="text-xl">{data.outro.text}</p>
          <Button
            as={Link}
            to={data.outro.link.to}
            className="w-full md:w-auto"
            size="lg"
            color="primary"
            prefetch="viewport"
          >
            {data.outro.link.text}
          </Button>
        </Container>
      </section>
    </Main>
  )
}
