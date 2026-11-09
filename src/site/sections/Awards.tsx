'use client'

import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { AWARDS } from '@/data/awards'
import { Split } from '../components/Split'
import styles from './Awards.module.scss'

const DEFAULT_COUNT = 6

const renderTitle = (title: string) =>
  title.split(/(\*\*[^*]+\*\*)/).map((part, index) =>
    part.startsWith('**') ? (
      <span key={index} className={styles.highlight}>
        {part.replaceAll('*', '')}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  )

export const Awards = () => {
  const root = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const awards = isExpanded ? AWARDS : AWARDS.slice(0, DEFAULT_COUNT)

  useGSAP(
    () => {
      gsap.fromTo(
        `.${styles.title} .split-char`,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.03,
          scrollTrigger: { trigger: `.${styles.title}`, start: 'top 85%' }
        }
      )

      const counter = { value: 0 }
      gsap.to(counter, {
        value: AWARDS.length,
        duration: 2.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: `.${styles.count}`, start: 'top 85%', once: true },
        onUpdate: () => {
          const element = root.current?.querySelector(`.${styles.countValue}`)
          if (element) element.textContent = String(Math.round(counter.value)).padStart(2, '0')
        }
      })

      gsap.from(`.${styles.row}`, {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: listRef.current, start: 'top 85%' }
      })
    },
    { scope: root }
  )

  const toggle = () => {
    setIsExpanded((value) => !value)
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      if (isExpanded) return
      const fresh = root.current?.querySelectorAll(`.${styles.row}:nth-child(n+${DEFAULT_COUNT + 1})`)
      if (fresh) {
        gsap.fromTo(fresh, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.8, ease: 'expo.out' })
      }
    })
  }

  return (
    <section id="awards" ref={root} className={styles.awards}>
      <div className={styles.aside}>
        <div className={styles.sticky}>
          <h2 className={styles.title}>
            <Split text="Awards" mask />
          </h2>
          <p className={styles.count}>
            <span className={styles.countValue}>00</span>
            <span className={styles.countLabel}>trophies on the shelf</span>
          </p>
          <p className={styles.subtitle}>Great achievements are born from great challenges (and a lot of pizza).</p>
        </div>
      </div>

      <div className={styles.main}>
        <ul ref={listRef} className={styles.list}>
          {awards.map((award, index) => (
            <li key={award.title} className={styles.row}>
              <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.name}>{renderTitle(award.title)}</span>
              <span className={styles.by}>{award.delivredBy}</span>
              <span className={styles.year}>{award.year}</span>
            </li>
          ))}
        </ul>

        <button type="button" className={styles.more} onClick={toggle}>
          {isExpanded ? 'Hide, too much for me' : `Wanna see more? (+${AWARDS.length - DEFAULT_COUNT})`}
        </button>
      </div>

    </section>
  )
}
