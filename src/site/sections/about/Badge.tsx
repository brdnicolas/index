'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/intro'
import { releaseTheGoats } from '../../lib/goats'
import { unlock } from '../../lib/achievements'
import { LINKS } from '../../data/content'
import { toast } from '../../components/Toast'
import styles from './Badge.module.scss'

const ROPE = 200 // rest length of the lanyard, px
const GOAT_FLIPS = 10
const COMPANY = 'Shotgun'
const STARTED_AT = new Date('2026-11-12T09:00:00+01:00')

const pad = (value: number) => String(value).padStart(2, '0')

// "1y 2m 3d · 04:05:06" — or a countdown before the first day
const formatSeniority = (now: Date) => {
  const diff = now.getTime() - STARTED_AT.getTime()
  if (diff < 0) {
    const total = Math.floor(-diff / 1000)
    const days = Math.floor(total / 86400)
    const hours = Math.floor((total % 86400) / 3600)
    const minutes = Math.floor((total % 3600) / 60)
    return { label: 'Starts in', value: `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(total % 60)}s` }
  }
  const seconds = Math.floor(diff / 1000) % 86400
  // count whole days from the last "start time of day", so 08:00 doesn't count as a full extra day
  const day = new Date(now.getTime() - seconds * 1000)
  let years = day.getFullYear() - STARTED_AT.getFullYear()
  let months = day.getMonth() - STARTED_AT.getMonth()
  let days = day.getDate() - STARTED_AT.getDate()
  if (days < 0) {
    months -= 1
    days += new Date(day.getFullYear(), day.getMonth(), 0).getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }
  const time = `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`
  const date = [years ? `${years}y` : '', years || months ? `${months}m` : '', `${days}d`].filter(Boolean).join(' ')
  return { label: 'Seniority', value: `${date} · ${time}` }
}

/*
 * An employee badge on a lanyard, with a tiny physics sim:
 * grab it, throw it, it swings and settles. Click (without dragging) flips it.
 * Everything is written straight to transforms in a rAF loop — no React re-renders.
 */
export const Badge = () => {
  const stageRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const ropeRef = useRef<SVGPathElement>(null)
  const textRopeRef = useRef<SVGPathElement>(null)
  const seniorityLabelRef = useRef<HTMLElement>(null)
  const seniorityRef = useRef<HTMLElement>(null)

  // live seniority counter (written to the DOM directly, once per second)
  useEffect(() => {
    const tick = () => {
      const { label, value } = formatSeniority(new Date())
      if (seniorityLabelRef.current) seniorityLabelRef.current.textContent = label
      if (seniorityRef.current) seniorityRef.current.textContent = value
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    const badge = badgeRef.current
    const rope = ropeRef.current
    const textRope = textRopeRef.current
    if (!stage || !badge || !rope || !textRope) return

    const reduced = prefersReducedMotion()
    const anchor = { x: 0, y: 0 }
    const rest = { x: 0, y: 0 }
    const p = { x: 0, y: 0 }
    const v = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const grab = { x: 0, y: 0 }
    const flip = { angle: 0 }
    let dragging = false
    let moved = 0
    let flips = 0
    let time = 0
    let entered = false

    const layout = () => {
      anchor.x = stage.clientWidth / 2
      anchor.y = 0
      rest.x = anchor.x
      rest.y = anchor.y + ROPE
      if (!entered) {
        // start pulled up (but always below the anchor) and a bit to the side: it drops & swings in
        p.x = rest.x - 70
        p.y = rest.y - 140
        v.x = 0
        v.y = 0
      }
    }
    layout()
    const resizeObserver = new ResizeObserver(layout)
    resizeObserver.observe(stage)

    const local = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }

    const flipBadge = () => {
      gsap.to(flip, { angle: flip.angle + 180, duration: 0.9, ease: 'back.out(1.3)' })
      v.y -= 6
      flips += 1
      if (flips === 3) toast('Careful, it might fall off 😅')
      if (flips >= GOAT_FLIPS) {
        flips = 0
        releaseTheGoats()
        toast('10 flips. Employee of the month: a GOAT 🐐')
        unlock('goat-photo')
      }
    }

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0 || (event.target as Element).closest('a')) return
      badge.setPointerCapture(event.pointerId)
      const point = local(event)
      dragging = true
      moved = 0
      grab.x = point.x - p.x
      grab.y = point.y - p.y
      target.x = p.x
      target.y = p.y
      badge.dataset.dragging = 'true'
    }
    const onMove = (event: PointerEvent) => {
      if (!dragging) return
      const point = local(event)
      const nx = point.x - grab.x
      const ny = Math.max(anchor.y + 30, point.y - grab.y)
      moved += Math.hypot(nx - target.x, ny - target.y)
      const dx = nx - anchor.x
      const dy = ny - anchor.y
      const distance = Math.hypot(dx, dy)
      const max = ROPE * 1.6
      const k = distance > max ? max / distance : 1
      target.x = anchor.x + dx * k
      target.y = anchor.y + dy * k
    }
    const onUp = (event: PointerEvent) => {
      if (!dragging) return
      dragging = false
      badge.releasePointerCapture?.(event.pointerId)
      delete badge.dataset.dragging
      if (moved < 6) flipBadge()
    }

    badge.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)

    const render = () => {
      const dx = p.x - anchor.x
      // never let the badge go above its anchor: no upside-down badge, ever
      const dy = Math.max(p.y - anchor.y, 30)
      const distance = Math.hypot(dx, dy)
      const slack = Math.max(0, ROPE - distance)
      const cx = anchor.x + dx * 0.5
      const cy = anchor.y + dy * 0.5 + slack * 0.7
      const d = `M ${anchor.x} ${anchor.y - 60} L ${anchor.x} ${anchor.y} Q ${cx} ${cy} ${anchor.x + dx} ${anchor.y + dy}`
      rope.setAttribute('d', d)
      textRope.setAttribute('d', d)

      const angle = Math.atan2(dx, dy)
      const rotateZ = gsap.utils.clamp(-70, 70, (-angle * 180) / Math.PI - v.x * 0.6)
      const twist = gsap.utils.clamp(-40, 40, v.x * 3.2)
      const tilt = gsap.utils.clamp(-25, 25, -v.y * 2)
      badge.style.transform = `translate3d(${anchor.x + dx - badge.offsetWidth / 2}px, ${anchor.y + dy}px, 0) rotateZ(${rotateZ}deg) rotateX(${tilt}deg) rotateY(${twist + flip.angle}deg)`
      badge.style.setProperty('--shine', `${50 + twist * 1.5 + rotateZ}%`)
    }

    let frame = 0
    let last = performance.now()
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)
      const dt = Math.min((now - last) / 16.67, 2)
      last = now
      time += dt / 60

      if (dragging) {
        const px = p.x
        const py = p.y
        p.x += (target.x - p.x) * 0.35
        p.y += (target.y - p.y) * 0.35
        v.x = p.x - px
        v.y = p.y - py
      } else {
        const sway = reduced ? 0 : Math.sin(time * 1.1) * 0.04
        v.x = (v.x + ((rest.x - p.x) * 0.035 + sway) * dt) * Math.pow(0.95, dt)
        v.y = (v.y + (rest.y - p.y) * 0.06 * dt) * Math.pow(0.9, dt)
        p.x += v.x * dt
        p.y += v.y * dt
      }
      render()
    }

    const play = () => {
      if (!frame) {
        last = performance.now()
        frame = requestAnimationFrame(loop)
      }
    }
    const pause = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!entered) {
            entered = true
            if (reduced) {
              p.x = rest.x
              p.y = rest.y
            }
            stage.dataset.ready = 'true'
          }
          play()
        } else pause()
      },
      { threshold: 0.3 }
    )
    observer.observe(stage)
    render()

    return () => {
      pause()
      observer.disconnect()
      resizeObserver.disconnect()
      badge.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      gsap.killTweensOf(flip)
    }
  }, [])

  return (
    <div ref={stageRef} className={styles.stage}>
      <svg className={styles.lanyard} aria-hidden="true">
        <defs>
          <linearGradient id="strap" x1="0" x2="1">
            <stop offset="0" stopColor="#161616" />
            <stop offset="0.5" stopColor="#262626" />
            <stop offset="1" stopColor="#161616" />
          </linearGradient>
        </defs>
        <path ref={ropeRef} className={styles.strap} />
        <path ref={textRopeRef} id="badge-rope" className={styles.ropeGuide} />
        <text className={styles.strapText}>
          <textPath href="#badge-rope" startOffset="70">
            NICOLAS BROUARD · SOFTWARE ENGINEER · NICOLAS BROUARD · SOFTWARE ENGINEER
          </textPath>
        </text>
      </svg>

      <div ref={badgeRef} className={styles.badge} data-cursor="Drag me · click to flip">
        <span className={styles.clip} aria-hidden="true" />

        {/* ---------- front */}
        <div className={`${styles.face} ${styles.front}`}>
          <span className={styles.slot} aria-hidden="true" />

          <div className={styles.photo}>
            <Image src="/pictures/me_b_w.jpg" alt="Nicolas Brouard" fill sizes="320px" priority={false} />
            <span className={styles.status}>
              <span className={styles.dot} /> On site
            </span>
          </div>

          <div className={styles.identity}>
            <p className={styles.name}>Nicolas Brouard</p>
            <p className={styles.role}>Software Engineer</p>
          </div>

          <dl className={styles.fields}>
            <div className={styles.field}>
              <dt>Location</dt>
              <dd>Paris, France</dd>
            </div>
            <div className={styles.field}>
              <dt>Company</dt>
              <dd>
                <span className={styles.company}>{COMPANY}</span>
              </dd>
            </div>
            <div className={styles.field}>
              <dt ref={seniorityLabelRef as React.RefObject<HTMLElement>}>Seniority</dt>
              <dd ref={seniorityRef as React.RefObject<HTMLElement>} className={styles.counter}>
                …
              </dd>
            </div>
          </dl>

          <div className={styles.footer}>
            <span className={styles.barcode} aria-hidden="true" />
            <span className={styles.idNumber}>№ 0001</span>
          </div>
          <span className={styles.shine} aria-hidden="true" />
        </div>

        {/* ---------- back */}
        <div className={`${styles.face} ${styles.back}`}>
          <span className={styles.slot} aria-hidden="true" />
          <p className={styles.backTitle}>If found, please return to</p>
          <p className={styles.backName}>Nicolas Brouard</p>
          <ul className={styles.backList}>
            <li>Building @{COMPANY}</li>
            <li>Teaching @ETNA</li>
            <li>Valid until: forever</li>
          </ul>
          <div className={styles.backLinks}>
            <a href={`mailto:${LINKS.email}`}>Email me ↗</a>
            <a href={LINKS.cal} target="_blank" rel="noopener noreferrer">
              Book a call ↗
            </a>
            <a href={LINKS.resume} target="_blank" rel="noopener noreferrer">
              Resume ↗
            </a>
          </div>
          <span className={styles.shine} aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
