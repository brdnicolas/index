'use client'

import { gsap } from './gsap'

type Router = { push: (href: string, options?: { scroll?: boolean }) => void }

let overlay: HTMLDivElement | null = null
let waitsForImage = false
let fallback: ReturnType<typeof setTimeout> | undefined

const cleanup = () => {
  overlay?.remove()
  overlay = null
  waitsForImage = false
  clearTimeout(fallback)
}

/**
 * Shared-element-ish page transition.
 * - with an image: the clicked image grows from its card to fullscreen, then we navigate.
 *   The next page's hero is a fullscreen version of the same image → seamless.
 * - without: a black panel slides up, we navigate, it slides away.
 */
export const transitionTo = (
  router: Router,
  href: string,
  image?: HTMLImageElement | null,
  frame?: HTMLElement | null
) => {
  if (overlay) return
  const element = document.createElement('div')
  element.setAttribute('aria-hidden', 'true')
  Object.assign(element.style, {
    position: 'fixed',
    zIndex: '95',
    overflow: 'hidden',
    pointerEvents: 'none',
    background: '#050505'
  })
  overlay = element

  if (image) {
    const rect = (frame ?? image.parentElement!).getBoundingClientRect()
    const clone = document.createElement('img')
    clone.onerror = () => clone.remove()
    clone.src = image.currentSrc || image.src
    Object.assign(clone.style, { width: '100%', height: '100%', objectFit: 'cover', display: 'block' })
    element.appendChild(clone)
    Object.assign(element.style, {
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      borderRadius: '20px'
    })
    document.body.appendChild(element)
    waitsForImage = true

    gsap.to(element, {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      duration: 1,
      ease: 'expo.inOut',
      onComplete: () => {
        router.push(href, { scroll: false })
        // safety net if the next page never reports its image as loaded
        fallback = setTimeout(() => endTransition(true), 2500)
      }
    })
    return
  }

  Object.assign(element.style, { inset: '0' })
  document.body.appendChild(element)
  gsap.fromTo(
    element,
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: 0.7,
      ease: 'expo.inOut',
      onComplete: () => {
        router.push(href, { scroll: false })
        fallback = setTimeout(() => endTransition(true), 2500)
      }
    }
  )
}

/** Called by the next page once it's painted (and its hero image loaded, if any). */
export const endTransition = (fromImage = false) => {
  if (!overlay) return
  if (waitsForImage && !fromImage) return
  clearTimeout(fallback)
  const element = overlay
  if (waitsForImage) {
    gsap.to(element, { autoAlpha: 0, duration: 0.5, delay: 0.1, onComplete: cleanup })
  } else {
    gsap.to(element, { yPercent: -100, duration: 0.7, ease: 'expo.inOut', onComplete: cleanup })
  }
}
