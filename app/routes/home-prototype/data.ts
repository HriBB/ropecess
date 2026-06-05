/**
 * PROTOTYPE — extra homepage section data (services, spacenet, contact).
 * Copy + images reused from routes/services.tsx, routes/spacenet.tsx,
 * routes/contact.tsx. Localized en/sl. Deleted with the prototype — the
 * winning structure gets folded into home.tsx properly.
 */
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

import neonGlowImage from '~/images/spacenet/two-spacenets-at-night-glow.jpg?hero'
import neonGlowLqip from '~/images/spacenet/two-spacenets-at-night-glow.jpg?lqip'
import festivalImage from '~/images/spacenet/spacenet-chillout-festival.jpg?hero'
import festivalLqip from '~/images/spacenet/spacenet-chillout-festival.jpg?lqip'
import chilloutImage from '~/images/spacenet/spacenet-chillout-from-below.jpg?hero'
import chilloutLqip from '~/images/spacenet/spacenet-chillout-from-below.jpg?lqip'

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
          image: heightCleaningImage,
          lqip: heightCleaningLqip,
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
          image: heightCleaningImage,
          lqip: heightCleaningLqip,
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
