'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from '../lib/gsap'
import { endTransition } from '../lib/transition'
import { jumpTo, resetScroll } from './SmoothScroll'

// On every client-side navigation: back to the top, refresh triggers, open the curtain.
export const RouteListener = () => {
  const pathname = usePathname()

  useEffect(() => {
    resetScroll()
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      if (window.location.hash) jumpTo(window.location.hash)
      endTransition()
    })
    // whatever happens (browser back button mid-transition, slow image…), never leave the overlay stuck
    const safety = setTimeout(() => endTransition(true), 1500)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(safety)
    }
  }, [pathname])

  return null
}
