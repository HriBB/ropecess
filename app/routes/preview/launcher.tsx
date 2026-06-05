import type { MetaFunction } from 'react-router'
import { Link, useLocation } from 'react-router'
import { getPreviewMeta } from './meta'
import { VARIANT_KEYS, VARIANT_NAMES } from './config'

export const meta: MetaFunction = () => getPreviewMeta('Design Preview — Ropecess')

export default function PreviewLauncher() {
  const { pathname } = useLocation()
  // pathname: /p/<token>/
  const token = pathname.split('/').filter(Boolean)[1]

  return (
    <main className="min-h-screen bg-base-200 p-8">
      <div className="mx-auto max-w-2xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest opacity-50">
          Design Preview
        </p>
        <h1 className="mb-8 text-3xl font-semibold">Select a Design Variant</h1>
        <ul className="space-y-3">
          {VARIANT_KEYS.map((key) => (
            <li key={key}>
              <Link
                to={`/p/${token}/${key}/`}
                prefetch="intent"
                className="flex items-center gap-4 rounded-xl border border-base-content/10 bg-base-100 p-4 transition-colors hover:border-base-content/30 hover:bg-base-100"
              >
                <span className="font-mono text-lg font-bold uppercase opacity-40">
                  {key}
                </span>
                <span className="font-medium">{VARIANT_NAMES[key]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
