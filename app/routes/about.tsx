import { Hero } from '~/components/Hero'
import { Container } from '~/components/Container'

const data = {
  hero: {
    title: 'Our Story',
    image: '/images/about/banner.jpg',
    imageAlt: 'Construction frame with workers',
  },
  items: [
    {
      id: 1,
      image: '/images/services/industrial-rope-access-01.jpg',
      alt: 'Industrial rope access',
      text: 'At Ropecess, we specialize in providing high-quality rope work and height steel construction services, along with a range of other specialized services such as photovoltaic installation, rock cleaning, venue rigging, and rope access in confined spaces. With a deep-rooted passion for climbing and highline adventures, we have turned our love for vertical pursuits into a thriving business.',
    },
    {
      id: 2,
      image: '/images/services/photovoltaic-module-installation-01.jpg',
      alt: 'Photovoltaic module installation',
      text: 'Founded five years ago, we have quickly become a trusted name in our industry. Our team boasts extensive experience and holds an IRATA certificate, ensuring that we meet the highest safety and operational standards.',
    },
    {
      id: 3,
      image: '/images/services/rigging-01.jpg',
      alt: 'Rigging',
      text: "But what sets us apart is not just our technical proficiency - it's our commitment to delivering exceptional results with a personal touch. We prioritize your needs and work closely with you to understand your requirements, ensuring that our solutions are tailor-made to meet your specific project goals.",
    },
    {
      id: 4,
      image: '/images/services/stage-building-01.jpg',
      alt: 'Stage building',
      text: "Whether it's constructing steel structures at great heights or harnessing renewable energy through photovoltaic installations, Ropecess is dedicated to delivering excellence in every project we undertake. Safety remains at the forefront of everything we do, and we strictly adhere to industry regulations to provide a secure working environment for our team and clients alike.",
    },
  ],
}

export default function About() {
  return (
    <main>
      <Hero>
        <Hero.BackgroundImage src={data.hero.image} alt={data.hero.imageAlt} />
        <Hero.Content>
          <Hero.Title className="text-right [word-spacing:9999px]">
            {data.hero.title}
          </Hero.Title>
        </Hero.Content>
      </Hero>

      <section className="py-24">
        <Container>
          <div className="flex flex-col gap-20 py-20">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 md:flex-row md:items-center"
              >
                <div className="flex-[2]">
                  <img
                    className="max-h-96 w-full object-cover"
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                  />
                </div>
                <p className="flex-[3]">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
