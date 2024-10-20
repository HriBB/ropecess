import {
  configure,
  getConsoleSink,
  getLogger as getBaseLogger,
  LogLevel,
} from '@logtape/logtape'

import { requireEnv } from '~/utils/env.server'

export const LOG_NAME = requireEnv('LOG_NAME') || 'app'
export const LOG_LEVEL = requireEnv('LOG_LEVEL') || 'info'

await configure({
  sinks: { console: getConsoleSink() },
  filters: {},
  loggers: [
    { category: LOG_NAME, level: LOG_LEVEL as LogLevel, sinks: ['console'] },
    { category: 'logtape', level: 'warning', sinks: ['console'] },
  ],
  reset: true,
})

export function getLogger(category: string | string[]) {
  return getBaseLogger([
    LOG_NAME,
    ...(typeof category === 'string' ? [category] : category),
  ])
}
