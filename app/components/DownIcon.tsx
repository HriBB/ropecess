import { cls } from '~/utils/cls'

export type Props = Omit<React.ComponentPropsWithoutRef<'svg'>, 'children'>

export function DownIcon({ className, ...props }: Props) {
  return (
    <svg
      className={cls('current-color', className)}
      viewBox="0 0 28 28"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="currentColor"
        d="M26.297 12.625l-11.594 11.578c-0.391 0.391-1.016 0.391-1.406 0l-11.594-11.578c-0.391-0.391-0.391-1.031 0-1.422l2.594-2.578c0.391-0.391 1.016-0.391 1.406 0l8.297 8.297 8.297-8.297c0.391-0.391 1.016-0.391 1.406 0l2.594 2.578c0.391 0.391 0.391 1.031 0 1.422z"
      />
    </svg>
  )
}
