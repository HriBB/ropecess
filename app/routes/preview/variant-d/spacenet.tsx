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
  return getPreviewMeta('Space Net — Neo-Brutalist')
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

const black = { fontFamily: "'Archivo Black', sans-serif" } as const
const mono = { fontFamily: "'Space Mono', monospace" } as const
const box = 'border-4 border-base-content shadow-[8px_8px_0_0] shadow-base-content' as const

export default function VariantDSpacenet() {
  const { pathname } = useLocation()
  const { locale } = parsePreviewPathname(pathname)
  const d = data[locale]
  const loaderData = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const recaptcha = useRecaptcha({ siteKey: loaderData.siteKey })
  const errors = (actionData as any)?.errors?.fieldErrors

  return (
    <main style={mono} className="overflow-x-clip">
      {/* Hero — full-bleed poster */}
      <section className="relative px-5 pb-10 pt-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <span
            className="-rotate-2 inline-block border-4 border-base-content bg-fuchsia-400 px-4 py-1.5 text-xs font-bold uppercase text-black mb-8"
            style={mono}
          >
            NEW ★ {d.hero.title}
          </span>
          <h1 style={black} className="text-5xl uppercase leading-[0.95] md:text-7xl">
            {d.hero.title}
          </h1>
        </div>
      </section>

      {/* Hero image — boxed */}
      <section className="px-5 py-8 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className={`${box} relative overflow-hidden`}>
            <Picture
              picture={pageImages.chilloutPeople.image}
              lqip={pageImages.chilloutPeople.lqip}
              alt={d.images.chilloutPeople}
              className="h-[55svh] w-full object-cover"
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* What is */}
      <section className="border-t-4 border-base-content px-5 py-16 md:px-10">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2">
          <div>
            <h2 style={black} className="mb-6 text-3xl uppercase leading-tight">
              {d.sections.whatIs.title}
            </h2>
            <p className="text-sm leading-relaxed opacity-80">{d.sections.whatIs.text}</p>
          </div>
          <div className={box}>
            <Picture
              picture={pageImages.craftingNet.image}
              lqip={pageImages.craftingNet.lqip}
              alt={d.images.craftingNet}
              className="h-64 w-full object-cover md:h-full"
              loading="lazy"
              sizes="(max-width:767px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      {/* How we use */}
      <section className="border-t-4 border-base-content bg-yellow-300 px-5 py-16 md:px-10">
        <div className="mx-auto max-w-6xl grid gap-12 text-black md:grid-cols-2">
          <div className={`${box.replace('shadow-base-content', 'shadow-black').replace('border-base-content', 'border-black')} border-black shadow-black`}>
            <Picture
              picture={pageImages.festival.image}
              lqip={pageImages.festival.lqip}
              alt={d.images.festival}
              className="h-64 w-full border-4 border-black object-cover md:h-full"
              loading="lazy"
              sizes="(max-width:767px) 100vw, 40vw"
            />
          </div>
          <div>
            <h2 style={black} className="mb-6 text-3xl uppercase leading-tight">
              {d.sections.howWeUse.title}
            </h2>
            <p className="text-sm leading-relaxed opacity-80">{d.sections.howWeUse.text}</p>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="border-t-4 border-base-content px-5 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 style={black} className="mb-8 text-3xl uppercase leading-tight">
            {d.sections.events.title}
          </h2>
          <p className="mb-4 text-sm leading-relaxed opacity-80">{d.sections.events.text1}</p>
          <p className="text-sm leading-relaxed opacity-80">{d.sections.events.text2}</p>
        </div>
      </section>

      {/* Inquiry form — yellow poster panel */}
      <section className="border-t-4 border-base-content bg-yellow-300 px-5 py-16 md:px-10">
        <div className="mx-auto max-w-6xl text-black">
          <h2 style={black} className="mb-2 text-4xl uppercase leading-tight md:text-5xl">
            {d.sections.rentOrBuy.title}
          </h2>
          <p className="mb-10 text-sm leading-relaxed opacity-80">{d.sections.rentOrBuy.text1}</p>

          <Form
            method="POST"
            className="flex flex-col gap-6"
            ref={recaptcha.formRef}
            onSubmit={recaptcha.appendTokendAndSubmit}
          >
            <input type="hidden" name="preview" value="true" />
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="name"
                placeholder={d.form.name.toUpperCase()}
                className="border-4 border-black bg-white px-4 py-3 text-sm text-black placeholder-black/50 outline-none focus:bg-yellow-100"
                autoComplete="name"
                disabled={recaptcha.isBusy}
              />
              {errors?.name && <p className="text-xs font-bold text-red-700">{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                name="email"
                placeholder={d.form.email.toUpperCase()}
                className="border-4 border-black bg-white px-4 py-3 text-sm text-black placeholder-black/50 outline-none focus:bg-yellow-100"
                autoComplete="email"
                disabled={recaptcha.isBusy}
              />
              {errors?.email && <p className="text-xs font-bold text-red-700">{errors.email}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <textarea
                name="message"
                placeholder={d.form.message.toUpperCase()}
                rows={4}
                className="resize-none border-4 border-black bg-white px-4 py-3 text-sm text-black placeholder-black/50 outline-none focus:bg-yellow-100"
                disabled={recaptcha.isBusy}
              />
              {errors?.message && (
                <p className="text-xs font-bold text-red-700">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={recaptcha.isBusy}
              style={black}
              className="inline-block w-fit border-4 border-black bg-black px-8 py-4 text-sm uppercase text-yellow-300 transition-transform hover:-translate-y-1 disabled:opacity-50"
            >
              {d.form.button} →
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
