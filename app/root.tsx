import {
  HeadersArgs,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldRevalidateFunction,
} from 'react-router'

import '~/app.css'

import type * as Route from './+types.root'
import { getPlausible } from '~/utils/plausible/plausible.server'
import { getTheme } from '~/utils/theme/theme.server'

import { AnalyticsScript } from '~/utils/plausible/AnalyticsScript'
import { ThemeScript } from '~/utils/theme/ThemeScript'
import { Header } from '~/components/Header'
import { Footer } from '~/components/Footer'

export { ErrorBoundary } from '~/components/ErrorBoundary'

export function headers(_: HeadersArgs) {
  return {
    'Cache-Control': 'public, max-age=31536000',
    Vary: 'Cookie',
  }
}

export const shouldRevalidate: ShouldRevalidateFunction = (args) => {
  return args.formData?.get('theme') ? true : args.defaultShouldRevalidate
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const plausible = getPlausible()
  const theme = await getTheme(request)
  return { plausible, theme }
}

export function Layout({ children }: { children: React.ReactNode }) {
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
