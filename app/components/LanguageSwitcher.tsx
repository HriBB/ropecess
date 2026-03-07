import { Link, useLocation } from 'react-router'

import { Dropdown } from '~/components/Dropdown'
import { cn } from '~/utils/cn'
import {
  locales,
  localeLabels,
  localeFlags,
  getAlternateUrl,
  useLocale,
} from '~/utils/i18n'

type Props = React.ComponentPropsWithRef<'details'>

export function LanguageSwitcher({ className, ...props }: Props) {
  const locale = useLocale()
  const { pathname, search } = useLocation()

  return (
    <Dropdown className={className} {...props}>
      <Dropdown.Trigger className="btn btn-circle btn-ghost text-lg">
        {localeFlags[locale]}
      </Dropdown.Trigger>
      <Dropdown.Menu bottom left>
        {locales.map((l) => (
          <Dropdown.MenuItem key={l}>
            <Link
              to={getAlternateUrl(pathname, l) + search}
              className={cn(
                'btn w-full justify-start text-left',
                l === locale ? 'btn-primary' : 'btn-ghost',
              )}
            >
              <span className="text-lg">{localeFlags[l]}</span>
              {localeLabels[l]}
            </Link>
          </Dropdown.MenuItem>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
