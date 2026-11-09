'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { markIntroDone, prefersReducedMotion } from '../lib/intro'
import styles from './Intro.module.scss'

const SESSION_KEY = 'brd:intro-seen'

const LINES = [
  'Warming up the GPU',
  'Negotiating with the shader',
  'Hiding the goats',
  'Adjusting the vibes',
  'Almost cool'
]

export const Intro = () => {
  const root = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const [isGone, setIsGone] = useState(false)

  useGSAP(
    () => {
      const finish = () => setIsGone(true)

      if (prefersReducedMotion()) {
        markIntroDone()
        finish()
        return
      }

      let hasSeen = false
      try {
        hasSeen = sessionStorage.getItem(SESSION_KEY) === '1'
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        // private mode, whatever — play the full intro
      }

      const open = (tl: gsap.core.Timeline, duration: number) => {
        tl.add(markIntroDone)
          .to(`.${styles.top}`, { yPercent: -100, duration, ease: 'expo.inOut' }, '<')
          .to(`.${styles.bottom}`, { yPercent: 100, duration, ease: 'expo.inOut' }, '<')
          .add(finish)
      }

      const tl = gsap.timeline({ delay: 0.15 })

      if (hasSeen) {
        tl.to(`.${styles.content}`, { autoAlpha: 0, duration: 0.2 })
        open(tl, 1)
        return
      }

      const progress = { value: 0 }
      const fontsReady = document.fonts?.ready ?? Promise.resolve()

      tl.from(`.${styles.meta}`, { yPercent: 100, autoAlpha: 0, stagger: 0.08, duration: 0.8, ease: 'expo.out' })
        .from(counterRef.current, { yPercent: 100, duration: 1, ease: 'expo.out' }, '<0.1')
        .to(
          progress,
          {
            value: 100,
            duration: 2.4,
            ease: 'power2.inOut',
            onUpdate: () => {
              const value = Math.round(progress.value)
              if (counterRef.current) counterRef.current.textContent = String(value).padStart(3, '0')
              if (lineRef.current) {
                lineRef.current.textContent = LINES[Math.min(LINES.length - 1, Math.floor(value / 21))]
              }
              gsap.set(`.${styles.bar}`, { scaleX: progress.value / 100 })
            }
          },
          '<'
        )
        .add(() => {
          tl.pause()
          fontsReady.then(() => tl.resume())
        })
        .to(`.${styles.content} > *`, { yPercent: -110, autoAlpha: 0, stagger: 0.04, duration: 0.6, ease: 'expo.in' })
        .to(`.${styles.bar}`, { scaleX: 0, transformOrigin: 'right', duration: 0.5, ease: 'expo.in' }, '<')

      open(tl, 1.3)
    },
    { scope: root }
  )

  if (isGone) return null

  return (
    <div ref={root} className={styles.intro} aria-hidden="true">
      <div className={`${styles.panel} ${styles.top}`} />
      <div className={`${styles.panel} ${styles.bottom}`} />
      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.meta}>Nicolas Brouard</span>
          <span className={styles.meta}>Portfolio ©{new Date().getFullYear()}</span>
        </div>
        <div className={styles.footerRow}>
          <span className={styles.meta}>
            <span ref={lineRef}>{LINES[0]}</span>
            <span className={styles.dots} />
          </span>
          <span className={styles.counterMask}>
            <span ref={counterRef} className={styles.counter}>
              000
            </span>
          </span>
        </div>
      </div>
      <span className={styles.bar} />
    </div>
  )
}
