/* eslint-disable react-hooks/refs */
import type { MetaFunction } from 'react-router'
import { Form, useActionData, useLoaderData, useLocation } from 'react-router'
import { getPreviewMeta } from '../meta'
import { parsePreviewPathname } from '../utils'
import { data } from '~/content/contact'
import { siteKey, verifyRecaptcha } from '~/utils/recaptcha/recaptcha.server'
import { useRecaptcha } from '~/utils/recaptcha/recaptcha'
import { contactEmailSchema, sendContactEmail } from '~/utils/email.server'
import { handleFormError } from '~/utils/form.server'
import { Success, Error } from '~/components/Form'

export const meta: MetaFunction = ({ location }) => {
  const { locale } = parsePreviewPathname(location.pathname)
  const title = locale === 'sl' ? 'Kontakt' : 'Contact Us'
  return getPreviewMeta(`${title} — Neo-Brutalist`)
}

export const loader = async () => ({ siteKey })

export const action = async ({ request }: { request: Request }) => {
  const url = new URL(request.url)
  const { locale } = parsePreviewPathname(url.pathname)
  const d = data[locale]
  try {
    const formData = await request.formData()
    const { token, preview, ...form } = await contactEmailSchema.parseAsync(formData)
    await verifyRecaptcha(token)
    await sendContactEmail({ ...form, preview: preview === 'true' })
    return { success: true as const, message: d.form.successMessage }
  } catch (error) {
    return handleFormError(error, d.form.errorMessage)
  }
}

const black = { fontFamily: "'Archivo Black', sans-serif" } as const
const mono = { fontFamily: "'Space Mono', monospace" } as const

export default function VariantDContact() {
  const { pathname } = useLocation()
  const { locale } = parsePreviewPathname(pathname)
  const d = data[locale]
  const loaderData = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const recaptcha = useRecaptcha({ siteKey: loaderData.siteKey })
  const errors = (actionData as any)?.errors?.fieldErrors

  return (
    <main style={mono} className="overflow-x-clip">
      {/* Hero */}
      <section className="px-5 pb-10 pt-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <span
            className="-rotate-1 inline-block border-4 border-base-content bg-yellow-300 px-4 py-1.5 text-xs font-bold uppercase text-black mb-8"
            style={mono}
          >
            ★ {d.hero.title} ★
          </span>
          <h1 style={black} className="text-5xl uppercase leading-[0.95] md:text-7xl">
            {d.hero.title}
          </h1>
        </div>
      </section>

      {/* Contact form — two-column poster layout */}
      <section className="border-t-4 border-base-content px-5 py-16 md:px-10">
        <div className="mx-auto max-w-6xl grid gap-16 md:grid-cols-2">
          {/* Left: headline */}
          <div>
            <h2 style={black} className="mb-4 text-4xl uppercase leading-tight md:text-5xl">
              {locale === 'sl' ? 'PIŠITE NAM' : "LET'S TALK"}
            </h2>
            <p className="text-sm leading-relaxed opacity-70">
              {locale === 'sl'
                ? 'Sporočite nam vaš projekt in pogovorili se bomo.'
                : 'Tell us about your project and we will get back to you.'}
            </p>
          </div>

          {/* Right: form */}
          <Form
            method="POST"
            className="flex flex-col gap-5"
            ref={recaptcha.formRef}
            onSubmit={recaptcha.appendTokendAndSubmit}
          >
            <input type="hidden" name="preview" value="true" />
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="name"
                placeholder={d.form.name.toUpperCase()}
                className="border-4 border-base-content bg-transparent px-4 py-3 text-sm placeholder-base-content/50 outline-none focus:bg-yellow-300 focus:text-black focus:placeholder-black/50"
                autoComplete="name"
                disabled={recaptcha.isBusy}
              />
              {errors?.name && <p className="text-xs font-bold text-error">{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                name="email"
                placeholder={d.form.email.toUpperCase()}
                className="border-4 border-base-content bg-transparent px-4 py-3 text-sm placeholder-base-content/50 outline-none focus:bg-yellow-300 focus:text-black focus:placeholder-black/50"
                autoComplete="email"
                disabled={recaptcha.isBusy}
              />
              {errors?.email && <p className="text-xs font-bold text-error">{errors.email}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <textarea
                name="message"
                placeholder={d.form.message.toUpperCase()}
                rows={5}
                className="resize-none border-4 border-base-content bg-transparent px-4 py-3 text-sm placeholder-base-content/50 outline-none focus:bg-yellow-300 focus:text-black focus:placeholder-black/50"
                disabled={recaptcha.isBusy}
              />
              {errors?.message && (
                <p className="text-xs font-bold text-error">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={recaptcha.isBusy}
              style={black}
              className="inline-block w-fit border-4 border-base-content bg-base-content px-8 py-4 text-sm uppercase text-base-100 transition-transform hover:-translate-y-1 disabled:opacity-50"
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
