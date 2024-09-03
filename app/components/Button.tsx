import { cls } from '~/utils/cls'

const baseClassName = 'btn'

const colors = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  neutral: 'btn-neutral',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
  ghost: 'btn-ghost',
  link: 'btn-link',
}

const sizes = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

const shapes = {
  square: 'btn-square',
  circle: 'btn-circle',
  block: 'btn-block',
  wide: 'btn-wide',
}

const variants = {
  outline: 'btn-outline',
  link: 'btn-link',
}

type ButtonProps<C extends React.ElementType> = {
  as?: C
  color?: keyof typeof colors
  size?: keyof typeof sizes
  shape?: keyof typeof shapes
  variant?: keyof typeof variants
}

type Props<C extends React.ElementType> = ButtonProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonProps<C>>

export const Button = <C extends React.ElementType = 'button'>({
  as,
  color,
  size,
  shape,
  variant,
  children,
  className,
  ...props
}: Props<C>) => {
  const Component = as || 'button'

  return (
    <Component
      {...props}
      className={cls(
        baseClassName,
        color && colors[color],
        size && sizes[size],
        shape && shapes[shape],
        variant && variants[variant],
        props.disabled && 'btn-disabled',
        className,
      )}
    >
      {children}
    </Component>
  )
}
