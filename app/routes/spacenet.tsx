import { ActionFunctionArgs } from '@remix-run/node'
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react'

import { formResponseData, handleFormError } from '~/utils/form.server'
import { siteKey, verifyRecaptcha } from '~/utils/recaptcha.server'
import { contactEmailSchema, sendContactEmail } from '~/utils/email.server'

import { cls } from '~/utils/cls'
import { Hero } from '~/components/Hero'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { FormField } from '~/components/FormField'
import { Main } from '~/components/Main'
import { useRecaptcha } from '~/utils/recaptcha'

export { prefetchRecaptchaLinks as links } from '~/utils/recaptcha'

const data = {
  hero: {
    title: 'Space Net',
    image: '/images/spacenet/spacenet-making-of.jpg',
    imageAlt: 'Making of Space Net',
    button: {
      text: 'Buy or Rent',
      href: '#rent-or-buy',
    },
  },
  image: {
    image1: '/images/spacenet/big-triangle-spacenet.jpg',
    image3: '/images/spacenet/spacenet-no-jumping.jpg',
    image2: '/images/spacenet/spacenet-neon-glow.jpg',
  },
  chillout: {
    image1: '/images/spacenet/spacenet-chillout-from-above.jpg',
    image2: '/images/spacenet/spacenet-chillout-from-below.jpg',
    image3: '/images/spacenet/spacenet-chillout-people.jpg',
    image4: '/images/spacenet/spacenet-chillout-festival.jpg',
  },
  makingOf: {
    image: '/images/spacenet/spacenet-making-of.jpg',
    image1: '/images/spacenet/spacenet-making-of-01.jpg',
    image2: '/images/spacenet/spacenet-making-of-02.jpg',
    image3: '/images/spacenet/spacenet-making-of-03.jpg',
    image4: '/images/spacenet/spacenet-making-of-04.jpg',
  },
  neonGlow: {
    image1: '/images/spacenet/spacenet-neon-glow.jpg',
    image2: '/images/spacenet/spacenet-neon-glow-closeup.jpeg',
    image3: '/images/spacenet/spacenet-neon-glow-next.jpeg',
    image4: '/images/spacenet/spacenet-neon-glow-blurry.jpg',
    image5: '/images/spacenet/two-spacenets-at-night-glow.jpg',
  },
  form: {
    image: '/images/spacenet/spacenet-making-of-02.jpg',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    button: 'Submit',
    errorMessage: 'Form contains errors',
    successMessage:
      'Thank you for your inquiry. We will get back to you as soon as possible.',
  },
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData()
    const { token, ...contact } = await contactEmailSchema.parseAsync(formData)
    await verifyRecaptcha(token)
    await sendContactEmail(contact)
    return formResponseData({
      success: true,
      message: data.form.successMessage,
    })
  } catch (error) {
    return handleFormError(error, data.form.errorMessage)
  }
}

export const loader = async () => {
  return { siteKey }
}

export default function SpaceNet() {
  const { siteKey } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const recaptcha = useRecaptcha({ siteKey })

  const isLoading = navigation.state !== 'idle'
  const isSuccess = actionData?.success === true
  const errors = actionData?.errors?.fieldErrors

  return (
    <Main>
      <Hero>
        <Hero.BackgroundImage src={data.hero.image} alt={data.hero.imageAlt} />
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

      <Container as="section" className="py-24">
        <Main.H2>What is a Space Net?</Main.H2>
        <Main.P size="lg">
          The Space Net, a hand-woven creation made from thin ropes, is designed
          for levitation, meditation, and various whimsical activities in the
          sky.
        </Main.P>
      </Container>

      <img
        className="w-full"
        src={data.chillout.image3}
        alt="Space Net"
        loading="lazy"
      />

      <Container as="section" className="py-24">
        <Main.H2>How to use a Space Net?</Main.H2>
        <Main.P size="lg">
          Our team crafts these nets and sets them up for different occasions.
          Sometimes they soar high in the air, other times they rest low to the
          ground, and often they are layered one above the other.
        </Main.P>
      </Container>

      <img
        className="w-full"
        src={data.makingOf.image4}
        alt="Space Net"
        loading="lazy"
      />

      <Container as="section" className="py-24">
        <Main.H2>Where to use a Space Net?</Main.H2>
        <Main.P size="lg">
          It is perfect to set up a chill area on festival, event, or any
          special occasion, or even just for fun. We can enhance the setup with
          UV and LED lighting to make it stand out beautifully at night.
        </Main.P>
      </Container>

      <img
        className="max-h-screen w-full object-cover object-top"
        src={data.neonGlow.image5}
        alt="Space Net"
        loading="lazy"
      />

      <Container as="section" className="py-24">
        <Main.H2>Floating on a Space Net</Main.H2>
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

      <img
        className="w-full"
        src={data.chillout.image2}
        alt="Space Net"
        loading="lazy"
      />

      <Container as="section" className="py-24">
        <Main.H2>Perfect for events and festivals</Main.H2>
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

      <img
        className="w-full"
        src={data.chillout.image4}
        alt="Space Net"
        loading="lazy"
      />

      <Container
        as="section"
        className="bg-slate-50 py-24 dark:bg-slate-950"
        id="rent-or-buy"
      >
        <div className="pb-10">
          <Main.SpecialTitle>Rent or buy a spacenet?</Main.SpecialTitle>
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
        <div className="flex flex-col gap-5 md:flex-row">
          <Form
            method="POST"
            className="flex flex-1 flex-col gap-5"
            onSubmit={recaptcha.appendTokendAndSubmit}
          >
            <FormField
              label={data.form.name}
              htmlFor="name"
              error={errors?.name}
            >
              <input
                id="name"
                name="name"
                type="text"
                className={cls(
                  'input input-bordered input-secondary w-full bg-transparent',
                  isSuccess && 'input-disabled',
                  errors?.name && 'input-error',
                )}
                disabled={isSuccess}
                //defaultValue="Alpi Nistič"
              />
            </FormField>
            <FormField
              label={data.form.email}
              htmlFor="email"
              error={errors?.email}
            >
              <input
                id="email"
                name="email"
                type="text"
                className={cls(
                  'input input-bordered input-secondary w-full bg-transparent',
                  isSuccess && 'input-disabled',
                  errors?.email && 'input-error',
                )}
                disabled={isSuccess}
                //defaultValue="bojan.hribernik@gmail.com"
              />
            </FormField>
            <FormField
              label={data.form.message}
              htmlFor="message"
              error={errors?.message}
            >
              <textarea
                className={cls(
                  'textarea textarea-bordered textarea-secondary w-full bg-transparent',
                  isSuccess && 'textarea-disabled',
                  errors?.message && 'textarea-error',
                )}
                id="message"
                name="message"
                rows={5}
                disabled={isSuccess}
                //defaultValue={'Test @localhost'}
              />
            </FormField>
            <div className="flex max-w-lg items-center justify-end gap-4">
              {actionData?.message && (
                <p className="text-green-700">{actionData.message}</p>
              )}
              {actionData?.error && (
                <p className="text-red-500">{actionData.error}</p>
              )}
              <Button
                color="secondary"
                type="submit"
                className="w-full md:w-auto md:min-w-24"
                disabled={isSuccess || isLoading || !recaptcha.isReady}
              >
                {data.form.button}
              </Button>
            </div>
          </Form>

          <div className="flex-1">
            <img
              className="mt-20 w-full md:mt-0"
              src={data.form.image}
              alt="Space Net"
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </Main>
  )
}
