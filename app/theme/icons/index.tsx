import { SunIcon as LightIcon } from './SunIcon'
import { MoonIcon as DarkIcon } from './MoonIcon'
import { SettingsIcon as SystemIcon } from './SettingsIcon'
import { Theme } from '../theme'

export { DarkIcon, LightIcon, SystemIcon }

export const icons = {
  [Theme.LIGHT]: LightIcon,
  [Theme.DARK]: DarkIcon,
  [Theme.SYSTEM]: SystemIcon,
}
