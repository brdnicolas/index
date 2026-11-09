'use client'

import { usePathname } from 'next/navigation'
import { LINKS } from '../data/content'
import { EggHunt } from './EggHunt'
import styles from './Footer.module.scss'

const FOOTER_LINKS = [
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'Malt', href: LINKS.malt },
  { label: 'Dev.to', href: LINKS.devto },
  { label: 'Blog', href: '/blog', internal: true },
  { label: 'Resume', href: LINKS.resume },
  { label: "Let's meet", href: LINKS.cal }
]

// Curtain reveal: the page scrolls away and uncovers a fixed footer underneath.
// (clip-path on the wrapper + position: fixed inside = zero JS, zero scroll listeners)
export const Footer = () => {
  // easter eggs only live on the home page
  const isHome = usePathname() === '/'

  return (
    <div className={styles.reveal}>
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.ai}>
              <p className={styles.aiTitle}>
                This site was built <em>with AI</em>.
              </p>
              <p className={styles.aiText}>
                Allergic to robots? The organic, hand-typed, gluten-free version is one click away.
              </p>
              <div className={styles.switch} role="group" aria-label="Choose your version">
                <span className={`${styles.option} ${styles.current}`} aria-current="page">
                  AI-made
                </span>
                <a href={LINKS.handmade} className={styles.option} data-cursor="100% human, 0% robot">
                  Hand-made
                </a>
                <span className={styles.knob} aria-hidden="true" />
              </div>
            </div>

            <ul className={styles.links}>
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className={styles.link}
                  >
                    {link.label} <span>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.meta}>
            <p>© {new Date().getFullYear()} — Designed with taste, shipped with a shader.</p>
            <p>Pair-programmed with Claude — it wrote the shaders, I typed &ldquo;make it more wahou&rdquo; 47 times 🤖</p>
            <div className={styles.metaRight}>{isHome ? <EggHunt /> : null}</div>
          </div>

          <p className={styles.giant} aria-hidden="true">
            Nicolas Brouard
          </p>
        </div>
      </footer>
    </div>
  )
}
