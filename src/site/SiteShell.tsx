import Script from 'next/script'
import { SmoothScroll } from './components/SmoothScroll'
import { Cursor } from './components/Cursor'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { EasterEggs } from './components/EasterEggs'
import { Toaster } from './components/Toast'
import { Intro } from './components/Intro'
import { RouteListener } from './components/RouteListener'
import { AchievementPopup } from './components/AchievementPopup'

// Everything around the pages (analytics, header, footer, cursor…), shared by both root layouts.
export const SiteShell = ({ children }: { children: React.ReactNode }) => (
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

    {/* skips itself where there is no curtain (CDA toolbox), but still tells the header the page is ready */}
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
)
