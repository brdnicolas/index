import Loader from '@/components/atoms/Loader'
import { SEOHead } from '@/components/atoms/SEOHead'
import { AwardsList } from '@/containers/landing/sections/awardsList/AwardsList'
import { Introduction } from '@/containers/landing/sections/introduction/Introduction'
import { Marquee } from '@/containers/landing/sections/marquee/Marquee'
import { Presentation } from '@/containers/landing/sections/presentation/Presentation'
import { Projects } from '@/containers/landing/sections/projects/Projects'
import { WhoAmI } from '@/containers/landing/sections/whoAmI/WhoAmI'
import { WorkedWith } from '@/containers/landing/sections/workedWith/WorkedWith'
import { getTheLatestMinimalPost } from '@/services/contentful/posts/post'

export default function Home() {
  return (
    <>
      <SEOHead
        title={`Nicolas Brouard - React Engineer | Innovative Web Project Creation`}
        description={`Nicolas Brouard, a creative frontend developer with over 4 years of freelance experience. Let's turn your ideas into exceptional websites.`}
        previewUrl="/seo/preview.png"
        url={`https://brdnicolas.com/`}
      />
      <Loader />
      <Presentation />
      <WorkedWith />
      <Introduction />
      <WhoAmI />
      <Marquee />
      <Projects />
      <AwardsList />
    </>
  )
}
