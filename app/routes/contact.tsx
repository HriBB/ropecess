/* eslint-disable react-hooks/refs */
import { Form, MetaFunction } from 'react-router'

import type { Route } from './+types/contact'
import { handleFormError } from '~/utils/form.server'
import { contactEmailSchema, sendContactEmail } from '~/utils/email.server'
import { siteKey, verifyRecaptcha } from '~/utils/recaptcha/recaptcha.server'
import { useRecaptcha } from '~/utils/recaptcha/recaptcha'
import { getMeta } from '~/utils/meta'
import { type Locale, useLocale } from '~/utils/i18n'
import { getLocaleFromRequest } from '~/utils/i18n.server'

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

import { data } from '~/content/contact'

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
    const { token, ...form } = await contactEmailSchema.parseAsync(formData)
    await verifyRecaptcha(token)
    await sendContactEmail(form)
    return {
      success: true,
      message: d.form.successMessage,
    }
  } catch (error) {
    return handleFormError(error, d.form.errorMessage)
  }
}

export default function Contact({
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
            label={d.form.name}
            error={errors?.name}
            disabled={recaptcha.isBusy}
          />
          <InputField
            id="email"
            name="email"
            label={d.form.email}
            error={errors?.email}
            disabled={recaptcha.isBusy}
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
        </Form>
      </Container>
    </Main>
  )
}
