import type { Metadata } from 'next'
import { Hero } from '@/site/sections/Hero'
import { Collabs } from '@/site/sections/Collabs'
import { About } from '@/site/sections/About'
import { Marquee } from '@/site/sections/Marquee'
import { Projects } from '@/site/sections/Projects'
import { Awards } from '@/site/sections/Awards'
import { Contact } from '@/site/sections/Contact'
import { JsonLd } from '@/site/components/JsonLd'
import { PERSON, SITE_URL, WEBSITE, graph } from '@/site/lib/seo'

export const metadata: Metadata = {
  alternates: { canonical: '/' }
}

const structuredData = graph(PERSON, WEBSITE, {
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profile`,
  url: SITE_URL,
  name: "Nicolas Brouard — I'm just a Software Engineer",
  inLanguage: 'en',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  mainEntity: { '@id': `${SITE_URL}/#person` },
  // the image Google should prefer as the result thumbnail (same as the share image)
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/seo/preview.png`,
    width: 1200,
    height: 630
  },
  image: `${SITE_URL}/seo/preview.png`
})

export default function Home() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <Hero />
      <Collabs />
      <About />
      <Marquee />
      <Projects />
      <Awards />
      <Contact />
    </main>
  )
}
