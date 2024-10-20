import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldRevalidateFunction,
} from 'react-router'

import '~/app.css'

import type * as Route from './+types.root'
import { cacheHeaders } from '~/utils/cache.server'
import { authHeaders, isAuthorized } from '~/utils/basic-auth/auth.server'
import { getPlausible } from '~/utils/plausible/plausible.server'
import { getTheme } from '~/utils/theme/theme.server'

import { Unauthorized } from '~/utils/basic-auth/Unauthorized'
import { AnalyticsScript } from '~/utils/plausible/AnalyticsScript'
import { ThemeScript } from '~/utils/theme/ThemeScript'
import { Header } from '~/components/Header'
import { Footer } from '~/components/Footer'
import { useRootData } from './utils/data'

export { ErrorBoundary } from '~/components/ErrorBoundary'

export function headers() {
  return {
    ...authHeaders,
    ...cacheHeaders,
  }
}

export const shouldRevalidate: ShouldRevalidateFunction = (args) => {
  return args.formData?.get('theme') ? true : args.defaultShouldRevalidate
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const authorized = isAuthorized(request)
  const plausible = getPlausible()
  const theme = await getTheme(request)
  return data(
    { authorized, plausible, theme },
    { status: authorized ? 200 : 401 },
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  if (!useRootData().authorized) {
    return <Unauthorized />
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ThemeScript />
        <AnalyticsScript />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
