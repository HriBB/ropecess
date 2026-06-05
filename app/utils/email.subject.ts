export function buildContactSubject(name: string, preview: boolean): string {
  const base = `New contact inquiry from ${name}`
  return preview ? `[Design preview] ${base}` : base
}

export function buildSpacenetSubject(name: string, preview: boolean): string {
  const base = `New Spacenet inquiry from ${name}`
  return preview ? `[Design preview] ${base}` : base
}
