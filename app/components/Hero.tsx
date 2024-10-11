import { useEffect, useState } from 'react'

import { cls } from '~/utils/cls'
import { DownIcon } from './DownIcon'
import { Button } from './Button'
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
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(true)
    window.addEventListener('scroll', handleScroll, { once: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Component
      className={cls(
        'hero relative h-svh w-full overflow-hidden bg-base-200 text-white',
        className,
      )}
      {...props}
    >
      {/*
      <div className="hero-overlay bg-base-100/20"></div>
      */}
      {children}
      {!isScrolled && (
        <Button
          color="ghost"
          shape="circle"
          aria-label="Scroll down"
          className={cls('absolute bottom-4 left-1/2 z-50 -ml-5')}
          onClick={() => window.scrollTo({ top: window.innerHeight })}
        >
          <DownIcon className="h-10 w-10 animate-pulse text-white/70" />
        </Button>
      )}
    </Component>
  )
}

type ContentProps = React.ComponentPropsWithoutRef<'div'>

function Content({ children, className, ...props }: ContentProps) {
  return (
    <div
      className={cls(
        'hero-content flex-col gap-10',
        'container rounded-sm p-10 py-14',
        'w-[calc(100%-4rem)] sm:w-full sm:max-w-md md:max-w-lg lg:max-w-4xl',
        // background
        'bg-base-100/70 dark:bg-base-100/90',
        // light
        'text-base-content backdrop-blur-sm',
        // dark
        'dark:text-white dark:backdrop-blur-sm',
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
      className={cls(
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
      className={cls('absolute inset-0 h-full w-full object-cover', className)}
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
