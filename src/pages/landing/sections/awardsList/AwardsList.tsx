import './awardsList.scss'
import { SectionLayout } from '@/components/SectionLayout'
import { Award } from './components/Award'

export const AwardsList = () => {
  return (
    <div className="relative overflow-x-clip">
      <SectionLayout>
        <img src="/illustrations/medal.svg" className="absolute -left-[150px] -top-[200px] z-10" alt="" />
        <img src="/illustrations/trophy.svg" className="absolute -right-[150px] -bottom-[200px] z-10" alt="" />
        <h2 className="text-20 font-semibold text-center">Awards</h2>
        <p className="mt-8 text-dark-300 text-center">Great achievements are born from great challenges</p>
        <div className="flex flex-col gap-11 items-center mt-[112px]">
          <Award />
          <Award />
          <Award />
          <Award />
          <Award />
          <p className="underline text-5 uppercase underline-offset-4 text-normal cursor-pointer">+3 others</p>
        </div>
      </SectionLayout>
    </div>
  )
}
