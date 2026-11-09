'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { onIntroDone } from '../lib/intro'
import { HERO_WORDS, LINKS } from '../data/content'
import { ParticleTitle } from '../components/ParticleTitle'
import { Split } from '../components/Split'
import { scrollToTarget } from '../components/SmoothScroll'
import { toast } from '../components/Toast'
import { emit, on } from '../lib/bus'
import { unlock } from '../lib/achievements'
import styles from './Hero.module.scss'

const particlesOn = () => document.documentElement.dataset.particles === 'on'

export const Hero = () => {
  const root = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [word, setWord] = useState(HERO_WORDS[0])
  const wordIndex = useRef(0)
  const isSwapping = useRef(false)

  // Intro: the particles write the title, then the rest of the hero appears ('hero:title').
  // The DOM title stays invisible while particles own it (still there for screen readers & SEO).
  useEffect(() => {
    const scope = root.current
    if (!scope) return
    const ctx = gsap.context(() => {
      gsap.set(['.js-char', `.${styles.hi}`, `.${styles.status}`, `.${styles.meta}`], { autoAlpha: 0 })
    }, scope)

    let revealed = false
    let fallback: ReturnType<typeof setTimeout>
    const reveal = () => {
      if (revealed) return
      revealed = true
      clearTimeout(fallback)
      ctx.add(() => {
        const tl = gsap.timeline()
        // no particles (no WebGL / reduced motion): show the regular title
        if (!particlesOn()) {
          tl.fromTo(
            '.js-char',
            { yPercent: 115, autoAlpha: 1 },
            { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.025 }
          )
        }
        tl.fromTo(
          `.${styles.hi}`,
          { yPercent: 100, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, ease: 'expo.out' },
          0
        )
          .fromTo(
            [`.${styles.status}`, `.${styles.meta}`],
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', stagger: 0.08 },
            0.2
          )
          .to(`.${styles.emoji}`, {
            keyframes: [{ rotate: -20 }, { rotate: 18 }, { rotate: -10 }, { rotate: 0 }],
            duration: 1.2,
            ease: 'power1.inOut',
            repeat: -1,
            repeatDelay: 4
          })
      })
    }
    const unsubscribeTitle = on('hero:title', reveal)
    const unsubscribe = onIntroDone(() => {
      fallback = setTimeout(reveal, 4500)
    })

    return () => {
      unsubscribe()
      unsubscribeTitle()
      clearTimeout(fallback)
      ctx.revert()
    }
  }, [])

  // 🥚 press & hold then release: the black hole explodes, the hero shakes
  useEffect(() => {
    const scope = root.current
    if (!scope) return
    let shockwaves = 0
    const onShockwave = () => {
      gsap.fromTo(
        scope.querySelector(`.${styles.content}`),
        { x: 0 },
        { keyframes: [{ x: -14 }, { x: 12 }, { x: -8 }, { x: 5 }, { x: 0 }], duration: 0.5, ease: 'power2.out' }
      )
      shockwaves += 1
      if (shockwaves === 1) toast('💥 Boom. You found the black hole.')
      unlock('black-hole')
    }
    scope.addEventListener('brd:shockwave', onShockwave)
    return () => scope.removeEventListener('brd:shockwave', onShockwave)
  }, [])

  useGSAP(
    () => {
      // scrolling away: everything lifts and fades together (same px offset → particles stay on their letters)
      gsap.to([`.${styles.content}`, `.${styles.canvas}`], {
        y: () => -window.innerHeight * 0.22,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true
        }
      })
    },
    { scope: root }
  )

  // "I'm just a ___ Engineer": click the word, the particles re-form a new one.
  const swapWord = () => {
    if (isSwapping.current || !root.current) return
    unlock('word-swap')
    wordIndex.current = (wordIndex.current + 1) % HERO_WORDS.length
    const nextWord = HERO_WORDS[wordIndex.current]

    if (particlesOn()) {
      isSwapping.current = true
      setWord(nextWord)
      // wait for React to render the new word, then let the particles re-sample the title
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          emit('hero:retarget')
          setTimeout(() => (isSwapping.current = false), 500)
        })
      )
      return
    }

    isSwapping.current = true
    const chars = root.current.querySelectorAll(`.${styles.swap} .split-char`)
    gsap.to(chars, {
      yPercent: -115,
      duration: 0.45,
      ease: 'expo.in',
      stagger: 0.015,
      onComplete: () => {
        setWord(nextWord)
        requestAnimationFrame(() => {
          const next = root.current?.querySelectorAll(`.${styles.swap} .split-char`)
          if (!next) return
          gsap.fromTo(
            next,
            { yPercent: 115, autoAlpha: 1 },
            {
              yPercent: 0,
              duration: 0.8,
              ease: 'expo.out',
              stagger: 0.02,
              onComplete: () => {
                isSwapping.current = false
              }
            }
          )
        })
      }
    })
  }

  return (
    <section id="top" ref={root} className={styles.hero}>
      <ParticleTitle titleRef={titleRef} className={styles.canvas} />

      <div className={styles.content}>
        <p className={styles.hiMask}>
          <span className={styles.hi}>
            Hi!{' '}
            <span className={styles.emoji} aria-hidden="true">
              ✌️
            </span>{' '}
            I&apos;m Nicolas Brouard
          </span>
        </p>

        <h1 ref={titleRef} className={styles.title}>
          <span className={styles.line}>
            <Split text="I'm just a" mask charClassName="js-char" />
          </span>
          <span className={styles.line}>
            <button
              type="button"
              className={styles.swap}
              onClick={swapWord}
              data-cursor="Click me"
              aria-label="Change the word"
            >
              <Split key={word} text={word} mask charClassName="js-char" />
            </button>{' '}
            <Split text="Engineer" mask charClassName="js-char" />
          </span>
        </h1>

        <div className={styles.status}>
          <span className={styles.dot} />
          <span className={styles.roll}>
            <span>Building @Shotgun · Teaching @ETNA</span>
            <a href={`mailto:${LINKS.email}`} data-cursor="Slide into my inbox 📬">
              ↪ {LINKS.email}
            </a>
          </span>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.meta}>Paris, FR — 48.85°N 2.35°E</p>
        <button type="button" className={`${styles.meta} ${styles.scrollCue}`} onClick={() => scrollToTarget('#intro')}>
          <span className={styles.scrollLine} />
          Scroll, it&apos;s worth it
        </button>
        <p className={`${styles.meta} ${styles.metaRight}`}>Hover · click · hold</p>
      </div>
    </section>
  )
}
