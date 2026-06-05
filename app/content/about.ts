import bannerImage from '~/images/about/banner.jpg?hero'
import bannerLqip from '~/images/about/banner.jpg?lqip'
import industrialImage from '~/images/services/industrial-rope-access-01.jpg?thumb'
import industrialLqip from '~/images/services/industrial-rope-access-01.jpg?lqip'
import photovoltaicImage from '~/images/services/photovoltaic-module-installation-01.jpg?thumb'
import photovoltaicLqip from '~/images/services/photovoltaic-module-installation-01.jpg?lqip'
import riggingImage from '~/images/services/rigging-01.jpg?thumb'
import riggingLqip from '~/images/services/rigging-01.jpg?lqip'
import stageImage from '~/images/services/stage-building-01.jpg?thumb'
import stageLqip from '~/images/services/stage-building-01.jpg?lqip'

export const data = {
  en: {
    meta: {
      title: 'Our Story',
      description:
        'Ropecess offers a range of specialized solutions such as photovoltaic installation, rock cleaning, venue rigging, and rope access in confined spaces.',
      image: bannerImage,
    },
    hero: {
      title: 'Our Story',
      image: bannerImage,
      lqip: bannerLqip,
      imageAlt: 'Construction frame with workers',
    },
    items: [
      {
        id: 1,
        image: industrialImage,
        lqip: industrialLqip,
        alt: 'Industrial rope access',
        anchor: '#industrial-rope-access',
        text: 'At Ropecess, we specialize in providing high-quality rope work and height steel construction services, along with a range of other specialized services such as photovoltaic installation, rock cleaning, venue rigging, and rope access in confined spaces. With a deep-rooted passion for climbing and highline adventures, we have turned our love for vertical pursuits into a thriving business.',
      },
      {
        id: 2,
        image: photovoltaicImage,
        lqip: photovoltaicLqip,
        alt: 'Photovoltaic module installation',
        anchor: '#photovoltaic-module-installation',
        text: 'Founded five years ago, we have quickly become a trusted name in our industry. Our team boasts extensive experience and holds an IRATA certificate, ensuring that we meet the highest safety and operational standards.',
      },
      {
        id: 3,
        image: riggingImage,
        lqip: riggingLqip,
        alt: 'Rigging',
        anchor: '#rigging',
        text: "What sets us apart is not just our technical proficiency - it's our commitment to delivering exceptional results with a personal touch. We prioritize your needs and work closely with you to understand your requirements, ensuring that our solutions are tailor-made to meet your specific project goals.",
      },
      {
        id: 4,
        image: stageImage,
        lqip: stageLqip,
        alt: 'Stage building',
        anchor: '#stage-building',
        text: "Whether it's constructing steel structures at great heights or harnessing renewable energy through photovoltaic installations, Ropecess is dedicated to delivering excellence in every project we undertake. Safety remains at the forefront of everything we do, and we strictly adhere to industry regulations to provide a secure working environment for our team and clients alike.",
      },
    ],
  },
  sl: {
    meta: {
      title: 'Naša zgodba',
      description:
        'Ropecess ponuja specializirane rešitve, kot so montaža fotovoltaike, čiščenje skal, odrska tehnika in vrvni dostop v utesnjenih prostorih.',
      image: bannerImage,
    },
    hero: {
      title: 'Naša zgodba',
      image: bannerImage,
      lqip: bannerLqip,
      imageAlt: 'Gradbeni oder z delavci',
    },
    items: [
      {
        id: 1,
        image: industrialImage,
        lqip: industrialLqip,
        alt: 'Industrijski vrvni dostop',
        anchor: '#industrial-rope-access',
        text: 'V podjetju Ropecess smo specializirani za visokokakovostna vrvna dela in montažo jeklenih konstrukcij na višini, skupaj z vrsto drugih specializiranih storitev, kot so montaža fotovoltaike, čiščenje skal, odrska tehnika in vrvni dostop v utesnjenih prostorih. Z globoko zakoreninjena strastjo do plezanja in highlina smo svojo ljubezen do vertikalnih podvigov spremenili v uspešen posel.',
      },
      {
        id: 2,
        image: photovoltaicImage,
        lqip: photovoltaicLqip,
        alt: 'Montaža fotovoltaičnih modulov',
        anchor: '#photovoltaic-module-installation',
        text: 'Ustanovljeni pred petimi leti smo hitro postali zaupanja vredno ime v naši panogi. Naša ekipa se ponaša z obsežnimi izkušnjami in ima certifikat IRATA, kar zagotavlja, da izpolnjujemo najvišje varnostne in operativne standarde.',
      },
      {
        id: 3,
        image: riggingImage,
        lqip: riggingLqip,
        alt: 'Odrska tehnika',
        anchor: '#rigging',
        text: 'Kar nas ločuje od drugih, ni le naša tehnična usposobljenost – to je naša zavezanost k doseganju izjemnih rezultatov z osebnim pristopom. Prednost dajemo vašim potrebam in tesno sodelujemo z vami, da razumemo vaše zahteve ter zagotovimo, da so naše rešitve prilagojene vašim specifičnim projektnim ciljem.',
      },
      {
        id: 4,
        image: stageImage,
        lqip: stageLqip,
        alt: 'Gradnja odrov',
        anchor: '#stage-building',
        text: 'Bodisi gre za gradnjo jeklenih konstrukcij na velikih višinah ali za izkoriščanje obnovljive energije s fotovoltaičnimi napravami, je Ropecess predan odličnosti pri vsakem projektu, ki se ga lotimo. Varnost ostaja v ospredju vsega, kar počnemo, in dosledno spoštujemo industrijske predpise za zagotavljanje varnega delovnega okolja za našo ekipo in stranke.',
      },
    ],
  },
}
