import { useMemo } from 'react'
import { useMatches } from '@remix-run/react'

/**
 * Use recaptcha handle
 *
 * @see https://remix.run/docs/en/main/route/handle
 * @see https://github.com/sergiodxa/remix-utils?tab=readme-ov-file#external-scripts
 */
export function useRecaptchaHandle() {
  const matches = useMatches()

  const recaptcha = useMemo(
    () =>
      matches.some((match) => {
        return (
          match.handle &&
          typeof match.handle === 'object' &&
          'recaptcha' in match.handle &&
          match.handle.recaptcha === true
        )
      }),
    [matches],
  )

  return recaptcha
}
