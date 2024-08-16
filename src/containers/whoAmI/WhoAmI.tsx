'use client'
import { SectionLayout } from '@/components/SectionLayout'
import './whoAmI.scss'
import { useEffect, useMemo } from 'react'
import { useWindowSize } from '@/shared/hooks/useWindowSize'
import { ThreeColumnsMansonry } from './ThreeColumnsMansonry copy'
import { TwoColumnsMansonry } from './TwoColumnsMansonry'
import { OneColumnsMansonry } from './OneColumnsMansonry copy 2'

export const WhoAmI = () => {
  const size = useWindowSize()
  const isDesktop = useMemo(() => size.width >= 1204 + 16 * 2, [size])
  const isMobile = useMemo(() => size.width <= 768, [size])

  useEffect(() => {
    const cards = document.querySelectorAll('.card')
    const wrapper = document.querySelector('.cards')

    if (!wrapper) {
      return
    }

    const handleMouseMove = (event: any) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        const cardElement = card as HTMLElement
        cardElement.style.setProperty('--xPos', `${x}px`)
        cardElement.style.setProperty('--yPos', `${y}px`)
      })
    }

    wrapper.addEventListener('mousemove', handleMouseMove)

    return () => {
      wrapper.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <SectionLayout
      hidePaddingX
      isFullWidth
      className="cards relative w-full min-h-screen z-0 shadow-inner aboutme font-manrope font-semibold text-5 pb-[112px]"
    >
      <div className="max-w-layout mx-auto">
        <h2 className="text-20 font-semibold text-center font-inter">Who am I</h2>

        {isDesktop ? <ThreeColumnsMansonry /> : isMobile ? <OneColumnsMansonry /> : <TwoColumnsMansonry />}
      </div>
    </SectionLayout>
  )
}

// return (
//   <SectionLayout
//     hidePaddingX
//     isFullWidth
//     className="cards relative w-full min-h-screen z-0 shadow-inner aboutme font-manrope font-semibold text-5 pb-[112px]"
//   >
//     <div className="max-w-layout mx-auto">
//       <h2 className="text-20 font-semibold text-center font-inter">Who am I</h2>

//       <div className="grid grid-cols-1 tablet:scale-90 tablet:grid-cols-3 gap-4 items-start mt-10 px-4 tablet:px-0">
//         <div id="col1" className="flex flex-col tablet:grid gap-4 items-start">
//           <Quote />
//           <Stacks />
//           <MyTopSongs />
//         </div>
//         <div id="col2" className="flex flex-col tablet:grid gap-4 items-start">
//           <IAm />
//           <Me />
//           <LetsMeet />
//         </div>
//         <div id="col3" className="flex flex-col tablet:grid gap-4 items-start">
//           <Experience />
//           <Education />
//           <Articles />
//         </div>
//       </div>
//     </div>
//   </SectionLayout>
// )
