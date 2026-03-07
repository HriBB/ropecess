/* eslint-disable react-hooks/refs */
import { Form, MetaFunction } from 'react-router'

import type { Route } from './+types/spacenet'
import { handleFormError } from '~/utils/form.server'
import { sendSpacenetEmail, spacenetEmailSchema } from '~/utils/email.server'
import { siteKey, verifyRecaptcha } from '~/utils/recaptcha/recaptcha.server'
import { useRecaptcha } from '~/utils/recaptcha/recaptcha'
import { getMeta } from '~/utils/meta'
import { type Locale, useLocale } from '~/utils/i18n'
import { getLocaleFromRequest } from '~/utils/i18n.server'

import { Main } from '~/components/Main'
import { Hero } from '~/components/Hero'
import { Button } from '~/components/Button'
import { Picture } from '~/components/Picture'
import { Container } from '~/components/Container'
import {
  InputField,
  TextareaField,
  Success,
  Error,
  SubmitButton,
} from '~/components/Form'

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

const data = {
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

export const loader = async () => ({ siteKey })

export const action = async ({ request }: Route.ActionArgs) => {
  const locale = getLocaleFromRequest(request)
  const d = data[locale]
  try {
    const formData = await request.formData()
    const { token, ...form } = await spacenetEmailSchema.parseAsync(formData)
    await verifyRecaptcha(token)
    await sendSpacenetEmail(form)
    return {
      success: true,
      message: d.form.successMessage,
    }
  } catch (error) {
    return handleFormError(error, d.form.errorMessage)
  }
}

export default function SpaceNet({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const locale = useLocale()
  const d = data[locale]
  const recaptcha = useRecaptcha({ siteKey: loaderData.siteKey })
  const errors = actionData?.errors?.fieldErrors
  return (
    <Main>
      <Hero>
        <Hero.BackgroundPicture
          picture={d.hero.image}
          lqip={d.hero.lqip}
          alt={d.hero.imageAlt}
        />
        <Hero.Content>
          <Hero.Title>{d.hero.title}</Hero.Title>
          <Button
            as="a"
            href={d.hero.button.href}
            color="secondary"
            size="lg"
          >
            {d.hero.button.text}
          </Button>
        </Hero.Content>
      </Hero>

      <Container
        id="what-is-a-space-net"
        as="section"
        size="md"
        className="py-40"
      >
        <Main.H2>
          <a href="#what-is-a-space-net">{d.sections.whatIs.title}</a>
        </Main.H2>
        <Main.P size="lg">{d.sections.whatIs.text}</Main.P>
      </Container>

      <Picture
        picture={chilloutImage3}
        lqip={chilloutImage3Lqip}
        alt={d.images.chilloutPeople}
        pictureClassName="w-full"
        className="w-full object-cover"
        loading="lazy"
      />

      <Container
        id="how-we-use-a-space-net"
        as="section"
        size="md"
        className="py-40"
      >
        <Main.H2>
          <a href="#how-we-use-a-space-net">{d.sections.howWeUse.title}</a>
        </Main.H2>
        <Main.P size="lg">{d.sections.howWeUse.text}</Main.P>
      </Container>

      <Picture
        picture={makingOfImage4}
        lqip={makingOfImage4Lqip}
        alt={d.images.craftingNet}
        pictureClassName="w-full"
        className="w-full object-cover"
        loading="lazy"
      />

      <Container
        id="how-you-might-use-a-space-net"
        as="section"
        size="md"
        className="py-40"
      >
        <Main.H2>
          <a href="#how-you-might-use-a-space-net">
            {d.sections.howYouMightUse.title}
          </a>
        </Main.H2>
        <Main.P size="lg">{d.sections.howYouMightUse.text}</Main.P>
      </Container>

      <Picture
        picture={neonGlowImage5}
        lqip={neonGlowImage5Lqip}
        alt={d.images.neonGlow}
        pictureClassName="w-full max-h-screen"
        className="max-h-screen w-full object-cover object-top"
        loading="lazy"
      />

      <Container
        id="floating-above-the-ground"
        as="section"
        size="md"
        className="py-40"
      >
        <Main.H2>
          <a href="#floating-above-the-ground">
            {d.sections.floating.title}
          </a>
        </Main.H2>
        <Main.P size="lg">{d.sections.floating.text1}</Main.P>
        <Main.P size="lg">{d.sections.floating.text2}</Main.P>
      </Container>

      <Picture
        picture={chilloutImage2}
        lqip={chilloutImage2Lqip}
        alt={d.images.chillout}
        pictureClassName="w-full"
        className="w-full object-cover"
        loading="lazy"
      />

      <Container
        id="perfect-for-events-and-festivals"
        as="section"
        size="md"
        className="py-40"
      >
        <Main.H2>
          <a href="#perfect-for-events-and-festivals">
            {d.sections.events.title}
          </a>
        </Main.H2>
        <Main.P size="lg">{d.sections.events.text1}</Main.P>
        <Main.P size="lg">{d.sections.events.text2}</Main.P>
        <p>{d.sections.events.text3}</p>
      </Container>

      <Picture
        picture={chilloutImage4}
        lqip={chilloutImage4Lqip}
        alt={d.images.festival}
        pictureClassName="w-full"
        className="w-full object-cover"
        loading="lazy"
      />

      <section id="rent-or-buy" className="bg-slate-50 py-40 dark:bg-slate-950">
        <Container size="sm">
          <div className="pb-10">
            <Main.SpecialTitle>
              <a href="#rent-or-buy">{d.sections.rentOrBuy.title}</a>
            </Main.SpecialTitle>
            <Main.P size="lg" className="text-black dark:text-white">
              {d.sections.rentOrBuy.text1}
            </Main.P>
            <Main.P size="lg" className="text-black dark:text-white">
              {d.sections.rentOrBuy.text2}
            </Main.P>
            <Main.P size="lg" className="text-black dark:text-white">
              {d.sections.rentOrBuy.text3}
            </Main.P>
          </div>
          <Form
            method="POST"
            className="flex flex-1 flex-col gap-5"
            ref={recaptcha.formRef}
            onSubmit={recaptcha.appendTokendAndSubmit}
          >
            <InputField
              id="name"
              name="name"
              label={d.form.name}
              error={errors?.name}
              disabled={recaptcha.isBusy}
              autoComplete="name"
            />
            <InputField
              id="email"
              name="email"
              label={d.form.email}
              error={errors?.email}
              disabled={recaptcha.isBusy}
              autoComplete="email"
            />
            <TextareaField
              id="message"
              name="message"
              label={d.form.message}
              error={errors?.message}
              disabled={recaptcha.isBusy}
            />
            <SubmitButton disabled={recaptcha.isBusy}>
              {d.form.button}
            </SubmitButton>
            {actionData?.message && <Success>{actionData.message}</Success>}
            {actionData?.error && <Error>{actionData.error}</Error>}
            <div id="recaptcha" />
          </Form>
        </Container>
      </section>

      <Picture
        picture={makingOfImage2}
        lqip={makingOfImage2Lqip}
        alt={d.images.craftingLake}
        pictureClassName="w-full"
        className="w-full object-cover"
        loading="lazy"
      />
    </Main>
  )
}
