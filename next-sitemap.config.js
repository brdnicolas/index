/** @type {import('next-sitemap').IConfig} */

// Sitemap + robots.txt, generated after `next build` (postbuild).
const SITE_URL = process.env.SITE_URL || 'https://brdnicolas.com'

// how important each section is, and how often it changes
const rank = (path) => {
  if (path === '/') return { priority: 1, changefreq: 'monthly' }
  if (path === '/cda') return { priority: 0.9, changefreq: 'monthly' }
  if (path.startsWith('/cda/')) return { priority: 0.8, changefreq: 'monthly' }
  if (path.startsWith('/work/')) return { priority: 0.8, changefreq: 'yearly' }
  return { priority: 0.5, changefreq: 'yearly' }
}

module.exports = {
  siteUrl: SITE_URL,
  // same build folder as next.config.mjs (NEXT_DIST_DIR lets a second build run beside the main one)
  sourceDir: process.env.NEXT_DIST_DIR || '.next',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  // technical files are not pages
  exclude: ['/manifest.json', '/robots.txt', '/sitemap.xml', '/*opengraph-image*', '/icon*'],
  transform: async (config, path) => ({
    loc: path,
    lastmod: new Date().toISOString(),
    ...rank(path)
  }),
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }]
  }
}
