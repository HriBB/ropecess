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
    image: '/img/contact/banner.jpg',
    title: 'Contact US',
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

export default function Contact() {
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

      <Container as="section">
        <Form
          method="POST"
          className="flex flex-col gap-5 py-20"
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
      </Container>
    </main>
  )
}
