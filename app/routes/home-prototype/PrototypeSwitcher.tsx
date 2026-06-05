/**
 * PROTOTYPE — floating variant switcher. Dev-only, deleted with the prototype.
 */
import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router'

type Props = {
  current: string
  variants: { key: string; name: string }[]
}

export function PrototypeSwitcher({ current, variants }: Props) {
  const [, setSearchParams] = useSearchParams()

  const go = useCallback(
    (dir: 1 | -1) => {
      const keys = variants.map((v) => v.key)
      const i = keys.indexOf(current)
      const next = keys[(i + dir + keys.length) % keys.length]
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev)
          if (next === 'original') p.delete('variant')
          else p.set('variant', next)
          return p
        },
        { replace: true, preventScrollReset: true },
      )
    },
    [current, variants, setSearchParams],
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

  const active = variants.find((v) => v.key === current)

  return (
    <div className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-neutral-900/90 px-2 py-1.5 font-mono text-xs text-white shadow-2xl backdrop-blur-md">
      <button
        type="button"
        aria-label="Previous variant"
        onClick={() => go(-1)}
        className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/15"
      >
        ←
      </button>
      <span className="min-w-44 select-none px-2 text-center uppercase tracking-wider">
        {current === 'original'
          ? 'Original'
          : `${current.toUpperCase()} — ${active?.name}`}
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
