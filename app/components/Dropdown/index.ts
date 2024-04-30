import { Details as BaseDetails } from './Details'
import { Summary } from './Summary'
import { Menu } from './Menu'
import { MenuItem } from './MenuItem'

export const Details = Object.assign(BaseDetails, {
  Summary,
  Menu,
  MenuItem,
})
