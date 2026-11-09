'use client'

import { ReactElement, cloneElement, useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

type MagneticProps = {
  children: ReactElement<{ ref?: React.Ref<HTMLElement> }>
  strength?: number
}

// Pulls its child towards the cursor. Pure vibes.
export const Magnetic = ({ children, strength = 0.35 }: MagneticProps) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const xTo = gsap.quickTo(element, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(element, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      xTo((event.clientX - (rect.left + rect.width / 2)) * strength)
      yTo((event.clientY - (rect.top + rect.height / 2)) * strength)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)
    return () => {
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
    }
  }, [strength])

  return cloneElement(children, { ref })
}
