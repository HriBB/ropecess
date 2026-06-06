/**
 * Variant E — "Aurora Glass" — shared layout: header, footer, PreviewSwitcher.
 * Outfit; gradient-mesh color blobs; frosted glass panels; neon glow accents;
 * rounded-3xl; Light = soft pastel mesh; dark = deep night mesh.
 */
import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { parsePreviewPathname, previewHref, getPreviewAlternateUrl } from '../utils'
import { PreviewSwitcher } from '../PreviewSwitcher'
import { ThemeButton } from '~/utils/theme/ThemeButton'
import type { Locale } from '~/utils/i18n'
import type { VariantKey } from '../config'

const GOOGLE_FONTS =
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap'

const outfit = { fontFamily: "'Outfit', sans-serif" } as const

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

function VariantEHeader({
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
      className="fixed top-0 left-0 right-0 z-40 border-b border-base-content/10 bg-base-100/70 px-5 py-3 flex items-center justify-between backdrop-blur-xl"
      style={outfit}
    >
      {/* Wordmark */}
      <Link
        to={lh('')}
        prefetch="intent"
        className="bg-gradient-to-r from-fuchsia-500 to-cyan-400 bg-clip-text text-xl font-bold text-transparent"
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
              `rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/20 text-fuchsia-700 shadow-[0_0_12px_rgba(217,70,239,0.3)] dark:text-fuchsia-300'
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
          className="rounded-full border border-base-content/15 bg-base-100/50 px-3 py-1.5 text-xs font-semibold text-base-content/70 backdrop-blur-sm transition-colors hover:border-fuchsia-400/40 hover:text-fuchsia-400"
          aria-label={`Switch to ${altLocale === 'sl' ? 'Slovenščina' : 'English'}`}
        >
          {altLocale === 'sl' ? 'SL' : 'EN'}
        </Link>
        <ThemeButton />
        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden rounded-full border border-base-content/15 p-2 text-base-content/70 hover:text-base-content"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block w-5 space-y-1">
            <span className="block h-0.5 bg-current rounded-full" />
            <span className="block h-0.5 bg-current rounded-full" />
            <span className="block h-0.5 bg-current rounded-full" />
          </span>
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          className="absolute top-full left-0 right-0 border-b border-base-content/10 bg-base-100/90 p-5 flex flex-col gap-1 lg:hidden backdrop-blur-xl"
          style={outfit}
        >
          {items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              prefetch="intent"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/20 text-fuchsia-700 dark:text-fuchsia-300'
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

function VariantEFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-base-content/10 bg-base-100/60 py-10 px-5 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-medium">
          <span className="rounded-full bg-gradient-to-r from-fuchsia-500/20 to-cyan-400/20 px-4 py-1.5 text-xs font-semibold text-fuchsia-700 shadow-[0_0_10px_rgba(217,70,239,0.2)] dark:text-fuchsia-300">
            ✦ {locale === 'sl' ? 'Predogled dizajna' : 'Design Preview'} ✦
          </span>
        </p>
        <p className="text-xs text-base-content/70">&copy; Tilen Pogačnik {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default function VariantELayout() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPathname(pathname)

  return (
    <div className="relative bg-base-200 text-base-content min-h-screen" style={outfit}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <VariantEHeader token={token} variant={variant} locale={locale} />
      <div className="pt-[60px]">
        <Outlet />
      </div>
      <VariantEFooter locale={locale} />
      <PreviewSwitcher token={token} variant={variant} locale={locale} />
    </div>
  )
}
