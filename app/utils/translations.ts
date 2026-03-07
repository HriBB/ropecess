import { type Locale, useLocale } from './i18n'

const translations: Record<Locale, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.heightCleaning': 'Height Cleaning',
    'nav.spaceNet': 'Space Net',
    'nav.about': 'About',
    'nav.contact': 'Contact',
  },
  sl: {
    'nav.home': 'Domov',
    'nav.services': 'Storitve',
    'nav.heightCleaning': 'Čiščenje na višini',
    'nav.spaceNet': 'Space Net',
    'nav.about': 'O nas',
    'nav.contact': 'Kontakt',
  },
}

export function useTranslations() {
  const locale = useLocale()
  return (key: string): string => translations[locale]?.[key] ?? key
}
