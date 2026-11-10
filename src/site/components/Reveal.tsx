'use client'

import { useEffect } from 'react'
import { prefersReducedMotion } from '../lib/intro'

/*
 * Scroll reveals for every `.js-reveal` (fade + rise) and `.js-line` (hairline drawing) of the site.
 * One shared IntersectionObserver adds `.is-in`, a CSS animation does the rest (see global.scss):
 * no layout reads in JS, unlike one GSAP tween + one ScrollTrigger per element (forced reflows at load).
 * A MutationObserver picks up elements rendered later (route changes, unfolding content).
 */

const SELECTOR = '.js-reveal, .js-line'

export const Reveal = () => {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('has-reveal')

    const show = (element: Element) => element.classList.add('is-in')

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      document.querySelectorAll(SELECTOR).forEach(show)
      root.classList.remove('has-reveal')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          show(entry.target)
          io.unobserve(entry.target)
        })
      },
      // a little before the element is fully on screen, like the old "top 92%" triggers
      { rootMargin: '0px 0px -6% 0px' }
    )

    const watch = (scope: ParentNode) => {
      scope.querySelectorAll(SELECTOR).forEach((element) => {
        if (!element.classList.contains('is-in')) io.observe(element)
      })
    }
    watch(document)

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) =>
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches(SELECTOR) && !node.classList.contains('is-in')) io.observe(node)
          watch(node)
        })
      )
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
      root.classList.remove('has-reveal')
    }
  }, [])

  return null
}
