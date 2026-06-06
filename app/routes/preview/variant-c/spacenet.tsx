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
import { Success, Error } from '~/components/Form'

export const meta: MetaFunction = () => {
  return getPreviewMeta('Space Net — Editorial Calm')
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

const font = { fontFamily: "'Manrope', sans-serif" } as const

function Chapter({
  label,
  children,
  muted,
}: {
  label: string
  children: React.ReactNode
  muted?: boolean
}) {
  return (
    <section
      className={`border-t border-base-content/10 px-6 py-36 md:px-12 ${muted ? 'bg-base-200' : ''}`}
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[220px_1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-base-content/75 lg:sticky lg:top-28">
            <span className="mr-3 inline-block h-2 w-2 rounded-full bg-amber-500" />
            {label}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}

export default function VariantCSpacenet() {
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
      <section className="px-6 pb-20 pt-36 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.35em] text-base-content/75">
            <span className="mr-3 inline-block h-2 w-2 rounded-full bg-amber-500" />
            {d.hero.title}
          </p>
          <h1 className="max-w-3xl text-5xl font-extralight leading-[1.08] tracking-tight md:text-7xl">
            {d.hero.title}
          </h1>
        </div>
      </section>

      {/* What is */}
      <Chapter label={d.sections.whatIs.title}>
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="mb-8 text-3xl font-extralight leading-snug tracking-tight md:text-4xl">
              {d.sections.whatIs.title}
            </h2>
            <p className="text-sm leading-loose text-base-content/80">{d.sections.whatIs.text}</p>
          </div>
          <Picture
            picture={pageImages.chilloutPeople.image}
            lqip={pageImages.chilloutPeople.lqip}
            alt={d.images.chilloutPeople}
            className="w-full aspect-video object-cover"
            loading="lazy"
            sizes="(max-width:1023px) 100vw, 45vw"
          />
        </div>
      </Chapter>

      {/* How we use */}
      <Chapter label={d.sections.howWeUse.title} muted>
        <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr]">
          <Picture
            picture={pageImages.craftingNet.image}
            lqip={pageImages.craftingNet.lqip}
            alt={d.images.craftingNet}
            className="w-full aspect-video object-cover"
            loading="lazy"
            sizes="(max-width:1023px) 100vw, 45vw"
          />
          <div>
            <h2 className="mb-8 text-3xl font-extralight leading-snug tracking-tight md:text-4xl">
              {d.sections.howWeUse.title}
            </h2>
            <p className="text-sm leading-loose text-base-content/80">{d.sections.howWeUse.text}</p>
          </div>
        </div>
      </Chapter>

      {/* Events */}
      <Chapter label={d.sections.events.title}>
        <div className="grid items-end gap-12 md:grid-cols-[1.2fr_1fr]">
          <Picture
            picture={pageImages.festival.image}
            lqip={pageImages.festival.lqip}
            alt={d.images.festival}
            className="w-full aspect-video object-cover"
            loading="lazy"
            sizes="(max-width:1023px) 100vw, 45vw"
          />
          <div className="pb-2">
            <h2 className="mb-8 text-3xl font-extralight leading-snug tracking-tight md:text-4xl">
              {d.sections.events.title}
            </h2>
            <p className="mb-6 text-sm leading-loose text-base-content/80">{d.sections.events.text1}</p>
            <p className="text-sm leading-loose text-base-content/80">{d.sections.events.text2}</p>
          </div>
        </div>
      </Chapter>

      {/* Inquiry form */}
      <Chapter label={d.sections.rentOrBuy.title} muted>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 text-4xl font-extralight leading-tight tracking-tight md:text-5xl">
              {d.sections.rentOrBuy.title}
            </h2>
            <p className="text-sm leading-loose text-base-content/80">{d.sections.rentOrBuy.text1}</p>
          </div>
          <Form
            method="POST"
            className="flex flex-col gap-8"
            ref={recaptcha.formRef}
            onSubmit={recaptcha.appendTokendAndSubmit}
          >
            <input type="hidden" name="preview" value="true" />
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="name"
                placeholder={d.form.name}
                className="border-b border-base-content/20 bg-transparent pb-4 text-base font-light outline-none transition-colors focus:border-amber-500"
                autoComplete="name"
                disabled={recaptcha.isBusy}
              />
              {errors?.name && <p className="text-xs text-error">{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                name="email"
                placeholder={d.form.email}
                className="border-b border-base-content/20 bg-transparent pb-4 text-base font-light outline-none transition-colors focus:border-amber-500"
                autoComplete="email"
                disabled={recaptcha.isBusy}
              />
              {errors?.email && <p className="text-xs text-error">{errors.email}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <textarea
                name="message"
                placeholder={d.form.message}
                rows={3}
                className="resize-none border-b border-base-content/20 bg-transparent pb-4 text-base font-light outline-none transition-colors focus:border-amber-500"
                disabled={recaptcha.isBusy}
              />
              {errors?.message && <p className="text-xs text-error">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={recaptcha.isBusy}
              className="group mt-4 inline-flex w-fit items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] disabled:opacity-50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-black transition-transform group-hover:scale-110 group-disabled:scale-100">
                →
              </span>
              {d.form.button}
            </button>
            {actionData?.message && <Success>{actionData.message}</Success>}
            {(actionData as any)?.error && <Error>{(actionData as any).error}</Error>}
            <div id="recaptcha" />
          </Form>
        </div>
      </Chapter>
    </main>
  )
}
