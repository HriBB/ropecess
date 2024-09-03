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
import { useRecaptcha } from '~/utils/recaptcha'

export { prefetchRecaptchaLinks as links } from '~/utils/recaptcha'

const data = {
  hero: {
    image: '/img/spacenet/spacenet-neon-glow.jpg',
    title: 'Space Net',
  },
  image: {
    image1: '/img/spacenet/big-triangle-spacenet.jpg',
    image3: '/img/spacenet/spacenet-no-jumping.jpg',
    image2: '/img/spacenet/spacenet-neon-glow.jpg',
  },
  chillout: {
    image1: '/img/spacenet/spacenet-chillout-from-above.jpg',
    image2: '/img/spacenet/spacenet-chillout-from-below.jpg',
    image3: '/img/spacenet/spacenet-chillout-people.jpg',
  },
  makingOf: {
    image: '/img/spacenet/spacenet-making-of.jpg',
    image1: '/img/spacenet/spacenet-making-of-01.jpg',
    image2: '/img/spacenet/spacenet-making-of-02.jpg',
    image3: '/img/spacenet/spacenet-making-of-03.jpg',
    image4: '/img/spacenet/spacenet-making-of-04.jpg',
  },
  neonGlow: {
    image1: '/img/spacenet/spacenet-neon-glow.jpg',
    image2: '/img/spacenet/spacenet-neon-glow-closeup.jpeg',
    image3: '/img/spacenet/spacenet-neon-glow-next.jpeg',
    image4: '/img/spacenet/spacenet-neon-glow-blurry.jpg',
    image5: '/img/spacenet/two-spacenets-at-night-glow.jpg',
  },
  form: {
    image: '/img/spacenet/two-spacenets-at-night-glow.jpg',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    button: 'Send',
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
    <main>
      <Hero backgroundImage={data.hero.image}>
        <Hero.Content>
          <Hero.Title>{data.hero.title}</Hero.Title>
        </Hero.Content>
      </Hero>

      <Container as="section" className="py-24">
        <h2 className="mb-8 text-4xl font-semibold">What is space net?</h2>
        <p>
          The space net, a hand-woven creation made from thin ropes, is designed
          for levitation, meditation, and various whimsical activities in the
          sky. Our team crafts these nets and sets them up for different
          occasions. Sometimes they soar high in the air, other times they rest
          low to the ground, and often they are layered one above the other. If
          you are interested in having one of these nets, feel free to reach
          out! We can install them at your festival, event, or any special
          occasion, or even just for fun. We can enhance the setup with UV and
          LED lighting to make it stand out beautifully at night.
        </p>
      </Container>

      <img src={data.chillout.image1} alt="Space Net" className="w-full" />

      <Container as="section" className="py-24">
        <h2 className="mb-8 text-4xl font-semibold">WHERE TO USE IT?</h2>
        <p>
          It is perfect to set up a chill area on festival, event, or any
          special occasion, or even just for fun. We can enhance the setup with
          UV and LED lighting to make it stand out beautifully at night.
        </p>
      </Container>

      <img src={data.chillout.image2} alt="Space Net" className="w-full" />

      <Container as="section" className="py-24">
        <h2 className="mb-8 text-4xl font-semibold">WHAT IS SPACENET!?</h2>
        <p>
          The space net, a hand-woven creation made from thin ropes, is designed
          for levitation, meditation, and various whimsical activities above the
          ground Experience the thrill of floating like never before with a
          space-net! This innovative setup transforms your outdoor adventures,
          offering a unique blend of levitation and fun. Designed for both
          beginners and seasoned chill-seeking adventiurers, a space-net
          provides a safe and exhilarating way to relax in gravity-defying way
          above the ground. Imagine setting up a stunning display at your next
          event or festival, where participants can float above the ground,
          challenge themselves, and enjoy a captivating atmosphere. With
          customizable options for LED and UV lighting, the space-net creates an
          enchanting visual experience, especially at night. Whether for a
          special occasion, team-building event, or just for fun, renting or
          purchasing a space net will elevate your gatherings and leave lasting
          memories. Don’t miss out on this extraordinary adventure!
        </p>
      </Container>

      <img src={data.makingOf.image} alt="Space Net" className="w-full" />

      <Container as="section" className="py-24">
        <h2 className="mb-8 text-4xl font-semibold">RENT OR BUY SPACENET?</h2>
        <p>Please, fill out the form below.</p>
        <div className="flex flex-col gap-5 md:flex-row">
          <Form
            method="POST"
            className="flex flex-1 flex-col gap-5 py-20"
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
                  'input input-bordered w-full',
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
                  'input input-bordered w-full',
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
                  'textarea textarea-bordered w-full',
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
                disabled={isSuccess || isLoading || !recaptcha.isReady}
              >
                {data.form.button}
              </Button>
            </div>
          </Form>
          <div className="flex-1">
            <img src={data.form.image} alt="Space Net" className="w-full" />
          </div>
        </div>
      </Container>
    </main>
  )
}
