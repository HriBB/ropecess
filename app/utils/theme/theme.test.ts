import { describe, it, expect } from 'vitest'
import { validateTheme } from './theme.server'

describe('theme', () => {
  it('should validate the theme', () => {
    expect(validateTheme('light')).toBe(true)
    expect(validateTheme('dark')).toBe(true)
    expect(validateTheme('system')).toBe(true)
    expect(validateTheme('invalid')).toBe(false)
  })
})
