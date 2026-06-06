/* eslint-disable react-hooks/refs */
import type { MetaFunction } from 'react-router'
import { Form, useActionData, useLoaderData, useLocation } from 'react-router'
import { getPreviewMeta } from '../meta'
import { parsePreviewPathname } from '../utils'
import { Picture } from '~/components/Picture'
import { data, pageImages } from '~/content/spacenet'
import { siteKey, verifyRecaptcha } from '~/utils/recaptcha/recaptcha.server'
import { useRecaptcha } from '~/utils/recaptcha/recaptcha'
import { spacenetEmailSchema, sendSpacenetEmail } from '~/utils/email.server'
import { handleFormError } from '~/utils/form.server'
import {
  InputField,
  TextareaField,
  Success,
  Error,
} from '~/components/Form'

export const meta: MetaFunction = () => {
  return getPreviewMeta('Space Net — Airy Organic')
}

export const loader = async () => ({ siteKey })

export const action = async ({ request }: { request: Request }) => {
  const url = new URL(request.url)
  const { locale } = parsePreviewPathname(url.pathname)
  const d = data[locale]
  try {
    const formData = await request.formData()
    const { token, preview, ...form } = await spacenetEmailSchema.parseAsync(formData)
    await verifyRecaptcha(token)
    await sendSpacenetEmail({ ...form, preview: preview === 'true' })
    return { success: true as const, message: d.form.successMessage }
  } catch (error) {
    return handleFormError(error, d.form.errorMessage)
  }
}

const font = { fontFamily: "'Albert Sans', sans-serif" } as const
const sageText = 'text-[#4d6950] dark:text-[#a7c4a9]'
const sageBg =
  'bg-[#5f7c61] text-white hover:bg-[#4d664f] dark:bg-[#a7c4a9] dark:text-[#1c241d] dark:hover:bg-[#c0d6c1]'

export default function VariantASpacenet() {
  const { pathname } = useLocation()
  const { locale } = parsePreviewPathname(pathname)
  const d = data[locale]
  const loaderData = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const recaptcha = useRecaptcha({ siteKey: loaderData.siteKey })
  const errors = (actionData as any)?.errors?.fieldErrors

  return (
    <main style={font}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Picture
          picture={d.hero.image}
          lqip={d.hero.lqip}
          alt={d.hero.imageAlt}
          className="w-full h-[55vh] object-cover"
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base-100/90 flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-16 w-full">
            <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.4em] ${sageText}`}>
              Ropecess
            </p>
            <h1 className="text-4xl font-light leading-tight md:text-5xl">
              {d.hero.title}
            </h1>
          </div>
        </div>
      </section>

      {/* What is section */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-8 text-3xl font-light tracking-tight md:text-4xl">
            {d.sections.whatIs.title}
          </h2>
          <p className="text-base leading-loose opacity-70">{d.sections.whatIs.text}</p>
        </div>
      </section>

      <Picture
        picture={pageImages.chilloutPeople.image}
        lqip={pageImages.chilloutPeople.lqip}
        alt={d.images.chilloutPeople}
        pictureClassName="w-full"
        className="w-full h-[60vh] object-cover"
        loading="lazy"
        sizes="100vw"
      />

      {/* How we use */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-8 text-3xl font-light tracking-tight md:text-4xl">
            {d.sections.howWeUse.title}
          </h2>
          <p className="text-base leading-loose opacity-70">{d.sections.howWeUse.text}</p>
        </div>
      </section>

      <Picture
        picture={pageImages.craftingNet.image}
        lqip={pageImages.craftingNet.lqip}
        alt={d.images.craftingNet}
        pictureClassName="w-full"
        className="w-full h-[60vh] object-cover"
        loading="lazy"
        sizes="100vw"
      />

      {/* Events */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-8 text-3xl font-light tracking-tight md:text-4xl">
            {d.sections.events.title}
          </h2>
          <p className="mb-6 text-base leading-loose opacity-70">{d.sections.events.text1}</p>
          <p className="text-base leading-loose opacity-70">{d.sections.events.text2}</p>
        </div>
      </section>

      <Picture
        picture={pageImages.festival.image}
        lqip={pageImages.festival.lqip}
        alt={d.images.festival}
        pictureClassName="w-full"
        className="w-full h-[60vh] object-cover"
        loading="lazy"
        sizes="100vw"
      />

      {/* Inquiry form */}
      <section id="rent-or-buy" className="py-32 px-6 bg-base-200">
        <div className="mx-auto max-w-xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-light tracking-tight md:text-4xl">
              {d.sections.rentOrBuy.title}
            </h2>
            <p className="text-sm leading-loose opacity-70">{d.sections.rentOrBuy.text1}</p>
          </div>
          <Form
            method="POST"
            className="flex flex-col gap-5"
            ref={recaptcha.formRef}
            onSubmit={recaptcha.appendTokendAndSubmit}
          >
            <input type="hidden" name="preview" value="true" />
            <InputField
              id="sn-name"
              name="name"
              label={d.form.name}
              error={errors?.name}
              disabled={recaptcha.isBusy}
              autoComplete="name"
            />
            <InputField
              id="sn-email"
              name="email"
              label={d.form.email}
              error={errors?.email}
              disabled={recaptcha.isBusy}
              autoComplete="email"
            />
            <TextareaField
              id="sn-message"
              name="message"
              label={d.form.message}
              error={errors?.message}
              disabled={recaptcha.isBusy}
            />
            <button
              type="submit"
              disabled={recaptcha.isBusy}
              className={`rounded-full px-10 py-4 text-sm font-semibold transition-colors disabled:opacity-50 ${sageBg}`}
            >
              {d.form.button}
            </button>
            {actionData?.message && <Success>{actionData.message}</Success>}
            {(actionData as any)?.error && <Error>{(actionData as any).error}</Error>}
            <div id="recaptcha" />
          </Form>
        </div>
      </section>
    </main>
  )
}
