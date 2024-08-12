import { Header } from '@/components/Header'
import { AboutMe } from '@/sections/aboutMe/AboutMe'
import { Introduction } from '@/sections/introduction/Introduction'
import { Landing } from '@/sections/landing/Landing'
import { Marquee } from '@/sections/marquee/Marquee'
import { Projects } from '@/sections/projects/Projects'

export default function Home() {
  return (
    <main className="bg-black">
      <Header />
      <Landing />
      <Introduction />
      <AboutMe />
      <Marquee />
      <Projects />
      <AboutMe />
    </main>
  )
}
