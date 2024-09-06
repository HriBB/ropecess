import { Link } from '@remix-run/react'

import { Hero } from '~/components/Hero'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'

const data = {
  hero: {
    title: 'Plan your next rope access project',
    image: '/images/home/banner.jpg',
    imageAlt: 'Construction frame',
    link: {
      to: '/contact',
      text: 'Contact Us',
    },
  },
  intro: {
    title: 'Welcome to Ropecess',
    text: 'At Ropecess, we deliver top-quality construction and specialized access services, ensuring safety, precision, and reliability in every project.',
  },
  services: {
    title: 'Our Services',
    items: [
      {
        id: 1,
        title: 'Work Plan',
        image: '/images/home/work-plan.jpg',
        text: 'Our Work Plan ensures every project is completed on time, within budget, and to the highest standards. We carefully plan, manage timelines, allocate resources, and mitigate risks, keeping you informed at every step.',
      },
      {
        id: 2,
        title: 'Access Plan',
        image: '/images/home/access-plan.jpg',
        text: 'Our Access Plan prioritizes safety and efficiency. We use advanced rope access and innovative methods to safely reach challenging areas, minimizing disruptions and reducing costs while maintaining top safety standards.',
      },
      {
        id: 3,
        title: 'Our Services',
        image: '/images/home/our-services.jpg',
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

export default function Index() {
  return (
    <main>
      <Hero>
        <Hero.BackgroundImage src={data.hero.image} alt={data.hero.imageAlt} />
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

      <section className="py-24">
        <Container>
          <div className="flex flex-col items-start gap-10 md:items-center">
            <h1 className="text-5xl font-bold">{data.intro.title}</h1>
            <p className="max-w-3xl text-left text-xl leading-normal md:text-center">
              {data.intro.text}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-base-200 py-24">
        <Container className="flex flex-col gap-10">
          <h3 className="text-center text-lg uppercase tracking-wide">
            {data.services.title}
          </h3>
          <div className="grid grid-cols-1 gap-20 md:grid-cols-3 md:gap-20">
            {data.services.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-1 flex-col gap-2 md:gap-10"
              >
                <img
                  className="mb-3 w-full"
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />
                <h3 className="text-3xl font-bold">{item.title}</h3>
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
            color="primary"
            prefetch="viewport"
          >
            {data.outro.link.text}
          </Button>
        </Container>
      </section>
    </main>
  )
}
