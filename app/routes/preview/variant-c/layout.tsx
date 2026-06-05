/**
 * Variant C — "Editorial Calm" — shared layout: header, footer, PreviewSwitcher.
 * Manrope extralight; monochrome + amber (#F59E0B) accent; thin rules; ample whitespace.
 */
import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { parsePreviewPathname, previewHref, getPreviewAlternateUrl } from '../utils'
import { PreviewSwitcher } from '../PreviewSwitcher'
import { ThemeButton } from '~/utils/theme/ThemeButton'
import type { Locale } from '~/utils/i18n'
import type { VariantKey } from '../config'

const GOOGLE_FONTS =
  'https://fonts.googleapis.com/css2?family=Manrope:wght@200..700&display=swap'

const font = { fontFamily: "'Manrope', sans-serif" } as const

const navLabels: Record<Locale, Record<string, string>> = {
  en: {
    home: 'Home',
    services: 'Services',
    'height-cleaning': 'Height Cleaning',
    spacenet: 'Space Net',
    about: 'About',
    contact: 'Contact',
  },
  sl: {
    home: 'Domov',
    services: 'Storitve',
    'height-cleaning': 'Čiščenje na višini',
    spacenet: 'Space Net',
    about: 'O nas',
    contact: 'Kontakt',
  },
}

function VariantCHeader({
  token,
  variant,
  locale,
}: {
  token: string
  variant: VariantKey
  locale: Locale
}) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const lh = (page: string) => previewHref(page, token, variant, locale)
  const t = navLabels[locale]

  const items = [
    { href: lh(''), label: t.home },
    { href: lh('services'), label: t.services },
    { href: lh('height-cleaning'), label: t['height-cleaning'] },
    { href: lh('spacenet'), label: t.spacenet },
    { href: lh('about'), label: t.about },
    { href: lh('contact'), label: t.contact },
  ]

  const altLocale: Locale = locale === 'en' ? 'sl' : 'en'
  const altUrl = getPreviewAlternateUrl(pathname, altLocale)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 bg-base-100 border-b border-base-content/10"
      style={font}
    >
      {/* Wordmark */}
      <Link
        to={lh('')}
        prefetch="intent"
        className="text-xl font-extralight tracking-[0.1em] uppercase text-base-content"
      >
        Ropecess
      </Link>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-8">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end
            prefetch="intent"
            className={({ isActive }) =>
              `text-xs font-medium uppercase tracking-[0.25em] transition-colors ${
                isActive ? 'text-amber-500' : 'text-base-content/50 hover:text-base-content'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <Link
          to={altUrl}
          prefetch="intent"
          className="text-xs font-medium uppercase tracking-[0.2em] text-base-content/50 hover:text-base-content transition-colors"
          aria-label={`Switch to ${altLocale === 'sl' ? 'Slovenščina' : 'English'}`}
        >
          {altLocale === 'sl' ? 'SL' : 'EN'}
        </Link>
        <ThemeButton />
        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden btn btn-ghost btn-sm btn-circle"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block w-5 space-y-1.5">
            <span className="block h-px bg-current" />
            <span className="block h-px bg-current" />
            <span className="block h-px bg-current" />
          </span>
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          className="absolute top-full left-0 right-0 bg-base-100 border-b border-base-content/10 shadow-lg p-6 flex flex-col gap-5 lg:hidden"
          style={font}
        >
          {items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              prefetch="intent"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-xs font-medium uppercase tracking-[0.25em] transition-colors ${
                  isActive ? 'text-amber-500' : 'text-base-content/50 hover:text-base-content'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

function VariantCFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="py-20 px-6 border-t border-base-content/10" style={font}>
      <div className="mx-auto max-w-6xl flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.35em] opacity-40">
          <span className="mr-3 inline-block h-2 w-2 rounded-full bg-amber-500" />
          {locale === 'sl' ? 'Dizajnska predogled' : 'Design Preview'}
        </p>
        <p className="text-xs opacity-30">&copy; Tilen Pogačnik {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default function VariantCLayout() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPathname(pathname)

  return (
    <div className="bg-base-100 text-base-content min-h-screen" style={font}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <VariantCHeader token={token} variant={variant} locale={locale} />
      <div className="pt-[73px]">
        <Outlet />
      </div>
      <VariantCFooter locale={locale} />
      <PreviewSwitcher token={token} variant={variant} locale={locale} />
    </div>
  )
}
