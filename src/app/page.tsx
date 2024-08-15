import { AboutMe } from '@/conainers/landing/sections/aboutMe/AboutMe'
import { AwardsList } from '@/containers/landing/sections/awardsList/AwardsList'
import { Introduction } from '@/containers/landing/sections/introduction/Introduction'
import { Marquee } from '@/containers/landing/sections/marquee/Marquee'
import { Presentation } from '@/containers/landing/sections/presentation/Presentation'
import { Projects } from '@/containers/landing/sections/projects/Projects'
import { WhoAmI } from '@/containers/whoAmI/WhoAmI'

export default function Home() {
  return (
    <main className="bg-black">
      <Presentation />
      <Introduction />
      <WhoAmI />
      <Marquee />
      <Projects />
      <AwardsList />
    </main>
  )
}
