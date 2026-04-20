/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/cda/schemas',
        destination: '/cda/schemas.html'
      }
    ]
  },
  images: {
    domains: ['images.ctfassets.net']
  }
}

export default nextConfig
