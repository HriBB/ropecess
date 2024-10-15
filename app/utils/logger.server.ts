import {
  configure,
  getConsoleSink,
  getLogger,
  LogLevel,
} from '@logtape/logtape'

const level = (process.env.LOG_LEVEL || 'info') as LogLevel

await configure({
  sinks: { console: getConsoleSink() },
  filters: {},
  loggers: [
    { category: 'ropecess', level, sinks: ['console'] },
    { category: 'logtape', level: 'warning', sinks: ['console'] },
  ],
  reset: true,
})

export const logger = getLogger(['ropecess'])

export { getLogger }
