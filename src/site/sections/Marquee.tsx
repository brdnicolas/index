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
      // a little skew based on scroll velocity
      const skewTo = gsap.quickTo(rows, 'skewX', { duration: 0.4, ease: 'power3' })

      // one timeline, one ScrollTrigger (each trigger measures the page when it is created)
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            onUpdate: (self) => skewTo(gsap.utils.clamp(-12, 12, self.getVelocity() / -250))
          }
        })
        .fromTo(rows[0], { xPercent: -8 }, { xPercent: -24 }, 0)
        .fromTo(rows[1], { xPercent: -24 }, { xPercent: -8 }, 0)
        .to('.js-star', { rotate: 360 }, 0)
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
