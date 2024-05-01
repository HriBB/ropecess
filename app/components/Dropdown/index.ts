import { Details } from './Details'
import { Summary } from './Summary'
import { Menu } from './Menu'
import { MenuItem } from './MenuItem'

export const Dropdown = Object.assign(Details, {
  Trigger: Summary,
  Menu,
  MenuItem,
})
