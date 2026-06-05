/**
 * Variant D — "Neo-Brutalist" — shared layout: header, footer, PreviewSwitcher.
 * Archivo Black + Space Mono; 4px borders; hard offset shadows; yellow (#FDE047) accent;
 * rotated stickers; poster energy. Light = paper + black ink; dark = charcoal + yellow.
 */
import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { parsePreviewPathname, previewHref, getPreviewAlternateUrl } from '../utils'
import { PreviewSwitcher } from '../PreviewSwitcher'
import { ThemeButton } from '~/utils/theme/ThemeButton'
import type { Locale } from '~/utils/i18n'
import type { VariantKey } from '../config'

const GOOGLE_FONTS =
  'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&display=swap'

const black = { fontFamily: "'Archivo Black', sans-serif" } as const
const mono = { fontFamily: "'Space Mono', monospace" } as const

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

function VariantDHeader({
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
      className="fixed top-0 left-0 right-0 z-40 border-b-4 border-base-content bg-base-100 px-5 py-4 flex items-center justify-between"
      style={mono}
    >
      {/* Wordmark */}
      <Link
        to={lh('')}
        prefetch="intent"
        style={black}
        className="text-xl uppercase text-base-content tracking-wide"
      >
        Ropecess
      </Link>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-0">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end
            prefetch="intent"
            className={({ isActive }) =>
              `border-4 border-transparent px-4 py-2 text-xs uppercase font-bold transition-all ${
                isActive
                  ? 'border-base-content bg-yellow-300 text-black shadow-[4px_4px_0_0] shadow-base-content'
                  : 'text-base-content/60 hover:text-base-content'
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
          className="border-4 border-base-content px-3 py-1 text-xs font-bold uppercase text-base-content hover:bg-yellow-300 hover:text-black transition-colors"
          aria-label={`Switch to ${altLocale === 'sl' ? 'Slovenščina' : 'English'}`}
        >
          {altLocale === 'sl' ? 'SL' : 'EN'}
        </Link>
        <ThemeButton />
        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden border-4 border-base-content p-1.5"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block w-5 space-y-1">
            <span className="block h-0.5 bg-current" />
            <span className="block h-0.5 bg-current" />
            <span className="block h-0.5 bg-current" />
          </span>
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          className="absolute top-full left-0 right-0 bg-base-100 border-b-4 border-base-content p-5 flex flex-col gap-0 lg:hidden"
          style={mono}
        >
          {items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              prefetch="intent"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `border-4 border-transparent px-4 py-3 text-xs uppercase font-bold transition-all ${
                  isActive
                    ? 'border-base-content bg-yellow-300 text-black'
                    : 'text-base-content/60 hover:text-base-content'
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

function VariantDFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t-4 border-base-content py-12 px-5" style={mono}>
      <div className="mx-auto max-w-6xl flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-xs font-bold uppercase">
          <span
            className="mr-2 inline-block border-4 border-base-content bg-yellow-300 px-2 py-0.5 text-black text-[10px]"
            style={black}
          >
            ★ {locale === 'sl' ? 'PREDOGLED' : 'PREVIEW'} ★
          </span>
        </p>
        <p className="text-xs opacity-40">&copy; Tilen Pogačnik {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default function VariantDLayout() {
  const { pathname } = useLocation()
  const { token, variant, locale } = parsePreviewPathname(pathname)

  return (
    <div className="bg-base-100 text-base-content min-h-screen" style={mono}>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <VariantDHeader token={token} variant={variant} locale={locale} />
      <div className="pt-[68px]">
        <Outlet />
      </div>
      <VariantDFooter locale={locale} />
      <PreviewSwitcher token={token} variant={variant} locale={locale} />
    </div>
  )
}
