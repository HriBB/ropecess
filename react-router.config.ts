import type { Config } from '@react-router/dev/config'

export default {
  // appDirectory: "app",
  // buildDirectory: "build",
  ssr: true,
  // prerender: ["/", "/about"],
  future: {
    v8_middleware: true,
    v8_passThroughRequests: true,
    v8_splitRouteModules: true,
    v8_trailingSlashAwareDataRequests: true,
    v8_viteEnvironmentApi: false,
  },
} satisfies Config
