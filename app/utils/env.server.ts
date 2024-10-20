export function getEnv<T>(name: string, fallback?: T) {
  const val = process.env[name]
  if (typeof val === 'undefined') {
    return fallback as T
  }
  return String(val)
}

export function requireEnv(name: string) {
  if (typeof process.env[name] === 'undefined') {
    throw new Error(`Missing ${name} ENV variable`)
  }
  return String(process.env[name])
}
