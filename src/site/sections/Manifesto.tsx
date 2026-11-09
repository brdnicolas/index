'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { MANIFESTO } from '../data/content'
import { Split } from '../components/Split'
import styles from './Manifesto.module.scss'

// Words light up one by one while you scroll (the "self-taught…" thing from v1, upgraded).
export const Manifesto = () => {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.split-word',
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'bottom 55%', scrub: true }
        }
      )
      gsap.from(`.${styles.eyebrow}`, {
        autoAlpha: 0,
        y: 20,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' }
      })
    },
    { scope: root }
  )

  return (
    <section id="intro" ref={root} className={styles.manifesto}>
      <p className={styles.eyebrow}>The short version</p>
      <p className={styles.text}>
        <Split text={MANIFESTO} by="words" />
      </p>
    </section>
  )
}
