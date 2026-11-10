'use client'

import { ReactNode, useRef } from 'react'
import Link from 'next/link'
import { gsap, useGSAP } from '../lib/gsap'
import { Split } from '../components/Split'
import styles from './Cda.module.scss'

/*
 * Shared frame of every /cda page: back link, eyebrow, big title, lede,
 * and the site's scroll animations (title chars, hairlines drawing, blocks fading in).
 */

export const Line = () => <span className={`${styles.line} js-line`} aria-hidden="true" />

type Props = {
  title: string
  lede: ReactNode
  eyebrow?: string
  back?: boolean
  centered?: boolean
  children: ReactNode
}

export const CdaShell = ({
  title,
  lede,
  eyebrow = 'Titre pro CDA',
  back = true,
  centered = false,
  children
}: Props) => {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        `.${styles.title} .split-char`,
        { yPercent: 115 },
        { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.025, delay: 0.2 }
      )
      gsap.utils.toArray<HTMLElement>('.js-line').forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: line, start: 'top 94%', once: true }
          }
        )
      })
      gsap.utils.toArray<HTMLElement>('.js-reveal').forEach((element) => {
        gsap.from(element, {
          y: 32,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true }
        })
      })
    },
    { scope: root }
  )

  return (
    <div ref={root} className={styles.page} lang="fr">
      <header className={`${styles.hero} ${centered ? styles.heroCentered : ''}`}>
        {back ? (
          <Link href="/cda" className={`${styles.back} js-reveal`}>
            ← Toolbox CDA
          </Link>
        ) : null}
        <p className={`${styles.eyebrow} js-reveal`}>{eyebrow}</p>
        <h1 className={styles.title}>
          <Split text={title} mask />
        </h1>
        <div className={`${styles.lede} js-reveal`}>{lede}</div>
      </header>
      {children}
    </div>
  )
}
