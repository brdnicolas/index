'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Experience } from '@/data/projects'
import { gsap, useGSAP } from '../lib/gsap'
import { endTransition, transitionTo } from '../lib/transition'
import { onIntroDone } from '../lib/intro'
import { Split } from '../components/Split'
import styles from './CaseStudy.module.scss'

type CaseStudyProps = {
  project: Experience & { displayDate: string }
  index: number
  total: number
  next: { slug: string; company: string; thumbnail: string; role: string }
}

const pad = (value: number) => String(value).padStart(2, '0')

export const CaseStudy = ({ project, index, total, next }: CaseStudyProps) => {
  const root = useRef<HTMLElement>(null)
  const nextImageRef = useRef<HTMLImageElement>(null)
  const router = useRouter()

  useGSAP(
    () => {
      // hero image drifts while you scroll away
      gsap.to(`.${styles.heroImage}`, {
        yPercent: 18,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: `.${styles.hero}`, start: 'top top', end: 'bottom top', scrub: true }
      })

      gsap.fromTo(
        `.${styles.description} .split-word`,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: `.${styles.description}`, start: 'top 80%', end: 'bottom 60%', scrub: true }
        }
      )

      // images unfold from a rounded window
      gsap.utils.toArray<HTMLElement>(`.${styles.shot}`).forEach((shot) => {
        gsap.fromTo(
          shot,
          { clipPath: 'inset(12% 12% 12% 12% round 28px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 20px)',
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: { trigger: shot, start: 'top 85%' }
          }
        )
        const image = shot.querySelector('img')
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.25 },
            { scale: 1, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: shot, start: 'top 85%' } }
          )
        }
      })

      gsap.utils.toArray<HTMLElement>(`.${styles.phones}`).forEach((row) => {
        gsap.fromTo(
          row.children,
          { yPercent: 30, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: { trigger: row, start: 'top 85%' }
          }
        )
      })

      gsap.utils.toArray<HTMLElement>(`.${styles.subHead}`).forEach((head) => {
        gsap.from(head.children, {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: head, start: 'top 85%' }
        })
      })
    },
    { scope: root }
  )

  // hero title waits for the intro (direct landing) or plays right away (client navigation)
  useEffect(() => {
    const scope = root.current
    if (!scope) return
    const targets = `.${styles.title} .split-char, .${styles.heroMeta} > *`
    const ctx = gsap.context(() => gsap.set(targets, { autoAlpha: 0 }), scope)
    const unsubscribe = onIntroDone(() => {
      ctx.add(() => {
        gsap
          .timeline({ delay: 0.3 })
          .fromTo(
            `.${styles.title} .split-char`,
            { yPercent: 115, autoAlpha: 1 },
            { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.035 }
          )
          .fromTo(
            `.${styles.heroMeta} > *`,
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', stagger: 0.08 },
            '-=1'
          )
      })
    })
    return () => {
      unsubscribe()
      ctx.revert()
    }
  }, [])

  const goNext = (event: React.MouseEvent) => {
    event.preventDefault()
    transitionTo(router, `/work/${next.slug}`, nextImageRef.current)
  }

  const goHome = (event: React.MouseEvent) => {
    event.preventDefault()
    transitionTo(router, '/#work')
  }

  return (
    <main ref={root} className={styles.case}>
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src={project.thumbnail}
            alt={`${project.company} preview`}
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
            onLoad={() => endTransition(true)}
          />
        </div>
        <div className={styles.heroShade} />

        <div className={styles.heroContent}>
          <a href="/#work" onClick={goHome} className={styles.back}>
            ← All projects
          </a>
          <p className={styles.caseIndex}>
            Case {pad(index + 1)} / {pad(total)}
          </p>
          <h1 className={styles.title}>
            <Split text={project.company} mask />
          </h1>
          <dl className={styles.heroMeta}>
            <div>
              <dt>Role</dt>
              <dd>{project.job}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>{project.displayDate}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.techs.slice(0, 3).join(', ')}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={styles.intro}>
        <p className={styles.eyebrow}>The mission</p>
        <p className={styles.description}>
          <Split text={project.description} by="words" />
        </p>
        <ul className={styles.techs}>
          {project.techs.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </section>

      {project.subProjects.map((subProject, subIndex) => (
        <section key={subProject.title} className={styles.sub}>
          <div className={styles.subHead}>
            <span className={styles.subIndex}>{pad(subIndex + 1)}</span>
            <h2 className={styles.subTitle}>{subProject.title}</h2>
            {subProject.url ? (
              <a
                href={subProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.live}
                data-cursor="Visit"
              >
                <span className={styles.liveDot} />
                Live ↗
              </a>
            ) : null}
            <p className={styles.subDescription}>{subProject.description}</p>
          </div>

          {subProject.device === 'mobile' ? (
            <div className={styles.phones}>
              {subProject.images.map((image) => (
                <div key={image} className={styles.phone}>
                  <Image src={image} alt={`${subProject.title} screen`} fill sizes="(max-width: 768px) 60vw, 280px" />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.gallery}>
              {subProject.images.map((image, imageIndex) => (
                <div key={image} className={`${styles.shot} ${imageIndex === 0 ? styles.shotWide : ''}`}>
                  <Image
                    src={image}
                    alt={`${subProject.title} view ${imageIndex + 1}`}
                    fill
                    sizes={imageIndex === 0 ? '(max-width: 768px) 100vw, 1260px' : '(max-width: 768px) 100vw, 630px'}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      <a href={`/work/${next.slug}`} onClick={goNext} className={styles.next} data-cursor="Next case">
        <span className={styles.nextLabel}>Next case →</span>
        <span className={styles.nextName}>{next.company}</span>
        <span className={styles.nextRole}>{next.role}</span>
        <span className={styles.nextMedia}>
          <Image ref={nextImageRef} src={next.thumbnail} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" />
        </span>
      </a>
    </main>
  )
}
