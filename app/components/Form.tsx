import { cn } from '~/utils/cn'
import { Button, ButtonProps } from './Button'

export type FormFieldProps = React.ComponentPropsWithoutRef<'fieldset'> & {
  label: string
  htmlFor?: string
  error?: string[] | string | null
}

export function FormField({
  children,
  className,
  label,
  htmlFor,
  error,
  ...props
}: FormFieldProps) {
  return (
    <fieldset className={cn('fieldset w-full', className)} {...props}>
      <label className="label flex justify-between" htmlFor={htmlFor}>
        <span
          className={cn(error && 'text-red-600 dark:text-red-400')}
        >
          {label}
        </span>
        {error && (
          <span className="text-xs text-red-600 dark:text-red-400">
            {error}
          </span>
        )}
      </label>
      {children}
    </fieldset>
  )
}

export type InputFieldProps = React.ComponentPropsWithoutRef<'input'> & {
  label: string
  labelProps?: React.ComponentPropsWithoutRef<'fieldset'>
  error?: string[] | string | null
}

export function InputField({
  label,
  labelProps,
  id,
  name,
  type = 'text',
  disabled,
  error,
  className,
  ...props
}: InputFieldProps) {
  return (
    <FormField label={label} htmlFor={id} error={error} {...labelProps}>
      <input
        id={id}
        name={name}
        type={type}
        className={cn(
          'input w-full',
          error && 'input-error',
          className,
        )}
        disabled={disabled}
        {...props}
      />
    </FormField>
  )
}

export type TextareaFieldProps = React.ComponentPropsWithoutRef<'textarea'> & {
  label: string
  labelProps?: React.ComponentPropsWithoutRef<'fieldset'>
  error?: string[] | string | null
}

export function TextareaField({
  label,
  labelProps,
  id,
  name,
  disabled,
  error,
  className,
  ...props
}: TextareaFieldProps) {
  return (
    <FormField label={label} htmlFor={id} error={error} {...labelProps}>
      <textarea
        className={cn(
          'textarea w-full',
          error && 'textarea-error',
          className,
        )}
        id={id}
        name={name}
        rows={6}
        disabled={disabled}
        {...props}
      />
    </FormField>
  )
}

export function Success({ children }: { children: React.ReactNode }) {
  return (
    <div role="alert" className="alert alert-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{children}</span>
    </div>
  )
}

export function Error({ children }: { children: React.ReactNode }) {
  return (
    <div role="alert" className="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{children}</span>
    </div>
  )
}

export function SubmitButton({
  color = 'primary',
  className,
  children,
  disabled,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<'button'> & ButtonProps<'button'>,
  'type'
>) {
  return (
    <div className="flex justify-end">
      <Button
        color={color}
        className={cn('w-full sm:w-auto', className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </Button>
    </div>
  )
}
