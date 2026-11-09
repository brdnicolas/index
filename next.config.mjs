/** @type {import('next').NextConfig} */

// Old project URLs (brdnicolas.com/<slug>) now live under the hand-made version.
const LEGACY_PROJECT_SLUGS = [
  'ornikar',
  'design-systems',
  'free',
  'iliad-group',
  'pepiswap',
  'bellintone',
  'mentor-goal'
]

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/cda/schemas',
        destination: '/cda/schemas.html'
      }
    ]
  },
  async redirects() {
    return [
      // old project URLs (brdnicolas.com/<slug>) → the hand-made version
      ...LEGACY_PROJECT_SLUGS.map((slug) => ({
        source: `/${slug}`,
        destination: `/gluten-free/${slug}`,
        permanent: true
      })),
      // the hand-made version used to live at /fuckAI
      { source: '/fuckAI', destination: '/gluten-free', permanent: true },
      { source: '/fuckAI/:slug', destination: '/gluten-free/:slug', permanent: true }
    ]
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.ctfassets.net' }]
  }
}

export default nextConfig
