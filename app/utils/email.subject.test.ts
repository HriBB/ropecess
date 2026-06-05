import { describe, it, expect } from 'vitest'
import { buildContactSubject, buildSpacenetSubject } from './email.subject'

describe('buildContactSubject', () => {
  it('returns base subject when preview is false', () => {
    expect(buildContactSubject('Alice', false)).toBe(
      'New contact inquiry from Alice',
    )
  })

  it('prefixes with [Design preview] when preview is true', () => {
    expect(buildContactSubject('Alice', true)).toBe(
      '[Design preview] New contact inquiry from Alice',
    )
  })

  it('handles names with special characters', () => {
    expect(buildContactSubject('Bojan Hribernik', false)).toBe(
      'New contact inquiry from Bojan Hribernik',
    )
    expect(buildContactSubject('Bojan Hribernik', true)).toBe(
      '[Design preview] New contact inquiry from Bojan Hribernik',
    )
  })
})

describe('buildSpacenetSubject', () => {
  it('returns base subject when preview is false', () => {
    expect(buildSpacenetSubject('Bob', false)).toBe(
      'New Spacenet inquiry from Bob',
    )
  })

  it('prefixes with [Design preview] when preview is true', () => {
    expect(buildSpacenetSubject('Bob', true)).toBe(
      '[Design preview] New Spacenet inquiry from Bob',
    )
  })

  it('unflagged subject matches production subject exactly', () => {
    const name = 'TestUser'
    expect(buildSpacenetSubject(name, false)).toBe(
      `New Spacenet inquiry from ${name}`,
    )
  })
})
