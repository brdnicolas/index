'use client'

import { useRef } from 'react'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01'

type ScrambleProps = { text: string; className?: string }

// Hover me and I glitch like a 90s hacker movie.
export const Scramble = ({ text, className }: ScrambleProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const frame = useRef(0)

  const run = () => {
    const element = ref.current
    if (!element) return
    cancelAnimationFrame(frame.current)
    let iteration = 0
    const step = () => {
      element.textContent = Array.from(text)
        .map((char, index) => {
          if (char === ' ' || index < iteration) return char
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')
      iteration += 0.45
      if (iteration < text.length) frame.current = requestAnimationFrame(step)
      else element.textContent = text
    }
    step()
  }

  return (
    <span ref={ref} className={className} onPointerEnter={run} aria-label={text}>
      {text}
    </span>
  )
}
