import { AboutMe } from '@/pages/landing/sections/aboutMe/AboutMe'
import { AwardsList } from '@/pages/landing/sections/awardsList/AwardsList'
import { Introduction } from '@/pages/landing/sections/introduction/Introduction'
import { Marquee } from '@/pages/landing/sections/marquee/Marquee'
import { Presentation } from '@/pages/landing/sections/presentation/Presentation'
import { Projects } from '@/pages/landing/sections/projects/Projects'

export default function Home() {
  return (
    <main className="bg-black">
      <Presentation />
      <Introduction />
      <AboutMe />
      <Marquee />
      <Projects />
      <AwardsList />
    </main>
  )
}
