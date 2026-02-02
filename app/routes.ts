import type { RouteConfig } from '@react-router/dev/routes'
import { index, route } from '@react-router/dev/routes'

export const routes: RouteConfig = [
  // pages
  index('routes/home.tsx'),
  route('/about', 'routes/about.tsx'),
  route('/contact', 'routes/contact.tsx'),
  route('/services', 'routes/services.tsx'),
  route('/spacenet', 'routes/spacenet.tsx'),
  route(
    '/professional-height-cleaning',
    'routes/professional-height-cleaning.tsx',
  ),
  // other
  route('/theme', 'utils/theme/route.ts'),
  route('/robots.txt', 'utils/robots.ts'),
]

export default routes
