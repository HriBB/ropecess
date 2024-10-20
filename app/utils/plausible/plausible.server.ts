export const PLAUSIBLE_SCRIPT_URL = process.env.PLAUSIBLE_SCRIPT_URL
export const PLAUSIBLE_DOMAIN = process.env.PLAUSIBLE_DOMAIN

export function getPlausible(): { src: string; domain: string } | false {
  if (PLAUSIBLE_SCRIPT_URL && PLAUSIBLE_DOMAIN) {
    return {
      src: PLAUSIBLE_SCRIPT_URL,
      domain: PLAUSIBLE_DOMAIN,
    }
  }
  return false
}
