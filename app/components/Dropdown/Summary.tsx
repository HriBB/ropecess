export type SummaryProps = React.ComponentProps<'summary'>

export const Summary = ({
  children,
  className,
  //arrow = false,
  ...props
}: SummaryProps) => {
  return (
    <summary className={className} {...props}>
      {children}
    </summary>
  )
}
