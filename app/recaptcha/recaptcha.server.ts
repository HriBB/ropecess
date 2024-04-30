import { LinksFunction } from '@remix-run/node'

export const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY || ''
export const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || ''

export type VerifyRecaptchaResponse = {
  success: boolean
  challenge_ts: string
  hostname: string
  score: number
  action: string
}

/**
 * Verify reCAPTCHA v3 server-side
 *
 * @see https://www.google.com/recaptcha/admin/site/690637641/settings
 * @see https://stackoverflow.com/a/60627963
 * @see https://developers.google.com/recaptcha/docs/verify
 */
export async function verifyRecaptcha(token: string) {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`
  const result = await fetch(url, { method: 'POST' })
  const data = await result.json()
  if (!data.success) {
    const err = data['error-codes'] ? data['error-codes'].join(', ') : ''
    throw new Error(`Recaptcha failed: ${err}`)
  }
  return data as VerifyRecaptchaResponse
}

/**
 * Preconnect to Google reCAPTCHA
 *
 * @see https://developers.google.com/recaptcha/docs/loading#using_resource_hints
 */
export const prefetchRecaptchaLinks: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://www.google.com' },
    { rel: 'preconnect', href: 'https://www.gstatic.com', crossOrigin: 'anonymous' },
  ]
}
