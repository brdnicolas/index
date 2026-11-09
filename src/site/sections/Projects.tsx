'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { gsap, useGSAP } from '../lib/gsap'
import { transitionTo } from '../lib/transition'
import { LINKS, PROJECTS } from '../data/content'
import { Split } from '../components/Split'
import styles from './Projects.module.scss'

const pad = (value: number) => String(value).padStart(2, '0')
const TOTAL = PROJECTS.length + 1

// Vertical scroll → horizontal travel (v1 feature, now with parallax images, progress and a counter).
export const Projects = () => {
  const root = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const router = useRouter()

  // Hover: the image tilts towards the cursor, a glare follows, and a round "view case" badge rides the cursor.
  const hoverState = useRef(
    new WeakMap<
      HTMLElement,
      { tiltX: gsap.QuickToFunc; tiltY: gsap.QuickToFunc; badgeX: gsap.QuickToFunc; badgeY: gsap.QuickToFunc }
    >()
  )
  const getHover = (card: HTMLElement) => {
    let state = hoverState.current.get(card)
    if (!state) {
      const media = card.querySelector<HTMLElement>(`.${styles.media}`)!
      const badge = card.querySelector<HTMLElement>(`.${styles.badge}`)!
      state = {
        tiltX: gsap.quickTo(media, 'rotationY', { duration: 0.6, ease: 'power3' }),
        tiltY: gsap.quickTo(media, 'rotationX', { duration: 0.6, ease: 'power3' }),
        badgeX: gsap.quickTo(badge, 'x', { duration: 0.5, ease: 'power3' }),
        badgeY: gsap.quickTo(badge, 'y', { duration: 0.5, ease: 'power3' })
      }
      hoverState.current.set(card, state)
    }
    return state
  }
  const isFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const onCardMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!isFinePointer()) return
    const media = event.currentTarget.querySelector<HTMLElement>(`.${styles.media}`)!
    const rect = media.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const state = getHover(event.currentTarget)
    state.tiltX((x / rect.width - 0.5) * 10)
    state.tiltY((y / rect.height - 0.5) * -10)
    state.badgeX(x)
    state.badgeY(y)
    media.style.setProperty('--gx', `${(x / rect.width) * 100}%`)
    media.style.setProperty('--gy', `${(y / rect.height) * 100}%`)
  }
  // Ambience: the hovered project's dominant color radiates from the card and tints the whole section
  const setAmbience = (card: HTMLElement | null) => {
    const section = root.current
    if (!section) return
    if (!card) {
      gsap.to(section, { '--ambient-alpha': 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' })
      return
    }
    const color = (card.dataset.ambient ?? '255,255,255').split(',').map(Number)
    const media = card.querySelector<HTMLElement>(`.${styles.media}`)!.getBoundingClientRect()
    const box = section.getBoundingClientRect()
    gsap.to(section, {
      '--ambient-r': color[0],
      '--ambient-g': color[1],
      '--ambient-b': color[2],
      '--ambient-alpha': 1,
      '--ambient-x': `${media.left - box.left + media.width / 2}px`,
      '--ambient-y': `${media.top - box.top + media.height / 2}px`,
      duration: 0.8,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }

  const onCardEnter = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!isFinePointer()) return
    setAmbience(event.currentTarget)
    const media = event.currentTarget.querySelector<HTMLElement>(`.${styles.media}`)!
    const rect = media.getBoundingClientRect()
    const badge = event.currentTarget.querySelector<HTMLElement>(`.${styles.badge}`)!
    gsap.set(badge, { x: event.clientX - rect.left, y: event.clientY - rect.top })
    gsap.to(badge, { scale: 1, duration: 0.6, ease: 'back.out(2)', overwrite: 'auto' })
  }
  const onCardLeave = (event: React.PointerEvent<HTMLAnchorElement>) => {
    setAmbience(null)
    const state = getHover(event.currentTarget)
    state.tiltX(0)
    state.tiltY(0)
    gsap.to(event.currentTarget.querySelector(`.${styles.badge}`), {
      scale: 0,
      duration: 0.4,
      ease: 'power3.in',
      overwrite: 'auto'
    })
  }

  const openCase = (event: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    event.preventDefault()
    const card = event.currentTarget
    transitionTo(
      router,
      `/work/${slug}`,
      card.querySelector<HTMLImageElement>('img'),
      card.querySelector<HTMLElement>('[data-transition-frame]')
    )
  }

  useGSAP(
    () => {
      const track = trackRef.current
      if (!track) return

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)

      const travel = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(`.${styles.bar}`, { scaleX: self.progress })
            const index = Math.min(TOTAL, Math.round(self.progress * (TOTAL - 1)) + 1)
            if (counterRef.current) counterRef.current.textContent = pad(index)
          }
        }
      })

      gsap.utils.toArray<HTMLElement>(`.${styles.imgWrap}`).forEach((image) => {
        gsap.fromTo(
          image,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: image.parentElement!,
              containerAnimation: travel,
              start: 'left right',
              end: 'right left',
              scrub: true
            }
          }
        )
      })

      gsap.fromTo(
        `.${styles.title} .split-char`,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.03,
          scrollTrigger: { trigger: root.current, start: 'top 75%' }
        }
      )

      gsap.from(`.${styles.card}`, {
        x: 200,
        autoAlpha: 0,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 60%' }
      })
    },
    { scope: root }
  )

  return (
    <section id="work" ref={root} className={styles.work}>
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.head}>
        <div>
          <h2 className={styles.title}>
            <Split text="Projects" mask />
          </h2>
          <p className={styles.subtitle}>Turning ideas into reality, one shipped thing at a time.</p>
        </div>
        <p className={styles.counter}>
          <span ref={counterRef}>01</span> / {pad(TOTAL)}
        </p>
      </div>

      <div ref={trackRef} className={styles.track}>
        {PROJECTS.map((project, index) => (
          <a
            key={project.slug}
            href={`/work/${project.slug}`}
            onClick={(event) => openCase(event, project.slug)}
            className={styles.card}
            data-ambient={project.ambient.join(',')}
            onPointerEnter={onCardEnter}
            onPointerMove={onCardMove}
            onPointerLeave={onCardLeave}
          >
            <div className={styles.media} data-transition-frame data-cursor-hide>
              <div className={styles.imgWrap}>
                <Image
                  src={project.thumbnail}
                  alt={`${project.company} preview`}
                  fill
                  sizes="(max-width: 768px) 90vw, 50vw"
                  className={styles.img}
                />
              </div>
              <span className={styles.index}>{pad(index + 1)}</span>
              <span className={styles.glare} />
              <span className={styles.badge} aria-hidden="true">
                <svg viewBox="0 0 100 100" className={styles.badgeText}>
                  <defs>
                    <path id={`circle-${project.slug}`} d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                  </defs>
                  <text>
                    <textPath href={`#circle-${project.slug}`}>VIEW CASE • VIEW CASE • VIEW CASE •</textPath>
                  </text>
                </svg>
                <span className={styles.badgeArrow}>↗</span>
              </span>
            </div>
            <div className={styles.info}>
              <div>
                <p className={styles.date}>{project.displayDate}</p>
                <h3 className={styles.company}>{project.company}</h3>
                <p className={styles.role}>{project.job}</p>
              </div>
              <div>
                <p className={styles.description}>{project.description}</p>
                <ul className={styles.techs}>
                  {project.techs.slice(0, 4).map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          </a>
        ))}

        <a
          href={LINKS.cal}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.card} ${styles.next}`}
          data-cursor="Let's talk"
        >
          <div className={`${styles.media} ${styles.nextMedia}`}>
            <span className={styles.nextBig}>
              Your
              <br />
              <em>idea</em> here
            </span>
            <span className={styles.index}>{pad(TOTAL)}</span>
          </div>
          <div className={styles.info}>
            <div>
              <p className={styles.date}>Someday</p>
              <h3 className={styles.company}>Our next project</h3>
              <p className={styles.role}>@your-company</p>
            </div>
            <p className={styles.description}>
              Could be the start of something great. Your ideas, my keyboard. The possibilities? Endless. The results?
              Legendary (I&apos;m humble, too).
            </p>
          </div>
        </a>
      </div>

      <div className={styles.progress}>
        <span className={styles.bar} />
      </div>
    </section>
  )
}
