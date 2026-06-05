import bannerImage from '~/images/height-cleaning/banner.jpg?hero'
import bannerLqip from '~/images/height-cleaning/banner.jpg?lqip'
import workPlanImage from '~/images/home/work-plan.jpg?square'
import workPlanLqip from '~/images/home/work-plan.jpg?lqip'
import accessPlanImage from '~/images/home/access-plan.jpg?square'
import accessPlanLqip from '~/images/home/access-plan.jpg?lqip'
import ourServicesImage from '~/images/home/our-services.jpg?square'
import ourServicesLqip from '~/images/home/our-services.jpg?lqip'

// height-cleaning spotlight — one image per sub-service, reused from the
// dedicated page gallery
import heightCleaning00 from '~/images/height-cleaning/height-cleaning-00.jpg?thumb'
import heightCleaning00Lqip from '~/images/height-cleaning/height-cleaning-00.jpg?lqip'
import heightCleaning03 from '~/images/height-cleaning/height-cleaning-03.jpg?thumb'
import heightCleaning03Lqip from '~/images/height-cleaning/height-cleaning-03.jpg?lqip'
import heightCleaning06 from '~/images/height-cleaning/height-cleaning-06.jpg?thumb'
import heightCleaning06Lqip from '~/images/height-cleaning/height-cleaning-06.jpg?lqip'

// prototype extra — services/spacenet/contact section images
import photovoltaicImage from '~/images/services/photovoltaic-module-installation-01.jpg?thumb'
import photovoltaicLqip from '~/images/services/photovoltaic-module-installation-01.jpg?lqip'
import industrialImage from '~/images/services/industrial-rope-access-01.jpg?thumb'
import industrialLqip from '~/images/services/industrial-rope-access-01.jpg?lqip'
import riggingImage from '~/images/services/rigging-01.jpg?thumb'
import riggingLqip from '~/images/services/rigging-01.jpg?lqip'
import stageImage from '~/images/services/stage-building-01.jpg?thumb'
import stageLqip from '~/images/services/stage-building-01.jpg?lqip'

import neonGlowImage from '~/images/spacenet/two-spacenets-at-night-glow.jpg?hero'
import neonGlowLqip from '~/images/spacenet/two-spacenets-at-night-glow.jpg?lqip'
import festivalImage from '~/images/spacenet/spacenet-chillout-festival.jpg?hero'
import festivalLqip from '~/images/spacenet/spacenet-chillout-festival.jpg?lqip'
import chilloutImage from '~/images/spacenet/spacenet-chillout-from-below.jpg?hero'
import chilloutLqip from '~/images/spacenet/spacenet-chillout-from-below.jpg?lqip'

export const data = {
  en: {
    meta: {
      title: 'Ropecess',
      description:
        'Ropecess delivers top-quality construction and specialized access services, ensuring safety, precision, and reliability in every project.',
      image: bannerImage,
    },
    hero: {
      title: 'Plan your next rope access project',
      image: bannerImage,
      lqip: bannerLqip,
      imageAlt: 'Rope access technician cleaning a glass facade above the city',
      link: {
        to: '/contact',
        text: 'Contact Us',
      },
    },
    intro: {
      id: 'welcome',
      title: 'Welcome to Ropecess',
      text: 'At Ropecess, we deliver top-quality construction and specialized access services, ensuring safety, precision, and reliability in every project.',
    },
    howWeWork: {
      title: 'How We Work',
      items: [
        {
          id: 'work-plan',
          title: 'Work Plan',
          image: workPlanImage,
          lqip: workPlanLqip,
          text: 'Our Work Plan ensures every project is completed on time, within budget, and to the highest standards. We carefully plan, manage timelines, allocate resources, and mitigate risks, keeping you informed at every step.',
        },
        {
          id: 'access-plan',
          title: 'Access Plan',
          image: accessPlanImage,
          lqip: accessPlanLqip,
          text: 'Our Access Plan prioritizes safety and efficiency. We use advanced rope access and innovative methods to safely reach challenging areas, minimizing disruptions and reducing costs while maintaining top safety standards.',
        },
        {
          id: 'our-services',
          title: 'Our Services',
          image: ourServicesImage,
          lqip: ourServicesLqip,
          text: 'We offer a wide range of specialized construction and access services to cater to various industry needs.',
        },
      ],
    },
    // height-cleaning spotlight — dedicated section at the owner's request
    heightCleaning: {
      id: 'professional-height-cleaning',
      title: 'Professional Care at Any Height',
      text: "At Ropecess, we go where others can’t. Whether your facility requires surgical precision on delicate glass or heavy-duty maintenance on steel structures, our team delivers high-quality solutions using the most efficient access methods available.",
      items: [
        'Window Cleaning',
        'Silicone Repairs & Waterproofing',
        'Facade & Steel Cleaning',
      ],
      images: [
        {
          image: heightCleaning00,
          lqip: heightCleaning00Lqip,
          alt: 'Professional window cleaning at height',
        },
        {
          image: heightCleaning03,
          lqip: heightCleaning03Lqip,
          alt: 'Silicone repairs and waterproofing',
        },
        {
          image: heightCleaning06,
          lqip: heightCleaning06Lqip,
          alt: 'Facade and steel surface cleaning',
        },
      ],
      link: {
        to: '/professional-height-cleaning',
        text: 'Learn More',
      },
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
      title: 'Ropecess',
      description:
        'Ropecess zagotavlja visokokakovostne gradbene in specializirane dostopne storitve z varnostjo, natančnostjo in zanesljivostjo pri vsakem projektu.',
      image: bannerImage,
    },
    hero: {
      title: 'Načrtujte svoj naslednji projekt z Ropecess',
      image: bannerImage,
      lqip: bannerLqip,
      imageAlt: 'Vrvni tehnik čisti stekleno fasado nad mestom',
      link: {
        to: '/contact',
        text: 'Kontaktirajte nas',
      },
    },
    intro: {
      id: 'welcome',
      title: 'Dobrodošli v Ropecess',
      text: 'V podjetju Ropecess zagotavljamo visokokakovostne gradbene in specializirane dostopne storitve z varnostjo, natančnostjo in zanesljivostjo pri vsakem projektu.',
    },
    howWeWork: {
      title: 'Kako delamo',
      items: [
        {
          id: 'work-plan',
          title: 'Delovni načrt',
          image: workPlanImage,
          lqip: workPlanLqip,
          text: 'Naš delovni načrt zagotavlja, da je vsak projekt zaključen pravočasno, v okviru proračuna in po najvišjih standardih. Skrbno načrtujemo, upravljamo časovnice, razporejamo vire in zmanjšujemo tveganja ter vas obveščamo na vsakem koraku.',
        },
        {
          id: 'access-plan',
          title: 'Načrt dostopa',
          image: accessPlanImage,
          lqip: accessPlanLqip,
          text: 'Naš načrt dostopa daje prednost varnosti in učinkovitosti. Uporabljamo napredni vrvni dostop in inovativne metode za varno doseganje zahtevnih območij, zmanjšujemo motnje in znižujemo stroške ob ohranjanju najvišjih varnostnih standardov.',
        },
        {
          id: 'our-services',
          title: 'Naše storitve',
          image: ourServicesImage,
          lqip: ourServicesLqip,
          text: 'Ponujamo širok nabor specializiranih gradbenih in dostopnih storitev za različne industrijske potrebe.',
        },
      ],
    },
    // height-cleaning spotlight — dedicated section at the owner's request
    heightCleaning: {
      id: 'professional-height-cleaning',
      title: 'Profesionalna skrb na vsaki višini',
      text: 'V Ropecess gremo tja, kamor drugi ne morejo. Najsi vaš objekt zahteva kirurško natančnost na nežnem steklu ali intenzivno vzdrževanje jeklenih konstrukcij, naša ekipa zagotavlja visokokakovostne rešitve z najučinkovitejšimi metodami dostopa.',
      items: [
        'Čiščenje oken',
        'Silikonska popravila in hidroizolacija',
        'Čiščenje fasad in jeklenih površin',
      ],
      images: [
        {
          image: heightCleaning00,
          lqip: heightCleaning00Lqip,
          alt: 'Profesionalno čiščenje oken na višini',
        },
        {
          image: heightCleaning03,
          lqip: heightCleaning03Lqip,
          alt: 'Silikonska popravila in hidroizolacija',
        },
        {
          image: heightCleaning06,
          lqip: heightCleaning06Lqip,
          alt: 'Čiščenje fasad in jeklenih površin',
        },
      ],
      link: {
        to: '/professional-height-cleaning',
        text: 'Preberite več',
      },
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

// Extra homepage section data used by Design Preview variant components (services, spacenet, contact).
export const extra = {
  en: {
    services: {
      title: 'Our Services',
      text: 'We offer a wide range of specialized construction and access services to cater to various industry needs.',
      link: { to: '/services', text: 'All services' },
      items: [
        {
          id: 'photovoltaic-modules-installation',
          title: 'Photovoltaic Modules Installation',
          text: 'From flat roofs to vertical PV installation — every project tailored to site parameters.',
          image: photovoltaicImage,
          lqip: photovoltaicLqip,
        },
        {
          id: 'industrial-rope-access-and-climbing',
          title: 'Industrial Rope Access',
          text: 'From high bay warehouses to rock cleaning — work on ropes is our specialty.',
          image: industrialImage,
          lqip: industrialLqip,
        },
        {
          id: 'rigging',
          title: 'Rigging',
          text: 'Venue rigging with weight redundancy calculation and points set exactly on spot.',
          image: riggingImage,
          lqip: riggingLqip,
        },
        {
          id: 'stage-building',
          title: 'Stage Building',
          text: 'Working on big stages for StageCo Nederland and Belgium.',
          image: stageImage,
          lqip: stageLqip,
        },
        {
          id: 'professional-height-cleaning',
          title: 'Professional Height Cleaning',
          text: 'From surgical precision on delicate glass to heavy-duty maintenance on steel structures.',
          image: heightCleaning00,
          lqip: heightCleaning00Lqip,
          // owner-requested dedicated page — link there, not to /services#
          to: '/professional-height-cleaning',
        },
      ],
      more: [
        'Rock Cleaning and Anchoring',
        'Steel Construction Assembly',
        'Crane Rigging',
        'Window Cleaning',
        'Confined Space Rope Access',
        'Concrete and Facade Examination',
      ],
    },
    spacenet: {
      title: 'Space Net',
      tagline:
        'A hand-woven creation made from thin ropes, designed for levitation, meditation, and various whimsical activities in the sky.',
      text: 'Perfect for festivals, events, or any special occasion — enhanced with UV and LED lighting to stand out beautifully at night.',
      link: { to: '/spacenet', text: 'Discover Space Net' },
      images: [
        { image: neonGlowImage, lqip: neonGlowLqip, alt: 'Space Net with neon glow' },
        { image: festivalImage, lqip: festivalLqip, alt: 'People chilling on a Space Net on a festival' },
        { image: chilloutImage, lqip: chilloutLqip, alt: 'Space Net chillout' },
      ],
    },
    contact: {
      title: 'Get in Touch',
      text: 'Contact us today to see how Ropecess can help bring your project to life.',
      link: { to: '/contact', text: 'Contact Us' },
      form: { name: 'Name', email: 'Email', message: 'Message', button: 'Send Message' },
    },
  },
  sl: {
    services: {
      title: 'Naše storitve',
      text: 'Ponujamo širok nabor specializiranih gradbenih in dostopnih storitev za različne industrijske potrebe.',
      link: { to: '/services', text: 'Vse storitve' },
      items: [
        {
          id: 'photovoltaic-modules-installation',
          title: 'Montaža fotovoltaičnih modulov',
          text: 'Od ravnih streh do vertikalnih PV montaž — vsak projekt prilagojen parametrom gradbišča.',
          image: photovoltaicImage,
          lqip: photovoltaicLqip,
        },
        {
          id: 'industrial-rope-access-and-climbing',
          title: 'Industrijski vrvni dostop',
          text: 'Od visokoregalnih skladišč do čiščenja skal — delo na vrveh je naša specialnost.',
          image: industrialImage,
          lqip: industrialLqip,
        },
        {
          id: 'rigging',
          title: 'Odrska tehnika',
          text: 'Odrska tehnika z izračunom nosilnosti in natančno postavitvijo točk.',
          image: riggingImage,
          lqip: riggingLqip,
        },
        {
          id: 'stage-building',
          title: 'Gradnja odrov',
          text: 'Delo na velikih odrih za StageCo Nederland in Belgium.',
          image: stageImage,
          lqip: stageLqip,
        },
        {
          id: 'professional-height-cleaning',
          title: 'Profesionalno čiščenje na višini',
          text: 'Od kirurške natančnosti na steklu do intenzivnega vzdrževanja jeklenih konstrukcij.',
          image: heightCleaning00,
          lqip: heightCleaning00Lqip,
          // owner-requested dedicated page — link there, not to /services#
          to: '/professional-height-cleaning',
        },
      ],
      more: [
        'Čiščenje in sidranje skal',
        'Montaža jeklenih konstrukcij',
        'Žerjavanje',
        'Čiščenje oken',
        'Vrvni dostop v utesnjenih prostorih',
        'Pregled betona in fasad',
      ],
    },
    spacenet: {
      title: 'Space Net',
      tagline:
        'Ročno tkana stvaritev iz tankih vrvi, namenjena lebdenju, meditaciji in raznim domišljijskim dejavnostim v zraku.',
      text: 'Idealna za festivale, dogodke ali posebne priložnosti — z UV- in LED-osvetlitvijo ponoči čudovito izstopa.',
      link: { to: '/spacenet', text: 'Odkrijte Space Net' },
      images: [
        { image: neonGlowImage, lqip: neonGlowLqip, alt: 'Space Net z neonskim sijajem' },
        { image: festivalImage, lqip: festivalLqip, alt: 'Ljudje se sproščajo na Space Netu na festivalu' },
        { image: chilloutImage, lqip: chilloutLqip, alt: 'Sproščanje na Space Netu' },
      ],
    },
    contact: {
      title: 'Stopite v stik',
      text: 'Kontaktirajte nas še danes in odkrijte, kako vam Ropecess lahko pomaga uresničiti vaš projekt.',
      link: { to: '/contact', text: 'Kontaktirajte nas' },
      form: { name: 'Ime', email: 'E-pošta', message: 'Sporočilo', button: 'Pošlji sporočilo' },
    },
  },
}

export type ProtoExtra = (typeof extra)['en']

// services-grid tile target — items with a dedicated page (height cleaning)
// link there; the rest anchor into /services
export function serviceHref(item: { id: string; to?: string }) {
  return item.to ?? `/services#${item.id}`
}
