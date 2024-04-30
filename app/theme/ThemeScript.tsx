import { useLayoutEffect, useMemo } from 'react'
import { useTheme } from './useTheme'
import { Theme } from './theme'

export const ThemeScript = () => {
  const theme = useTheme()

  const script = useMemo(
    () => `
    const theme = ${JSON.stringify(theme)}
    if (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add("dark");
    }
  `,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  if (typeof document !== 'undefined') {
    // eslint-disable-next-line
    useLayoutEffect(() => {
      if (theme === Theme.LIGHT) {
        document.documentElement.classList.remove(Theme.DARK)
        document.documentElement.dataset.theme = Theme.LIGHT
      } else if (theme === Theme.DARK) {
        document.documentElement.classList.add(Theme.DARK)
        document.documentElement.dataset.theme = Theme.DARK
      } else if (theme === Theme.SYSTEM) {
        const check = (media: MediaQueryList) => {
          if (media.matches) {
            document.documentElement.classList.add(Theme.DARK)
            document.documentElement.dataset.theme = Theme.DARK
          } else {
            document.documentElement.classList.remove(Theme.DARK)
            document.documentElement.dataset.theme = Theme.LIGHT
          }
        }
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        check(media)
        // @ts-expect-error media is not assignable to EventTarget
        media.addEventListener('change', check)
        // @ts-expect-error media is not assignable to EventTarget
        return () => media.removeEventListener('change', check)
      } else {
        console.error('Impossible color scheme state:', theme)
      }
    }, [theme])
  }

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
