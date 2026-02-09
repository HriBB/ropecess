import { cn } from '~/utils/cn'
import { Picture, PictureProps } from './Picture'

type HeroProps<C extends React.ElementType> = {
  as?: C
}

type Props<C extends React.ElementType> = HeroProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof HeroProps<C>>

function HeroBase<C extends React.ElementType = 'section'>({
  as,
  children,
  className,
  ...props
}: Props<C>) {
  const Component = as || 'section'
  return (
    <Component
      className={cn(
        'hero relative h-svh w-full overflow-hidden bg-base-200 text-white',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

type ContentProps = React.ComponentPropsWithoutRef<'div'>

function Content({ children, className, ...props }: ContentProps) {
  return (
    <div
      className={cn(
        'hero-content flex-col gap-10',
        'container rounded-sm p-10 py-14',
        'w-[calc(100%-4rem)] sm:w-full sm:max-w-md md:max-w-lg lg:max-w-4xl',
        'backdrop-blur-sm dark:backdrop-blur-sm',
        'bg-base-100/70 dark:bg-base-100/90',
        'text-base-content dark:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

type TitleProps = React.ComponentPropsWithoutRef<'h1'>

function Title({ children, className, ...props }: TitleProps) {
  return (
    <h1
      className={cn(
        'text-center font-medium leading-snug tracking-wide',
        'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
        'uppercase',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

function BackgroundPicture({ className, ...props }: PictureProps) {
  return (
    <Picture
      className={cn('absolute inset-0 h-full w-full object-cover', className)}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      {...props}
    />
  )
}

export const Hero = Object.assign(HeroBase, {
  Content,
  Title,
  BackgroundPicture,
})
