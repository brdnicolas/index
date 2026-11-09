import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import '@/site/styles/global.scss'
import { SmoothScroll } from '@/site/components/SmoothScroll'
import { Cursor } from '@/site/components/Cursor'
import { Header } from '@/site/components/Header'
import { Footer } from '@/site/components/Footer'
import { EasterEggs } from '@/site/components/EasterEggs'
import { Toaster } from '@/site/components/Toast'
import { Intro } from '@/site/components/Intro'
import { RouteListener } from '@/site/components/RouteListener'
import { AchievementPopup } from '@/site/components/AchievementPopup'

const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://brdnicolas.com'),
  title: "Nicolas Brouard — I'm just a Software Engineer",
  description:
    'Nicolas Brouard, software engineer at Shotgun and teacher at ETNA. React, React Native, Next.js and a soft spot for tiny details.',
  alternates: { canonical: '/' },
  openGraph: {
    title: "Nicolas Brouard — I'm just a Software Engineer",
    description: 'Software engineer at Shotgun, teacher at ETNA. Come for the shader, stay for the goats.',
    url: 'https://brdnicolas.com',
    siteName: 'Nicolas Brouard',
    images: [{ url: '/seo/preview.png', width: 1200, height: 630, alt: 'Nicolas Brouard - Portfolio' }],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@_brdnicolas',
    creator: '@_brdnicolas',
    images: ['/seo/preview.png']
  },
  icons: {
    icon: [
      { url: '/seo/16.png', sizes: '16x16', type: 'image/png' },
      { url: '/seo/32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: '/seo/180.png'
  },
  manifest: '/manifest.json'
}

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark'
}

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`is-intro ${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-ZCEH1819G3" />
        <Script id="gtag" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZCEH1819G3', { page_path: window.location.pathname });
          `}
        </Script>

        <Intro />
        <SmoothScroll />
        <RouteListener />
        <Cursor />
        <EasterEggs />
        <Toaster />
        <AchievementPopup />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
