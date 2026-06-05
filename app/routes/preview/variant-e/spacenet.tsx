/* eslint-disable react-hooks/refs */
/**
 * Variant E — "Aurora Glass" — Spacenet page.
 * Neon glow showcase; frosted glass panels; full Spacenet Inquiry form.
 */
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
  return getPreviewMeta('Space Net — Aurora Glass')
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

const outfit = { fontFamily: "'Outfit', sans-serif" } as const
const glass =
  'rounded-3xl border border-base-content/10 bg-base-100/60 shadow-xl backdrop-blur-xl' as const

function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-20 left-[10%] h-96 w-96 rounded-full bg-fuchsia-400/25 blur-3xl dark:bg-fuchsia-500/15" />
      <div className="absolute top-[30%] right-[5%] h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />
    </div>
  )
}

export default function VariantESpacenet() {
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
          <span className="mb-6 inline-block rounded-full border border-fuchsia-400/40 bg-fuchsia-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400 dark:text-fuchsia-300">
            {d.hero.title}
          </span>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            {d.hero.title}
          </h1>
        </div>
      </section>

      {/* Hero image — neon glow showcase */}
      <section className="relative px-4 py-6 md:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-black">
          <div
            aria-hidden
            className="absolute -inset-10 opacity-60 blur-3xl"
            style={{
              background:
                'radial-gradient(circle at 30% 50%, rgba(217,70,239,0.5), transparent 60%), radial-gradient(circle at 70% 50%, rgba(34,211,238,0.4), transparent 60%)',
            }}
          />
          <Picture
            picture={pageImages.neonGlow.image}
            lqip={pageImages.neonGlow.lqip}
            alt={d.images.chilloutPeople}
            className="relative h-[55svh] w-full object-cover opacity-90"
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
          />
        </div>
      </section>

      {/* What is */}
      <section className="relative px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className={`${glass} grid overflow-hidden md:grid-cols-2`}>
            <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {d.sections.whatIs.title}
              </h2>
              <p className="text-sm leading-relaxed opacity-75">{d.sections.whatIs.text}</p>
            </div>
            <Picture
              picture={pageImages.craftingNet.image}
              lqip={pageImages.craftingNet.lqip}
              alt={d.images.craftingNet}
              className="h-64 w-full object-cover md:h-full"
              loading="lazy"
              sizes="(max-width:767px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* How we use — dark neon panel */}
      <section className="relative px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-black">
          <div
            aria-hidden
            className="absolute -inset-10 opacity-40 blur-3xl"
            style={{
              background:
                'radial-gradient(circle at 20% 50%, rgba(34,211,238,0.4), transparent 60%), radial-gradient(circle at 80% 50%, rgba(217,70,239,0.3), transparent 60%)',
            }}
          />
          <div className="relative grid md:grid-cols-2">
            <Picture
              picture={pageImages.festival.image}
              lqip={pageImages.festival.lqip}
              alt={d.images.festival}
              className="h-64 w-full object-cover md:h-full"
              loading="lazy"
              sizes="(max-width:767px) 100vw, 50vw"
            />
            <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                {d.sections.howWeUse.title}
              </h2>
              <p className="text-sm leading-relaxed text-white/70">{d.sections.howWeUse.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="relative px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className={`${glass} p-8 md:p-12`}>
            <h2 className="mb-5 text-2xl font-bold tracking-tight md:text-3xl">
              {d.sections.events.title}
            </h2>
            <p className="mb-4 text-sm leading-relaxed opacity-75">{d.sections.events.text1}</p>
            <p className="text-sm leading-relaxed opacity-75">{d.sections.events.text2}</p>
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="relative px-4 pb-24 pt-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className={`${glass} p-8 md:p-12`}>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              {d.sections.rentOrBuy.title}
            </h2>
            <p className="mb-10 max-w-xl text-sm leading-relaxed opacity-70">
              {d.sections.rentOrBuy.text1}
            </p>

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
                  rows={4}
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
