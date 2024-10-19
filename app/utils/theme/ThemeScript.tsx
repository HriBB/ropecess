import { useLayoutEffect, useMemo } from 'react'
import { useTheme } from './useTheme'
import { isValidTheme, Theme } from './theme'

export function ThemeScript() {
  const theme = useTheme()

  const script = useMemo(
    () => `
      let theme = ${JSON.stringify(theme)}
      if (theme === ${JSON.stringify(Theme.SYSTEM)}) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? ${JSON.stringify(Theme.DARK)}
          : ${JSON.stringify(Theme.LIGHT)}
      }
      document.documentElement.dataset.theme = theme
    `,
    [], // eslint-disable-line
    // we don't want this script to ever change
  )

  if (typeof document !== 'undefined') {
    // eslint-disable-next-line
    useLayoutEffect(() => {
      if (isValidTheme(theme)) {
        if (theme === 'system') {
          const check = (media: MediaQueryList) => {
            document.documentElement.dataset.theme = media.matches
              ? Theme.DARK
              : Theme.LIGHT
          }
          const media = window.matchMedia('(prefers-color-scheme: dark)')
          check(media)
          // @ts-expect-error check function
          media.addEventListener('change', check)
          // @ts-expect-error check function
          return () => media?.removeEventListener('change', check)
        } else {
          document.documentElement.dataset.theme = theme
        }
      } else {
        console.error('Invalid theme:', theme)
      }
    }, [theme])
  }

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
