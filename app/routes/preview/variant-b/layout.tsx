/**
 * Variant B — "Exaggerated Minimal" — shared layout: header, footer, PreviewSwitcher.
 * EB Garamond display + Lato body; safety orange (#EA580C); numbered sections; type-first.
 */
import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { parsePreviewPathname, previewHref, getPreviewAlternateUrl } from '../utils'
import { PreviewSwitcher } from '../PreviewSwitcher'
import { ThemeButton } from '~/utils/theme/ThemeButton'
import type { Locale } from '~/utils/i18n'
import type { VariantKey } from '../config'

const GOOGLE_FONTS =
  'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..700;1,400..700&family=Lato:wght@300;400;700&display=swap'

const garamond = { fontFamily: "'EB Garamond', Georgia, serif" } as const
const lato = { fontFamily: "'Lato', sans-serif" } as const
const ORANGE = '#EA580C'

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

function VariantBHeader({
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
    { href: lh(''), label: t.home, page: '' },
    { href: lh('services'), label: t.services, page: 'services' },
    { href: lh('height-cleaning'), label: t['height-cleaning'], page: 'height-cleaning' },
    { href: lh('spacenet'), label: t.spacenet, page: 'spacenet' },
    { href: lh('about'), label: t.about, page: 'about' },
    { href: lh('contact'), label: t.contact, page: 'contact' },
  ]

  const altLocale: Locale = locale === 'en' ? 'sl' : 'en'
  const altUrl = getPreviewAlternateUrl(pathname, altLocale)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 bg-base-100 border-b border-base-content/10"
      style={lato}
    >
      {/* Wordmark */}
      <Link
        to={lh('')}
        prefetch="intent"
        className="text-2xl font-medium italic tracking-tight"
        style={{ ...garamond, color: ORANGE }}
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
              `text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                isActive
                  ? 'text-base-content'
                  : 'text-base-content/50 hover:text-base-content'
              }`
            }
            style={({ isActive }) => (isActive ? { color: ORANGE } : undefined)}
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
          className="text-xs font-bold uppercase tracking-[0.15em] text-base-content/50 hover:text-base-content transition-colors"
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
          className="absolute top-full left-0 right-0 bg-base-100 border-b border-base-content/10 shadow-xl p-6 flex flex-col gap-4 lg:hidden"
          style={lato}
        >
          {items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              prefetch="intent"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                  isActive ? '' : 'text-base-content/50 hover:text-base-content'
                }`
              }
              style={({ isActive }) => (isActive ? { color: ORANGE } : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

function VariantBFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="py-16 px-6 border-t border-base-content/10" style={lato}>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-40">
          {locale === 'sl' ? 'Dizajnska predogled' : 'Design Preview'}
        </p>
        <p className="text-xs opacity-40">&copy; Tilen Pogačnik {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default function VariantBLayout() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPathname(pathname)

  return (
    <div className="bg-base-100 text-base-content min-h-screen" style={lato}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <VariantBHeader token={token} variant={variant} locale={locale} />
      <div className="pt-[73px]">
        <Outlet />
      </div>
      <VariantBFooter locale={locale} />
      <PreviewSwitcher token={token} variant={variant} locale={locale} />
    </div>
  )
}
