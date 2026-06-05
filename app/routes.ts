import type { RouteConfig } from '@react-router/dev/routes'
import { index, layout, route } from '@react-router/dev/routes'
import { buildPreviewRoutes } from './routes/preview/config'

const r = {
  home: 'routes/home.tsx',
  about: 'routes/about.tsx',
  contact: 'routes/contact.tsx',
  services: 'routes/services.tsx',
  spacenet: 'routes/spacenet.tsx',
  heightCleaning: 'routes/professional-height-cleaning.tsx',
}

export const routes: RouteConfig = [
  // Production routes — wrapped in layout that renders Header + Footer
  layout('routes/production-layout.tsx', [
    // english
    index(r.home, { id: 'home-en' }),
    route('/about', r.about, { id: 'about-en' }),
    route('/contact', r.contact, { id: 'contact-en' }),
    route('/services', r.services, { id: 'services-en' }),
    route('/spacenet', r.spacenet, { id: 'spacenet-en' }),
    route('/professional-height-cleaning', r.heightCleaning, {
      id: 'height-cleaning-en',
    }),

    // slovenian
    route('/sl', r.home, { id: 'home-sl' }),
    route('/sl/about', r.about, { id: 'about-sl' }),
    route('/sl/contact', r.contact, { id: 'contact-sl' }),
    route('/sl/services', r.services, { id: 'services-sl' }),
    route('/sl/spacenet', r.spacenet, { id: 'spacenet-sl' }),
    route('/sl/professional-height-cleaning', r.heightCleaning, {
      id: 'height-cleaning-sl',
    }),
  ]),

  // Design Preview — token-gated, bare (no production Header/Footer)
  // PREVIEW_TOKEN is read at build time; no routes registered when unset.
  ...buildPreviewRoutes(process.env.PREVIEW_TOKEN),

  // other
  route('/theme', 'utils/theme/route.ts'),
  route('/robots.txt', 'utils/robots.ts'),
]

export default routes
