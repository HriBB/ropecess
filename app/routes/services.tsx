import { Link, MetaFunction } from 'react-router'

import { getMeta } from '~/utils/meta'
import { type Locale, useLocale, useLocalizeHref } from '~/utils/i18n'

import { Hero } from '~/components/Hero'
import { Container } from '~/components/Container'
import { Picture } from '~/components/Picture'

import bannerImage from '~/images/services/banner.jpg?hero'
import bannerLqip from '~/images/services/banner.jpg?lqip'
import photovoltaicImage from '~/images/services/photovoltaic-module-installation-01.jpg?thumb'
import photovoltaicLqip from '~/images/services/photovoltaic-module-installation-01.jpg?lqip'
import industrialImage from '~/images/services/industrial-rope-access-01.jpg?thumb'
import industrialLqip from '~/images/services/industrial-rope-access-01.jpg?lqip'
import riggingImage from '~/images/services/rigging-01.jpg?thumb'
import riggingLqip from '~/images/services/rigging-01.jpg?lqip'
import stageImage from '~/images/services/stage-building-01.jpg?thumb'
import stageLqip from '~/images/services/stage-building-01.jpg?lqip'
import heightCleaningImage from '~/images/height-cleaning/height-cleaning-00.jpg?thumb'
import heightCleaningLqip from '~/images/height-cleaning/height-cleaning-00.jpg?lqip'

const data = {
  en: {
    meta: {
      title: 'Services',
      description:
        'Ropecess offers a wide range of specialized construction services, including photovoltaic installation, industrial rope access, rigging, stage building, and professional height cleaning.',
      image: bannerImage,
    },
    hero: {
      title: 'Services',
      image: bannerImage,
      lqip: bannerLqip,
      imageAlt: 'Construction frame with workers',
    },
    items: [
      {
        id: 'photovoltaic-modules-installation',
        title: 'Photovoltaic Modules Installation',
        image: photovoltaicImage,
        lqip: photovoltaicLqip,
        description:
          'Our team allready worked on various PV constructon sites, ranging from flat roofs to vertical PV instalation. Every project is its own, and has to be tailored to construction site parameters.',
      },
      {
        id: 'industrial-rope-access-and-climbing',
        title: 'Industrial Rope Access and Climbing',
        image: industrialImage,
        lqip: industrialLqip,
        description:
          'Working for various companies, from High Bay Warehouses to rock cleaning, our range of knowlege expands with each project. Work on ropes is our specialty.',
      },
      {
        id: 'rigging',
        title: 'Rigging',
        image: riggingImage,
        lqip: riggingLqip,
        description:
          'Venue rigging are projects, which demand more knowlege than you can think of. It is not just pulling chains up in the air and fixing them, but also weight redundancy calculating and setting points exactly on spot, so they are in perfect position for the gig.',
      },
      {
        id: 'stage-building',
        title: 'Stage Building',
        image: stageImage,
        lqip: stageLqip,
        description:
          'Working on big stages for StageCo Nederland and Belgium.',
      },
      {
        id: 'professional-height-cleaning',
        title: 'Professional Height Cleaning',
        to: '/professional-height-cleaning',
        image: heightCleaningImage,
        lqip: heightCleaningLqip,
        description:
          'Whether your facility requires surgical precision on delicate glass or heavy-duty maintenance on steel structures, we deliver high-quality cleaning using the most efficient access methods available.',
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
  },
  sl: {
    meta: {
      title: 'Storitve',
      description:
        'Ropecess ponuja širok nabor specializiranih gradbenih storitev, vključno z montažo fotovoltaike, industrijskim vrvnim dostopom, odrsko tehniko, gradnjo odrov in profesionalnim čiščenjem na višini.',
      image: bannerImage,
    },
    hero: {
      title: 'Storitve',
      image: bannerImage,
      lqip: bannerLqip,
      imageAlt: 'Gradbeni oder z delavci',
    },
    items: [
      {
        id: 'photovoltaic-modules-installation',
        title: 'Montaža fotovoltaičnih modulov',
        image: photovoltaicImage,
        lqip: photovoltaicLqip,
        description:
          'Naša ekipa je že delala na različnih gradbiščih za sončne elektrarne, od ravnih streh do vertikalnih PV montaž. Vsak projekt je edinstven in ga je treba prilagoditi parametrom gradbišča.',
      },
      {
        id: 'industrial-rope-access-and-climbing',
        title: 'Industrijski vrvni dostop in plezanje',
        image: industrialImage,
        lqip: industrialLqip,
        description:
          'Delo za različna podjetja, od visokoregalnih skladišč do čiščenja skal, širi naše znanje z vsakim projektom. Delo na vrveh je naša specialnost.',
      },
      {
        id: 'rigging',
        title: 'Odrska tehnika',
        image: riggingImage,
        lqip: riggingLqip,
        description:
          'Odrska tehnika so projekti, ki zahtevajo več znanja, kot si lahko zamislite. Ne gre le za dviganje verig v zrak in njihovo pritrditev, temveč tudi za izračun nosilnosti in natančno postavitev točk, da so v popolnem položaju za dogodek.',
      },
      {
        id: 'stage-building',
        title: 'Gradnja odrov',
        image: stageImage,
        lqip: stageLqip,
        description:
          'Delo na velikih odrih za StageCo Nederland in Belgium.',
      },
      {
        id: 'professional-height-cleaning',
        title: 'Profesionalno čiščenje na višini',
        to: '/professional-height-cleaning',
        image: heightCleaningImage,
        lqip: heightCleaningLqip,
        description:
          'Najsi vaš objekt zahteva kirurško natančnost na nežnem steklu ali intenzivno vzdrževanje jeklenih konstrukcij, zagotavljamo visokokakovostno čiščenje z najučinkovitejšimi metodami dostopa.',
      },
    ],
    services: [
      {
        id: 1,
        title: 'Čiščenje in sidranje skal',
        text: 'Zagotavljanje stabilnosti in varnosti skalnih sten in pobočij s strokovnim čiščenjem in varnimi sidralnimi tehnikami.',
      },
      {
        id: 2,
        title: 'Montaža fotovoltaike',
        text: 'Celovite montaže fotovoltaičnih sistemov, od načrtovanja in oblikovanja do montaže in vzdrževanja.',
      },
      {
        id: 3,
        title: 'Montaža jeklenih konstrukcij',
        text: 'Natančna montaža jeklenih konstrukcij za industrijske, komercialne in stanovanjske projekte.',
      },
      {
        id: 4,
        title: 'Žerjavanje',
        text: 'Strokovna žerjavska dela za varno in učinkovito dviganje in premikanje težkih materialov in opreme.',
      },
      {
        id: 5,
        title: 'Odrska tehnika za dogodke',
        text: 'Profesionalna odrska tehnika za dogodke, ki zagotavlja varno in zanesljivo postavitev odrov, razsvetljave in drugih struktur.',
      },
      {
        id: 6,
        title: 'Čiščenje oken',
        text: 'Visokokakovostne storitve čiščenja oken za stavbe vseh višin z uporabo varnih in učinkovitih tehnik vrvnega dostopa.',
      },
      {
        id: 7,
        title: 'Vrvni dostop v utesnjenih prostorih',
        text: 'Specializirane storitve za delo v utesnjenih prostorih, kjer so tradicionalne metode dostopa nepraktične.',
      },
      {
        id: 8,
        title: 'Pregled betona in fasad',
        text: 'Temeljiti pregledi in ocene betonskih konstrukcij in fasad za odkrivanje in odpravljanje morebitnih težav.',
      },
    ],
  },
}

export const meta: MetaFunction = ({ matches, location }) => {
  const rootData = matches[0]?.data as { locale: Locale; env: { APP_URL: string } }
  const locale = rootData?.locale ?? 'en'
  return getMeta({
    ...data[locale].meta,
    locale,
    pathname: location.pathname,
    appUrl: rootData?.env?.APP_URL,
  })
}

export default function Services() {
  const locale = useLocale()
  const localizeHref = useLocalizeHref()
  const d = data[locale]

  return (
    <main>
      <Hero>
        <Hero.BackgroundPicture
          picture={d.hero.image}
          lqip={d.hero.lqip}
          alt={d.hero.imageAlt}
        />
        <Hero.Content className="lg:mr-10">
          <Hero.Title>{d.hero.title}</Hero.Title>
        </Hero.Content>
      </Hero>

      <section className="py-24">
        <Container size="md">
          <div className="flex flex-col gap-24">
            {d.items.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="flex flex-col gap-5 md:flex-row md:gap-10"
              >
                <Picture
                  picture={service.image}
                  lqip={service.lqip}
                  alt={service.title}
                  className="aspect- object-cover md:w-[400px]"
                  sizes="(max-width:767px) 100vw, 400px"
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col items-start justify-center gap-3">
                  <h2 className="text-2xl font-medium">
                    {'to' in service && service.to ? (
                      <Link to={localizeHref(service.to)}>{service.title}</Link>
                    ) : (
                      <a href={`#${service.id}`}>{service.title}</a>
                    )}
                  </h2>
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
