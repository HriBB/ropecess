import { Link } from '@remix-run/react'

import { Hero } from '~/components/Hero'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'

const items = [
  {
    id: 1,
    title: 'Work plan',
    image: '/img/home/work-plan.jpg',
    text: 'Helping you arrange workflow and organize teams',
    list: null,
  },
  {
    id: 2,
    title: 'Access plan',
    image: '/img/home/access-plan.jpg',
    text: 'Plan rope access operation with us. We help you check your construction site, and we plan best rope access solution suitable to your needs',
    list: null,
  },
  {
    id: 3,
    title: 'Our services',
    image: '/img/home/our-services.jpg',
    text: null,
    list: [
      'Rock cleaning and anchoring',
      'Photovoltaic',
      'Steel construction assembly',
      'Crane rigging',
      'Venue rigging',
      'Window cleaning',
      'Confined space rope access',
      'Concrete and facade examination',
    ],
  },
]

export default function Index() {
  return (
    <main>
      <Hero backgroundImage="/img/home/banner.jpg">
        <Hero.Content>
          <Hero.Title>Plan your next rope access project</Hero.Title>
          <Button as={Link} to="/contact" color="primary">
            Contact Us
          </Button>
        </Hero.Content>
      </Hero>

      <Container as="section">
        <div className="flex flex-col gap-10 py-20">
          <div className="flex flex-col items-center gap-5">
            <h3 className="text-lg uppercase tracking-wide">Our Services</h3>
            <h2 className="text-3xl font-medium">
              Help you plan your next project
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-20 md:grid-cols-3 md:gap-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-1 flex-col gap-2 md:gap-10"
              >
                <img
                  className="mb-3 w-full"
                  src={item.image}
                  alt={item.title}
                />
                <h3 className="text-xl font-bold">{item.title}</h3>
                {item.text && <p>{item.text}</p>}
                {item.list && (
                  <ul className="list list-inside list-disc">
                    {item.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  )
}
