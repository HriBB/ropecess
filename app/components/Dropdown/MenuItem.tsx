export type MenuItemProps = React.ComponentProps<'li'> & {
  autoClose?: boolean
}

function findParentDetails(el: HTMLElement): HTMLDetailsElement | null {
  const parent = el.parentElement
  if (parent) {
    if (parent instanceof HTMLDetailsElement) return parent
    if (parent === document.body) return null
    return findParentDetails(parent)
  }
  return null
}

function closeDetails(el: HTMLElement) {
  const details = findParentDetails(el)
  if (details) {
    details.open = false
  }
}

export const MenuItem = ({
  children,
  className,
  autoClose = true,
  ...props
}: MenuItemProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={className}
      onMouseUp={autoClose ? (e) => closeDetails(e.currentTarget) : undefined}
      {...props}
    >
      {children}
    </li>
  )
}
