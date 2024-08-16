'use client'
import { SectionLayout } from '@/components/SectionLayout'
import { Quote } from './components/Quote'
import { Me } from './components/Me'
import { Experience } from './components/Experience'
import { Education } from './components/Education'
import { Stacks } from './components/Stacks'
import { MyTopSongs } from './components/MyTopSongs'
import { LetsMeet } from './components/LetsMeet'
import { IAm } from './components/IAm'
import './whoAmI.scss'
import { useEffect } from 'react'
import { Articles } from './components/Articles'

export const WhoAmI = () => {
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

        <div className="grid grid-cols-3 gap-4 items-start mt-10">
          <div id="col1" className="grid gap-4">
            <Quote />
            <Stacks />
            <MyTopSongs />
          </div>
          <div id="col2" className="grid gap-4 items-start">
            <IAm />
            <Me />
            <LetsMeet />
          </div>
          <div id="col3" className="grid gap-4">
            <Experience />
            <Education />
            <Articles />
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}
