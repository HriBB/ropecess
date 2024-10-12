import { Form, MetaFunction } from 'react-router'

import { handleFormError } from '~/utils/form.server'
import { siteKey, verifyRecaptcha } from '~/utils/recaptcha.server'
import { contactEmailSchema, sendContactEmail } from '~/utils/email.server'

import { cls } from '~/utils/cls'
import { Hero } from '~/components/Hero'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { FormField } from '~/components/FormField'
import { useRecaptcha } from '~/utils/recaptcha'

import bannerImage from '~/images/contact/banner.jpg?hero'
import bannerLqip from '~/images/contact/banner.jpg?lqip'

import type * as Route from './+types.contact'

export { prefetchRecaptchaLinks as links } from '~/utils/recaptcha'

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

export const meta: MetaFunction = () => {
  return [
    {
      title: data.meta.title,
    },
    {
      name: 'description',
      content: data.meta.description,
    },
  ]
}

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const formData = await request.formData()
    const { token, ...contact } = await contactEmailSchema.parseAsync(formData)
    await verifyRecaptcha(token)
    await sendContactEmail(contact)
    return {
      success: true,
      message: data.form.successMessage,
    }
  } catch (error) {
    return handleFormError(error, data.form.errorMessage)
  }
}

export const loader = async () => {
  return { siteKey }
}

export default function Contact({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { siteKey } = loaderData
  const recaptcha = useRecaptcha({ siteKey })

  const isSuccess = actionData?.success === true
  const errors = actionData?.errors?.fieldErrors

  return (
    <main>
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
          ref={recaptcha.formRef}
          method="POST"
          className="flex max-w-lg flex-1 flex-col gap-5 py-20"
          onSubmit={recaptcha.appendTokendAndSubmit}
        >
          <FormField label={data.form.name} htmlFor="name" error={errors?.name}>
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
              rows={6}
              disabled={isSuccess}
              //defaultValue={'Test @localhost'}
            />
          </FormField>
          <div className="flex justify-end">
            <Button
              color="primary"
              type="submit"
              className="w-full sm:w-auto"
              disabled={recaptcha.isLoading || !recaptcha.isReady}
            >
              {data.form.button}
            </Button>
          </div>
          {actionData?.message && (
            <p className="text-green-700">{actionData.message}</p>
          )}
          {actionData?.error && (
            <p className="text-red-500">{actionData.error}</p>
          )}
        </Form>
      </Container>
    </main>
  )
}
