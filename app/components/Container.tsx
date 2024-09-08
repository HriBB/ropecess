import { cls } from '~/utils/cls'

const sizes = {
  sm: 'max-w-2xl', // 672px
  md: 'md:max-w-4xl', // 896px
  lg: 'lg:max-w-6xl', // 1024px
  xl: 'xl:max-w-7xl', // 1280px
  xxl: 'xxl:max-w-8xl', // 1536px
}

type ContainerProps<C extends React.ElementType> = {
  as?: C
  size?: keyof typeof sizes
}

type Props<C extends React.ElementType> = ContainerProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ContainerProps<C>>

export function Container<C extends React.ElementType = 'div'>({
  as,
  children,
  className,
  size = 'lg',
  ...props
}: Props<C>) {
  const Component = as || 'div'

  return (
    <Component
      className={cls('container mx-auto px-8', sizes[size], className)}
      {...props}
    >
      {children}
    </Component>
  )
}
