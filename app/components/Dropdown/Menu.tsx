import { cls } from '~/utils/cls'

export type MenuProps = React.ComponentProps<'ul'> & {
  top?: boolean
  left?: boolean
  right?: boolean
  bottom?: boolean
}

export const Menu = ({
  children,
  className,
  top,
  left,
  right,
  bottom,
  ...props
}: MenuProps) => {
  return (
    <ul
      className={cls(
        'absolute z-50 max-h-[360px] min-w-[150px] overflow-y-auto p-2',
        'rounded bg-base-200 shadow-xl dark:bg-base-300',
        bottom && 'top-12',
        top && 'bottom-12',
        right && 'left-0',
        left && 'right-0',
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  )
}
