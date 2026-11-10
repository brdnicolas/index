'use client'

import { CSSProperties, PointerEvent, useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { EDUCATION, LINKS, SONGS, STACK, TIMELINE } from '../data/content'
import { AWARDS } from '@/data/awards'
import { popConfetti } from '../lib/goats'
import { Split } from '../components/Split'
import { unlock } from '../lib/achievements'
import { COMPANY, formatSeniority } from '../lib/seniority'
import { ParticlePortrait } from './about/ParticlePortrait'
import styles from './About.module.scss'

const YEARS_OF_XP = new Date().getFullYear() - 2021

const STATS = [
  { value: YEARS_OF_XP, suffix: '+', label: 'years shipping' },
  { value: TIMELINE.length, suffix: '', label: 'teams & clients' },
  { value: AWARDS.length, suffix: '', label: 'awards' },
  { value: 0, suffix: '0', label: 'coffees · water only 💧' }
]

// brand color of each company: the glow under its row on hover
const BRAND: Record<string, string> = {
  Shotgun: '#a3a3a3',
  ETNA: '#7b5cff',
  Ornikar: '#8e44ff',
  'Big Mamma': '#d2643a',
  Free: '#e30613',
  'Bell Intone': '#d0021b',
  'Mentor Goal': '#4a78b0'
}

const CURRENT = TIMELINE.find((item) => item.company === COMPANY)

const LEDE =
  "Self-taught software engineer from Paris. I've been shipping web & mobile products since 2021, and teaching it on the side."

// each word lights up as you scroll through the paragraph
const Words = ({ text }: { text: string }) => (
  <>
    {text.split(' ').map((word, index) => (
      <span key={`${word}-${index}`} className={`${styles.word} js-word`}>
        {word}{' '}
      </span>
    ))}
  </>
)

const Line = () => <span className={`${styles.line} js-line`} aria-hidden="true" />

const Arrow = () => <span className={styles.arrow}>↗</span>

const LiveTenure = () => {
  const [value, setValue] = useState('')
  useEffect(() => {
    const tick = () => {
      const next = formatSeniority(new Date())
      setValue(next.started ? `for ${next.value}` : next.value)
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])
  return <span className={styles.nowTimer}>{value || ' '}</span>
}

const Songs = () => {
  const [playing, setPlaying] = useState<string | null>(null)
  return (
    <>
      {playing ? (
        <iframe
          title="Spotify player"
          src={`https://open.spotify.com/embed/track/${playing}?utm_source=generator&theme=0&autoplay=1`}
          width="100%"
          height="80"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className={styles.player}
        />
      ) : null}
      <ol className={styles.tracks}>
        {SONGS.map((song, index) => (
          <li key={song.id}>
            <button
              type="button"
              className={`${styles.track} ${playing === song.id ? styles.trackActive : ''}`}
              onClick={() => setPlaying(song.id)}
              data-cursor="Play"
            >
              <span className={styles.trackIndex}>{playing === song.id ? '♪' : `0${index + 1}`}</span>
              <span>
                <span className={styles.trackTitle}>{song.title}</span>
                <span className={styles.trackArtist}>{song.artist}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </>
  )
}

// the brand glow follows the cursor inside a row
const onRowMove = (event: PointerEvent<HTMLAnchorElement>) => {
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`)
}

export const About = () => {
  const root = useRef<HTMLElement>(null)
  const confettiRef = useRef<HTMLCanvasElement>(null)

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

      // the intro paragraph lights up word by word, tied to the scroll
      gsap.fromTo(
        '.js-word',
        // 0.5 keeps the dimmed words readable (≈ 5:1 contrast on the background, WCAG AA)
        { opacity: 0.5 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: `.${styles.lede}`, start: 'top 85%', end: 'bottom 40%', scrub: true }
        }
      )

      // hairlines draw themselves
      gsap.utils.toArray<HTMLElement>('.js-line').forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: line, start: 'top 92%', once: true }
          }
        )
      })

      gsap.utils.toArray<HTMLElement>('.js-reveal').forEach((element) => {
        gsap.from(element, {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true }
        })
      })

      gsap.utils.toArray<HTMLElement>('.js-count').forEach((element) => {
        const counter = { value: 0 }
        gsap.to(counter, {
          value: Number(element.dataset.value),
          duration: 2,
          ease: 'expo.out',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          onUpdate: () => {
            element.textContent = String(Math.round(counter.value))
          }
        })
      })
    },
    { scope: root }
  )

  const master = EDUCATION[0]

  return (
    <section id="about" ref={root} className={styles.about}>
      <h2 className={styles.title}>
        <Split text="Who am I" mask />
      </h2>

      {/* ---------- me */}
      <div className={styles.me}>
        <div className={styles.portraitWrap}>
          <ParticlePortrait />
        </div>

        <div className={styles.meText}>
          <p className={`${styles.hello} js-reveal`}>Hey, I&apos;m Nico.</p>
          <p className={styles.lede}>
            <Words text={LEDE} />
          </p>
          <p className={`${styles.now} js-reveal`}>
            <span className={styles.live} />
            <span>
              Now at <strong>{COMPANY}</strong> · {CURRENT?.role}
            </span>
            <LiveTenure />
          </p>
          <div className={styles.stats}>
            <Line />
            {STATS.map((stat) => (
              <div key={stat.label} className="js-reveal">
                <p className={styles.statValue}>
                  {stat.value ? (
                    <span className="js-count" data-value={stat.value}>
                      0
                    </span>
                  ) : null}
                  {stat.suffix}
                </p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- experience */}
      <div className={styles.xpBlock}>
        <div className={`${styles.xpHead} js-reveal`}>
          <p className={styles.eyebrow}>Experience</p>
          <p className={styles.eyebrow}>{String(TIMELINE.length).padStart(2, '0')}</p>
        </div>
        <ol className={styles.xp}>
          {TIMELINE.map((item) => (
            <li key={item.company} className={styles.xpItem}>
              <Line />
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.xpRow} js-reveal`}
                style={{ '--brand': BRAND[item.company] ?? '#fff' } as CSSProperties}
                onPointerMove={onRowMove}
                data-cursor="Visit ↗"
              >
                <span className={styles.xpCompany}>
                  <span className={styles.xpDot} />
                  {item.company}
                  {item.tags?.map((tag) => (
                    <span key={tag} className={`${styles.xpTag} ${item.current ? styles.xpCurrent : ''}`}>
                      {tag}
                    </span>
                  ))}
                </span>
                <span className={styles.xpRole}>{item.role}</span>
                <span className={styles.xpYears}>{item.period}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* ---------- 3 columns */}
      <div className={styles.columns}>
        <div className={styles.column}>
          <Line />
          <canvas ref={confettiRef} className={styles.confetti} aria-hidden="true" />
          <p className={`${styles.eyebrow} ${styles.columnTitle}`}>Education</p>
          <div className="js-reveal">
            <span
              className={styles.major}
              onPointerEnter={() => {
                popConfetti(confettiRef.current)
                unlock('major')
              }}
              data-cursor="N°1 😎"
              data-cursor-big
            >
              {master.honor}
            </span>
            <p className={styles.eduTitle}>{master.title}</p>
            <p className={styles.muted}>
              @{master.school} · {master.period}
            </p>
          </div>
        </div>

        <div className={styles.column}>
          <Line />
          <p className={`${styles.eyebrow} ${styles.columnTitle}`}>Daily drivers</p>
          <ul className={`${styles.stack} js-reveal`}>
            {STACK.map((tool) => (
              <li key={tool.name} className={styles.tool} data-tooltip={tool.name}>
                <img src={tool.icon} alt={tool.name} width={44} height={44} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <Line />
          <p className={`${styles.eyebrow} ${styles.columnTitle}`}>On repeat</p>
          <div className="js-reveal">
            <Songs />
          </div>
        </div>
      </div>

      {/* ---------- links */}
      <div className={`${styles.ctas} js-reveal`}>
        <a href={LINKS.cal} target="_blank" rel="noopener noreferrer" className={styles.cta}>
          <span className={styles.ctaTitle}>Let&apos;s meet</span>
          <span className={styles.ctaText}>Grab a slot, bring an idea.</span>
          <Arrow />
        </a>
        <a href={LINKS.devto} target="_blank" rel="noopener noreferrer" className={styles.cta}>
          <span className={styles.ctaTitle}>Dev.to</span>
          <span className={styles.ctaText}>React, design systems, interviews.</span>
          <Arrow />
        </a>
        <a href="/blog" className={styles.cta}>
          <span className={styles.ctaTitle}>My blog</span>
          <span className={styles.ctaText}>Longer reads, written by hand.</span>
          <Arrow />
        </a>
      </div>
    </section>
  )
}
