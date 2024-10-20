import { getLogger } from '~/utils/logger.server'

const logger = getLogger('recaptcha')

const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY || ''
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || ''

export const siteKey = RECAPTCHA_SITE_KEY

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
  logger.debug('verifyRecaptcha request {val}', { val: token })
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`
  const result = await fetch(url, { method: 'POST' })
  const data = await result.json()
  if (!data.success) {
    logger.error('verifyRecaptcha error {val}', { val: JSON.stringify(data) })
    const err = data['error-codes'] ? data['error-codes'].join(', ') : ''
    throw new Error(`Recaptcha failed: ${err}`)
  }
  logger.debug('verifyRecaptcha success {val}', { val: JSON.stringify(data) })
  return data as VerifyRecaptchaResponse
}
