'use client'
import { useEffect, useState } from 'react'
import JSConfetti from 'js-confetti'

export const Me = () => {
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    if (clickCount === 5) {
      const jsConfetti = new JSConfetti()

      jsConfetti.addConfetti({
        emojis: ['🐐'],
        confettiNumber: 100
      })

      setClickCount(0)
    }
  }, [clickCount])

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1)
  }

  return (
    <div onClick={handleClick} className="card rounded-6">
      <div className="card-content bg-[#171717] overflow-hidden w-full h-full border-[1px] border-[#232323]">
        <img src="/pictures/me_b_w.png" alt="me" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}
