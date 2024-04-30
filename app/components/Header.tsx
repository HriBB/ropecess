import { NavLink, useNavigation } from '@remix-run/react'
import { ThemeButton } from '~/theme/ThemeButton'
import { cls } from '~/utils/cls'
import { Button } from './Button'
import { MenuIcon } from './MenuIcon'
import { useState } from 'react'

const items = [
  { href: '/', text: 'Home' },
  { href: '/about', text: 'About' },
  { href: '/services', text: 'Services' },
  { href: '/contact', text: 'Contact' },
]

export function Header() {
  const navigation = useNavigation()
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      {navigation.state !== 'idle' && (
        <progress className="progress progress-primary fixed left-0 top-0 z-50 h-1 w-full" />
      )}
      <header className="navbar relative">
        <div className="navbar-start">
          <a
            className="btn btn-ghost btn-lg px-4 text-4xl font-bold uppercase"
            href="/"
          >
            Ropecess{' '}
          </a>
        </div>
        <nav
          className={cls(
            'navbar-center md:flex',
            isOpen
              ? 'absolute left-0 right-0 top-full z-50 flex w-full flex-1 bg-base-100'
              : 'hidden',
          )}
        >
          <ul className="flex w-full flex-col items-stretch gap-1 p-5 md:flex-row md:items-center md:gap-4 md:p-0">
            {items.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    cls(
                      'btn btn-ghost w-full md:w-auto',
                      isActive && 'underline',
                    )
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="navbar-end">
          <ThemeButton />
          <Button
            className="flex md:hidden"
            color="ghost"
            shape="circle"
            onClick={() => setOpen(!isOpen)}
          >
            <MenuIcon />
          </Button>
        </div>
      </header>
    </>
  )
}
