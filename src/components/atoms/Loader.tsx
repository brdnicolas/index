'use client'
import { useEffect, useState } from 'react'
import './loader.scss'

const LOADER_TIME = 3000 // Temps total du loader en millisecondes

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [percentage, setPercentage] = useState(0) // État pour le pourcentage

  useEffect(() => {
    const bodyElement = document.querySelector('body')
    bodyElement?.classList.add('loading')

    const intervalTime = LOADER_TIME / 100
    let elapsedTime = 0

    const interval = setInterval(() => {
      elapsedTime += intervalTime
      const newPercentage = Math.min((elapsedTime / (LOADER_TIME - 500)) * 100, 100)
      setPercentage(Math.floor(newPercentage))

      if (elapsedTime >= LOADER_TIME) {
        clearInterval(interval)
      }
    }, intervalTime)

    const scrollDuration = LOADER_TIME - 1000
    const totalHeight = document.body.scrollHeight - window.innerHeight
    let startTime: number | null = null

    const scrollAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const scrollTop = Math.min(progress / (scrollDuration / totalHeight), totalHeight)
      window.scrollTo(0, scrollTop)

      if (progress < scrollDuration) {
        requestAnimationFrame(scrollAnimation)
      } else {
        const scrollUpAnimation = (timestamp: number) => {
          if (!startTime) startTime = timestamp
          const progress = timestamp - startTime
          const scrollTop = Math.max(totalHeight - (progress / (scrollDuration / totalHeight)) * totalHeight, 0)
          window.scrollTo(0, scrollTop)

          if (progress < scrollDuration) {
            requestAnimationFrame(scrollUpAnimation)
          }
        }

        requestAnimationFrame(scrollUpAnimation)
      }
    }

    requestAnimationFrame(scrollAnimation)

    const timeout = setTimeout(() => {
      setLoading(false)
      window.scrollTo(0, 0)
      bodyElement?.classList.remove('loading')
    }, LOADER_TIME)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      window.scrollTo(0, 0)
      bodyElement?.classList.remove('loading')
    }
  }, [])

  if (!loading) return null

  return (
    <div className="preloader relative bg-black">
      <div className="flex justify-center items-center tablet:absolute tablet:-bottom-7 right-4">
        <p className="font-manrope font-extrabold text-[10vw]">{percentage}%</p>{' '}
      </div>
    </div>
  )
}

export default Preloader
