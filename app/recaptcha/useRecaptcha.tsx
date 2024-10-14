import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigation, useSubmit } from 'react-router'
import useIntersection from './useIntersection'

/**
 * useRecaptcha v3
 *
 * @see https://www.google.com/recaptcha/admin/site/690637641/settings
 * @see https://github.com/remix-run/remix/discussions/2716
 * @see https://stackoverflow.com/a/60627963
 * @see https://stackoverflow.com/questions/58114386/how-can-i-reload-recaptcha-v3
 */
export function useRecaptcha({ siteKey }: { siteKey: string }) {
  const keyRef = useRef(siteKey)
  const formRef = useRef<HTMLFormElement | null>(null)
  const didSubmit = useRef(false)
  const observer = useRef<IntersectionObserver | null>(null)

  const isLoadingScript = useRef(false)
  const [isReady, setReady] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const isBusy = isLoading || !isReady

  const navigation = useNavigation()
  const submit = useSubmit()

  const loadScript = useCallback(() => {
    if (isLoadingScript.current) return
    isLoadingScript.current = true
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${keyRef.current}`
    script.async = true
    script.defer = true
    script.addEventListener(
      'load',
      () => {
        window.grecaptcha.ready(() => {
          setReady(true)
        })
      },
      { once: true },
    )
    document.body.appendChild(script)
  }, [])

  // load script on intersection
  useEffect(() => {
    if (window.grecaptcha) return
    if (!formRef.current) return

    const handler = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]
      if (entry.intersectionRatio === 1) {
        loadScript()
        observer.current?.disconnect()
      }
    }
    observer.current = new IntersectionObserver(handler, {
      root: null,
      rootMargin: '500px',
      threshold: 1,
    })
    observer.current.observe(formRef.current)
    return () => {
      observer.current?.disconnect()
    }
  }, [loadScript])

  /**
   * Append reCAPTCHA token and submit form
   * 
   * ```tsx
   * <Form
   *   method="POST"
   *   ref={recaptcha.formRef}
       onSubmit={recaptcha.appendTokendAndSubmit}
   * />
   * ```
   */
  const appendTokendAndSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      const formEl = e.currentTarget || e.target
      const formData = new FormData(formEl)

      setLoading(true)
      e.preventDefault()

      const token = await window.grecaptcha.execute(keyRef.current, {
        action: 'homepage',
      })
      formData.append('token', token)

      submit(formData, { method: 'POST' })
      didSubmit.current = true
    },
    [submit],
  )

  /**
   * Reset form and state
   */
  const reset = useCallback(async () => {
    formRef.current?.reset()
    setLoading(false)
    setReady(true)
  }, [])

  // load script on mount
  /*
  useEffect(() => {
    // recaptcha is already initializing
    if (isInitializing.current) return
    isInitializing.current = true

    // recaptcha script is already loaded, trigger reset
    if (window.grecaptcha) {
      reset()
    } else {
      loadScript()
    }
  }, [reset, loadScript])
  */

  // reset recaptcha after submit
  useEffect(() => {
    if (navigation.state !== 'submitting' && didSubmit.current) {
      didSubmit.current = false
      reset()
    }
  }, [navigation.state, reset])

  // show/hide recaptcha badge on mount/unmount
  useEffect(() => {
    const badge = document.querySelector('.grecaptcha-badge')
    if (badge instanceof HTMLElement) {
      badge.style.display = 'block'
    }
    return () => {
      const badge = document.querySelector('.grecaptcha-badge')
      if (badge instanceof HTMLElement) {
        badge.style.display = 'none'
      }
    }
  }, [])

  return { formRef, isReady, isLoading, isBusy, appendTokendAndSubmit, reset }
}
