'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import styles from './Cursor.module.scss'

// Custom cursor: a dot, a lagging ring, and a small label pill next to the pointer.
// Add data-cursor="Label" on any element to show a label (+ data-cursor-big for the XL version).
// No mix-blend-mode here: blending a fixed element forces the browser to re-composite the whole page.
export const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [isHover, setIsHover] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isBig, setIsBig] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')
    return () => document.documentElement.classList.remove('has-cursor')
  }, [])

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current || !labelRef.current) return

    const dotX = gsap.quickSetter(dotRef.current, 'x', 'px')
    const dotY = gsap.quickSetter(dotRef.current, 'y', 'px')
    const ringX = gsap.quickTo(ringRef.current, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ringRef.current, 'y', { duration: 0.45, ease: 'power3' })
    const labelX = gsap.quickTo(labelRef.current, 'x', { duration: 0.3, ease: 'power3' })
    const labelY = gsap.quickTo(labelRef.current, 'y', { duration: 0.3, ease: 'power3' })
    let shown = false

    const onMove = (event: PointerEvent) => {
      dotX(event.clientX)
      dotY(event.clientY)
      ringX(event.clientX)
      ringY(event.clientY)
      labelX(event.clientX)
      labelY(event.clientY)
      if (!shown) {
        shown = true
        gsap.to([dotRef.current, ringRef.current], { autoAlpha: 1, duration: 0.3 })
      }
    }

    let lastTarget: Element | null = null
    const onOver = (event: PointerEvent) => {
      setIsHidden(Boolean((event.target as Element).closest?.('[data-cursor-hide]')))
      const target = (event.target as Element).closest?.('[data-cursor], a, button') ?? null
      if (target === lastTarget) return
      lastTarget = target
      setLabel((target as HTMLElement | null)?.dataset.cursor ?? '')
      setIsBig((target as HTMLElement | null)?.dataset.cursorBig !== undefined && Boolean(target))
      setIsHover(Boolean(target))
    }

    const onLeave = () => {
      shown = false
      gsap.to([dotRef.current, ringRef.current], { autoAlpha: 0, duration: 0.3 })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={ringRef}
        className={`${styles.ring} ${isHover ? styles.hover : ''} ${label ? styles.morph : ''} ${isHidden ? styles.hidden : ''}`}
        aria-hidden="true"
      />
      <div ref={dotRef} className={`${styles.dot} ${label || isHidden ? styles.hidden : ''}`} aria-hidden="true" />
      <div
        ref={labelRef}
        className={`${styles.label} ${isBig ? styles.big : ''} ${label && !isHidden ? styles.labelVisible : ''}`}
        aria-hidden="true"
      >
        {label}
      </div>
    </>
  )
}
