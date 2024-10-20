import { useRootData } from '~/utils/data'

export function AnalyticsScript() {
  const { plausible } = useRootData()
  return (
    plausible && (
      <script src={plausible.src} data-domain={plausible.domain} async defer />
    )
  )
}
