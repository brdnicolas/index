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
  // lets a second dev server / build run without touching the main .next folder
  // (e.g. NEXT_DIST_DIR=.next-claude next dev)
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // the CSS is small (~15 KiB): inline it in the HTML instead of blocking the first paint on 4 requests
  experimental: { inlineCss: true },
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
