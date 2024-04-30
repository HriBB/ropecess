import { cls } from '~/utils/cls'

type ContainerProps<C extends React.ElementType> = {
  as?: C
}

type Props<C extends React.ElementType> = ContainerProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ContainerProps<C>>

export function Container<C extends React.ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: Props<C>) {
  const Component = as || 'button'

  return (
    <Component className={cls('container mx-auto px-5', className)} {...props}>
      {children}
    </Component>
  )
}
