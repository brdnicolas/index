'use client'
import JSConfetti from 'js-confetti'
import { useEffect, useRef } from 'react'
import Tippy from '@tippyjs/react'

export const SupportActionButton = () => {
  const buttonRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const canvas = document.getElementById('support-cookie-canvas') as HTMLCanvasElement

    const element = buttonRef.current
    if (!element || !canvas) return

    const jsConfetti = new JSConfetti({ canvas })

    const handleMouseEnter = () => {
      jsConfetti.addConfetti({
        confettiRadius: 5,
        confettiNumber: 50,
        confettiColors: ['#FFFFFF', '#E9DB4E', '#809FCA', '#D58799']
      })
    }

    element.addEventListener('mouseover', handleMouseEnter)

    return () => {
      element.removeEventListener('mouseover', handleMouseEnter)
    }
  }, [])

  return (
    <>
      <canvas id="support-cookie-canvas" className="z-10 fixed top-0 left-0 w-full h-full" />
      <Tippy content="I can't code without cookies. Help me survive" animation="scale">
        <a
          ref={buttonRef}
          id="cookie-support"
          className="text-6 fixed bottom-6 right-6 z-40 hover:bg-brown hover:rotate-[360deg] transition-all bg-white w-10 h-10 flex justify-center items-center rounded-full"
          href="https://buymeacoffee.com/brdnicolas"
        >
          🍪
        </a>
      </Tippy>
    </>
  )
}
