import { Hero } from '@/site/sections/Hero'
import { Collabs } from '@/site/sections/Collabs'
import { Manifesto } from '@/site/sections/Manifesto'
import { About } from '@/site/sections/About'
import { Marquee } from '@/site/sections/Marquee'
import { Projects } from '@/site/sections/Projects'
import { Awards } from '@/site/sections/Awards'
import { Contact } from '@/site/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Collabs />
      <Manifesto />
      <About />
      <Marquee />
      <Projects />
      <Awards />
      <Contact />
    </main>
  )
}
