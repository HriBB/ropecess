import { MetaFunction } from 'react-router'

//import type { Route } from './+types/services'
import { getMeta } from '~/utils/meta'

import { Hero } from '~/components/Hero'
import { Container } from '~/components/Container'

import { CallToAction } from '~/components/CallToAction'
import { Picture } from '~/components/Picture'
import { Lightbox, LightboxTrigger, LightboxContent } from '~/components/Lightbox'

import bannerImage from '~/images/height-cleaning/banner.jpg?hero'
import bannerLqip from '~/images/height-cleaning/banner.jpg?lqip'

import image00 from '~/images/height-cleaning/height-cleaning-00.jpg?thumb'
import image01 from '~/images/height-cleaning/height-cleaning-01.jpg?thumb'
import image02 from '~/images/height-cleaning/height-cleaning-02.jpg?thumb'
import image03 from '~/images/height-cleaning/height-cleaning-03.jpg?thumb'
import image04 from '~/images/height-cleaning/height-cleaning-04.jpg?thumb'
import image05 from '~/images/height-cleaning/height-cleaning-05.jpg?thumb'
import image06 from '~/images/height-cleaning/height-cleaning-06.jpg?thumb'
import image07 from '~/images/height-cleaning/height-cleaning-07.jpg?thumb'
import image08 from '~/images/height-cleaning/height-cleaning-08.jpg?thumb'
import image09 from '~/images/height-cleaning/height-cleaning-09.jpg?thumb'
import image10 from '~/images/height-cleaning/height-cleaning-10.jpg?thumb'
import image11 from '~/images/height-cleaning/height-cleaning-11.jpg?thumb'
import image12 from '~/images/height-cleaning/height-cleaning-12.jpg?thumb'
import image13 from '~/images/height-cleaning/height-cleaning-13.jpg?thumb'
import image14 from '~/images/height-cleaning/height-cleaning-14.jpg?thumb'

import image00Full from '~/images/height-cleaning/height-cleaning-00.jpg?hero'
import image01Full from '~/images/height-cleaning/height-cleaning-01.jpg?hero'
import image02Full from '~/images/height-cleaning/height-cleaning-02.jpg?hero'
import image03Full from '~/images/height-cleaning/height-cleaning-03.jpg?hero'
import image04Full from '~/images/height-cleaning/height-cleaning-04.jpg?hero'
import image05Full from '~/images/height-cleaning/height-cleaning-05.jpg?hero'
import image06Full from '~/images/height-cleaning/height-cleaning-06.jpg?hero'
import image07Full from '~/images/height-cleaning/height-cleaning-07.jpg?hero'
import image08Full from '~/images/height-cleaning/height-cleaning-08.jpg?hero'
import image09Full from '~/images/height-cleaning/height-cleaning-09.jpg?hero'
import image10Full from '~/images/height-cleaning/height-cleaning-10.jpg?hero'
import image11Full from '~/images/height-cleaning/height-cleaning-11.jpg?hero'
import image12Full from '~/images/height-cleaning/height-cleaning-12.jpg?hero'
import image13Full from '~/images/height-cleaning/height-cleaning-13.jpg?hero'
import image14Full from '~/images/height-cleaning/height-cleaning-14.jpg?hero'

import image00Lqip from '~/images/height-cleaning/height-cleaning-00.jpg?lqip'
import image01Lqip from '~/images/height-cleaning/height-cleaning-01.jpg?lqip'
import image02Lqip from '~/images/height-cleaning/height-cleaning-02.jpg?lqip'
import image03Lqip from '~/images/height-cleaning/height-cleaning-03.jpg?lqip'
import image04Lqip from '~/images/height-cleaning/height-cleaning-04.jpg?lqip'
import image05Lqip from '~/images/height-cleaning/height-cleaning-05.jpg?lqip'
import image06Lqip from '~/images/height-cleaning/height-cleaning-06.jpg?lqip'
import image07Lqip from '~/images/height-cleaning/height-cleaning-07.jpg?lqip'
import image08Lqip from '~/images/height-cleaning/height-cleaning-08.jpg?lqip'
import image09Lqip from '~/images/height-cleaning/height-cleaning-09.jpg?lqip'
import image10Lqip from '~/images/height-cleaning/height-cleaning-10.jpg?lqip'
import image11Lqip from '~/images/height-cleaning/height-cleaning-11.jpg?lqip'
import image12Lqip from '~/images/height-cleaning/height-cleaning-12.jpg?lqip'
import image13Lqip from '~/images/height-cleaning/height-cleaning-13.jpg?lqip'
import image14Lqip from '~/images/height-cleaning/height-cleaning-14.jpg?lqip'

const data = {
  meta: {
    title: 'Professional Care at Any Height',
    description:
      'At Ropecess, we go where others can’t. Whether your facility requires surgical precision on delicate glass or heavy-duty maintenance on steel structures, our team delivers high-quality solutions using the most efficient access methods available.',
    image: bannerImage,
  },
  hero: {
    title: (
      <span>
        Professional Care <br /> at Any Height
      </span>
    ),
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
        <Hero.Content>
          <Hero.Title>{data.hero.title}</Hero.Title>
        </Hero.Content>
      </Hero>

      <Container size="md" className="py-24">
        <header className="mb-20">
          <p className="text-lg">
            At Ropecess, we go where others can&apos;t. Whether your facility
            requires surgical precision on delicate glass or heavy-duty
            maintenance on steel structures, our team delivers high-quality
            solutions using the most efficient access methods available.
          </p>
        </header>

        {/* Our Services Section */}
        <section className="mb-20">
          <h2 className="mb-12 text-3xl font-bold">Our Services</h2>

          {/* Service 1 */}
          <div className="mb-8">
            <h3 className="mb-3 text-xl font-bold">
              1. Professional Window Cleaning
            </h3>
            <p className="mb-4">
              Maintaining the clarity and professional appearance of your
              building is essential. We provide crystal-clear window cleaning
              for:
            </p>
            <ul className="mb-8 ml-8 list-disc space-y-2">
              <li>High-rise office buildings and residential complexes.</li>
              <li>Glass facades with complex architectural shapes.</li>
              <li>Hard-to-reach skylights and glass roofs.</li>
            </ul>

            <Lightbox>
              <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-3">
                <LightboxTrigger index={0}>
                  <Picture
                    picture={image00}
                    lqip={image00Lqip}
                    alt="Professional Window Cleaning"
                    className="aspect-square w-full object-cover"
                    sizes="(max-width:767px) 100vw, 400px"
                    loading="lazy"
                  />
                </LightboxTrigger>
                <LightboxTrigger index={1}>
                  <Picture
                    picture={image01}
                    lqip={image01Lqip}
                    alt="Professional Window Cleaning"
                    className="aspect-square w-full object-cover"
                    sizes="(max-width:767px) 100vw, 400px"
                    loading="lazy"
                  />
                </LightboxTrigger>
                <LightboxTrigger index={2}>
                  <Picture
                    picture={image02}
                    lqip={image02Lqip}
                    alt="Professional Window Cleaning"
                    className="aspect-square w-full object-cover"
                    sizes="(max-width:767px) 100vw, 400px"
                    loading="lazy"
                  />
                </LightboxTrigger>
              </div>
              <LightboxContent
                images={[
                  { picture: image00Full, lqip: image00Lqip, alt: 'Professional Window Cleaning' },
                  { picture: image01Full, lqip: image01Lqip, alt: 'Professional Window Cleaning' },
                  { picture: image02Full, lqip: image02Lqip, alt: 'Professional Window Cleaning' },
                ]}
              />
            </Lightbox>
          </div>

          {/* Service 2 */}
          <div className="mb-8">
            <h3 className="mb-3 text-xl font-bold">
              2. Silicone Repairs & Waterproofing
            </h3>
            <p className="mb-4">
              Weatherproofing is critical for the longevity of your structure.
              We specialize in the removal and professional re-application of
              silicone and joint sealants on:
            </p>
            <ul className="mb-8 ml-8 list-disc space-y-2">
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

            <Lightbox>
              <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-3">
                <LightboxTrigger index={0}>
                  <Picture
                    picture={image03}
                    lqip={image03Lqip}
                    alt="Silicone Repairs & Waterproofing"
                    className="aspect-square w-full object-cover"
                    sizes="(max-width:767px) 100vw, 400px"
                    loading="lazy"
                  />
                </LightboxTrigger>
                <LightboxTrigger index={1}>
                  <Picture
                    picture={image04}
                    lqip={image04Lqip}
                    alt="Silicone Repairs & Waterproofing"
                    className="aspect-square w-full object-cover"
                    sizes="(max-width:767px) 100vw, 400px"
                    loading="lazy"
                  />
                </LightboxTrigger>
                <LightboxTrigger index={2}>
                  <Picture
                    picture={image05}
                    lqip={image05Lqip}
                    alt="Silicone Repairs & Waterproofing"
                    className="aspect-square w-full object-cover"
                    sizes="(max-width:767px) 100vw, 400px"
                    loading="lazy"
                  />
                </LightboxTrigger>
              </div>
              <LightboxContent
                images={[
                  { picture: image03Full, lqip: image03Lqip, alt: 'Silicone Repairs & Waterproofing' },
                  { picture: image04Full, lqip: image04Lqip, alt: 'Silicone Repairs & Waterproofing' },
                  { picture: image05Full, lqip: image05Lqip, alt: 'Silicone Repairs & Waterproofing' },
                ]}
              />
            </Lightbox>
          </div>

          {/* Service 3 */}
          <div className="mb-8">
            <h3 className="mb-3 text-xl font-bold">
              3. Facade & Steel Surface Cleaning
            </h3>
            <p className="mb-4">
              Environmental pollutants, algae, and grime can damage your
              building&apos;s exterior over time. Our cleaning services include:
            </p>
            <ul className="mb-8 ml-8 list-disc space-y-2">
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

            <Lightbox>
              <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-3">
                <LightboxTrigger index={0}>
                  <Picture
                    picture={image06}
                    lqip={image06Lqip}
                    alt="Facade & Steel Surface Cleaning"
                    className="aspect-square w-full object-cover"
                    sizes="(max-width:767px) 100vw, 400px"
                    loading="lazy"
                  />
                </LightboxTrigger>
                <LightboxTrigger index={1}>
                  <Picture
                    picture={image07}
                    lqip={image07Lqip}
                    alt="Facade & Steel Surface Cleaning"
                    className="aspect-square w-full object-cover"
                    sizes="(max-width:767px) 100vw, 400px"
                    loading="lazy"
                  />
                </LightboxTrigger>
                <LightboxTrigger index={2}>
                  <Picture
                    picture={image08}
                    lqip={image08Lqip}
                    alt="Facade & Steel Surface Cleaning"
                    className="aspect-square w-full object-cover"
                    sizes="(max-width:767px) 100vw, 400px"
                    loading="lazy"
                  />
                </LightboxTrigger>
              </div>
              <LightboxContent
                images={[
                  { picture: image06Full, lqip: image06Lqip, alt: 'Facade & Steel Surface Cleaning' },
                  { picture: image07Full, lqip: image07Lqip, alt: 'Facade & Steel Surface Cleaning' },
                  { picture: image08Full, lqip: image08Lqip, alt: 'Facade & Steel Surface Cleaning' },
                ]}
              />
            </Lightbox>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="mb-20">
          <h2 className="mb-4 text-3xl font-bold">
            How We Work: The Right Tool for the Job
          </h2>
          <p className="mb-6">
            Every project is unique, which is why we don&apos;t rely on just one
            method. We analyze your site to provide the safest and most
            cost-effective access solution:
          </p>
          <ul className="mb-8 ml-8 list-disc space-y-4">
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

          <Lightbox>
            <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-3">
              <LightboxTrigger index={0}>
                <Picture
                  picture={image09}
                  lqip={image09Lqip}
                  alt="How We Work: The Right Tool for the Job"
                  className="aspect-square w-full object-cover"
                  sizes="(max-width:767px) 100vw, 400px"
                  loading="lazy"
                />
              </LightboxTrigger>
              <LightboxTrigger index={1}>
                <Picture
                  picture={image10}
                  lqip={image10Lqip}
                  alt="How We Work: The Right Tool for the Job"
                  className="aspect-square w-full object-cover"
                  sizes="(max-width:767px) 100vw, 400px"
                  loading="lazy"
                />
              </LightboxTrigger>
              <LightboxTrigger index={2}>
                <Picture
                  picture={image11}
                  lqip={image11Lqip}
                  alt="How We Work: The Right Tool for the Job"
                  className="aspect-square w-full object-cover"
                  sizes="(max-width:767px) 100vw, 400px"
                  loading="lazy"
                />
              </LightboxTrigger>
            </div>
            <LightboxContent
              images={[
                { picture: image09Full, lqip: image09Lqip, alt: 'How We Work: The Right Tool for the Job' },
                { picture: image10Full, lqip: image10Lqip, alt: 'How We Work: The Right Tool for the Job' },
                { picture: image11Full, lqip: image11Lqip, alt: 'How We Work: The Right Tool for the Job' },
              ]}
            />
          </Lightbox>
        </section>

        {/* Why Choose Ropecess Section */}
        <section>
          <h2 className="mb-4 text-3xl font-bold">Why Choose Ropecess?</h2>
          <ul className="mb-8 ml-8 list-disc space-y-2">
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

          <Lightbox>
            <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-3">
              <LightboxTrigger index={0}>
                <Picture
                  picture={image12}
                  lqip={image12Lqip}
                  alt="Why Choose Ropecess?"
                  className="aspect-square w-full object-cover"
                  sizes="(max-width:767px) 100vw, 400px"
                  loading="lazy"
                />
              </LightboxTrigger>
              <LightboxTrigger index={1}>
                <Picture
                  picture={image13}
                  lqip={image13Lqip}
                  alt="Why Choose Ropecess?"
                  className="aspect-square w-full object-cover"
                  sizes="(max-width:767px) 100vw, 400px"
                  loading="lazy"
                />
              </LightboxTrigger>
              <LightboxTrigger index={2}>
                <Picture
                  picture={image14}
                  lqip={image14Lqip}
                  alt="Why Choose Ropecess?"
                  className="aspect-square w-full object-cover"
                  sizes="(max-width:767px) 100vw, 400px"
                  loading="lazy"
                />
              </LightboxTrigger>
            </div>
            <LightboxContent
              images={[
                { picture: image12Full, lqip: image12Lqip, alt: 'Why Choose Ropecess?' },
                { picture: image13Full, lqip: image13Lqip, alt: 'Why Choose Ropecess?' },
                { picture: image14Full, lqip: image14Lqip, alt: 'Why Choose Ropecess?' },
              ]}
            />
          </Lightbox>
        </section>

        <CallToAction text={data.cta.text} link={data.cta.link} />
      </Container>
    </main>
  )
}
