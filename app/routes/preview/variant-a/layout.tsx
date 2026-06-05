/**
 * Variant A — "Airy Organic" — shared layout: header, footer, PreviewSwitcher.
 * Albert Sans; sage accent (#5f7c61 / #a7c4a9); pill nav; huge whitespace; centered.
 */
import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { parsePreviewPathname, previewHref, getPreviewAlternateUrl } from '../utils'
import { PreviewSwitcher } from '../PreviewSwitcher'
import { ThemeButton } from '~/utils/theme/ThemeButton'
import type { Locale } from '~/utils/i18n'
import type { VariantKey } from '../config'

const GOOGLE_FONTS =
  'https://fonts.googleapis.com/css2?family=Albert+Sans:wght@200..700&display=swap'

const font = { fontFamily: "'Albert Sans', sans-serif" } as const
const sageText = 'text-[#5f7c61] dark:text-[#a7c4a9]'
const sageBg =
  'bg-[#5f7c61] text-white hover:bg-[#4d664f] dark:bg-[#a7c4a9] dark:text-[#1c241d] dark:hover:bg-[#c0d6c1]'

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

function VariantAHeader({
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
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-base-100/80 border-b border-base-content/5"
      style={font}
    >
      {/* Wordmark */}
      <Link
        to={lh('')}
        prefetch="intent"
        className={`text-xl font-semibold tracking-tight ${sageText}`}
      >
        Ropecess
      </Link>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-1">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end
            prefetch="intent"
            className={({ isActive }) =>
              `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? sageBg
                  : 'text-base-content/70 hover:text-base-content hover:bg-base-content/5'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Link
          to={altUrl}
          prefetch="intent"
          className="text-sm font-medium text-base-content/60 hover:text-base-content transition-colors px-2 py-1"
          aria-label={`Switch to ${altLocale === 'sl' ? 'Slovenščina' : 'English'}`}
        >
          {altLocale === 'sl' ? '🇸🇮' : '🇬🇧'}
        </Link>
        <ThemeButton />
        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden btn btn-ghost btn-sm btn-circle"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block w-5 space-y-1">
            <span className="block h-px bg-current" />
            <span className="block h-px bg-current" />
            <span className="block h-px bg-current" />
          </span>
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          className="absolute top-full left-0 right-0 bg-base-100 border-b border-base-content/10 shadow-lg p-4 flex flex-col gap-1 lg:hidden"
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
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? sageBg
                    : 'text-base-content/70 hover:text-base-content hover:bg-base-content/5'
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

function VariantAFooter({ locale }: { locale: Locale }) {
  return (
    <footer
      className="py-16 text-center text-sm text-base-content/40"
      style={font}
    >
      <p className="mb-2 font-semibold tracking-[0.3em] text-xs uppercase opacity-50">
        {locale === 'sl' ? 'Dizajnska predogled' : 'Design Preview'}
      </p>
      <p>&copy; Tilen Pogačnik {new Date().getFullYear()}</p>
    </footer>
  )
}

export default function VariantALayout() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPathname(pathname)

  return (
    <div className="bg-base-100 text-base-content min-h-screen" style={font}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <VariantAHeader token={token} variant={variant} locale={locale} />
      <div className="pt-[65px]">
        <Outlet />
      </div>
      <VariantAFooter locale={locale} />
      <PreviewSwitcher token={token} variant={variant} locale={locale} />
    </div>
  )
}
