import { createElement } from 'react'
import { Form, useLocation } from '@remix-run/react'

import { Dropdown } from '~/components/Dropdown'
import { Button } from '~/components/Button'
import { DarkIcon, LightIcon, icons } from './icons'
import { Theme } from './theme'
import { useTheme } from './useTheme'

type Props = React.ComponentPropsWithRef<'details'>

export const ThemeButton = ({ className, ...props }: Props) => {
  const { pathname, search } = useLocation()
  const theme = useTheme()
  return (
    <Dropdown className={className} {...props}>
      <Dropdown.Trigger className="btn btn-circle btn-ghost">
        <LightIcon className="dark:hidden" />
        <DarkIcon className="hidden dark:block" />
      </Dropdown.Trigger>
      <Dropdown.Menu bottom left>
        <Form replace method="POST" action="/theme">
          <input type="hidden" name="returnTo" value={pathname + search} />
          {Object.values(Theme).map((t) => (
            <Dropdown.MenuItem key={t}>
              <Button
                className="w-full justify-start text-left"
                color={t === theme ? 'primary' : 'ghost'}
                name="theme"
                value={t}
              >
                {createElement(icons[t])}
                {t}
              </Button>
            </Dropdown.MenuItem>
          ))}
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  )
}
