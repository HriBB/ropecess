import bannerImage from '~/images/spacenet/spacenet-making-of.jpg?hero'
import bannerLqip from '~/images/spacenet/spacenet-making-of.jpg?lqip'
import chilloutImage2 from '~/images/spacenet/spacenet-chillout-from-below.jpg?hero'
import chilloutImage2Lqip from '~/images/spacenet/spacenet-chillout-from-below.jpg?lqip'
import chilloutImage3 from '~/images/spacenet/spacenet-chillout-people.jpg?hero'
import chilloutImage3Lqip from '~/images/spacenet/spacenet-chillout-people.jpg?lqip'
import chilloutImage4 from '~/images/spacenet/spacenet-chillout-festival.jpg?hero'
import chilloutImage4Lqip from '~/images/spacenet/spacenet-chillout-festival.jpg?lqip'
import makingOfImage4 from '~/images/spacenet/spacenet-making-of-04.jpg?hero'
import makingOfImage4Lqip from '~/images/spacenet/spacenet-making-of-04.jpg?lqip'
import makingOfImage2 from '~/images/spacenet/spacenet-making-of-02.jpg?hero'
import makingOfImage2Lqip from '~/images/spacenet/spacenet-making-of-02.jpg?lqip'
import neonGlowImage5 from '~/images/spacenet/two-spacenets-at-night-glow.jpg?hero'
import neonGlowImage5Lqip from '~/images/spacenet/two-spacenets-at-night-glow.jpg?lqip'

// Page-layout images (locale-independent)
export const pageImages = {
  chilloutPeople: { image: chilloutImage3, lqip: chilloutImage3Lqip },
  craftingNet: { image: makingOfImage4, lqip: makingOfImage4Lqip },
  neonGlow: { image: neonGlowImage5, lqip: neonGlowImage5Lqip },
  chillout: { image: chilloutImage2, lqip: chilloutImage2Lqip },
  festival: { image: chilloutImage4, lqip: chilloutImage4Lqip },
  craftingLake: { image: makingOfImage2, lqip: makingOfImage2Lqip },
}

export const data = {
  en: {
    meta: {
      title: 'Space Net',
      description:
        'The Space Net, a hand-woven creation made from thin ropes, is designed for levitation, meditation, and various whimsical activities in the sky.',
      image: bannerImage,
    },
    hero: {
      title: 'Space Net',
      image: bannerImage,
      lqip: bannerLqip,
      imageAlt: 'Making of Space Net',
      button: {
        text: 'Buy or Rent',
        href: '#rent-or-buy',
      },
    },
    sections: {
      whatIs: {
        title: 'What is a Space Net?',
        text: 'The Space Net, a hand-woven creation made from thin ropes, is designed for levitation, meditation, and various whimsical activities in the sky.',
      },
      howWeUse: {
        title: 'How we use a Space Net?',
        text: 'Our team crafts these nets and sets them up for different occasions. Sometimes they soar high in the air, other times they rest low to the ground, and often they are layered one above the other.',
      },
      howYouMightUse: {
        title: 'How you might use a Space Net?',
        text: 'It is perfect to set up a chill area on festival, event, or any other special occasion. Or even just for fun! We can enhance the setup with UV and LED lighting to make it stand out beautifully at night.',
      },
      floating: {
        title: 'Floating above the ground',
        text1: 'Experience the thrill of floating like never before with a space-net! This innovative setup transforms your outdoor adventures, offering a unique blend of levitation and fun.',
        text2: 'Designed for both beginners and seasoned chill-seeking adventiurers, a space-net provides a safe and exhilarating way to relax in gravity-defying way above the ground.',
      },
      events: {
        title: 'Perfect for events and festivals',
        text1: 'Imagine setting up a stunning display at your next event or festival, where participants can float above the ground, challenge themselves, and enjoy a captivating atmosphere.',
        text2: 'With customizable options for LED and UV lighting, the space-net creates an enchanting visual experience, especially at night. Whether for a special occasion, team-building event, or just for fun, renting or purchasing a Space Net will elevate your gatherings and leave lasting memories.',
        text3: "Don't miss out on this extraordinary adventure!",
      },
      rentOrBuy: {
        title: 'Rent or buy a Space Net?',
        text1: 'If you are interested in having one of these nets, feel free to reach out! We can install them at your festival, event, or any special occasion, or even just for fun.',
        text2: 'We can enhance the setup with UV and LED lighting to make it stand out beautifully at night.',
        text3: 'Please, fill out the form below.',
      },
    },
    images: {
      chilloutPeople: 'People chilling on a Space Net',
      craftingNet: 'Crafting a Space Net',
      neonGlow: 'Space Net with neon glow',
      chillout: 'Space Net chillout',
      festival: 'People chilling on a Space Net on a festival',
      craftingLake: 'Crafting a Space Net next to a lake',
    },
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      button: 'Submit',
      errorMessage: 'Form contains errors',
      successMessage:
        'Thank you for your inquiry. We will get back to you as soon as possible.',
    },
  },
  sl: {
    meta: {
      title: 'Space Net',
      description:
        'Space Net, ročno tkana stvaritev iz tankih vrvi, je namenjena lebdenju, meditaciji in raznim domišljijskim dejavnostim v zraku.',
      image: bannerImage,
    },
    hero: {
      title: 'Space Net',
      image: bannerImage,
      lqip: bannerLqip,
      imageAlt: 'Izdelava Space Neta',
      button: {
        text: 'Kupite ali najemite',
        href: '#rent-or-buy',
      },
    },
    sections: {
      whatIs: {
        title: 'Kaj je Space Net?',
        text: 'Space Net, ročno tkana stvaritev iz tankih vrvi, je namenjena lebdenju, meditaciji in raznim domišljijskim dejavnostim v zraku.',
      },
      howWeUse: {
        title: 'Kako uporabljamo Space Net?',
        text: 'Naša ekipa te mreže izdela in jih postavi za različne priložnosti. Včasih se dvignejo visoko v zrak, včasih počivajo nizko nad tlemi, pogosto pa so zložene ena nad drugo.',
      },
      howYouMightUse: {
        title: 'Kako bi vi lahko uporabili Space Net?',
        text: 'Idealna je za postavitev sprostitvenega kotička na festivalu, dogodku ali kateri koli drugi posebni priložnosti. Ali pa kar za zabavo! Postavitev lahko nadgradimo z UV- in LED-osvetlitvijo, da ponoči čudovito izstopa.',
      },
      floating: {
        title: 'Lebdenje nad tlemi',
        text1: 'Doživite vznemirjenje lebdenja kot še nikoli prej s space-netom! Ta inovativna postavitev preoblikuje vaše outdoor pustolovščine in ponuja edinstveno mešanico lebdenja in zabave.',
        text2: 'Zasnovana tako za začetnike kot za izkušene iskalce sproščanja, space-net ponuja varen in navdušujoč način za sprostitev na gravitaciji kljubujoč način nad tlemi.',
      },
      events: {
        title: 'Popolna za dogodke in festivale',
        text1: 'Predstavljajte si osupljivo postavitev na vašem naslednjem dogodku ali festivalu, kjer lahko udeleženci lebdijo nad tlemi, se izzovejo in uživajo v očarljivi atmosferi.',
        text2: 'Z možnostjo prilagoditve LED- in UV-osvetlitve space-net ustvari čarobno vizualno izkušnjo, še posebej ponoči. Bodisi za posebno priložnost, team-building dogodek ali preprosto za zabavo, najem ali nakup Space Neta bo dvignil vaše druženje in pustil trajne spomine.',
        text3: 'Ne zamudite te izjemne pustolovščine!',
      },
      rentOrBuy: {
        title: 'Najemite ali kupite Space Net?',
        text1: 'Če vas zanima ena od teh mrež, nas kontaktirajte! Lahko jih namestimo na vašem festivalu, dogodku ali kateri koli posebni priložnosti, ali pa kar za zabavo.',
        text2: 'Postavitev lahko nadgradimo z UV- in LED-osvetlitvijo, da ponoči čudovito izstopa.',
        text3: 'Prosimo, izpolnite spodnji obrazec.',
      },
    },
    images: {
      chilloutPeople: 'Ljudje se sproščajo na Space Netu',
      craftingNet: 'Izdelava Space Neta',
      neonGlow: 'Space Net z neonskim sijajem',
      chillout: 'Sproščanje na Space Netu',
      festival: 'Ljudje se sproščajo na Space Netu na festivalu',
      craftingLake: 'Izdelava Space Neta ob jezeru',
    },
    form: {
      name: 'Ime',
      email: 'E-pošta',
      message: 'Sporočilo',
      button: 'Pošlji',
      errorMessage: 'Obrazec vsebuje napake',
      successMessage:
        'Hvala za vaše povpraševanje. Odgovorili vam bomo v najkrajšem možnem času.',
    },
  },
}
