import { Hero } from '~/components/Hero'
import { Container } from '~/components/Container'

const data = {
  hero: {
    title: 'Services',
    image: '/images/services/banner.jpg',
    imageAlt: 'Construction frame with workers',
  },
  items: [
    {
      id: 1,
      title: 'Photovoltaic Modules Installation',
      image: '/images/services/photovoltaic-module-installation-01.jpg',
      description:
        'Our team allready worked on various PV constructon sites, ranging from flat roofs to vertical PV instalation. Every project is its own, and has to be tailored to construction site parameters.',
    },
    {
      id: 2,
      title: 'Industrial Rope Access and Climbing',
      image: '/images/services/industrial-rope-access-01.jpg',
      description:
        'Working for various companies, from High Bay Warehouses to rock cleaning, our range of knowlege expands with each project. Work on ropes is our specialty.',
    },
    {
      id: 3,
      title: 'Rigging',
      image: '/images/services/rigging-01.jpg',
      description:
        'Venue rigging are projects, which demand more knowlege than you can think of. It is not just pulling chains up in the air and fixing them, but also weight redundancy calculating and setting points exactly on spot, so they are in perfect position for the gig.',
    },
    {
      id: 4,
      title: 'Stage Building',
      image: '/images/services/stage-building-01.jpg',
      description: 'Working on big stages for StageCo Nederland and Belgium.',
    },
  ],
  services: [
    {
      id: 1,
      title: 'Rock Cleaning and Anchoring',
      text: 'Ensuring the stability and safety of rock faces and slopes through expert cleaning and secure anchoring techniques.',
    },
    {
      id: 2,
      title: 'Photovoltaic Installation',
      text: 'Providing complete photovoltaic system installations, from planning and design to installation and maintenance.',
    },
    {
      id: 3,
      title: 'Steel Construction Assembly',
      text: 'Precision assembly of steel structures for industrial, commercial, and residential projects.',
    },
    {
      id: 4,
      title: 'Crane Rigging',
      text: 'Expert rigging services for safe and efficient lifting and movement of heavy materials and equipment.',
    },
    {
      id: 5,
      title: 'Venue Rigging',
      text: 'Professional rigging for events, ensuring the safe and secure setup of stages, lighting, and other structures.',
    },
    {
      id: 6,
      title: 'Window Cleaning',
      text: 'High-quality window cleaning services for buildings of all heights, using safe and efficient rope access techniques.',
    },
    {
      id: 7,
      title: 'Confined Space Rope Access',
      text: 'Specialized services for working in confined spaces, where traditional access methods are impractical.',
    },
    {
      id: 8,
      title: 'Concrete and Facade Examination',
      text: 'Thorough inspections and assessments of concrete structures and facades to identify and address potential issues.',
    },
  ],
}

export default function Services() {
  return (
    <main>
      <Hero>
        <Hero.BackgroundImage src={data.hero.image} alt={data.hero.imageAlt} />
        <Hero.Content>
          <Hero.Title>{data.hero.title}</Hero.Title>
        </Hero.Content>
      </Hero>

      <section className="py-24">
        <Container>
          <div className="flex flex-col gap-20 py-20 md:gap-10">
            {data.items.map((service) => (
              <div key={service.id} className="flex flex-col gap-5 md:flex-row">
                <div className="flex flex-1 items-center justify-center">
                  <img
                    src={service.image}
                    className="w-full object-cover md:aspect-square"
                    alt={service.title}
                  />
                </div>
                <div className="flex flex-1 flex-col items-start justify-center gap-3">
                  <h2 className="text-2xl font-medium">{service.title}</h2>
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
