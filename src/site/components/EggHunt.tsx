'use client'

import { useEffect, useRef, useState } from 'react'
import { ACHIEVEMENTS, getUnlocked, onAchievement, resetAchievements } from '../lib/achievements'
import styles from './EggHunt.module.scss'

// Discreet egg hunt: a tiny "🥚 3/12" in the footer, the list opens in a small popover.
export const EggHunt = () => {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set())
  const [isOpen, setIsOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setUnlocked(getUnlocked())
    return onAchievement(() => setUnlocked(getUnlocked()))
  }, [])

  // close on outside click / Escape
  useEffect(() => {
    if (!isOpen) return
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setIsOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setIsOpen(false)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const count = unlocked.size
  const total = ACHIEVEMENTS.length

  return (
    <div ref={root} className={styles.hunt}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls="egg-hunt"
      >
        🥚 {count}/{total}
      </button>

      {isOpen ? (
        <div id="egg-hunt" className={styles.panel} role="dialog" aria-label="Easter egg hunt">
          <div className={styles.head}>
            <p className={styles.title}>Egg hunt</p>
            <span className={styles.count}>
              {count}/{total}
            </span>
          </div>
          <div className={styles.progress}>
            <span style={{ transform: `scaleX(${count / total})` }} />
          </div>
          <ul className={styles.list}>
            {ACHIEVEMENTS.map((achievement) => {
              const isUnlocked = unlocked.has(achievement.id)
              return (
                <li key={achievement.id} className={isUnlocked ? styles.unlocked : ''}>
                  <span className={styles.emoji}>{isUnlocked ? achievement.emoji : '·'}</span>
                  <span className={styles.name}>{isUnlocked ? achievement.name : achievement.hint}</span>
                </li>
              )
            })}
          </ul>
          {count === total ? (
            <p className={styles.reward}>All found. Screenshot this and DM me, the first round of water is on me 💧</p>
          ) : null}
          {count > 0 ? (
            <button type="button" className={styles.reset} onClick={resetAchievements}>
              Reset progress
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
