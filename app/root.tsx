import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldRevalidateFunction,
} from '@remix-run/react'

import { Header } from './components/Header'
import { Footer } from './components/Footer'

import { ThemeScript } from './theme/ThemeScript'
import { useTheme } from './theme/useTheme'
import { getThemeFromRequest } from './theme/theme.server'

import styles from './tailwind.css?url'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const shouldRevalidate: ShouldRevalidateFunction = (args) => {
  return args.formData?.get('theme') ? true : args.defaultShouldRevalidate
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const theme = await getThemeFromRequest(request)
  return { theme }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  return (
    <html
      lang="en"
      className={theme ?? ''}
      data-theme={theme ?? ''}
      suppressHydrationWarning
    >
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
