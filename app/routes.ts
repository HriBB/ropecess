import type { RouteConfig } from '@react-router/dev/routes'
import { index, route } from '@react-router/dev/routes'

export const routes: RouteConfig = [
  index('routes/home.tsx'),
  route('/about', 'routes/about.tsx'),
  route('/contact', 'routes/contact.tsx'),
  route('/services', 'routes/services.tsx'),
  route('/spacenet', 'routes/spacenet.tsx'),
  route('/theme', 'theme/theme-route.ts'),
  route('/robots.txt', 'routes/[robots.txt].tsx'),
]
