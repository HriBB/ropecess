export type RecaptchaFieldProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  siteKey: string
  showPolicy?: boolean
}

export function RecaptchaField({
  className,
  siteKey,
  showPolicy = false,
  ...props
}: RecaptchaFieldProps) {
  return (
    <div>
      <div
        className={['g-recaptcha', className].filter(Boolean).join(' ')}
        data-sitekey={siteKey}
        data-size="invisible"
        {...props}
      />
      {showPolicy && (
        <p className="mt-6 text-xs">
          This site is protected by reCAPTCHA and the Google{' '}
          <a className="link" href="https://policies.google.com/privacy">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a className="link" href="https://policies.google.com/terms">
            Terms of Service
          </a>{' '}
          apply.
        </p>
      )}
    </div>
  )
}
