export const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER
export const BASIC_AUTH_PASS = process.env.BASIC_AUTH_PASS

const isAuthEnabled = BASIC_AUTH_USER && BASIC_AUTH_PASS

export function isAuthorized(request: Request) {
  if (!isAuthEnabled) {
    return true
  }

  const header = request.headers.get('Authorization')

  if (!header) return false

  const base64 = header.replace('Basic ', '')
  const [username, password] = Buffer.from(base64, 'base64')
    .toString()
    .split(':')

  return username === BASIC_AUTH_USER && password === BASIC_AUTH_PASS
}

export const authHeaders = isAuthEnabled
  ? { 'WWW-Authenticate': 'Basic' }
  : null
