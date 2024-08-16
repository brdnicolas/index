'use client'
import { gsap } from 'gsap'
import { useRef } from 'react'

export const IAm = () => {
  const imageRef = useRef(null)
  const tl = useRef<any>(null)

  const handleMouseEnter = () => {
    // Créer une timeline GSAP pour la rotation en boucle
    tl.current = gsap.timeline({ repeat: -1, yoyo: true }) // yoyo: true pour revenir à l'état initial de manière fluide
    tl.current.to(imageRef.current, {
      rotate: 15,
      duration: 0.5, // La durée d'une montée à 20°
      ease: 'power1.inOut' // Transition fluide entre 0 et 20
    })
  }

  const handleMouseLeave = () => {
    // Stopper l'animation et réinitialiser la rotation
    tl.current?.kill()
    gsap.to(imageRef.current, { rotate: 0, duration: 0.3 })
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="card rounded-6">
      <div className="card-content h-fit bg-[#171717] font-manrope border-[1px] border-[#232323] p-7 overflow-hidden">
        <div className="flex items-center gap-2 justify-center">
          <p className="text-center text-9 font-bold">I am Nicolas</p>
          <img ref={imageRef} src="/icons/waving-hand.png" alt="waving hand" className="h-8 w-8" />
        </div>
        <p className="text-center mt-3 text-4 font-normal">But you can call me Nico</p>
      </div>
    </div>
  )
}
