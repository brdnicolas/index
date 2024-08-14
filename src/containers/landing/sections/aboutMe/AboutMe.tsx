'use client'
import { SectionLayout } from '@/components/SectionLayout'
import { LastArticleCard } from './components/LastArticleCard'
import { LetsMeetCard } from './components/LetsMeetCard'
import { SpotifyCard } from './components/SpotifyCard'
import { ResumeCard } from './components/ResumeCard'
import { ParisCard } from './components/ParisCard'
import { ContactCard } from './components/ContactCard'
import './aboutme.scss'

export const AboutMe = () => {
  return (
    <SectionLayout
      hidePaddingX
      isFullWidth
      className="relative w-full min-h-screen z-0 shadow-inner aboutme"
      style={{
        backgroundImage: 'url(/background/container.svg)',
        backgroundSize: 'cover'
      }}
    >
      <div className="relative z-20 backdrop-blur-md py-[120px]">
        <div className="max-w-layout mx-auto">
          <h2 className="text-20 font-semibold text-center">Who am I ?</h2>
          <p className="text-5 text-dark-300 text-balance text-center">
            My mission is to help you build your projects with my versatility and my ability to adapt to different
            situations. Together, let's turn your ideas into great projects!
          </p>
          <div className="grid grid-cols-4 gap-6 mt-[112px]">
            <LastArticleCard />
            <LetsMeetCard />
            <SpotifyCard />
            <ResumeCard />
            <ParisCard />
            <ContactCard />
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}
