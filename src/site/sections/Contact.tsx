'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { playOnEnter } from '../lib/playOnEnter'
import { LINKS } from '../data/content'
import { Magnetic } from '../components/Magnetic'
import { Split } from '../components/Split'
import styles from './Contact.module.scss'

export const Contact = () => {
  const root = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  useGSAP(
    () => {
      const title = gsap.fromTo(
        `.${styles.big} .split-char`,
        { yPercent: 115, rotate: 8 },
        { yPercent: 0, rotate: 0, duration: 1.4, ease: 'expo.out', stagger: 0.035, paused: true }
      )
      const actions = gsap.from(`.${styles.actions} > *`, {
        y: 30,
        autoAlpha: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.1,
        paused: true
      })

      const cleanups = [playOnEnter(root.current, title, 0.7), playOnEnter(root.current, actions, 0.6)]
      return () => cleanups.forEach((cleanup) => cleanup())
    },
    { scope: root }
  )

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${LINKS.email}`
    }
  }

  return (
    <section ref={root} className={styles.contact}>
      <p className={styles.eyebrow}>Got an idea? A bug? A meme?</p>
      <h2 className={styles.big}>
        <a href={LINKS.cal} target="_blank" rel="noopener noreferrer" data-cursor="Book a call">
          <Split text="Let's talk" mask charClassName={styles.char} />
        </a>
      </h2>

      <div className={styles.actions}>
        <Magnetic>
          <a href={LINKS.cal} target="_blank" rel="noopener noreferrer" className={styles.primary}>
            Book a call ↗
          </a>
        </Magnetic>
        <Magnetic>
          <button type="button" className={styles.secondary} onClick={copyEmail}>
            <span className={styles.roll} data-copied={copied}>
              <span>{LINKS.email}</span>
              <span>Copied! ✓</span>
            </span>
          </button>
        </Magnetic>
      </div>
    </section>
  )
}
