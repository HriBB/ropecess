import { Form, MetaFunction } from 'react-router'

import type * as Route from './+types.contact'
import { getMeta } from '~/utils/meta'
import { handleFormError } from '~/utils/form.server'
import { contactEmailSchema, sendContactEmail } from '~/utils/email.server'

import { useRecaptcha } from '~/utils/recaptcha'
import { siteKey, verifyRecaptcha } from '~/utils/recaptcha.server'
export { preconnectRecaptchaLinks as links } from '~/utils/recaptcha'

import { Main } from '~/components/Main'
import { Hero } from '~/components/Hero'
import { Container } from '~/components/Container'
import {
  InputField,
  TextareaField,
  Success,
  Error,
  SubmitButton,
} from '~/components/Form'

import bannerImage from '~/images/contact/banner.jpg?hero'
import bannerLqip from '~/images/contact/banner.jpg?lqip'

const data = {
  meta: {
    title: 'Contact US',
    description:
      'Get in touch with Ropecess to discuss your project requirements. Our team is here to help you with your construction and access needs.',
    image: bannerImage,
  },
  hero: {
    title: 'Contact US',
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
}

export const meta: MetaFunction = () => getMeta(data.meta)

export const loader = async () => ({ siteKey })

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.formData()
    const { token, ...form } = await contactEmailSchema.parseAsync(formData)
    await verifyRecaptcha(token)
    await sendContactEmail(form)
    return {
      success: true,
      message: data.form.successMessage,
    }
  } catch (error) {
    return handleFormError(error, data.form.errorMessage)
  }
}

export default function Contact({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { siteKey } = loaderData
  const errors = actionData?.errors?.fieldErrors

  const recaptcha = useRecaptcha({ siteKey })

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
        </Hero.Content>
      </Hero>

      <Container as="section" className="flex items-center justify-center">
        <Form
          method="POST"
          className="flex max-w-lg flex-1 flex-col gap-5 py-20"
          ref={recaptcha.formRef}
          onSubmit={recaptcha.appendTokendAndSubmit}
        >
          <InputField
            id="name"
            name="name"
            label={data.form.name}
            error={errors?.name}
            disabled={recaptcha.isBusy}
          />
          <InputField
            id="email"
            name="email"
            label={data.form.email}
            error={errors?.email}
            disabled={recaptcha.isBusy}
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
        </Form>
      </Container>
    </Main>
  )
}
