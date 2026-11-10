'use client'

import { PointerEvent, useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { SLIDES, Slide, SlideVisual } from './slides'
import styles from './Deck.module.scss'

/*
 * A small slide deck: 16:9 slides that scale like real ones (sizes in container units),
 * arrows / keyboard / swipe to navigate, fullscreen, thumbnails, and presenter notes under the slide.
 */

const pad = (value: number) => String(value).padStart(2, '0')

// ---------- the little illustrations drawn on the slides

const Visual = ({ type }: { type: SlideVisual }) => {
  switch (type) {
    case 'need':
      return (
        <div className={styles.need}>
          <div className={styles.needCard}>
            <span className={styles.needIcon}>?</span>
            <strong>Le besoin</strong>
            <span>Qui, quel problème</span>
          </div>
          <span className={styles.arrow}>→</span>
          <div className={`${styles.needCard} ${styles.needSolution}`}>
            <span className={styles.needIcon}>✓</span>
            <strong>La solution</strong>
            <span>Ce que l’app apporte</span>
          </div>
        </div>
      )
    case 'mockups':
      return (
        <div className={styles.mockups}>
          {['Zoning', 'Wireframe', 'Maquette'].map((label, index) => (
            <div key={label} className={styles.mockup}>
              <div className={`${styles.frame} ${styles[`frame${index}`]}`}>
                <span />
                <span />
                <span />
                <span />
              </div>
              <em>{label}</em>
            </div>
          ))}
        </div>
      )
    case 'kanban':
      return (
        <div className={styles.kanban}>
          {['À faire', 'En cours', 'Fait'].map((column, columnIndex) => (
            <div key={column} className={styles.column}>
              <em>{column}</em>
              {columnIndex === 1 ? (
                <div className={styles.story}>
                  <strong>US-12</strong>
                  En tant que lecteur, je veux réserver un livre afin de l’emprunter plus tard.
                </div>
              ) : null}
              <span className={styles.ticket} />
              <span className={styles.ticket} />
            </div>
          ))}
        </div>
      )
    case 'stack':
      return (
        <div className={styles.stack}>
          {[
            ['Front', 'React'],
            ['Back', 'Node.js'],
            ['BDD', 'PostgreSQL'],
            ['Outils', 'Docker · Git']
          ].map(([layer, example]) => (
            <div key={layer} className={styles.stackTile}>
              <em>{layer}</em>
              <strong>{example}</strong>
              <span>ex.</span>
            </div>
          ))}
        </div>
      )
    case 'architecture':
      return (
        <div className={styles.layers}>
          {['Interface', 'API · contrôleurs', 'Services métier', 'Base de données'].map((layer, index) => (
            <div key={layer} className={styles.layerRow}>
              {index > 0 ? <span className={styles.down}>↓</span> : null}
              <div className={styles.layer}>{layer}</div>
            </div>
          ))}
        </div>
      )
    case 'security':
      return (
        <div className={styles.security}>
          {/* a real triangle, cut in three bands: few E2E tests on top, lots of unit tests at the base */}
          <svg className={styles.pyramid} viewBox="0 0 300 210" role="img" aria-label="Pyramide de tests">
            <polygon points="150,0 199,68 101,68" className={styles.tier1} />
            <polygon points="97,74 203,74 252,142 48,142" className={styles.tier2} />
            <polygon points="44,148 256,148 300,210 0,210" className={styles.tier3} />
            <text x="150" y="52">
              E2E
            </text>
            <text x="150" y="114">
              Intégration
            </text>
            <text x="150" y="185">
              Unitaires
            </text>
          </svg>
          <div className={styles.chips}>
            <span>bcrypt</span>
            <span>JWT</span>
            <span>Rôles</span>
          </div>
        </div>
      )
    case 'pipeline':
      return (
        <div className={styles.pipeline}>
          {['Push', 'Lint', 'Tests', 'Build', 'Deploy'].map((step, index) => (
            <div key={step} className={styles.pipelineStep}>
              {index > 0 ? <span className={styles.wire} /> : null}
              <span className={styles.stage}>
                <i>✓</i>
                {step}
              </span>
            </div>
          ))}
        </div>
      )
    case 'demo':
      return (
        <div className={styles.demo}>
          <span className={styles.play}>▶</span>
          <em>2–3 min</em>
        </div>
      )
    default:
      return null
  }
}

const SlideView = ({ slide, index }: { slide: Slide; index: number }) => {
  const centered = slide.visual === 'cover' || slide.visual === 'end'
  return (
    <div className={`${styles.slide} ${centered ? styles.centered : ''}`}>
      <div className={styles.slideBar}>
        <span>Titre pro CDA</span>
        <span>
          {pad(index + 1)} / {pad(SLIDES.length)}
        </span>
      </div>

      {slide.visual === 'cover' ? (
        <div className={styles.cover}>
          <p className={styles.coverKicker}>{slide.points[0]}</p>
          <h3 className={styles.coverTitle}>{slide.title}</h3>
          <p className={styles.coverName}>{slide.points[1]}</p>
        </div>
      ) : slide.visual === 'end' ? (
        <div className={styles.cover}>
          <h3 className={styles.coverTitle}>{slide.title}</h3>
          <ul className={styles.endPoints}>
            {slide.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className={styles.coverName}>Merci ! Des questions ?</p>
        </div>
      ) : (
        <div className={styles.body}>
          <div className={styles.text}>
            <span className={styles.kicker}>{pad(index)}</span>
            <h3 className={styles.title}>{slide.title}</h3>
            <ul className={styles.points}>
              {slide.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className={styles.visual}>
            <Visual type={slide.visual} />
          </div>
        </div>
      )}
    </div>
  )
}

export const Deck = () => {
  const [index, setIndex] = useState(0)
  const deckRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const direction = useRef(1)
  const swipe = useRef<number | null>(null)

  const go = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, next))
    setIndex((current) => {
      direction.current = clamped >= current ? 1 : -1
      return clamped
    })
  }, [])

  // slide transition
  useEffect(() => {
    if (!stageRef.current) return
    gsap.fromTo(
      stageRef.current,
      { xPercent: direction.current * 6, autoAlpha: 0 },
      { xPercent: 0, autoAlpha: 1, duration: 0.6, ease: 'expo.out' }
    )
  }, [index])

  // keyboard, while the deck is on screen (or in fullscreen)
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const deck = deckRef.current
      if (!deck) return
      const target = event.target
      if (target instanceof Element && target.closest('input, textarea, select')) return
      const rect = deck.getBoundingClientRect()
      const onScreen = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4
      if (!onScreen && document.fullscreenElement !== deck) return
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault()
        go(index + 1)
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        go(index - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipe.current = event.clientX
  }
  // a swipe moves in its direction; a simple click goes back on the left half, forward on the right half
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipe.current === null) return
    const delta = event.clientX - swipe.current
    swipe.current = null
    if (Math.abs(delta) > 50) {
      go(index + (delta < 0 ? 1 : -1))
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    go(index + (event.clientX - rect.left < rect.width / 2 ? -1 : 1))
  }

  const fullscreen = () => {
    const deck = deckRef.current
    if (!deck) return
    if (document.fullscreenElement) document.exitFullscreen?.()
    else deck.requestFullscreen?.().catch(() => {})
  }

  const slide = SLIDES[index]

  return (
    <div className={styles.wrap}>
      <div ref={deckRef} className={styles.deck}>
        <div className={styles.screen} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
          <div ref={stageRef} className={styles.stageWrap}>
            <SlideView slide={slide} index={index} />
          </div>
          {/* click zones: only there for the cursor hint, the click itself is handled on the screen */}
          <span
            className={`${styles.zone} ${styles.zonePrev}`}
            data-cursor={index > 0 ? '←' : undefined}
            aria-hidden="true"
          />
          <span
            className={`${styles.zone} ${styles.zoneNext}`}
            data-cursor={index < SLIDES.length - 1 ? '→' : undefined}
            aria-hidden="true"
          />
          <span className={styles.progress} style={{ transform: `scaleX(${(index + 1) / SLIDES.length})` }} />
        </div>

        <div className={styles.controls}>
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Slide précédente">
            ←
          </button>
          <span className={styles.counter}>
            {pad(index + 1)} / {pad(SLIDES.length)}
          </span>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === SLIDES.length - 1}
            aria-label="Slide suivante"
          >
            →
          </button>
          <button type="button" onClick={fullscreen} className={styles.fullscreen}>
            ⤢ Plein écran
          </button>
        </div>
      </div>

      <div className={styles.notes} aria-live="polite">
        <p className={styles.notesLabel}>Notes · {slide.title}</p>
        <p>{slide.notes}</p>
      </div>

      <nav className={styles.thumbs} aria-label="Slides">
        {SLIDES.map((item, itemIndex) => (
          <button
            key={item.title}
            type="button"
            aria-current={itemIndex === index ? 'true' : undefined}
            onClick={() => go(itemIndex)}
          >
            <span>{pad(itemIndex + 1)}</span>
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  )
}
