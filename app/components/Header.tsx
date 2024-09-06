import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigation } from '@remix-run/react'

import { ThemeButton } from '~/theme/ThemeButton'
import { cls } from '~/utils/cls'
import { Button } from './Button'
import { MenuIcon } from './MenuIcon'

const items = [
  { href: '/', text: 'Home', className: 'btn-primary' },
  { href: '/services', text: 'Services', className: 'btn-primary' },
  { href: '/spacenet', text: 'Space Net', className: 'btn-secondary' },
  { href: '/about', text: 'About', className: 'btn-primary' },
  { href: '/contact', text: 'Contact', className: 'btn-primary' },
]

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
  const navRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setOpen] = useState<HTMLButtonElement | false>(false)

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
      setOpen(false)
    }
  }, [navigation])

  useEffect(() => {
    setOpen(false)
  }, [location.key])

  useEffect(() => {
    if (isOpen) {
      const clickHandler = (e: Event) => {
        if (!contains(navRef.current, e.target)) setOpen(false)
      }
      document.addEventListener('mousedown', clickHandler)
      document.addEventListener('touchstart', clickHandler)
      document.addEventListener('focusin', clickHandler)
      return () => {
        document.removeEventListener('mousedown', clickHandler)
        document.removeEventListener('touchstart', clickHandler)
        document.removeEventListener('focusin', clickHandler)
      }
    }
  }, [isOpen])

  return (
    <>
      {navigation.state !== 'idle' && (
        <progress className="progress progress-primary fixed left-0 top-0 z-50 h-1 w-full" />
      )}
      <header className="navbar relative">
        {/* logo left */}
        <div className="navbar-start order-1">
          <a
            className="btn btn-ghost btn-lg px-4 text-4xl font-bold uppercase"
            href="/"
          >
            Ropecess{' '}
          </a>
        </div>
        {/* buttons right */}
        <div className="navbar-end order-3">
          <ThemeButton />
          <Button
            className="btn btn-circle btn-ghost flex md:hidden"
            onClick={handleMenuToggle}
          >
            <MenuIcon />
          </Button>
        </div>
        {/* navigation */}
        <nav
          ref={navRef}
          className={cls(
            'navbar-center order-2 min-w-[175px] flex-1 md:flex',
            'rounded bg-base-200 shadow-xl dark:bg-base-300',
            //'border border-red-500',
            isOpen
              ? 'absolute right-4 top-full z-50 flex -translate-y-4'
              : 'hidden',
            isOpen && '',
          )}
        >
          <ul className="flex w-full flex-col items-stretch gap-1 p-2 md:flex-row md:items-center md:gap-4 md:p-0">
            {items.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    cls(
                      'btn no-animation w-full justify-start md:w-auto',
                      isActive ? 'btn-primary' : 'btn-ghost',
                      isActive && link.className,
                    )
                  }
                  prefetch="viewport"
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
