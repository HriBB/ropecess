import { MetaFunction } from 'react-router'

import { getMeta } from '~/utils/meta'
import { type Locale, useLocale, useLocalizeHref } from '~/utils/i18n'

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
  en: {
    meta: {
      title: 'Professional Care at Any Height',
      description:
        "At Ropecess, we go where others can\u2019t. Whether your facility requires surgical precision on delicate glass or heavy-duty maintenance on steel structures, our team delivers high-quality solutions using the most efficient access methods available.",
      image: bannerImage,
    },
    hero: {
      title: ['Professional Care', 'at Any Height'] as const,
      image: bannerImage,
      lqip: bannerLqip,
      imageAlt: 'Construction frame with workers',
    },
    intro:
      "At Ropecess, we go where others can\u2019t. Whether your facility requires surgical precision on delicate glass or heavy-duty maintenance on steel structures, our team delivers high-quality solutions using the most efficient access methods available.",
    ourServices: {
      title: 'Our Services',
      services: [
        {
          title: '1. Professional Window Cleaning',
          text: 'Maintaining the clarity and professional appearance of your building is essential. We provide crystal-clear window cleaning for:',
          items: [
            'High-rise office buildings and residential complexes.',
            'Glass facades with complex architectural shapes.',
            'Hard-to-reach skylights and glass roofs.',
          ],
          imageAlt: 'Professional Window Cleaning',
        },
        {
          title: '2. Silicone Repairs & Waterproofing',
          text: 'Weatherproofing is critical for the longevity of your structure. We specialize in the removal and professional re-application of silicone and joint sealants on:',
          richItems: [
            { bold: 'Window Perimeters:', text: 'Ensuring a perfect seal between glass and frame.' },
            { bold: 'Steel Panels & Cladding:', text: 'Preventing water ingress and protecting against corrosion in industrial environments.' },
          ],
          imageAlt: 'Silicone Repairs & Waterproofing',
        },
        {
          title: '3. Facade & Steel Surface Cleaning',
          text: "Environmental pollutants, algae, and grime can damage your building\u2019s exterior over time. Our cleaning services include:",
          items: [
            'High-pressure and chemical cleaning for various facade materials.',
            'Degreasing and dust removal from industrial steel panels and structures.',
            'Pre-inspection cleaning to identify structural wear.',
          ],
          imageAlt: 'Facade & Steel Surface Cleaning',
        },
      ],
    },
    howWeWork: {
      title: 'How We Work: The Right Tool for the Job',
      text: "Every project is unique, which is why we don\u2019t rely on just one method. We analyze your site to provide the safest and most cost-effective access solution:",
      items: [
        { bold: 'Rope Access (Industrial Climbing):', text: 'Our certified rope technicians can access tight spaces and extreme heights where scaffolding or lifts are impossible. This method minimizes disruption to your daily operations and requires zero ground space.' },
        { bold: 'Lift Platforms (MEWPs):', text: 'For projects where stability and heavy equipment are required, we utilize high-reach lift platforms (cherry pickers, scissor lifts) to ensure maximum efficiency and safety.' },
      ],
      imageAlt: 'How We Work: The Right Tool for the Job',
    },
    whyChoose: {
      title: 'Why Choose Ropecess?',
      items: [
        { bold: 'Safety First:', text: 'All work is performed according to strict safety standards, with fully certified technicians and modern, inspected equipment.' },
        { bold: 'Efficiency:', text: 'By combining rope techniques and mechanical lifts, we reduce setup times and project costs.' },
        { bold: 'Versatility:', text: 'From delicate glass to industrial steel, we have the expertise to handle various surfaces and environments.' },
      ],
      imageAlt: 'Why Choose Ropecess?',
    },
    cta: {
      text: 'Contact us today to see how Ropecess can help bring your project to life.',
      link: {
        to: '/contact',
        text: 'Contact Us',
      },
    },
  },
  sl: {
    meta: {
      title: 'Profesionalna skrb na vsaki višini',
      description:
        'V Ropecess gremo tja, kamor drugi ne morejo. Najsi vaš objekt zahteva kirurško natančnost na nežnem steklu ali intenzivno vzdrževanje jeklenih konstrukcij, naša ekipa zagotavlja visokokakovostne rešitve z najučinkovitejšimi metodami dostopa.',
      image: bannerImage,
    },
    hero: {
      title: ['Profesionalna skrb', 'na vsaki višini'] as const,
      image: bannerImage,
      lqip: bannerLqip,
      imageAlt: 'Gradbeni oder z delavci',
    },
    intro:
      'V Ropecess gremo tja, kamor drugi ne morejo. Najsi vaš objekt zahteva kirurško natančnost na nežnem steklu ali intenzivno vzdrževanje jeklenih konstrukcij, naša ekipa zagotavlja visokokakovostne rešitve z najučinkovitejšimi metodami dostopa.',
    ourServices: {
      title: 'Naše storitve',
      services: [
        {
          title: '1. Profesionalno čiščenje oken',
          text: 'Ohranjanje jasnosti in profesionalnega videza vaše stavbe je ključno. Zagotavljamo kristalno čisto čiščenje oken za:',
          items: [
            'Visoke poslovne stavbe in stanovanjske komplekse.',
            'Steklene fasade s kompleksnimi arhitekturnimi oblikami.',
            'Težko dostopna strešna okna in steklene strehe.',
          ],
          imageAlt: 'Profesionalno čiščenje oken',
        },
        {
          title: '2. Silikonska popravila in hidroizolacija',
          text: 'Vremenska zaščita je ključna za dolgo življenjsko dobo vaše konstrukcije. Specializirani smo za odstranjevanje in profesionalno ponovno nanašanje silikonskih in dilatacijskih tesnilnih mas na:',
          richItems: [
            { bold: 'Obodi oken:', text: 'Zagotavljanje popolnega tesnjenja med steklom in okvirjem.' },
            { bold: 'Jeklene plošče in obloge:', text: 'Preprečevanje vdora vode in zaščita pred korozijo v industrijskih okoljih.' },
          ],
          imageAlt: 'Silikonska popravila in hidroizolacija',
        },
        {
          title: '3. Čiščenje fasad in jeklenih površin',
          text: 'Okoljski onesnaževalci, alge in umazanija lahko sčasoma poškodujejo zunanjo podobo vaše stavbe. Naše storitve čiščenja vključujejo:',
          items: [
            'Visokotlačno in kemično čiščenje za različne fasadne materiale.',
            'Razmaščevanje in odstranjevanje prahu z industrijskih jeklenih plošč in konstrukcij.',
            'Čiščenje pred pregledom za odkrivanje strukturne obrabe.',
          ],
          imageAlt: 'Čiščenje fasad in jeklenih površin',
        },
      ],
    },
    howWeWork: {
      title: 'Kako delamo: pravo orodje za pravo delo',
      text: 'Vsak projekt je edinstven, zato se ne zanašamo le na eno metodo. Analiziramo vaše okolje, da zagotovimo najvarnejšo in stroškovno najučinkovitejšo rešitev dostopa:',
      items: [
        { bold: 'Vrvni dostop (industrijsko plezanje):', text: 'Naši certificirani vrvni tehniki lahko dostopajo do utesnjenih prostorov in ekstremnih višin, kjer so odri ali dvigala nemogoči. Ta metoda minimizira motnje vašega vsakodnevnega delovanja in ne zahteva prostora na tleh.' },
        { bold: 'Dvižne platforme (MEWP):', text: 'Za projekte, kjer sta potrebni stabilnost in težka oprema, uporabljamo visokodosežne dvižne platforme (košare, škarjaste dvigalke), da zagotovimo maksimalno učinkovitost in varnost.' },
      ],
      imageAlt: 'Kako delamo: pravo orodje za pravo delo',
    },
    whyChoose: {
      title: 'Zakaj izbrati Ropecess?',
      items: [
        { bold: 'Varnost na prvem mestu:', text: 'Vsa dela se izvajajo v skladu s strogimi varnostnimi standardi, s popolnoma certificiranimi tehniki in sodobno, pregledano opremo.' },
        { bold: 'Učinkovitost:', text: 'S kombinacijo vrvnih tehnik in mehanskih dvigal zmanjšamo čas postavitve in stroške projekta.' },
        { bold: 'Vsestranskost:', text: 'Od nežnega stekla do industrijskega jekla imamo strokovno znanje za obdelavo različnih površin in okolij.' },
      ],
      imageAlt: 'Zakaj izbrati Ropecess?',
    },
    cta: {
      text: 'Kontaktirajte nas še danes in odkrijte, kako vam Ropecess lahko pomaga uresničiti vaš projekt.',
      link: {
        to: '/contact',
        text: 'Kontaktirajte nas',
      },
    },
  },
}

const serviceImages = [
  [
    { thumb: image00, full: image00Full, lqip: image00Lqip },
    { thumb: image01, full: image01Full, lqip: image01Lqip },
    { thumb: image02, full: image02Full, lqip: image02Lqip },
  ],
  [
    { thumb: image03, full: image03Full, lqip: image03Lqip },
    { thumb: image04, full: image04Full, lqip: image04Lqip },
    { thumb: image05, full: image05Full, lqip: image05Lqip },
  ],
  [
    { thumb: image06, full: image06Full, lqip: image06Lqip },
    { thumb: image07, full: image07Full, lqip: image07Lqip },
    { thumb: image08, full: image08Full, lqip: image08Lqip },
  ],
]

const howWeWorkImages = [
  { thumb: image09, full: image09Full, lqip: image09Lqip },
  { thumb: image10, full: image10Full, lqip: image10Lqip },
  { thumb: image11, full: image11Full, lqip: image11Lqip },
]

const whyChooseImages = [
  { thumb: image12, full: image12Full, lqip: image12Lqip },
  { thumb: image13, full: image13Full, lqip: image13Lqip },
  { thumb: image14, full: image14Full, lqip: image14Lqip },
]

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

function ImageGrid({
  images,
  alt,
}: {
  images: { thumb: any; full: any; lqip: any }[]
  alt: string
}) {
  return (
    <Lightbox>
      <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-3">
        {images.map((img, i) => (
          <LightboxTrigger key={i} index={i}>
            <Picture
              picture={img.thumb}
              lqip={img.lqip}
              alt={alt}
              className="aspect-square w-full object-cover"
              sizes="(max-width:767px) 100vw, 400px"
              loading="lazy"
            />
          </LightboxTrigger>
        ))}
      </div>
      <LightboxContent
        images={images.map((img) => ({
          picture: img.full,
          lqip: img.lqip,
          alt,
        }))}
      />
    </Lightbox>
  )
}

export default function HeightCleaning() {
  const locale = useLocale()
  const lh = useLocalizeHref()
  const d = data[locale]

  return (
    <main>
      <Hero>
        <Hero.BackgroundPicture
          picture={d.hero.image}
          lqip={d.hero.lqip}
          alt={d.hero.imageAlt}
        />
        <Hero.Content>
          <Hero.Title>
            <span>
              {d.hero.title[0]} <br /> {d.hero.title[1]}
            </span>
          </Hero.Title>
        </Hero.Content>
      </Hero>

      <Container size="md" className="py-24">
        <header className="mb-20">
          <p className="text-lg">{d.intro}</p>
        </header>

        <section className="mb-20">
          <h2 className="mb-12 text-3xl font-bold">{d.ourServices.title}</h2>

          {d.ourServices.services.map((service, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="mb-4">{service.text}</p>
              <ul className="mb-8 ml-8 list-disc space-y-2">
                {'items' in service &&
                  service.items?.map((item, i) => <li key={i}>{item}</li>)}
                {'richItems' in service &&
                  service.richItems?.map((item, i) => (
                    <li key={i}>
                      <span className="font-bold">{item.bold}</span> {item.text}
                    </li>
                  ))}
              </ul>
              <ImageGrid
                images={serviceImages[idx]}
                alt={service.imageAlt}
              />
            </div>
          ))}
        </section>

        <section className="mb-20">
          <h2 className="mb-4 text-3xl font-bold">{d.howWeWork.title}</h2>
          <p className="mb-6">{d.howWeWork.text}</p>
          <ul className="mb-8 ml-8 list-disc space-y-4">
            {d.howWeWork.items.map((item, i) => (
              <li key={i}>
                <span className="font-bold">{item.bold}</span> {item.text}
              </li>
            ))}
          </ul>
          <ImageGrid images={howWeWorkImages} alt={d.howWeWork.imageAlt} />
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-bold">{d.whyChoose.title}</h2>
          <ul className="mb-8 ml-8 list-disc space-y-2">
            {d.whyChoose.items.map((item, i) => (
              <li key={i}>
                <span className="font-bold">{item.bold}</span> {item.text}
              </li>
            ))}
          </ul>
          <ImageGrid images={whyChooseImages} alt={d.whyChoose.imageAlt} />
        </section>

        <CallToAction
          text={d.cta.text}
          link={{ ...d.cta.link, to: lh(d.cta.link.to) }}
        />
      </Container>
    </main>
  )
}
