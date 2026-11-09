'use client'

import { useEffect, useRef, useState } from 'react'
import JSConfetti from 'js-confetti'
import { gsap } from '../lib/gsap'
import { AchievementEvent, onAchievement } from '../lib/achievements'
import styles from './AchievementPopup.module.scss'

// Console-style "Achievement unlocked" card, bottom left. Queued so two eggs in a row both show.
export const AchievementPopup = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState<AchievementEvent | null>(null)
  const queue = useRef<AchievementEvent[]>([])
  const busy = useRef(false)

  useEffect(() => {
    const showNext = () => {
      const next = queue.current.shift()
      if (!next || !ref.current) {
        busy.current = false
        return
      }
      busy.current = true
      setCurrent(next)
      const element = ref.current
      gsap
        .timeline({ onComplete: showNext })
        .fromTo(
          element,
          { x: -40, autoAlpha: 0, scale: 0.92 },
          { x: 0, autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }
        )
        .fromTo(
          `.${styles.bar}`,
          { scaleX: (next.count - 1) / next.total },
          { scaleX: next.count / next.total, duration: 0.8, ease: 'power2.out' },
          '<0.3'
        )
        .to(element, { x: -40, autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, '+=2.6')

      if (next.completed) {
        new JSConfetti().addConfetti({ emojis: ['🏆', '🐐', '🥚', '✨'], confettiNumber: 120 })
      }
    }

    return onAchievement((event) => {
      if (!event) return
      queue.current.push(event)
      if (!busy.current) showNext()
    })
  }, [])

  return (
    <div ref={ref} className={styles.popup} role="status" aria-live="polite">
      {/* always rendered so the progress bar exists before the first animation */}
      <span className={styles.icon}>{current?.completed ? '🏆' : current?.achievement.emoji}</span>
      <span className={styles.text}>
        <span className={styles.label}>{current?.completed ? 'All eggs found!' : 'Achievement unlocked'}</span>
        <span className={styles.name}>{current?.achievement.name}</span>
        <span className={styles.progress}>
          <span className={styles.bar} />
        </span>
      </span>
      <span className={styles.count}>{current ? `${current.count}/${current.total}` : ''}</span>
    </div>
  )
}
