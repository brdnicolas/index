'use client'
import { useEffect, useRef } from 'react'
import { Tag } from './Tag'
import JSConfetti from 'js-confetti'

const EDUCATIONS = [
  {
    duration: '2019 — 2023',
    title: 'Master Software Architect Application Developer',
    school: 'ETNA',
    honor: 'Major'
  },
  {
    duration: '2016 — 2019',
    title: 'Scientific Baccalaureate',
    school: 'Sully',
    honor: 'Mention Bien'
  }
] as const

export const Education = () => {
  const majorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = document.getElementById('card-canvas') as HTMLCanvasElement

    const element = majorRef.current
    if (!element || !canvas) return

    const jsConfetti = new JSConfetti({ canvas })

    const handleMouseEnter = () => {
      jsConfetti.addConfetti({
        confettiRadius: 5,
        confettiNumber: 50,
        confettiColors: ['#FFFFFF', '#E9DB4E', '#809FCA', '#D58799']
      })
    }

    const handleMouseLeave = () => {
      console.log("Souris sortie de l'élément")
      // Optionnel: tu peux ajouter une action lorsque la souris quitte l'élément
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    // Cleanup pour éviter les fuites de mémoire
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="card rounded-6">
      <div className="relative card-content bg-[#171717] font-manrope border-[1px] border-[#232323] p-7 text-5 overflow-hidden">
        <canvas id="card-canvas" className="z-10 absolute top-0 left-0 w-full h-full" />
        <p>Education</p>
        <div className="mt-4 text-4 w-full flex flex-col gap-6 z-20 relative">
          {EDUCATIONS.map((education) => (
            <div className="flex w-full" key={education.school}>
              <div className="w-1/3 text-[#989898] font-normal text-3">
                <p>{education.duration}</p>
              </div>
              <div className="w-2/3 pl-3">
                <p className="font-semibold">{education.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-normal text-3 text-[#989898]">@{education.school}</p>
                  {education.honor ? (
                    <div ref={education.honor === 'Major' ? majorRef : undefined}>
                      <Tag>{education.honor}</Tag>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
