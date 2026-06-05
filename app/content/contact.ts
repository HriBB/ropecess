import bannerImage from '~/images/contact/banner.jpg?hero'
import bannerLqip from '~/images/contact/banner.jpg?lqip'

export const data = {
  en: {
    meta: {
      title: 'Contact Us',
      description:
        'Get in touch with Ropecess to discuss your project requirements. Our team is here to help you with your construction and access needs.',
      image: bannerImage,
    },
    hero: {
      title: 'Contact Us',
      image: bannerImage,
      lqip: bannerLqip,
      imageAlt: 'Construction worker on a building site',
    },
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      button: 'Send Message',
      errorMessage: 'Form contains errors',
      successMessage:
        'Thank you for your inquiry. We will get back to you as soon as possible.',
    },
  },
  sl: {
    meta: {
      title: 'Kontakt',
      description:
        'Stopite v stik z Ropecess in se pogovorite o zahtevah vašega projekta. Naša ekipa vam je na voljo za vaše gradbene in dostopne potrebe.',
      image: bannerImage,
    },
    hero: {
      title: 'Kontakt',
      image: bannerImage,
      lqip: bannerLqip,
      imageAlt: 'Gradbeni delavec na gradbišču',
    },
    form: {
      name: 'Ime',
      email: 'E-pošta',
      message: 'Sporočilo',
      button: 'Pošlji sporočilo',
      errorMessage: 'Obrazec vsebuje napake',
      successMessage:
        'Hvala za vaše povpraševanje. Odgovorili vam bomo v najkrajšem možnem času.',
    },
  },
}
