import { Container } from '~/components/Container'
import { Hero } from '~/components/Hero'

const items = [
  {
    id: 1,
    title: 'Photovoltaic Modules Installation',
    image: '/img/services/photovoltaic-module-installation-01.jpg',
    description:
      'Our team allready worked on various PV constructon sites, ranging from flat roofs to vertical PV instalation. Every project is its own, and has to be tailored to construction site parameters.',
  },
  {
    id: 2,
    title: 'Industrial Rope Access and Climbing',
    image: '/img/services/industrial-rope-access-01.jpg',
    description:
      'Working for various companies, from High Bay Warehouses to rock cleaning, our range of knowlege expands with each project. Work on ropes is our specialty.',
  },
  {
    id: 3,
    title: 'Rigging',
    image: '/img/services/rigging-01.jpg',
    description:
      'Venue rigging are projects, which demand more knowlege than you can think of. It is not just pulling chains up in the air and fixing them, but also weight redundancy calculating and setting points exactly on spot, so they are in perfect position for the gig.',
  },
  {
    id: 4,
    title: 'Stage Building',
    image: '/img/services/stage-building-01.jpg',
    description: 'Working on big stages for StageCo Nederland and Belgium.',
  },
]

export default function Services() {
  return (
    <main>
      <Hero backgroundImage="/img/services/banner.jpg">
        <Hero.Content>
          <Hero.Title>Services</Hero.Title>
        </Hero.Content>
      </Hero>

      <Container as="section">
        <div className="flex flex-col gap-20 py-20 md:gap-10">
          {items.map((service) => (
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
    </main>
  )
}
