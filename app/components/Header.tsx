import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigation } from 'react-router'

import { ThemeButton } from '~/utils/theme/ThemeButton'
import { LanguageSwitcher } from '~/components/LanguageSwitcher'
import { cn } from '~/utils/cn'
import { useLocalizeHref } from '~/utils/i18n'
import { useTranslations } from '~/utils/translations'
import { Button } from './Button'
import { MenuIcon } from './MenuIcon'

function contains(parent: any, child: any) {
  return (
    parent instanceof HTMLElement &&
    child instanceof HTMLElement &&
    parent.contains(child)
  )
}

export function Header() {
  const location = useLocation()
  const navigation = useNavigation()
  const t = useTranslations()
  const lh = useLocalizeHref()

  const items = [
    { href: lh('/'), text: t('nav.home') },
    { href: lh('/services'), text: t('nav.services') },
    {
      href: lh('/professional-height-cleaning'),
      text: t('nav.heightCleaning'),
    },
    { href: lh('/spacenet'), text: t('nav.spaceNet') },
    { href: lh('/about'), text: t('nav.about') },
    { href: lh('/contact'), text: t('nav.contact') },
  ]

  const navRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setOpen] = useState<HTMLButtonElement | false>(false)

  const isLoading = navigation.state !== 'idle'

  const handleMenuToggle = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isOpen) {
        setOpen(false)
      } else {
        setOpen(event.currentTarget)
      }
    },
    [isOpen],
  )

  useEffect(() => {
    if (navigation.formData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false)
    }
  }, [navigation])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false)
  }, [location.key])

  useEffect(() => {
    if (isOpen) {
      const clickHandler = (e: Event) => {
        if (!contains(navRef.current, e.target)) {
          e.preventDefault()
          setOpen(false)
        }
      }
      document.addEventListener('click', clickHandler)
      document.addEventListener('focusin', clickHandler)
      return () => {
        document.removeEventListener('click', clickHandler)
        document.removeEventListener('focusin', clickHandler)
      }
    }
  }, [isOpen])

  return (
    <>
      {isLoading && (
        <progress className="progress progress-primary fixed top-0 left-0 z-50 h-1 w-full" />
      )}
      <header
        className={cn(
          'navbar fixed top-0 z-40 flex',
          'drop-shadow-lg backdrop-blur-xs',
          'bg-base-100/70 dark:bg-base-100/90',
        )}
      >
        {/* logo left */}
        <div className="navbar-start order-1" style={{ order: 1 }}>
          <a
            className={cn(
              'btn btn-ghost btn-lg px-4 text-4xl font-bold uppercase',
            )}
            href={lh('/')}
          >
            Ropecess
          </a>
        </div>

        {/* buttons right */}
        <div className="navbar-end order-3 pr-2 lg:gap-2">
          <LanguageSwitcher />
          <ThemeButton />
          <Button
            className="btn btn-circle btn-ghost flex lg:hidden"
            onClick={handleMenuToggle}
            aria-label="Toggle Menu"
          >
            <MenuIcon />
          </Button>
        </div>

        {/* navigation */}
        <nav
          ref={navRef}
          className={cn(
            'navbar-center order-2 w-44 flex-1 lg:flex lg:w-auto',
            'max-lg:bg-base-200 max-lg:dark:bg-base-300',
            'max-lg:rounded-lg max-lg:shadow-xl',
            isOpen
              ? 'absolute top-full right-4 z-50 flex -translate-y-4'
              : 'hidden',
          )}
        >
          <ul
            className={cn(
              'flex w-full flex-col items-stretch gap-1 p-2',
              'lg:p-0x lg:flex-row lg:items-center lg:gap-2',
            )}
          >
            {items.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  end
                  className={({ isActive }) =>
                    cn(
                      'btn shrink-0 text-nowrap',
                      'w-full justify-start lg:w-auto',
                      isActive ? 'btn-primary' : 'btn-ghost',
                      //isActive && link.className,
                    )
                  }
                  prefetch="intent"
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}
