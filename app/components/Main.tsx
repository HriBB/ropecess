import { cls } from '~/utils/cls'
import { Container } from './Container'

const paragraphSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: '',
  lg: 'text-lg',
  xl: 'text-xl',
}

type ParagraphProps = React.ComponentPropsWithoutRef<'p'> & {
  size?: keyof typeof paragraphSizes | 'md'
}

function P({ children, className, size = 'md', ...props }: ParagraphProps) {
  return (
    <p
      className={cls('mb-6 last:mb-0', paragraphSizes[size], className)}
      {...props}
    >
      {children}
    </p>
  )
}

function H2({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'h1'>) {
  return (
    <h2
      className={cls('text-3xl font-medium', 'mb-8 last:mb-0', className)}
      {...props}
    >
      {children}
    </h2>
  )
}

function H3({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'h3'>) {
  return (
    <h2
      className={cls('text-2xl font-medium', 'mb-8 last:mb-0', className)}
      {...props}
    >
      {children}
    </h2>
  )
}

function SpecialTitle({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'h3'>) {
  return (
    <h2
      className={cls(
        'text-5xl uppercase leading-tight text-secondary',
        'font-bold',
        'mb-8',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

function Hero({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'section'>) {
  return (
    <section className={cls('h-svh w-full', className)} {...props}>
      {children}
    </section>
  )
}

function Section({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'section'>) {
  return (
    <section className={cls('py-24', className)} {...props}>
      {children}
    </section>
  )
}

function Main({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'main'>) {
  return (
    <main className={className} {...props}>
      {children}
    </main>
  )
}

Main.Hero = Hero
Main.Section = Section
Main.Container = Container
Main.SpecialTitle = SpecialTitle
Main.H2 = H2
Main.H3 = H3
Main.P = P

export { Main }
