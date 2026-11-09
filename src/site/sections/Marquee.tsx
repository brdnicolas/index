'use client'

import { Fragment, useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { MARQUEE_WORDS } from '../data/content'
import styles from './Marquee.module.scss'

const Star = () => (
  <svg className={`${styles.star} js-star`} viewBox="0 0 31 31" aria-hidden="true">
    <path d="M15.5 1.75L11.75 11.75L1.75 15.5L11.75 19.25L15.5 29.25L19.25 19.25L29.25 15.5L19.25 11.75L15.5 1.75Z" />
  </svg>
)

const Row = ({ words, offset = 0 }: { words: string[]; offset?: number }) => {
  const repeated = [...words, ...words, ...words]
  return (
    <div className={`${styles.row} js-row`}>
      {repeated.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className={(index + offset) % 2 === 0 ? styles.outline : styles.solid}>{word}</span>
          <Star />
        </Fragment>
      ))}
    </div>
  )
}

// Scroll down: line 1 goes left, line 2 goes right (v1 feature, now with skew + spinning stars).
export const Marquee = () => {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>('.js-row')
      const trigger = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 }

      gsap.fromTo(rows[0], { xPercent: -8 }, { xPercent: -24, ease: 'none', scrollTrigger: trigger })
      gsap.fromTo(rows[1], { xPercent: -24 }, { xPercent: -8, ease: 'none', scrollTrigger: trigger })
      gsap.to('.js-star', { rotate: 360, ease: 'none', scrollTrigger: trigger })

      // a little skew based on scroll velocity
      const skewTo = gsap.quickTo(rows, 'skewX', { duration: 0.4, ease: 'power3' })
      gsap.to({}, {
        scrollTrigger: {
          ...trigger,
          onUpdate: (self) => skewTo(gsap.utils.clamp(-12, 12, self.getVelocity() / -250))
        }
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className={styles.marquee} aria-label="Things I am">
      <Row words={MARQUEE_WORDS} />
      <Row words={[...MARQUEE_WORDS].reverse()} offset={1} />
    </section>
  )
}
