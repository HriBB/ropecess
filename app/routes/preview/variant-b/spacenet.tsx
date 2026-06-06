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
  return getPreviewMeta('Space Net — Exaggerated Minimal')
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

const garamond = { fontFamily: "'EB Garamond', Georgia, serif" } as const
const lato = { fontFamily: "'Lato', sans-serif" } as const
const ORANGE = '#EA580C'

function SectionNumber({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-16 flex items-baseline gap-4" style={lato}>
      <span className="text-sm font-bold text-[#B84009] dark:text-[#F56B14]">
        {n}
      </span>
      <span className="text-xs font-bold uppercase tracking-[0.4em] text-base-content/75">{label}</span>
      <span className="h-px flex-1 bg-base-content/10" />
    </div>
  )
}

export default function VariantBSpacenet() {
  const { pathname } = useLocation()
  const { locale } = parsePreviewPathname(pathname)
  const d = data[locale]
  const loaderData = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const recaptcha = useRecaptcha({ siteKey: loaderData.siteKey })
  const errors = (actionData as any)?.errors?.fieldErrors

  return (
    <main>
      {/* Hero — type only */}
      <section className="px-6 pb-20 pt-36 md:px-12">
        <SectionNumber n="01" label={d.hero.title} />
        <h1
          style={garamond}
          className="max-w-5xl text-[clamp(2.5rem,7vw,7rem)] font-medium leading-[0.95] tracking-[-0.02em]"
        >
          {d.hero.title.split(' ').map((w, i, arr) => (
            <span
              key={i}
              style={i === arr.length - 1 ? { color: ORANGE, fontStyle: 'italic' } : undefined}
            >
              {w}{' '}
            </span>
          ))}
        </h1>
      </section>

      {/* What is section */}
      <section className="px-6 py-20 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 style={garamond} className="mb-8 text-4xl font-medium leading-tight md:text-5xl">
              {d.sections.whatIs.title}
            </h2>
            <p className="text-base leading-relaxed text-base-content/80" style={lato}>
              {d.sections.whatIs.text}
            </p>
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
      </section>

      {/* How we use */}
      <section className="bg-base-200 px-6 py-20 md:px-12">
        <SectionNumber n="02" label={d.sections.howWeUse.title} />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Picture
            picture={pageImages.craftingNet.image}
            lqip={pageImages.craftingNet.lqip}
            alt={d.images.craftingNet}
            className="w-full aspect-video object-cover"
            loading="lazy"
            sizes="(max-width:1023px) 100vw, 45vw"
          />
          <div>
            <h2 style={garamond} className="mb-8 text-4xl font-medium leading-tight md:text-5xl">
              {d.sections.howWeUse.title}
            </h2>
            <p className="text-base leading-relaxed text-base-content/80" style={lato}>
              {d.sections.howWeUse.text}
            </p>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="px-6 py-20 md:px-12">
        <SectionNumber n="03" label={d.sections.events.title} />
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 style={garamond} className="mb-8 text-4xl font-medium leading-tight md:text-5xl">
              {d.sections.events.title}
            </h2>
            <p className="mb-6 text-base leading-relaxed text-base-content/80" style={lato}>
              {d.sections.events.text1}
            </p>
            <p className="text-base leading-relaxed text-base-content/80" style={lato}>
              {d.sections.events.text2}
            </p>
          </div>
          <Picture
            picture={pageImages.festival.image}
            lqip={pageImages.festival.lqip}
            alt={d.images.festival}
            className="w-full aspect-video object-cover"
            loading="lazy"
            sizes="(max-width:1023px) 100vw, 45vw"
          />
        </div>
      </section>

      {/* Inquiry form */}
      <section id="rent-or-buy" className="px-6 py-28 md:px-12">
        <SectionNumber n="04" label={d.sections.rentOrBuy.title} />
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 style={garamond} className="mb-6 text-5xl font-medium leading-tight md:text-6xl">
              {d.sections.rentOrBuy.title.split(' ').map((w, i, arr) => (
                <span
                  key={i}
                  style={i === arr.length - 1 ? { color: ORANGE, fontStyle: 'italic' } : undefined}
                >
                  {w}{' '}
                </span>
              ))}
            </h2>
            <p className="text-sm leading-relaxed opacity-70" style={lato}>
              {d.sections.rentOrBuy.text1}
            </p>
          </div>
          <Form
            method="POST"
            className="flex flex-col gap-10"
            ref={recaptcha.formRef}
            onSubmit={recaptcha.appendTokendAndSubmit}
          >
            <input type="hidden" name="preview" value="true" />
            <input
              type="text"
              name="name"
              placeholder={d.form.name}
              className="border-b border-base-content/30 bg-transparent pb-3 text-xl outline-none transition-colors focus:border-base-content"
              style={garamond}
              autoComplete="name"
              disabled={recaptcha.isBusy}
            />
            {errors?.name && <p className="text-xs text-error -mt-8">{errors.name}</p>}
            <input
              type="email"
              name="email"
              placeholder={d.form.email}
              className="border-b border-base-content/30 bg-transparent pb-3 text-xl outline-none transition-colors focus:border-base-content"
              style={garamond}
              autoComplete="email"
              disabled={recaptcha.isBusy}
            />
            {errors?.email && <p className="text-xs text-error -mt-8">{errors.email}</p>}
            <textarea
              name="message"
              placeholder={d.form.message}
              rows={3}
              className="resize-none border-b border-base-content/30 bg-transparent pb-3 text-xl outline-none transition-colors focus:border-base-content"
              style={garamond}
              disabled={recaptcha.isBusy}
            />
            {errors?.message && <p className="text-xs text-error -mt-8">{errors.message}</p>}
            <button
              type="submit"
              disabled={recaptcha.isBusy}
              className="inline-block w-fit px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85 disabled:opacity-50"
              style={{ ...lato, backgroundColor: ORANGE }}
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
