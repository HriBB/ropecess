import { useMatches } from 'react-router'

import type * as Root from '../+types.root'

export const useRootData = () =>
  (useMatches()?.[0]?.data || {}) as Root.LoaderData
