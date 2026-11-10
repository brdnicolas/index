import type { Metadata, Viewport } from 'next'
import '@/site/styles/global.scss'
import { fontVariables } from '@/site/fonts'
import { SiteShell } from '@/site/SiteShell'
import { siteMetadata, siteViewport } from '@/site/siteMetadata'

export const metadata: Metadata = siteMetadata
export const viewport: Viewport = siteViewport

// The portfolio, in English. (The CDA toolbox has its own French root layout.)
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`is-intro ${fontVariables}`}>
      <SiteShell>{children}</SiteShell>
    </html>
  )
}
