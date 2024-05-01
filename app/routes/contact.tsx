import { ActionFunctionArgs, LinksFunction } from '@remix-run/node'
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react'

import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { Field } from '~/components/Field'
import { Hero } from '~/components/Hero'
import { cls } from '~/utils/cls'

import { sendEmail } from '~/utils/email.server'
import { useRecaptcha } from '~/recaptcha/useRecaptcha'
import { siteKey, verifyRecaptcha } from '~/recaptcha/recaptcha.server'
import { handleFormError } from '~/utils/error.server'

const emailSchema = zfd.formData({
  name: zfd.text(z.string()),
  email: zfd.text(z.string().email()),
  comment: zfd.text(z.string().min(3)),
  token: zfd.text(z.string().min(1)),
})

export { prefetchRecaptchaLinks as links } from '~/recaptcha/links'

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData()
    const { token, ...data } = await emailSchema.parseAsync(formData)
    await verifyRecaptcha(token)
    await sendEmail(data)
    return {
      success: true,
      message:
        'Thank you for your inquiry. We will get back to you as soon as possible.',
    }
  } catch (error) {
    return handleFormError(error)
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

  const errors =
    actionData && 'flatten' in actionData
      ? actionData.flatten.fieldErrors
      : null

  return (
    <main>
      <Hero backgroundImage="/img/contact/banner.jpg">
        <Hero.Content>
          <Hero.Title>Contact Us</Hero.Title>
        </Hero.Content>
      </Hero>

      <Container as="section">
        <Form
          method="POST"
          className="flex flex-col gap-5 py-20"
          onSubmit={recaptcha.appendTokendAndSubmit}
        >
          {/* name */}
          <Field label="Name" htmlFor="name" error={errors?.name}>
            <input
              id="name"
              name="name"
              type="text"
              className={cls(
                'input input-bordered w-full',
                isSuccess && 'input-disabled',
              )}
              disabled={isSuccess}
            />
          </Field>
          {/* email */}
          <Field label="Email" htmlFor="email" error={errors?.email}>
            <input
              id="email"
              name="email"
              type="text"
              className={cls(
                'input input-bordered w-full',
                isSuccess && 'input-disabled',
              )}
              disabled={isSuccess}
            />
          </Field>
          {/* comment */}
          <Field label="Comment" htmlFor="comment" error={errors?.comment}>
            <textarea
              className={cls(
                'textarea textarea-bordered w-full',
                isSuccess && 'input-disabled',
              )}
              id="comment"
              name="comment"
              rows={5}
              disabled={isSuccess}
            />
          </Field>
          <div className="flex max-w-lg justify-between pr-4">
            <Button
              color="secondary"
              type="submit"
              disabled={isSuccess || isLoading || !recaptcha.isReady}
            >
              Submit
            </Button>
            {actionData?.message && (
              <p className="text-green-500">{actionData.message}</p>
            )}
          </div>
        </Form>
      </Container>
    </main>
  )
}
