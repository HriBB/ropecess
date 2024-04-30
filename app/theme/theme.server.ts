import { ActionFunctionArgs, redirect, createCookie } from '@remix-run/node'
import { Theme } from './theme'

type To = FormDataEntryValue | string | null | undefined

function safeRedirect(to: To) {
  if (!to || typeof to !== 'string') {
    return '/'
  }
  if (!to.startsWith('/') || to.startsWith('//')) {
    return '/'
  }
  return to
}

const cookie = createCookie('theme', {
  maxAge: 31_536_000, // one year
})

export const parseTheme = async (request: Request) => {
  const header = request.headers.get('Cookie')
  const data = await cookie.parse(header)
  const theme = data?.theme as Theme
  return validateTheme(theme) ? theme : Theme.SYSTEM
}

export const serializeTheme = async (theme: Theme) =>
  theme === Theme.SYSTEM
    ? cookie.serialize({}, { expires: new Date(0), maxAge: 0 })
    : cookie.serialize({ theme })

export const validateTheme = (theme: Theme) =>
  Object.values(Theme).includes(theme)

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
