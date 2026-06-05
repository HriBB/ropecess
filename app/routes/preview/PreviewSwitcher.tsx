import { useCallback, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { VARIANT_KEYS, VARIANT_NAMES } from './config'
import type { VariantKey } from './config'

type Props = {
  token: string
  variant: VariantKey
  locale: 'en' | 'sl'
}

export function PreviewSwitcher({ token, variant }: Props) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const go = useCallback(
    (dir: 1 | -1) => {
      const keys = [...VARIANT_KEYS]
      const i = keys.indexOf(variant)
      const next = keys[(i + dir + keys.length) % keys.length]
      // Keep the current page + locale, swap only the variant segment.
      const prefix = `/p/${token}/${variant}`
      const rest = pathname.startsWith(prefix)
        ? pathname.slice(prefix.length)
        : '/'
      navigate(`/p/${token}/${next}${rest || '/'}`, { replace: true })
    },
    [variant, token, pathname, navigate],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t?.closest('input, textarea, select, [contenteditable]')) return
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  return (
    <div className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-neutral-900/90 px-2 py-1.5 font-mono text-xs text-white shadow-2xl backdrop-blur-md">
      <Link
        to={`/p/${token}/`}
        prefetch="intent"
        className="flex h-7 items-center rounded-full px-3 hover:bg-white/15"
      >
        ☰
      </Link>
      <button
        type="button"
        aria-label="Previous variant"
        onClick={() => go(-1)}
        className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/15"
      >
        ←
      </button>
      <span className="min-w-44 select-none px-2 text-center uppercase tracking-wider">
        {variant.toUpperCase()} — {VARIANT_NAMES[variant]}
      </span>
      <button
        type="button"
        aria-label="Next variant"
        onClick={() => go(1)}
        className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/15"
      >
        →
      </button>
    </div>
  )
}
