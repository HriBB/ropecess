import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigation, useSubmit } from 'react-router'
import type { LinksFunction } from 'react-router'

/**
 * Preconnect to Google reCAPTCHA
 *
 * @see https://developers.google.com/recaptcha/docs/loading#using_resource_hints
 */
export const prefetchRecaptchaLinks: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://www.google.com' },
    {
      rel: 'preconnect',
      href: 'https://www.gstatic.com',
      crossOrigin: 'anonymous',
    },
  ]
}

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
  const isInitializing = useRef(false)
  const [isReady, setReady] = useState(false)
  const navigation = useNavigation()
  const submit = useSubmit()

  const reset = useCallback(async () => {
    window.grecaptcha.reset()
    setReady(true)
  }, [])

  useEffect(() => {
    // recaptcha is already initializing
    if (isInitializing.current) return
    isInitializing.current = true

    // recaptcha script is already loaded, trigger reset
    if (window.grecaptcha) {
      reset()
      return
    }

    // create script
    const onScriptLoad = () => {
      window.grecaptcha.ready(() => {
        setReady(true)
        /*
        tokenRef.current = await window.grecaptcha.execute(keyRef.current, {
          action: 'homepage',
        })
        */
      })
    }
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${keyRef.current}`
    script.addEventListener('load', onScriptLoad, { once: true })
    document.body.appendChild(script)
  }, [reset])

  // reset recaptcha after submit
  const didSubmit = useRef(false)

  const appendTokendAndSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const token = await window.grecaptcha.execute(keyRef.current, {
        action: 'homepage',
      })
      const formData = new FormData(e.currentTarget)
      formData.append('token', token)
      submit(formData, { method: 'POST' })
      didSubmit.current = true
    },
    [submit],
  )

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

  return { isReady, appendTokendAndSubmit, reset }
}
