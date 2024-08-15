'use client'
import { SectionLayout } from '@/components/SectionLayout'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const Presentation = () => {
  const emojiRef = useRef(null)

  useEffect(() => {
    gsap.to(emojiRef.current, {
      rotation: 20, // L'angle de rotation en degrés
      duration: 1, // Durée d'un aller-retour
      ease: 'power1.inOut', // Type d'effet pour lisser l'animation
      repeat: -1,
      repeatDelay: 5,
      keyframes: [
        { rotation: -20, duration: 1 }, // Va de 0 à -20 degrés
        { rotation: 0, duration: 1 }, // Va de 0 à -20 degrés
        { rotation: 20, duration: 1 }, // Puis de -20 à 20 degrés
        { rotation: 0, duration: 1 } // Enfin, de 20 degrés à 0
      ]
    })
  }, [])

  return (
    <SectionLayout className="flex flex-col items-center justify-center h-screen">
      <h1 className="flex items-center text-6 gap-1 text-dark-300 font-manrope font-medium">
        Hi! <img src="/emoji/victory.png" ref={emojiRef} className="h-6" /> I'm Nicolas Brouard
      </h1>
      <h2 className="text-12 tablet:text-[92px] font-bold text-center">
        I'm just a <br />
        React Engineer
      </h2>
      <div className="flex items-center gap-2 font-manrope font-medium">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
        </span>
        <div className="group h-[16px] overflow-y-hidden">
          <div className="-translate-y-1 group-hover:-translate-y-7 transition-all duration-500">
            <h3 className="text-dark-300 text-4 w-fit">Available for freelance projects</h3>
            <p className="text-dark-300 text-4">
              ↪ {''}
              <a href="mailto:brdnicolas.pro@gmail.com" className="hover:underline">
                brdnicolas.pro@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}
