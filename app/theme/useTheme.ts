import { useNavigation } from '@remix-run/react'
import { useRootData } from '~/utils/data'
import { Theme } from './theme'

export const useOptimistic = <T>(key: string) => {
  const { formData } = useNavigation()
  return formData?.has(key) ? (formData.get(key) as T) : null
}

export const useTheme = (): Theme => {
  const data = useRootData()
  const optimistic = useOptimistic<Theme>('theme')
  return optimistic || data?.theme || Theme.SYSTEM
}
