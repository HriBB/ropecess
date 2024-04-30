import { createElement } from 'react'
import { Form, useLocation } from '@remix-run/react'

import { useTheme } from './useTheme'
import { Theme } from './theme'
import { Details } from '~/components/Dropdown'
import { Button } from '~/components/Button'
import { DarkIcon, LightIcon, icons } from './icons'

type Props = React.ComponentPropsWithRef<'details'>

export const ThemeButton = ({ className, ...props }: Props) => {
  const { pathname, search } = useLocation()
  const theme = useTheme()
  return (
    <Details className={className} {...props}>
      <Details.Summary className="btn btn-circle btn-ghost">
        <LightIcon className="dark:hidden" />
        <DarkIcon className="hidden dark:block" />
      </Details.Summary>
      <Details.Menu bottom left>
        <Form replace method="POST" action="/theme">
          <input type="hidden" name="returnTo" value={pathname + search} />
          {Object.values(Theme).map((t) => (
            <Details.MenuItem key={t}>
              <Button
                className="w-full justify-start text-left"
                color={t === theme ? 'primary' : 'ghost'}
                //disabled={t === theme}
                name="theme"
                value={t}
              >
                {createElement(icons[t])}
                {t}
              </Button>
            </Details.MenuItem>
          ))}
        </Form>
      </Details.Menu>
    </Details>
  )
}
