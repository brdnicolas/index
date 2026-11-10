/*
 * Plays a paused GSAP animation once `trigger` reaches `at` of the viewport (0.85 ≈ ScrollTrigger's "top 85%").
 * Used for one-shot entrances instead of ScrollTrigger, which measures the page as soon as it is created
 * (one forced reflow per trigger at load). Returns the cleanup, to return from useGSAP.
 */
export const playOnEnter = (trigger: Element | null, animation: gsap.core.Animation, at = 0.85) => {
  if (!trigger || !('IntersectionObserver' in window)) {
    animation.play()
    return () => {}
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      // also when it is already above the viewport (page reloaded further down)
      if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) return
      observer.disconnect()
      animation.play()
    },
    { rootMargin: `0px 0px -${Math.round((1 - at) * 100)}% 0px` }
  )
  observer.observe(trigger)
  return () => observer.disconnect()
}
