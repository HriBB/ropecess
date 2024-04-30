import { SerializeFrom, LoaderFunction } from '@remix-run/node'
import { useMatches } from '@remix-run/react'

export type Loader<P> = P extends { loader: LoaderFunction }
  ? SerializeFrom<P['loader']>
  : never

export type RootLoader = Loader<typeof import('~/root')>

export const useRootData = () => {
  const m = useMatches()
  return m.find((match) => match.id === 'root')?.data as RootLoader
}
