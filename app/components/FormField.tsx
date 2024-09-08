import { cls } from '~/utils/cls'

export type FormFieldProps = React.ComponentPropsWithoutRef<'label'> & {
  label: string
  error?: string[] | string | null
}

export function FormField({
  children,
  className,
  label,
  error,
  ...props
}: FormFieldProps) {
  return (
    <label className={cls('form-control w-full', className)} {...props}>
      <div className="label">
        <span
          className={cls(
            'label-text dark:text-base-content',
            error && 'text-red-600 dark:text-red-400',
          )}
        >
          {label}
        </span>
        {error && (
          <span className="label-text-alt text-red-600 dark:text-red-400">
            {error}
          </span>
        )}
      </div>
      {children}
    </label>
  )
}
