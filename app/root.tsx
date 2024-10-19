import {
  HeadersArgs,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldRevalidateFunction,
} from 'react-router'

import '~/tailwind.css'

import type * as Route from './+types.root'
import { getTheme } from '~/utils/theme/theme.server'
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
  const theme = await getTheme(request)
  return { theme }
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

/*
export function ErrorBoundary() {
  const error = useRouteError()
  return (
    <main className="min-h-[calc(100vh-4rem)] pt-28 md:pt-32">
      <div>
        {isRouteErrorResponse(error) ? (
          <>
            <h2>{`Error ${error.status}`}</h2>
            <div>{error.data}</div>
          </>
        ) : (
          <>
            <h2>Error</h2>
            <div>{error instanceof Error ? error.message : 'Bad request'}</div>
          </>
        )}
      </div>
    </main>
  )
}
*/
