import { MetaFunction } from 'react-router'

//import type { Route } from './+types/services'
import { getMeta } from '~/utils/meta'

import { Hero } from '~/components/Hero'
import { Container } from '~/components/Container'

import bannerImage from '~/images/services/banner.jpg?hero'
import bannerLqip from '~/images/services/banner.jpg?lqip'
import { CallToAction } from '~/components/CallToAction'

const data = {
  meta: {
    title: 'Professional Care at Any Height',
    description:
      'At Ropecess, we go where others can’t. Whether your facility requires surgical precision on delicate glass or heavy-duty maintenance on steel structures, our team delivers high-quality solutions using the most efficient access methods available.',
    image: bannerImage,
  },
  hero: {
    title: 'Professional Care at Any Height',
    image: bannerImage,
    lqip: bannerLqip,
    imageAlt: 'Construction frame with workers',
  },
  cta: {
    text: 'Contact us today to see how Ropecess can help bring your project to life.',
    link: {
      to: '/contact',
      text: 'Contact Us',
    },
  },
}

export const meta: MetaFunction = () => getMeta(data.meta)

export default function Services() {
  return (
    <main>
      <Hero>
        <Hero.BackgroundPicture
          picture={data.hero.image}
          lqip={data.hero.lqip}
          alt={data.hero.imageAlt}
        />
        <Hero.Content className="lg:mr-10">
          <Hero.Title>{data.hero.title}</Hero.Title>
        </Hero.Content>
      </Hero>

      <Container size="md" className="py-24">
        <header className="mb-8">
          <p className="text-lg">
            At Ropecess, we go where others can&apos;t. Whether your facility
            requires surgical precision on delicate glass or heavy-duty
            maintenance on steel structures, our team delivers high-quality
            solutions using the most efficient access methods available.
          </p>
        </header>

        {/* Our Services Section */}
        <section className="mb-10">
          <h2 className="mb-6 text-xl font-bold">Our Services</h2>

          {/* Service 1 */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-bold">
              1. Professional Window Cleaning
            </h3>
            <p className="mb-4">
              Maintaining the clarity and professional appearance of your
              building is essential. We provide crystal-clear window cleaning
              for:
            </p>
            <ul className="ml-8 list-disc space-y-2">
              <li>High-rise office buildings and residential complexes.</li>
              <li>Glass facades with complex architectural shapes.</li>
              <li>Hard-to-reach skylights and glass roofs.</li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-bold">
              2. Silicone Repairs & Waterproofing
            </h3>
            <p className="mb-4">
              Weatherproofing is critical for the longevity of your structure.
              We specialize in the removal and professional re-application of
              silicone and joint sealants on:
            </p>
            <ul className="ml-8 list-disc space-y-2">
              <li>
                <span className="font-bold">Window Perimeters:</span> Ensuring a
                perfect seal between glass and frame.
              </li>
              <li>
                <span className="font-bold">Steel Panels & Cladding:</span>{' '}
                Preventing water ingress and protecting against corrosion in
                industrial environments.
              </li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-bold">
              3. Facade & Steel Surface Cleaning
            </h3>
            <p className="mb-4">
              Environmental pollutants, algae, and grime can damage your
              building&apos;s exterior over time. Our cleaning services include:
            </p>
            <ul className="ml-8 list-disc space-y-2">
              <li>
                High-pressure and chemical cleaning for various facade
                materials.
              </li>
              <li>
                Degreasing and dust removal from industrial steel panels and
                structures.
              </li>
              <li>Pre-inspection cleaning to identify structural wear.</li>
            </ul>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">
            How We Work: The Right Tool for the Job
          </h2>
          <p className="mb-6">
            Every project is unique, which is why we don&apos;t rely on just one
            method. We analyze your site to provide the safest and most
            cost-effective access solution:
          </p>
          <ul className="ml-8 list-disc space-y-4">
            <li>
              <span className="font-bold">
                Rope Access (Industrial Climbing):
              </span>{' '}
              Our certified rope technicians can access tight spaces and extreme
              heights where scaffolding or lifts are impossible. This method
              minimizes disruption to your daily operations and requires zero
              ground space.
            </li>
            <li>
              <span className="font-bold">Lift Platforms (MEWPs):</span> For
              projects where stability and heavy equipment are required, we
              utilize high-reach lift platforms (cherry pickers, scissor lifts)
              to ensure maximum efficiency and safety.
            </li>
          </ul>
        </section>

        {/* Why Choose Ropecess Section */}
        <section>
          <h2 className="mb-4 text-xl font-bold">Why Choose Ropecess?</h2>
          <ul className="ml-8 list-disc space-y-2">
            <li>
              <span className="font-bold">Safety First:</span> All work is
              performed according to strict safety standards, with fully
              certified technicians and modern, inspected equipment.
            </li>
            <li>
              <span className="font-bold">Efficiency:</span> By combining rope
              techniques and mechanical lifts, we reduce setup times and project
              costs.
            </li>
            <li>
              <span className="font-bold">Versatility:</span> From delicate
              glass to industrial steel, we have the expertise to handle various
              surfaces and environments.
            </li>
          </ul>
        </section>

        <CallToAction text={data.cta.text} link={data.cta.link} />
      </Container>
    </main>
  )
}
