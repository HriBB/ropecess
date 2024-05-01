import { cls } from '~/utils/cls'

type HeroProps<C extends React.ElementType> = {
  as?: C
  backgroundImage: string
}

type Props<C extends React.ElementType> = HeroProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof HeroProps<C>>

function HeroBase<C extends React.ElementType = 'section'>({
  as,
  backgroundImage,
  children,
  className,
  ...props
}: Props<C>) {
  const Component = as || 'section'
  return (
    <Component
      className={cls('hero min-h-[60vh] bg-base-200', className)}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      {...props}
    >
      <div className="hero-overlay bg-base-100/20"></div>
      {children}
    </Component>
  )
}

type ContentProps = React.ComponentPropsWithoutRef<'div'>

function Content({ children, className, ...props }: ContentProps) {
  return (
    <div
      className={cls('hero-content w-full flex-col gap-10', className)}
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
      className={cls(
        'container w-full p-10',
        'text-center font-extralight uppercase leading-snug tracking-wide',
        'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl',
        // light
        'bg-white/70 text-base-content',
        // dark
        'dark:bg-black/60 dark:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export const Hero = Object.assign(HeroBase, {
  Content,
  Title,
})
