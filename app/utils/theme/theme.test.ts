import { describe, it, expect } from 'vitest'
import { isValidTheme } from './theme'

describe('theme', () => {
  it('should validate the theme', () => {
    expect(isValidTheme('light')).toBe(true)
    expect(isValidTheme('dark')).toBe(true)
    expect(isValidTheme('system')).toBe(true)
    expect(isValidTheme('invalid')).toBe(false)
  })
})
