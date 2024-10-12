import { useMatches } from 'react-router'

import type * as Root from '../+types.root'

export const useRootData = () => {
  const m = useMatches()
  return m.find((match) => match.id === 'root')?.data as Root.LoaderData
}
