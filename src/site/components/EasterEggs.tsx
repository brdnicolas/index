'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import JSConfetti from 'js-confetti'
import { gsap } from '../lib/gsap'
import { releaseTheGoats } from '../lib/goats'
import { togglePartyMode } from '../lib/intro'
import { emit } from '../lib/bus'
import { LINKS } from '../data/content'
import { toast } from './Toast'
import { unlock } from '../lib/achievements'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

/*
 * 🥚 Global easter eggs (the others live next to their component):
 * - type "goat"         → 🐐 rain
 * - type "matrix"       → the hero dots turn into green rain
 * - type "claude"       → 🤖 says hi
 * - type "torch"        → lights out, your cursor is a flashlight
 * - konami code         → party mode (rainbow dots)
 * - leave the tab       → the title begs you to come back
 * - open the console    → hi dev, try hire()
 */
export const EasterEggs = () => {
  // the hunt only happens on the home page
  const isHome = usePathname() === '/'

  useEffect(() => {
    if (!isHome) return
    // eslint-disable-next-line no-console
    console.log(
      '%cHey dev 👋%c\nYes, an AI helped build this one. The 100% hand-made version lives at /gluten-free.\nThere are a dozen easter eggs hidden here. Hint: try typing things.\nOr just run hire() 👀',
      'font-size:20px;font-weight:700;',
      'font-size:12px;color:#8b8a86;'
    )

    const win = window as typeof window & { hire?: () => string }
    win.hire = () => {
      // eslint-disable-next-line no-console
      console.log('%c📬 Great taste. Let\'s talk:', 'font-size:16px;font-weight:700;', `\n${LINKS.email}\n${LINKS.cal}`)
      new JSConfetti().addConfetti({ emojis: ['💼', '🚀', '✨'], confettiNumber: 60 })
      unlock('hire')
      return 'Nico has been notified (not really, but please email him).'
    }

    let typed = ''
    let konamiIndex = 0

    // flashlight: a fixed black layer with a hole that follows the cursor
    let torch: HTMLDivElement | null = null
    let torchTimer: ReturnType<typeof setTimeout>
    const moveTorch = (event: PointerEvent) => {
      torch?.style.setProperty('--x', `${event.clientX}px`)
      torch?.style.setProperty('--y', `${event.clientY}px`)
    }
    const toggleTorch = () => {
      if (torch) {
        const element = torch
        torch = null
        clearTimeout(torchTimer)
        window.removeEventListener('pointermove', moveTorch)
        gsap.to(element, { autoAlpha: 0, duration: 0.6, onComplete: () => element.remove() })
        return
      }
      torch = document.createElement('div')
      torch.setAttribute('aria-hidden', 'true')
      Object.assign(torch.style, {
        position: 'fixed',
        inset: '0',
        zIndex: '140',
        pointerEvents: 'none',
        background: 'radial-gradient(circle 170px at var(--x, 50%) var(--y, 50%), transparent 0%, transparent 55%, rgba(0,0,0,0.97) 100%)',
        opacity: '0'
      })
      document.body.appendChild(torch)
      gsap.to(torch, { opacity: 1, duration: 0.8 })
      window.addEventListener('pointermove', moveTorch, { passive: true })
      toast('Lights out 🔦 (type "torch" again to turn them back on)')
      torchTimer = setTimeout(() => torch && toggleTorch(), 20000)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      if (target instanceof Element && target.closest('input, textarea, [contenteditable]')) return
      if (event.metaKey || event.ctrlKey || event.altKey) return

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
      if (key.length === 1) typed = (typed + key).slice(-12)

      if (typed.endsWith('goat')) {
        typed = ''
        releaseTheGoats()
        toast('GOAT mode confirmed 🐐')
        unlock('goat-typed')
      } else if (typed.endsWith('matrix')) {
        typed = ''
        emit('matrix')
        unlock('matrix')
        toast('Follow the white rabbit 🐇 (scroll to the top)')
      } else if (typed.endsWith('claude')) {
        typed = ''
        new JSConfetti().addConfetti({ emojis: ['🤖', '✨', '🧡'], confettiNumber: 70 })
        toast("Hi, it's Claude 👋 I wrote the CSS. Nico wrote 'more wahou'.")
        unlock('claude')
      } else if (typed.endsWith('torch')) {
        typed = ''
        toggleTorch()
        unlock('torch')
      }

      konamiIndex = key === KONAMI[konamiIndex] ? konamiIndex + 1 : key === KONAMI[0] ? 1 : 0
      if (konamiIndex === KONAMI.length) {
        konamiIndex = 0
        const isOn = togglePartyMode()
        unlock('konami')
        toast(isOn ? 'Party mode: ON 🪩 (scroll to the top)' : 'Party mode: off. Back to business.')
      }
    }

    const originalTitle = document.title
    let leftOnce = false
    const onVisibility = () => {
      document.title = document.hidden ? 'Psst… come back 👀' : originalTitle
      if (document.hidden) leftOnce = true
      else if (leftOnce) unlock('tab-away')
    }
    const onBeforePrint = () => unlock('print')
    window.addEventListener('beforeprint', onBeforePrint)

    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('beforeprint', onBeforePrint)
      delete win.hire
      torch?.remove()
      window.removeEventListener('pointermove', moveTorch)
    }
  }, [isHome])

  return null
}
