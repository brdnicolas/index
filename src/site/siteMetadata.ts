import type { Metadata, Viewport } from 'next'

// Metadata shared by every page of the site (both root layouts).

const DEFAULT_TITLE = "Nicolas Brouard — I'm just a Software Engineer"
const DESCRIPTION =
  'Nicolas Brouard, software engineer in Paris at Shotgun and web development teacher. React, React Native, Next.js and a soft spot for tiny details.'

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://brdnicolas.com'),
  // pages set a short title, the template adds the name
  title: { default: DEFAULT_TITLE, template: '%s — Nicolas Brouard' },
  description: DESCRIPTION,
  applicationName: 'Nicolas Brouard',
  authors: [{ name: 'Nicolas Brouard', url: 'https://brdnicolas.com' }],
  creator: 'Nicolas Brouard',
  publisher: 'Nicolas Brouard',
  keywords: [
    'Nicolas Brouard',
    'brdnicolas',
    'software engineer',
    'développeur React',
    'front-end engineer Paris',
    'React Native',
    'Next.js',
    'TypeScript',
    'portfolio'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 }
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: 'Software engineer in Paris, React & React Native. Come for the shader, stay for the goats.',
    url: '/',
    siteName: 'Nicolas Brouard',
    images: [{ url: '/seo/preview.png', width: 4096, height: 2150, alt: 'Nicolas Brouard — Portfolio' }],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@_brdnicolas',
    creator: '@_brdnicolas',
    title: DEFAULT_TITLE,
    description: 'Software engineer in Paris, React & React Native. Come for the shader, stay for the goats.',
    images: ['/seo/preview.png']
  },
  icons: {
    icon: [
      { url: '/seo/16.png', sizes: '16x16', type: 'image/png' },
      { url: '/seo/32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: '/seo/180.png'
  },
  formatDetection: { telephone: false, email: false, address: false }
}

export const siteViewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark'
}
