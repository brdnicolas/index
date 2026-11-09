'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/intro'
import { releaseTheGoats } from '../../lib/goats'
import { toast } from '../../components/Toast'
import { unlock } from '../../lib/achievements'
import styles from './Portrait.module.scss'

/*
 * My photo, made of particles — same family as the hero title.
 * - colored dots sampled from the photo (bigger where it's brighter), in a rectangle that fades at its border
 * - they fly in and assemble when the section scrolls in
 * - they flee the cursor and spring back · click = shockwave · 10 clicks = goats
 * Physics on the CPU (a few thousand dots), drawing is WebGL points.
 */

const SRC = '/mail/profile.png'
// the original is a 19 MB png, and we only sample it small: go through the image optimizer
const SAMPLE_SRC = `/_next/image?url=${encodeURIComponent(SRC)}&w=640&q=80`
const FOCUS = [0.56, 0.42]
const GOAT_CLICKS = 10

const VERTEX = `
attribute vec2 aPos;
attribute vec4 aLook; // r, g, b, size
uniform vec2 uRes;
uniform float uDpr;
uniform float uTime;
uniform float uAlpha;
varying vec4 vColor;
void main() {
  vec2 pos = aPos + vec2(sin(uTime * 1.6 + aPos.y * 0.05), cos(uTime * 1.3 + aPos.x * 0.05)) * 0.3;
  gl_Position = vec4(pos.x / uRes.x * 2.0 - 1.0, 1.0 - pos.y / uRes.y * 2.0, 0.0, 1.0);
  gl_PointSize = aLook.a * uDpr;
  vColor = vec4(aLook.rgb, uAlpha);
}
`

const FRAGMENT = `
precision mediump float;
varying vec4 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5);
  gl_FragColor = vec4(vColor.rgb, smoothstep(0.5, 0.2, d) * vColor.a);
}
`

export const ParticlePortrait = () => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false })
    if (!gl) {
      setFallback(true)
      return
    }
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT))
    gl.bindAttribLocation(program, 0, 'aPos')
    gl.bindAttribLocation(program, 1, 'aLook')
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFallback(true)
      return
    }
    gl.useProgram(program)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)

    const uni = {
      res: gl.getUniformLocation(program, 'uRes'),
      dpr: gl.getUniformLocation(program, 'uDpr'),
      time: gl.getUniformLocation(program, 'uTime'),
      alpha: gl.getUniformLocation(program, 'uAlpha')
    }
    const posBuffer = gl.createBuffer()
    const lookBuffer = gl.createBuffer()

    const reduced = prefersReducedMotion()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const image = new window.Image()
    image.src = SAMPLE_SRC

    let width = 0
    let height = 0
    let count = 0
    let x = new Float32Array(0)
    let y = new Float32Array(0)
    let vx = new Float32Array(0)
    let vy = new Float32Array(0)
    let hx = new Float32Array(0)
    let hy = new Float32Array(0)
    let pos = new Float32Array(0)

    const fx = { alpha: reduced ? 1 : 0, spring: reduced ? 1 : 0 }
    const pointer = { x: -9999, y: -9999 }
    let started = reduced
    let clicks = 0

    /** Sample the photo (cover, focused on the face) into a grid of dots. */
    const build = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      if (!width || !height || !image.complete || !image.naturalWidth) return
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)

      const step = width > 420 ? 5 : 4
      const cols = Math.floor(width / step)
      const rows = Math.floor(height / step)
      const sampler = document.createElement('canvas')
      sampler.width = cols
      sampler.height = rows
      const ctx = sampler.getContext('2d', { willReadFrequently: true })!
      const scale = Math.max(cols / image.naturalWidth, rows / image.naturalHeight)
      const drawW = image.naturalWidth * scale
      const drawH = image.naturalHeight * scale
      ctx.drawImage(image, (cols - drawW) * FOCUS[0], (rows - drawH) * FOCUS[1], drawW, drawH)
      const data = ctx.getImageData(0, 0, cols, rows).data

      const look: number[] = []
      const homes: number[] = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const index = (row * cols + col) * 4
          const r = data[index] / 255
          const g = data[index + 1] / 255
          const b = data[index + 2] / 255
          const light = 0.299 * r + 0.587 * g + 0.114 * b
          // rectangle, with dots shrinking along a thin border so it fades into the page
          const fromX = Math.min(col, cols - 1 - col) / (cols * 0.07)
          const fromY = Math.min(row, rows - 1 - row) / (rows * 0.07)
          const edge = Math.min(1, fromX, fromY)
          const tone = Math.pow(light, 0.7)
          const size = step * (0.42 + tone * 0.95) * (0.35 + edge * 0.65)
          if (edge <= 0.02 || size < 1.2) continue
          homes.push(col * step + step / 2, row * step + step / 2)
          const lift = 1.05 + (1 - light) * 0.35
          look.push(Math.min(1, r * lift + 0.02), Math.min(1, g * lift + 0.02), Math.min(1, b * lift + 0.02), size)
        }
      }

      count = homes.length / 2
      hx = new Float32Array(count)
      hy = new Float32Array(count)
      x = new Float32Array(count)
      y = new Float32Array(count)
      vx = new Float32Array(count)
      vy = new Float32Array(count)
      pos = new Float32Array(count * 2)
      for (let i = 0; i < count; i++) {
        hx[i] = homes[i * 2]
        hy[i] = homes[i * 2 + 1]
        if (started) {
          x[i] = hx[i]
          y[i] = hy[i]
        } else {
          // scattered dust, waiting to assemble
          const angle = Math.random() * Math.PI * 2
          const radius = (0.4 + Math.random() * 0.9) * Math.max(width, height)
          x[i] = width / 2 + Math.cos(angle) * radius
          y[i] = height / 2 + Math.sin(angle) * radius
        }
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, lookBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(look), gl.STATIC_DRAW)
      gl.enableVertexAttribArray(1)
      gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0)
      gl.uniform2f(uni.res, width, height)
      gl.uniform1f(uni.dpr, dpr)
    }

    // ---------- physics + draw
    let raf = 0
    let visible = false
    let time = 0
    let last = performance.now()

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      time += dt

      const k = 0.055 * fx.spring
      const radius = 80
      for (let i = 0; i < count; i++) {
        let ax = (hx[i] - x[i]) * k
        let ay = (hy[i] - y[i]) * k
        const dx = x[i] - pointer.x
        const dy = y[i] - pointer.y
        const dist2 = dx * dx + dy * dy
        if (dist2 < radius * radius) {
          const dist = Math.sqrt(dist2) || 1
          const force = (1 - dist / radius) * 3.2
          ax += (dx / dist) * force
          ay += (dy / dist) * force
        }
        vx[i] = (vx[i] + ax) * 0.84
        vy[i] = (vy[i] + ay) * 0.84
        x[i] += vx[i]
        y[i] += vy[i]
        pos[i * 2] = x[i]
        pos[i * 2 + 1] = y[i]
      }

      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(0)
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
      gl.uniform1f(uni.time, reduced ? 0 : time)
      gl.uniform1f(uni.alpha, fx.alpha)
      gl.drawArrays(gl.POINTS, 0, count)
    }

    const play = () => {
      cancelAnimationFrame(raf)
      if (visible && count) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    const assemble = () => {
      if (started) return
      started = true
      gsap.to(fx, { alpha: 1, duration: 1.2, ease: 'power2.out' })
      gsap.to(fx, { spring: 1, duration: 2.2, ease: 'power2.in' })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && entry.intersectionRatio > 0.25) assemble()
        play()
      },
      { threshold: [0, 0.25] }
    )

    const onLoad = () => {
      build()
      wrap.dataset.ready = 'true'
      observer.observe(wrap)
      play()
    }
    if (image.complete && image.naturalWidth) onLoad()
    else image.addEventListener('load', onLoad, { once: true })

    let resizeTimer = 0
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        build()
        play()
      }, 150)
    })
    resizeObserver.observe(wrap)

    // ---------- interactions
    const local = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }
    const onMove = (event: PointerEvent) => {
      const point = local(event)
      pointer.x = point.x
      pointer.y = point.y
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }
    const onClick = (event: PointerEvent) => {
      const point = local(event)
      for (let i = 0; i < count; i++) {
        const dx = x[i] - point.x
        const dy = y[i] - point.y
        const dist = Math.hypot(dx, dy) || 1
        const force = Math.max(0, 1 - dist / 260) * 26
        vx[i] += (dx / dist) * force
        vy[i] += (dy / dist) * force
      }
      // 🥚 ten clicks on my face
      clicks += 1
      if (clicks === 3) toast('Keep going…')
      if (clicks === 7) toast('Almost there 👀')
      if (clicks >= GOAT_CLICKS) {
        clicks = 0
        releaseTheGoats()
        toast('You found it. I am, in fact, the GOAT 🐐')
        unlock('goat-photo')
      }
    }
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    wrap.addEventListener('pointerup', onClick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      observer.disconnect()
      resizeObserver.disconnect()
      image.removeEventListener('load', onLoad)
      gsap.killTweensOf(fx)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      wrap.removeEventListener('pointerup', onClick)
    }
  }, [])

  return (
    <div ref={wrapRef} className={styles.portrait} data-cursor="That's me 👋">
      {fallback ? (
        <Image
          src={SRC}
          alt="Nicolas Brouard"
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className={styles.fallback}
        />
      ) : (
        <canvas ref={canvasRef} className={styles.canvas} role="img" aria-label="Nicolas Brouard, made of particles" />
      )}
    </div>
  )
}
