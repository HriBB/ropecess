import { ActionFunctionArgs, redirect, createCookie } from 'react-router'
import { Theme } from './theme'

function safeRedirect(to?: FormDataEntryValue | string | null) {
  if (!to || typeof to !== 'string') {
    return '/'
  }
  if (!to.startsWith('/') || to.startsWith('//')) {
    return '/'
  }
  return to
}

const themeCookie = createCookie('theme', {
  maxAge: 31_536_000, // one year
})

const serializeTheme = async (theme: Theme) =>
  theme === Theme.SYSTEM
    ? themeCookie.serialize({}, { expires: new Date(0), maxAge: 0 })
    : themeCookie.serialize({ theme })

export const validateTheme = (theme: any): theme is Theme =>
  Object.values(Theme).includes(theme)

export const getThemeFromRequest = async (request: Request) => {
  const header = request.headers.get('Cookie')
  const data = await themeCookie.parse(header)
  const theme = data?.theme as Theme
  return validateTheme(theme) ? theme : Theme.SYSTEM
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const theme = formData.get('theme') as Theme
  if (!validateTheme(theme)) {
    throw new Response('Bad Request', { status: 400 })
  }
  const returnTo = safeRedirect(formData.get('returnTo'))
  return redirect(returnTo || '/', {
    headers: {
      'Set-Cookie': await serializeTheme(theme),
    },
  })
}
