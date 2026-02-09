import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldRevalidateFunction,
  useLoaderData,
} from 'react-router'

import '~/app.css'

import type { Route } from './+types/root'
import { cacheHeaders } from '~/utils/cache.server'
import { getPlausible } from '~/utils/plausible/plausible.server'
import { getTheme } from '~/utils/theme/theme.server'

import { AnalyticsScript } from '~/utils/plausible/AnalyticsScript'
import { ThemeScript } from '~/utils/theme/ThemeScript'
import { Header } from '~/components/Header'
import { Footer } from '~/components/Footer'
import { cn } from './utils/cn'

export { ErrorBoundary } from '~/components/ErrorBoundary'

export function headers() {
  return cacheHeaders
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
  const { theme } = useLoaderData<typeof loader>()
  return (
    <html
      lang="en"
      className={cn(theme, 'bg-base-200')}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ThemeScript />
        <AnalyticsScript />
      </head>
      <body className="bg-base-200">
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
