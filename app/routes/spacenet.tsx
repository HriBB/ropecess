import { Form, MetaFunction } from 'react-router'

import type * as Route from './+types.spacenet'
import { handleFormError } from '~/utils/form.server'
import { sendSpacenetEmail, spacenetEmailSchema } from '~/utils/email.server'
import { siteKey, verifyRecaptcha } from '~/utils/recaptcha/recaptcha.server'
import { useRecaptcha } from '~/utils/recaptcha/recaptcha'
import { getMeta } from '~/utils/meta'

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
  form: {
    name: 'Name',
    email: 'Email',
    message: 'Message',
    button: 'Submit',
    errorMessage: 'Form contains errors',
    successMessage:
      'Thank you for your inquiry. We will get back to you as soon as possible.',
  },
}

export const meta: MetaFunction = () => getMeta(data.meta)

export const loader = async () => ({ siteKey })

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.formData()
    const { token, ...form } = await spacenetEmailSchema.parseAsync(formData)
    await verifyRecaptcha(token)
    await sendSpacenetEmail(form)
    return {
      success: true,
      message: data.form.successMessage,
    }
  } catch (error) {
    return handleFormError(error, data.form.errorMessage)
  }
}

export default function SpaceNet({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const recaptcha = useRecaptcha({ siteKey: loaderData.siteKey })
  const errors = actionData?.errors?.fieldErrors
  return (
    <Main>
      <Hero>
        <Hero.BackgroundPicture
          picture={data.hero.image}
          lqip={data.hero.lqip}
          alt={data.hero.imageAlt}
        />
        <Hero.Content>
          <Hero.Title>{data.hero.title}</Hero.Title>
          <Button
            as="a"
            href={data.hero.button.href}
            color="secondary"
            size="lg"
          >
            {data.hero.button.text}
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
          <a href="#what-is-a-space-net">What is a Space Net?</a>
        </Main.H2>
        <Main.P size="lg">
          The Space Net, a hand-woven creation made from thin ropes, is designed
          for levitation, meditation, and various whimsical activities in the
          sky.
        </Main.P>
      </Container>

      <Picture
        picture={chilloutImage3}
        lqip={chilloutImage3Lqip}
        alt="People chilling on a Space Net"
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
          <a href="#how-we-use-a-space-net">How we use a Space Net?</a>
        </Main.H2>
        <Main.P size="lg">
          Our team crafts these nets and sets them up for different occasions.
          Sometimes they soar high in the air, other times they rest low to the
          ground, and often they are layered one above the other.
        </Main.P>
      </Container>

      <Picture
        picture={makingOfImage4}
        lqip={makingOfImage4Lqip}
        alt="Crafting a Space Net"
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
            How you might use a Space Net?
          </a>
        </Main.H2>
        <Main.P size="lg">
          It is perfect to set up a chill area on festival, event, or any other
          special occasion. Or even just for fun! We can enhance the setup with
          UV and LED lighting to make it stand out beautifully at night.
        </Main.P>
      </Container>

      <Picture
        picture={neonGlowImage5}
        lqip={neonGlowImage5Lqip}
        alt="Space Net with neon glow"
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
          <a href="#floating-above-the-ground">Floating above the ground</a>
        </Main.H2>
        <Main.P size="lg">
          Experience the thrill of floating like never before with a space-net!
          This innovative setup transforms your outdoor adventures, offering a
          unique blend of levitation and fun.
        </Main.P>
        <Main.P size="lg">
          Designed for both beginners and seasoned chill-seeking adventiurers, a
          space-net provides a safe and exhilarating way to relax in
          gravity-defying way above the ground.
        </Main.P>
      </Container>

      <Picture
        picture={chilloutImage2}
        lqip={chilloutImage2Lqip}
        alt="Space Net chillout"
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
            Perfect for events and festivals
          </a>
        </Main.H2>
        <Main.P size="lg">
          Imagine setting up a stunning display at your next event or festival,
          where participants can float above the ground, challenge themselves,
          and enjoy a captivating atmosphere.
        </Main.P>
        <Main.P size="lg">
          With customizable options for LED and UV lighting, the space-net
          creates an enchanting visual experience, especially at night. Whether
          for a special occasion, team-building event, or just for fun, renting
          or purchasing a Space Net will elevate your gatherings and leave
          lasting memories.
        </Main.P>
        <p>Don&apos;t miss out on this extraordinary adventure!</p>
      </Container>

      <Picture
        picture={chilloutImage4}
        lqip={chilloutImage4Lqip}
        alt="People chilling on a Space Net on a festival"
        pictureClassName="w-full"
        className="w-full object-cover"
        loading="lazy"
      />

      <section id="rent-or-buy" className="bg-slate-50 py-40 dark:bg-slate-950">
        <Container size="sm">
          <div className="pb-10">
            <Main.SpecialTitle>
              <a href="#rent-or-buy">Rent or buy a Space Net?</a>
            </Main.SpecialTitle>
            <Main.P size="lg" className="text-black dark:text-white">
              If you are interested in having one of these nets, feel free to
              reach out! We can install them at your festival, event, or any
              special occasion, or even just for fun.
            </Main.P>
            <Main.P size="lg" className="text-black dark:text-white">
              We can enhance the setup with UV and LED lighting to make it stand
              out beautifully at night.
            </Main.P>
            <Main.P size="lg" className="text-black dark:text-white">
              Please, fill out the form below.
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
              label={data.form.name}
              error={errors?.name}
              disabled={recaptcha.isBusy}
              autoComplete="name"
            />
            <InputField
              id="email"
              name="email"
              label={data.form.email}
              error={errors?.email}
              disabled={recaptcha.isBusy}
              autoComplete="email"
            />
            <TextareaField
              id="message"
              name="message"
              label={data.form.message}
              error={errors?.message}
              disabled={recaptcha.isBusy}
            />
            <SubmitButton disabled={recaptcha.isBusy}>
              {data.form.button}
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
        alt="Crafting a Space Net next to a lake"
        pictureClassName="w-full"
        className="w-full object-cover"
        loading="lazy"
      />
    </Main>
  )
}
