import { cls } from '~/utils/cls'

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
    <p className={cls('mb-6', paragraphSizes[size], className)} {...props}>
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
    <h2 className={cls('text-3xl font-semibold', 'mb-8', className)} {...props}>
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
    <h2 className={cls('text-2xl font-semibold', 'mb-8', className)} {...props}>
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

function Main({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>
}

Main.SpecialTitle = SpecialTitle
Main.H2 = H2
Main.H3 = H3
Main.P = P

export { Main }
