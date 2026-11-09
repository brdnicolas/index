'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { transitionTo } from '../lib/transition'
import { gsap } from '../lib/gsap'
import { onIntroDone } from '../lib/intro'
import { LINKS } from '../data/content'
import { scrollToTarget } from './SmoothScroll'
import { Scramble } from './Scramble'
import { Magnetic } from './Magnetic'
import styles from './Header.module.scss'

const NAV = [
  { label: 'About', target: '#about' },
  { label: 'Work', target: '#work' },
  { label: 'Awards', target: '#awards' }
]

export const Header = () => {
  const ref = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  useEffect(() => {
    const header = ref.current
    if (!header) return
    gsap.set(header, { yPercent: -100 })

    const unsubscribe = onIntroDone(() => {
      gsap.to(header, { yPercent: 0, duration: 1.2, ease: 'expo.out', delay: 0.9 })
    })

    // hide when scrolling down, come back when scrolling up
    let lastY = window.scrollY
    let hidden = false
    const onScroll = () => {
      const y = window.scrollY
      header.dataset.scrolled = String(y > 40)
      const shouldHide = y > lastY && y > 300
      if (shouldHide !== hidden) {
        hidden = shouldHide
        gsap.to(header, { yPercent: hidden ? -100 : 0, duration: 0.6, ease: 'expo.out' })
      }
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      unsubscribe()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header ref={ref} className={styles.header}>
      <div className={styles.inner}>
        <a
          href="#top"
          className={styles.logo}
          onClick={(event) => {
            event.preventDefault()
            if (isHome) scrollToTarget(0)
            else transitionTo(router, '/')
          }}
        >
          <Scramble text="Nicolas B." />
        </a>

        <nav className={styles.nav} aria-label="Sections">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.target}
              className={styles.navLink}
              onClick={(event) => {
                event.preventDefault()
                if (isHome) scrollToTarget(item.target)
                else transitionTo(router, `/${item.target}`)
              }}
            >
              <span data-text={item.label}>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <Magnetic strength={0.2}>
            <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className={styles.resume}>
              <span className={styles.roll}>
                <span>Resume</span>
                <span aria-hidden="true">Grab it</span>
              </span>
              <span className={styles.arrow}>↗</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a href={LINKS.cal} target="_blank" rel="noopener noreferrer" className={styles.cta}>
              <span className={styles.avatar}>
                <Image src="/pictures/me_b_w.jpg" alt="" width={28} height={28} />
                <span className={styles.ctaDot} />
              </span>
              <span className={styles.roll}>
                <span>Let&apos;s talk</span>
                <span aria-hidden="true">Book a call</span>
              </span>
            </a>
          </Magnetic>
        </div>
      </div>
    </header>
  )
}
