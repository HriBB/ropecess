import { requireEnv } from './env.server'

export const APP_NAME = requireEnv('APP_NAME')
export const APP_ENV = requireEnv('APP_ENV')
