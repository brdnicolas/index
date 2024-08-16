'use client'
import { Tag } from '@/containers/whoAmI/components/Tag'
import { useWindowSize } from '@/shared/hooks/useWindowSize'
import { useMemo } from 'react'

interface AwardProps {
  delivredBy: string
  title: string
  year: number
}

export const Award = ({ delivredBy, title, year }: AwardProps) => {
  const size = useWindowSize()
  const isMobile = useMemo(() => size.width <= 768, [size])
  const splitedTitle = isMobile
    ? [title.replaceAll('*', '')]
    : title.split(/(\*\*[^*]+\*\*)/).map((part) => part.replace(/\*\*/g, ''))

  return (
    <div className="relative z-10 flex flex-col tablet:flex-row flex-wrap rounded-4 tablet:rounded-full w-full tablet:items-center bg-[#141414]/40 py-3 tablet:py-6 px-3 tablet:px-8 border-[1px] border-[#2E2A2A] backdrop-blur-md	">
      {isMobile ? (
        <div className="w-fit mx-auto ">
          <Tag className="text-3">{delivredBy}</Tag>
        </div>
      ) : (
        <p className="uppercase tablet:text-4 text-3 w-[50px] tablet:w-[200px]">{delivredBy}</p>
      )}
      <div className="flex flex-wrap items-center gap-2 tablet:mt-0 mt-5 text-center tablet:text-left">
        {splitedTitle.map((word, index) => {
          if (word) {
            return (
              <p
                key={word}
                className={`${index === 1 ? 'special-award-word tablet:text-5 whitespace-nowrap text-3 font-bold' : 'w-full tablet:w-fit tablet:text-4 text-3 font-semibold'} uppercase`}
              >
                {word}
              </p>
            )
          }
        })}
      </div>
      {isMobile ? <div className="w-[50px] mx-auto mt-4 h-[1px] bg-dark-400 " /> : null}
      <p className="uppercase tablet:text-4 text-3 tablet:ml-auto text-center tablet:text-left mt-3 tablet:mt-0">
        {year}
      </p>
    </div>
  )
}
