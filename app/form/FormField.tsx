import { cls } from '~/utils/cls'

type FieldProps = React.ComponentPropsWithoutRef<'label'> & {
  label: string
  error?: string[] | string | null
}

export function FormField({
  children,
  className,
  label,
  error,
  ...props
}: FieldProps) {
  return (
    <label
      className={cls('form-control w-full max-w-lg', className)}
      {...props}
    >
      <div className="label">
        <span className="label-text dark:text-base-content">{label}</span>
      </div>
      {children}
      {error && (
        <div className="label">
          <span className="label-text-alt text-red-500 dark:text-red-400">
            {error}
          </span>
        </div>
      )}
    </label>
  )
}
