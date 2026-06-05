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

import { data, pageImages } from '~/content/spacenet'

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
        picture={pageImages.chilloutPeople.image}
        lqip={pageImages.chilloutPeople.lqip}
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
        picture={pageImages.craftingNet.image}
        lqip={pageImages.craftingNet.lqip}
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
        picture={pageImages.neonGlow.image}
        lqip={pageImages.neonGlow.lqip}
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
        picture={pageImages.chillout.image}
        lqip={pageImages.chillout.lqip}
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
        picture={pageImages.festival.image}
        lqip={pageImages.festival.lqip}
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
        picture={pageImages.craftingLake.image}
        lqip={pageImages.craftingLake.lqip}
        alt={d.images.craftingLake}
        pictureClassName="w-full"
        className="w-full object-cover"
        loading="lazy"
      />
    </Main>
  )
}
