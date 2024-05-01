import { useNavigation } from '@remix-run/react'
import { useRootData } from '~/utils/data'
import { Theme } from './theme'

export const useTheme = (): Theme => {
  const data = useRootData()
  const { formData } = useNavigation()
  const optimistic = (formData?.get('theme') as Theme) ?? null
  return optimistic || data?.theme || Theme.SYSTEM
}
