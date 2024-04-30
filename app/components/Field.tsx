import { cls } from '~/utils/cls'

export function Field({
  children,
  className,
  label,
  error,
  ...props
}: React.ComponentPropsWithoutRef<'label'> & {
  label: string
  error?: string[] | string | null
}) {
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
