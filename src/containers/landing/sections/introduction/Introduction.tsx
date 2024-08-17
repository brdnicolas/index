'use client'
import { SectionLayout } from '@/components/SectionLayout'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect, useRef } from 'react'

export const Introduction = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = document.getElementById('introduction')
      if (container) {
        gsap.registerPlugin(ScrollTrigger)

        gsap.fromTo(
          '#introduction_letter',
          {
            opacity: 0
          },
          {
            opacity: 1,
            stagger: 0.05,
            delay: 1,
            scrollTrigger: {
              trigger: '#introduction',
              start: 'top bottom',
              end: 'bottom+=50 bottom',
              scrub: true
            }
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div id="introduction" ref={containerRef}>
      <SectionLayout className="-mt-17 pb-[50px] tablet:pb-[224px] flex flex-row flex-wrap gap-4">
        {'Self-taught since my youngest age, I love learning new things to improve my skills. Very curious by nature, I love the world of the web and new technologies, what I like most is the art and the precision behind each design. With all my skills and knowledge, I will have the pleasure to devote myself fully to the development of your ideas in order to make them great projects.'
          .split(' ')
          .map((word, index) => (
            <div key={`${word}-${index}`} className="text-8 tablet:text-10 text-white">
              {word.split('').map((letter, index) => (
                <span key={`${letter}-${index}`} id="introduction_letter">
                  {letter}
                </span>
              ))}
            </div>
          ))}
      </SectionLayout>
    </div>
  )
}
