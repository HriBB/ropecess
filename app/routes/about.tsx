import { MetaFunction } from '@remix-run/node'

import { Hero } from '~/components/Hero'
import { Container } from '~/components/Container'
import { Picture } from '~/components/Picture'

import bannerImage from '~/images/about/banner.jpg?hero'

import industrialImage from '~/images/services/industrial-rope-access-01.jpg?thumb'
import photovoltaicImage from '~/images/services/photovoltaic-module-installation-01.jpg?thumb'
import riggingImage from '~/images/services/rigging-01.jpg?thumb'
import stageImage from '~/images/services/stage-building-01.jpg?thumb'

const data = {
  meta: {
    title: 'Our Story',
    description:
      'Ropecess offers a range of specialized solutions such as photovoltaic installation, rock cleaning, venue rigging, and rope access in confined spaces.',
    image: bannerImage,
  },
  hero: {
    title: 'Our Story',
    image: bannerImage,
    imageAlt: 'Construction frame with workers',
  },
  items: [
    {
      id: 1,
      image: industrialImage,
      alt: 'Industrial rope access',
      text: 'At Ropecess, we specialize in providing high-quality rope work and height steel construction services, along with a range of other specialized services such as photovoltaic installation, rock cleaning, venue rigging, and rope access in confined spaces. With a deep-rooted passion for climbing and highline adventures, we have turned our love for vertical pursuits into a thriving business.',
    },
    {
      id: 2,
      image: photovoltaicImage,
      alt: 'Photovoltaic module installation',
      text: 'Founded five years ago, we have quickly become a trusted name in our industry. Our team boasts extensive experience and holds an IRATA certificate, ensuring that we meet the highest safety and operational standards.',
    },
    {
      id: 3,
      image: riggingImage,
      alt: 'Rigging',
      text: "But what sets us apart is not just our technical proficiency - it's our commitment to delivering exceptional results with a personal touch. We prioritize your needs and work closely with you to understand your requirements, ensuring that our solutions are tailor-made to meet your specific project goals.",
    },
    {
      id: 4,
      image: stageImage,
      alt: 'Stage building',
      text: "Whether it's constructing steel structures at great heights or harnessing renewable energy through photovoltaic installations, Ropecess is dedicated to delivering excellence in every project we undertake. Safety remains at the forefront of everything we do, and we strictly adhere to industry regulations to provide a secure working environment for our team and clients alike.",
    },
  ],
}

export const meta: MetaFunction = () => {
  return [
    {
      title: data.meta.title,
    },
    {
      name: 'description',
      content: data.meta.description,
    },
  ]
}

export default function About() {
  return (
    <main>
      <Hero>
        <Hero.BackgroundPicture
          picture={data.hero.image}
          alt={data.hero.imageAlt}
        />
        <Hero.Content className="md:translate-x-[100px] lg:max-w-3xl lg:translate-x-[150px]">
          <Hero.Title className="text-right [word-spacing:9999px]">
            {data.hero.title}
          </Hero.Title>
        </Hero.Content>
      </Hero>

      <section className="py-24">
        <Container size="md">
          <div className="flex flex-col gap-24">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 md:flex-row md:gap-10"
              >
                <Picture
                  picture={item.image}
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
    </main>
  )
}
