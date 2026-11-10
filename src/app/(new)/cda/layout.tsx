import type { Metadata } from 'next'

// Share previews of the CDA toolbox: its own description instead of the portfolio's one.
const description =
  'Préparer le titre pro Concepteur Développeur d’Applications : déroulé de l’épreuve, plan de la présentation, questions du jury et anti-sèche MERISE & UML.'

export const metadata: Metadata = {
  openGraph: {
    title: 'La toolbox CDA',
    description,
    url: 'https://brdnicolas.com/cda',
    siteName: 'Nicolas Brouard',
    images: [{ url: '/seo/preview.png', width: 1200, height: 630, alt: 'La toolbox CDA' }],
    locale: 'fr_FR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La toolbox CDA',
    description,
    images: ['/seo/preview.png']
  }
}

export default function CdaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
