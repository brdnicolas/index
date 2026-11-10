'use client'

import { CSSProperties, PointerEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from '../lib/gsap'
import { CdaShell } from './CdaShell'
import { CATEGORIES, TOOLS, ToolIcon } from './content'
import styles from './CdaHub.module.scss'

/* /cda — the toolbox's front door: a grid of tools, filterable by category. */

type Filter = (typeof CATEGORIES)[number]['id']

const ICONS: Record<ToolIcon, React.ReactNode> = {
  schema: (
    <>
      <rect x="3" y="3" width="7" height="6" rx="1.5" />
      <rect x="14" y="3" width="7" height="6" rx="1.5" />
      <rect x="8.5" y="15" width="7" height="6" rx="1.5" />
      <path d="M10 6h4M6.5 9v3.5h5.5V15M17.5 9v3.5H12" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  slides: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M12 16v4M8.5 20h7M7 8.5h6M7 11.5h4" />
    </>
  ),
  question: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5z" />
      <path d="M10 7.8a2 2 0 1 1 2.6 1.9c-.4.2-.6.5-.6.9v.4M12 13.2h.01" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m9 14.2-1.5 6.8L12 18.5l4.5 2.5-1.5-6.8M12 6.5l.8 1.6 1.7.3-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.3z" />
    </>
  ),
  doc: (
    <>
      <path d="M6.5 3h7L19 8.5v11A1.5 1.5 0 0 1 17.5 21h-11A1.5 1.5 0 0 1 5 19.5v-15A1.5 1.5 0 0 1 6.5 3z" />
      <path d="M13 3v6h6M8.5 13h7M8.5 16.5h5" />
    </>
  )
}

// the glow follows the cursor inside a card
const onCardMove = (event: PointerEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`)
}

export const CdaHub = () => {
  const [filter, setFilter] = useState<Filter>('all')
  const gridRef = useRef<HTMLUListElement>(null)
  const first = useRef(true)

  const visible = TOOLS.filter((tool) => filter === 'all' || tool.category === filter)

  // cards pop back in when the filter changes
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const cards = gridRef.current?.children
    if (!cards) return
    gsap.fromTo(
      cards,
      { y: 24, autoAlpha: 0, scale: 0.97 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.7, ease: 'expo.out', stagger: 0.05 }
    )
  }, [filter])

  return (
    <CdaShell
      back={false}
      centered
      eyebrow="Titre pro Concepteur Développeur d’Applications"
      title="La toolbox CDA"
      lede="Tous les outils pour préparer votre titre pro, au même endroit. Choisissez celui dont vous avez besoin."
    >
      <div className={`${styles.filters} js-reveal`} role="group" aria-label="Filtrer les outils">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={filter === category.id}
            onClick={() => setFilter(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <ul ref={gridRef} className={styles.grid}>
        {visible.map((tool) => {
          const external = tool.href.startsWith('http')
          const card = (
            <>
              <span className={styles.icon} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[tool.icon]}
                </svg>
              </span>
              <span className={styles.title}>{tool.title}</span>
              <span className={styles.text}>{tool.text}</span>
              <span className={styles.footer}>
                <span>{CATEGORIES.find((category) => category.id === tool.category)?.label}</span>
                <span className={styles.go}>{external ? 'Site externe ↗' : 'Ouvrir →'}</span>
              </span>
            </>
          )
          const props = {
            className: styles.card,
            style: { '--tool': tool.color } as CSSProperties,
            onPointerMove: onCardMove
          }
          return (
            <li key={tool.href} className="js-reveal">
              {external ? (
                <a href={tool.href} target="_blank" rel="noopener noreferrer" data-cursor="Open ↗" {...props}>
                  {card}
                </a>
              ) : (
                <Link href={tool.href} data-cursor="Go →" {...props}>
                  {card}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </CdaShell>
  )
}
