import type { Metadata } from 'next'
import { LINKS } from '../data/content'

// Everything search engines and link previews need, in one place.

export const SITE_URL = 'https://brdnicolas.com'
export const SITE_NAME = 'Nicolas Brouard'
export const absolute = (path: string) => new URL(path, SITE_URL).toString()

const PHOTO = absolute('/_next/image?url=%2Fpictures%2Fme_b_w.jpg&w=640&q=80')

// ---------- schema.org

export const PERSON = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Nicolas Brouard',
  alternateName: 'brdnicolas',
  url: SITE_URL,
  image: PHOTO,
  jobTitle: 'Software Engineer',
  description:
    'Software engineer based in Paris, specialised in React, React Native and Next.js. Also teaches web development.',
  worksFor: { '@type': 'Organization', name: 'Shotgun', url: 'https://shotgun.live' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'ETNA', url: 'https://etna.io' },
  address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
  knowsAbout: [
    'React',
    'React Native',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Front-end development',
    'Design systems'
  ],
  sameAs: [LINKS.linkedin, LINKS.x, LINKS.devto, LINKS.malt]
}

export const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#person` }
}

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absolute(item.path)
  }))
})

export const graph = (...nodes: Record<string, unknown>[]) => ({ '@context': 'https://schema.org', '@graph': nodes })

// ---------- metadata of the CDA toolbox (French pages)

export const CDA_NAME = 'La toolbox CDA'

export const cdaMetadata = ({
  title,
  description,
  path
}: {
  title: string
  description: string
  path: string
}): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE_NAME,
    url: path,
    title,
    description
  },
  twitter: { card: 'summary_large_image', title, description }
})
