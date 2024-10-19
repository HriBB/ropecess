import { createCookie } from 'react-router'
import { Theme, isValidTheme } from './theme'

const themeCookie = createCookie('theme', {
  maxAge: 31_536_000, // one year
})

export const serializeTheme = async (theme: Theme) =>
  theme === Theme.SYSTEM
    ? themeCookie.serialize({}, { expires: new Date(0), maxAge: 0 })
    : themeCookie.serialize({ theme })

export const getTheme = async (request: Request) => {
  const header = request.headers.get('Cookie')
  const data = await themeCookie.parse(header)
  const theme = data?.theme as Theme
  return isValidTheme(theme) ? theme : Theme.SYSTEM
}
