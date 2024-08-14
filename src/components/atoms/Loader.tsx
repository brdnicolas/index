'use client'
import React, { useEffect, useState, ReactNode } from 'react'
import gsap from 'gsap'

interface LoaderProps {
  children: ReactNode
}

const Loader: React.FC<LoaderProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('img')
    const imagePromises: Promise<void>[] = Array.from(images).map((image) => {
      return new Promise((resolve) => {
        if (image.complete) {
          resolve()
        }
      })
    })

    const MINIMUM_LOADING_TIME = 2000 // 2 seconds
    const startTime = Date.now()

    Promise.all(imagePromises).then(() => {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, MINIMUM_LOADING_TIME + elapsedTime)

      setTimeout(() => {
        setIsLoaded(true)
        gsap.to('.loader', {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            const loaderElement = document.querySelector('.loader') as HTMLElement
            if (loaderElement) {
              loaderElement.style.display = 'none'
            }
          }
        })
      }, remainingTime)
    })

    // Optionnel : Animer la barre de progression
    gsap.to('.loader-progress', {
      width: '100%',
      duration: MINIMUM_LOADING_TIME / 1000,
      ease: 'linear'
    })
  }, [])

  return (
    <>
      <div className="loader">
        <div className="loader-progress h-[2px] w-screen bg-red-50" />
        <p>Loading...</p>
      </div>
      {isLoaded && children}
    </>
  )
}

export default Loader
