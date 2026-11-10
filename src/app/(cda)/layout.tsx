import type { Metadata, Viewport } from 'next'
import '@/site/styles/global.scss'
import { fontVariables } from '@/site/fonts'
import { SiteShell } from '@/site/SiteShell'
import { siteMetadata, siteViewport } from '@/site/siteMetadata'

export const metadata: Metadata = {
  ...siteMetadata,
  title: { default: 'La toolbox CDA', template: '%s — Nicolas Brouard' },
  openGraph: { ...siteMetadata.openGraph, locale: 'fr_FR' }
}
export const viewport: Viewport = siteViewport

// The CDA toolbox, in French: its own root layout so the whole page is declared `lang="fr"`. No intro curtain.
export default function CdaRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={fontVariables}>
      <SiteShell>{children}</SiteShell>
    </html>
  )
}
