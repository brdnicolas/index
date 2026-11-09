'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { onIntroDone, prefersReducedMotion } from '../lib/intro'

let lenisInstance: Lenis | null = null

export const scrollToTarget = (target: string | number | HTMLElement) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.6 })
    return
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' })
  else {
    const element = typeof target === 'string' ? document.querySelector(target) : target
    element?.scrollIntoView({ behavior: 'smooth' })
  }
}

export const resetScroll = () => {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

export const jumpTo = (target: string) => {
  const element = document.querySelector<HTMLElement>(target)
  if (!element) return
  if (lenisInstance) lenisInstance.scrollTo(element, { immediate: true, force: true })
  else element.scrollIntoView()
}

export const SmoothScroll = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 })
    lenisInstance = lenis
    lenis.stop()

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const unsubscribe = onIntroDone(() => {
      lenis.start()
      ScrollTrigger.refresh()
    })

    return () => {
      unsubscribe()
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return null
}
