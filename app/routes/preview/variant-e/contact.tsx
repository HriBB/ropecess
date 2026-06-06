/* eslint-disable react-hooks/refs */
/**
 * Variant E — "Aurora Glass" — Contact page.
 * Frosted glass form panel, gradient-mesh background, full Contact Inquiry form.
 */
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
  return getPreviewMeta(`${title} — Aurora Glass`)
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

const outfit = { fontFamily: "'Outfit', sans-serif" } as const
const glass =
  'rounded-3xl border border-base-content/10 bg-base-100/60 shadow-xl backdrop-blur-xl' as const

function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 right-[10%] h-96 w-96 rounded-full bg-fuchsia-400/25 blur-3xl dark:bg-fuchsia-500/15" />
      <div className="absolute top-[40%] left-[5%] h-[28rem] w-[28rem] rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />
    </div>
  )
}

export default function VariantEContact() {
  const { pathname } = useLocation()
  const { locale } = parsePreviewPathname(pathname)
  const d = data[locale]
  const loaderData = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const recaptcha = useRecaptcha({ siteKey: loaderData.siteKey })
  const errors = (actionData as any)?.errors?.fieldErrors

  return (
    <main style={outfit} className="relative overflow-x-clip">
      <Blobs />

      {/* Hero */}
      <section className="relative px-4 pb-10 pt-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="mb-6 inline-block rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-700 dark:text-fuchsia-300">
            {d.hero.title}
          </span>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            {locale === 'sl' ? "Pogovorimo se" : "Let's Talk"}
          </h1>
        </div>
      </section>

      {/* Contact form — glass panel */}
      <section className="relative px-4 pb-24 pt-6 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className={`${glass} grid gap-10 p-8 md:grid-cols-2 md:p-12`}>
            {/* Left: headline + copy */}
            <div className="flex flex-col justify-center gap-5">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {locale === 'sl' ? 'Pišite nam' : 'Get in touch'}
              </h2>
              <p className="text-sm leading-relaxed opacity-70">
                {locale === 'sl'
                  ? 'Sporočite nam vaš projekt in pogovorili se bomo.'
                  : 'Tell us about your project and we will get back to you.'}
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm opacity-60">
                  <span className="text-fuchsia-700 dark:text-fuchsia-300">✦</span>
                  <span>
                    {locale === 'sl' ? 'Hitri odgovor v 24 urah' : 'Fast reply within 24 hours'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm opacity-60">
                  <span className="text-cyan-400 dark:text-cyan-300">✦</span>
                  <span>
                    {locale === 'sl'
                      ? 'Brezplačna ocena projekta'
                      : 'Free project assessment'}
                  </span>
                </div>
              </div>
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
                  placeholder={d.form.name}
                  className="rounded-2xl border border-base-content/15 bg-base-100/70 px-5 py-3.5 text-sm outline-none backdrop-blur-sm transition-colors focus:border-fuchsia-400"
                  autoComplete="name"
                  disabled={recaptcha.isBusy}
                />
                {errors?.name && (
                  <p className="text-xs font-medium text-error">{errors.name}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder={d.form.email}
                  className="rounded-2xl border border-base-content/15 bg-base-100/70 px-5 py-3.5 text-sm outline-none backdrop-blur-sm transition-colors focus:border-fuchsia-400"
                  autoComplete="email"
                  disabled={recaptcha.isBusy}
                />
                {errors?.email && (
                  <p className="text-xs font-medium text-error">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <textarea
                  name="message"
                  placeholder={d.form.message}
                  rows={5}
                  className="resize-none rounded-2xl border border-base-content/15 bg-base-100/70 px-5 py-3.5 text-sm outline-none backdrop-blur-sm transition-colors focus:border-fuchsia-400"
                  disabled={recaptcha.isBusy}
                />
                {errors?.message && (
                  <p className="text-xs font-medium text-error">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={recaptcha.isBusy}
                className="w-fit rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/30 transition-transform hover:scale-105 disabled:opacity-50"
              >
                {d.form.button}
              </button>
              {actionData?.message && <Success>{actionData.message}</Success>}
              {(actionData as any)?.error && <Error>{(actionData as any).error}</Error>}
              <div id="recaptcha" />
            </Form>
          </div>
        </div>
      </section>
    </main>
  )
}
