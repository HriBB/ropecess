import { ActionFunctionArgs, redirect } from 'react-router'
import { safeRedirect } from '~/utils/redirect.server'
import { serializeTheme } from './theme.server'
import { isValidTheme, Theme } from './theme'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const theme = formData.get('theme') as Theme
  if (!isValidTheme(theme)) {
    throw new Response('Bad Request', { status: 400 })
  }
  const returnTo = safeRedirect(formData.get('returnTo'))
  return redirect(returnTo || '/', {
    headers: {
      'Set-Cookie': await serializeTheme(theme),
    },
  })
}
