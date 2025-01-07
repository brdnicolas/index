'use client'
import { SectionLayout } from '@/components/SectionLayout'
import './workedWith.scss'
import useIsMobile from '@/shared/hooks/useIsMobile'

export const WorkedWith = () => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <></>
  }

  return (
    <SectionLayout isFullWidth className="flex flex-col items-center justify-center -mt-[50px] mb-[200px]">
      <p className="text-gray-600 text-[14px] uppercase font-semibold mb-5 text-center">
        A Journey Shaped by These Collaborations
      </p>
      <div className="flex flex-col tablet:flex-row gap-12 tablet:gap-20 items-center mt-3 mb-13">
        <img className="h-5" src="/logos/free.svg" alt="free company" />
        <img className="h-4" src="/logos/ornikar.svg" alt="ornikar company" />
        <img className="h-5" src="/logos/etna.png" alt="etna school" />
        <img className="h-3" src="/logos/big-mamma.svg" alt="big mamma company" />
      </div>
      <div className="worked-with-ellipse" />
    </SectionLayout>
  )
}
