'use client'
import './awardsList.scss'
import { SectionLayout } from '@/components/SectionLayout'
import { Award } from './components/Award'
import { AWARDS } from '@/data/awards'
import { useMemo, useState } from 'react'

const DEFAULT_NUMBER_OF_DISPLAYED_AWARDS = 5

export const AwardsList = () => {
  const [numberOfDisplayedAwards, setNumberOfDisplayedAwards] = useState(DEFAULT_NUMBER_OF_DISPLAYED_AWARDS)
  const shouldShowHideAwards = useMemo(() => numberOfDisplayedAwards === AWARDS.length, [numberOfDisplayedAwards])

  const handleDisplayAll = () => {
    setNumberOfDisplayedAwards(AWARDS.length)
  }

  const handleHideExtraAwards = () => {
    setNumberOfDisplayedAwards(DEFAULT_NUMBER_OF_DISPLAYED_AWARDS)
  }

  return (
    <div className="relative overflow-x-clip mt-[224px]">
      <SectionLayout>
        <img src="/illustrations/medal.svg" className="absolute -left-[150px] -top-[200px] z-10" alt="" />
        <img src="/illustrations/trophy.svg" className="absolute -right-[150px] -bottom-[200px] z-10" alt="" />
        <h2 className="text-20 font-semibold text-center">Awards</h2>
        <p className="mt-8 text-dark-300 text-center font-manrope">Great achievements are born from great challenges</p>
        <div className="flex flex-col gap-4 tablet:gap-11 items-center mt-[56px] tablet:mt-[112px]">
          {AWARDS.slice(0, numberOfDisplayedAwards).map((award) => (
            <Award delivredBy={award.delivredBy} title={award.title} year={award.year} />
          ))}

          {shouldShowHideAwards ? (
            <button
              onClick={handleHideExtraAwards}
              className="underline text-4 underline-offset-4 text-normal cursor-pointer"
            >
              Hide, too much for me
            </button>
          ) : (
            <button
              onClick={handleDisplayAll}
              className="underline text-4 underline-offset-4 text-normal cursor-pointer font-manrope font-medium"
            >
              Wanna see more ?
            </button>
          )}
        </div>
      </SectionLayout>
    </div>
  )
}
