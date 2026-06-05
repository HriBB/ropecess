import { useMatches } from 'react-router'

import type { Route } from '../+types/root'

type RootLoaderData = Route.ComponentProps['loaderData']

export const useRootData = () =>
  (useMatches()?.[0]?.data || {}) as RootLoaderData
