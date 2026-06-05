# Deploy to Netlify

The site deploys to Netlify (via `netlify.toml` and the `@netlify/vite-plugin-react-router` adapter). It was previously self-hosted on Coolify behind Traefik, which was abandoned after Coolify was compromised by a 0-day exploit — we don't want to operate our own hosting for a low-traffic marketing site. Netlify's managed platform removes that security/maintenance burden; the cost is platform lock-in via the Netlify vite adapter, acceptable for a site this size.
