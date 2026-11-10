'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { CdaShell } from './CdaShell'
import { QUESTIONS } from './content'
import styles from './Questions.module.scss'

/*
 * /cda/questions — a card game: the deck is shuffled, you answer out loud, flip the card to read the hints,
 * then say whether you knew it. At the end: your score, and a new round with only the cards to review.
 */

type Result = 'known' | 'review'

const pad = (value: number) => String(value).padStart(2, '0')

const shuffle = (items: number[]) => {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const ALL = QUESTIONS.map((_, index) => index)

export const Questions = () => {
  // the order is shuffled on the client only (no hydration mismatch)
  const [deck, setDeck] = useState<number[]>(ALL)
  const [position, setPosition] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [results, setResults] = useState<Record<number, Result>>({})
  const cardRef = useRef<HTMLDivElement>(null)

  const start = useCallback((cards: number[]) => {
    setDeck(shuffle(cards))
    setPosition(0)
    setFlipped(false)
    setResults({})
  }, [])

  useEffect(() => start(ALL), [start])

  const finished = position >= deck.length
  const current = deck[position]
  const known = Object.values(results).filter((result) => result === 'known').length
  const toReview = deck.filter((index) => results[index] === 'review')

  // each new card is dealt onto the table
  useEffect(() => {
    if (finished || !cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { y: 40, rotation: -3, autoAlpha: 0 },
      { y: 0, rotation: 0, autoAlpha: 1, duration: 0.7, ease: 'expo.out' }
    )
  }, [position, deck, finished])

  const answer = useCallback(
    (result: Result) => {
      if (!flipped || finished) return
      setResults((previous) => ({ ...previous, [current]: result }))
      setFlipped(false)
      setPosition((value) => value + 1)
    },
    [current, finished, flipped]
  )

  // keyboard: space / enter to flip, ← to review, → if you knew it
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target
      if (target instanceof Element && target.closest('input, textarea, select, button')) return
      if (finished) return
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        setFlipped((value) => !value)
      }
      if (event.key === 'ArrowLeft') answer('review')
      if (event.key === 'ArrowRight') answer('known')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answer, finished])

  return (
    <CdaShell
      title="Les questions du jury"
      lede="Un jeu de cartes tirées au hasard. Répondez à voix haute comme devant le jury, retournez la carte pour lire les pistes, puis indiquez si vous saviez répondre."
    >
      <section className={`${styles.game} js-reveal`} aria-label="Jeu de cartes">
        <div className={styles.status}>
          <span>{finished ? 'Partie terminée' : `Carte ${pad(position + 1)} / ${pad(deck.length)}`}</span>
          <span className={styles.score}>
            <b className={styles.known}>{known} sues</b>
            <b className={styles.review}>{Object.keys(results).length - known} à revoir</b>
          </span>
        </div>
        <div className={styles.track}>
          <span style={{ transform: `scaleX(${Math.min(position, deck.length) / deck.length})` }} />
        </div>

        {finished ? (
          <div className={styles.end}>
            <p className={styles.endScore}>
              {known}
              <span>/{deck.length}</span>
            </p>
            <p className={styles.endText}>
              {known === deck.length
                ? 'Sans faute. Le jury n’a qu’à bien se tenir.'
                : `${toReview.length} carte${toReview.length > 1 ? 's' : ''} à retravailler. Relisez les pistes, puis rejouez-les.`}
            </p>
            <div className={styles.endActions}>
              {toReview.length > 0 ? (
                <button type="button" className={styles.primary} onClick={() => start(toReview)}>
                  Rejouer les cartes à revoir ({toReview.length})
                </button>
              ) : null}
              <button type="button" className={styles.secondary} onClick={() => start(ALL)}>
                Nouvelle partie
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.table}>
              {/* the rest of the deck, underneath */}
              {deck.length - position > 2 ? <span className={`${styles.ghost} ${styles.ghost2}`} /> : null}
              {deck.length - position > 1 ? <span className={`${styles.ghost} ${styles.ghost1}`} /> : null}

              <div ref={cardRef} className={styles.cardWrap}>
                <button
                  type="button"
                  className={styles.card}
                  data-flipped={flipped}
                  onClick={() => setFlipped((value) => !value)}
                  aria-label={flipped ? 'Revoir la question' : 'Retourner la carte'}
                >
                  <span className={`${styles.face} ${styles.front}`} aria-hidden={flipped}>
                    <span className={styles.faceLabel}>Question {pad(current + 1)}</span>
                    <span className={styles.question}>{QUESTIONS[current].q}</span>
                    <span className={styles.hint}>Cliquez ou espace pour retourner ↻</span>
                  </span>
                  <span className={`${styles.face} ${styles.back}`} aria-hidden={!flipped}>
                    <span className={styles.faceLabel}>Pistes de réponse</span>
                    <span className={styles.answer}>{QUESTIONS[current].a}</span>
                    <span className={styles.hint}>À reformuler avec vos mots</span>
                  </span>
                </button>
              </div>
            </div>

            <div className={styles.actions}>
              {flipped ? (
                <>
                  <button type="button" className={styles.reviewButton} onClick={() => answer('review')}>
                    ← À revoir
                  </button>
                  <button type="button" className={styles.knownButton} onClick={() => answer('known')}>
                    Je savais →
                  </button>
                </>
              ) : (
                <button type="button" className={styles.primary} onClick={() => setFlipped(true)}>
                  Retourner la carte
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </CdaShell>
  )
}
