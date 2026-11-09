'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { EDUCATION, LINKS, SONGS, STACK, TIMELINE } from '../data/content'
import { AWARDS } from '@/data/awards'
import { popConfetti } from '../lib/goats'
import { Split } from '../components/Split'
import { Badge } from './about/Badge'
import { unlock } from '../lib/achievements'
import styles from './About.module.scss'

const YEARS_OF_XP = new Date().getFullYear() - 2021

const STATS = [
  { value: YEARS_OF_XP, suffix: '+', label: 'years shipping' },
  { value: TIMELINE.length, suffix: '', label: 'teams & clients' },
  { value: AWARDS.length, suffix: '', label: 'awards' },
  { value: 0, suffix: '0', label: 'coffees · water only 💧' }
]

const Arrow = () => <span className={styles.arrow}>↗</span>

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

      gsap.utils.toArray<HTMLElement>('.js-reveal').forEach((element) => {
        gsap.from(element, {
          y: 50,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: element, start: 'top 88%' }
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

  return (
    <section id="about" ref={root} className={styles.about}>
      <h2 className={styles.title}>
        <Split text="Who am I" mask />
      </h2>

      {/* ---------- intro */}
      <div className={styles.intro}>
        <Badge />

        <div className={`${styles.introText} js-reveal`}>
          <p className={styles.eyebrow}>Hello, world</p>
          <p className={styles.lead}>
            I&apos;m Nicolas, <em>but Nico works just fine.</em>
          </p>
          <p className={styles.bio}>
            Software engineer shipping web & mobile apps since 2021. I build interfaces that make users go{' '}
            <em>&ldquo;oh, nice&rdquo;</em>. Currently building at Shotgun, and teaching the next generation of devs at
            ETNA on the side.
          </p>
          <div className={styles.pills}>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={styles.pill}>
              LinkedIn
            </a>
            <a href={`mailto:${LINKS.email}`} className={styles.pill}>
              Email
            </a>
            <a href={LINKS.x} target="_blank" rel="noopener noreferrer" className={styles.pill}>
              X
            </a>
            <a
              href={LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.pill} ${styles.pillLight}`}
            >
              Resume <Arrow />
            </a>
          </div>

          <div className={styles.stats}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.stat}>
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
      <div className={`${styles.section} js-reveal`}>
        <div className={styles.sectionHead}>
          <h3 className={styles.sectionTitle}>Experience</h3>
          <span className={styles.sectionCount}>{String(TIMELINE.length).padStart(2, '0')}</span>
        </div>
        <ul className={styles.experience}>
          {TIMELINE.map((item) => (
            <li key={item.company}>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.job}>
                <span className={styles.period}>{item.period}</span>
                <span className={styles.jobRole}>
                  {item.current ? <span className={styles.live} /> : null}
                  {item.role}
                </span>
                <span className={styles.jobCompany}>{item.company}</span>
                <span className={styles.jobTag}>
                  {item.tag ? <span className={styles.tag}>{item.tag}</span> : null}
                </span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- 3 columns */}
      <div className={styles.columns}>
        <div className={`${styles.column} js-reveal`}>
          <canvas ref={confettiRef} className={styles.confetti} aria-hidden="true" />
          <h3 className={styles.columnTitle}>Education</h3>
          <ul className={styles.education}>
            {EDUCATION.map((item) => (
              <li key={item.school}>
                <span className={styles.period}>{item.period}</span>
                <p className={styles.eduTitle}>{item.title}</p>
                <div className={styles.eduMeta}>
                  <span className={styles.muted}>@{item.school}</span>
                  <span
                    className={`${styles.tag} ${item.honor === 'Major' ? styles.major : ''}`}
                    onPointerEnter={
                      item.honor === 'Major'
                        ? () => {
                            popConfetti(confettiRef.current)
                            unlock('major')
                          }
                        : undefined
                    }
                    data-cursor={item.honor === 'Major' ? 'N°1 😎' : 'Not bad 👌'}
                    data-cursor-big
                  >
                    {item.honor}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.column} js-reveal`}>
          <h3 className={styles.columnTitle}>Daily drivers</h3>
          <ul className={styles.stack}>
            {STACK.map((tool) => (
              <li key={tool.name} className={styles.tool} data-tooltip={tool.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tool.icon} alt={tool.name} width={44} height={44} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.column} js-reveal`}>
          <h3 className={styles.columnTitle}>On repeat</h3>
          <Songs />
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
