'use client'

import { RefObject, useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { onIntroDone, onPartyMode, prefersReducedMotion } from '../lib/intro'
import { emit, on } from '../lib/bus'

/*
 * The hero title, made of particles.
 * - arrival: particles fly in from everywhere and write the title
 * - cursor: particles flee the pointer and spring back into place (brighter while moving)
 * - click: shockwave · press & hold: black hole, release: explosion
 * - 'hero:retarget' (word swap): particles scatter and re-form the new word
 * Physics run on the CPU (≈8k particles, a few tenths of a ms), drawing is WebGL points.
 *
 * Bus events: emits 'hero:title' when the title is written (the rest of the hero can appear).
 * Sets <html data-particles="on"> while it owns the title (the DOM title stays invisible but readable by screen readers).
 */

const VERTEX = `
attribute vec3 aData;   // x, y (css px, y down), speed
attribute float aRand;
uniform vec2 uRes;
uniform float uDpr;
uniform float uTime;
uniform float uAlpha;
uniform float uParty;
uniform float uMatrix;
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec2 pos = aData.xy + vec2(sin(uTime * 2.0 + aRand * 50.0), cos(uTime * 1.7 + aRand * 40.0)) * 0.35;
  gl_Position = vec4(pos.x / uRes.x * 2.0 - 1.0, 1.0 - pos.y / uRes.y * 2.0, 0.0, 1.0);
  float speed = clamp(aData.z * 0.12, 0.0, 1.0);
  gl_PointSize = (1.55 + aRand * 0.9 + speed * 1.6) * uDpr;
  vAlpha = (0.78 + aRand * 0.3 + speed * 0.5) * uAlpha * (0.85 + 0.15 * sin(uTime * 3.0 + aRand * 80.0));
  vec3 rainbow = 0.5 + 0.5 * cos(6.2831 * (pos.x / uRes.x + uTime * 0.15 + vec3(0.0, 0.33, 0.67)));
  vColor = mix(vec3(1.0), rainbow, uParty);
  vColor = mix(vColor, vec3(0.3, 1.0, 0.55), uMatrix);
}
`

const FRAGMENT = `
precision mediump float;
varying float vAlpha;
varying vec3 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5);
  gl_FragColor = vec4(vColor, smoothstep(0.5, 0.15, d) * vAlpha);
}
`

const MAX_PARTICLES = 16000

/** Rasterize the (invisible) DOM title with its real fonts and turn its pixels into targets. */
const sampleTitle = (title: HTMLElement, origin: DOMRect) => {
  const width = Math.round(origin.width)
  const height = Math.round(origin.height)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  title.querySelectorAll<HTMLElement>('.split-char').forEach((char) => {
    const rect = char.getBoundingClientRect()
    const style = getComputedStyle(char)
    ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
    ctx.fillText(
      char.textContent ?? '',
      rect.left - origin.left + rect.width / 2,
      rect.top - origin.top + rect.height / 2 + parseFloat(style.fontSize) * 0.03
    )
  })
  const data = ctx.getImageData(0, 0, width, height).data
  const step = width > 900 ? 3 : 2
  const points: number[] = []
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (data[(y * width + x) * 4 + 3] > 140) points.push(x, y)
    }
  }
  // deterministic subsampling: same title → same points (so unchanged words don't move on a swap)
  const count = points.length / 2
  const stride = Math.max(1, Math.ceil(count / MAX_PARTICLES))
  const targets: number[] = []
  for (let i = 0; i < count; i += stride) targets.push(points[i * 2], points[i * 2 + 1])

  // y separating the title's lines (first line's bottom), used to morph line by line
  const firstLine = title.firstElementChild?.getBoundingClientRect()
  const split = firstLine ? firstLine.bottom - origin.top : height / 2
  return { targets, split }
}

type ParticleTitleProps = { titleRef: RefObject<HTMLElement | null>; className?: string }

export const ParticleTitle = ({ titleRef, className }: ParticleTitleProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const reduced = prefersReducedMotion()
    const showDomTitle = () => {
      document.documentElement.dataset.particles = 'off'
      setTimeout(() => emit('hero:title'), 0)
    }
    if (!canvas || reduced) {
      const unsubscribe = onIntroDone(showDomTitle)
      return unsubscribe
    }
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false })
    if (!gl) {
      const unsubscribe = onIntroDone(showDomTitle)
      return unsubscribe
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
    gl.bindAttribLocation(program, 0, 'aData')
    gl.bindAttribLocation(program, 1, 'aRand')
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const unsubscribe = onIntroDone(showDomTitle)
      return unsubscribe
    }
    gl.useProgram(program)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
    gl.clearColor(0.0196, 0.0196, 0.0196, 1)

    const uni = {
      res: gl.getUniformLocation(program, 'uRes'),
      dpr: gl.getUniformLocation(program, 'uDpr'),
      time: gl.getUniformLocation(program, 'uTime'),
      alpha: gl.getUniformLocation(program, 'uAlpha'),
      party: gl.getUniformLocation(program, 'uParty'),
      matrix: gl.getUniformLocation(program, 'uMatrix')
    }
    const dataBuffer = gl.createBuffer()
    const randBuffer = gl.createBuffer()

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let rect = canvas.getBoundingClientRect()

    // particle state (css px)
    let count = 0
    let x = new Float32Array(0)
    let y = new Float32Array(0)
    let vx = new Float32Array(0)
    let vy = new Float32Array(0)
    let tx = new Float32Array(0)
    let ty = new Float32Array(0)
    let delay = new Float32Array(0)
    let gpu = new Float32Array(0)

    const fx = { alpha: 0, party: 0, matrix: 0, hold: 0 }
    const pointer = { x: -9999, y: -9999, active: false, down: false }
    let time = 0
    let started = false
    let assembledAt = Infinity

    const resizeCanvas = () => {
      rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uni.res, width, height)
      gl.uniform1f(uni.dpr, dpr)
    }
    resizeCanvas()

    let split = 0

    /**
     * (Re)build the particle set from the DOM title.
     * - 'everywhere': intro, particles fly in from all over the screen
     * - 'morph': word swap / resize. Particles are matched line by line, ordered left → right,
     *   so unchanged text doesn't move and the changed word slides into the new one in a wave.
     */
    const retarget = (mode: 'everywhere' | 'morph') => {
      const title = titleRef.current
      if (!title) return false
      rect = canvas.getBoundingClientRect()
      const sampled = sampleTitle(title, rect)
      const next = sampled.targets.length / 2
      if (!next) return false

      // group & sort new targets per line
      const byLine = (ys: (i: number) => number, xs: (i: number) => number, total: number, splitAt: number) => {
        const lines: number[][] = [[], []]
        for (let i = 0; i < total; i++) lines[ys(i) < splitAt ? 0 : 1].push(i)
        lines.forEach((line) => line.sort((a, b) => xs(a) - xs(b) || ys(a) - ys(b)))
        return lines
      }
      const newLines = byLine(
        (i) => sampled.targets[i * 2 + 1],
        (i) => sampled.targets[i * 2],
        next,
        sampled.split
      )
      const oldLines = byLine(
        (i) => ty[i],
        (i) => tx[i],
        count,
        split
      )

      const nx = new Float32Array(next)
      const ny = new Float32Array(next)
      const nvx = new Float32Array(next)
      const nvy = new Float32Array(next)
      const ntx = new Float32Array(next)
      const nty = new Float32Array(next)
      const ndelay = new Float32Array(next)
      const rand = new Float32Array(next)

      let cursor = 0
      newLines.forEach((line, lineIndex) => {
        const source = oldLines[lineIndex]
        line.forEach((targetIndex, rank) => {
          const i = cursor++
          ntx[i] = sampled.targets[targetIndex * 2]
          nty[i] = sampled.targets[targetIndex * 2 + 1]
          rand[i] = Math.random()
          if (mode === 'everywhere' || !count) {
            nx[i] = Math.random() * width * 1.4 - width * 0.2
            ny[i] = Math.random() * height * 1.4 - height * 0.2
            ndelay[i] = Math.random() * 0.8
            return
          }
          // pick the old particle at the same relative position on the same line
          const pool = source.length ? source : oldLines[0].length ? oldLines[0] : oldLines[1]
          const from = pool[Math.min(pool.length - 1, Math.floor((rank / line.length) * pool.length))]
          nx[i] = x[from]
          ny[i] = y[from]
          nvx[i] = vx[from]
          nvy[i] = vy[from]
          // soft spring + a left-to-right wave
          ndelay[i] = time - 0.3 + (rank / line.length) * 0.45
        })
      })

      x = nx
      y = ny
      vx = nvx
      vy = nvy
      tx = ntx
      ty = nty
      delay = ndelay
      gpu = new Float32Array(next * 3)
      count = next
      split = sampled.split

      gl.bindBuffer(gl.ARRAY_BUFFER, randBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, rand, gl.STATIC_DRAW)
      gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, gpu.byteLength, gl.DYNAMIC_DRAW)
      return true
    }

    const impulse = (cx: number, cy: number, radius: number, strength: number) => {
      for (let i = 0; i < count; i++) {
        const dx = x[i] - cx
        const dy = y[i] - cy
        const d = Math.hypot(dx, dy) || 1
        if (d < radius) {
          const f = (1 - d / radius) * strength
          vx[i] += (dx / d) * f
          vy[i] += (dy / d) * f
        }
      }
    }

    // ---------- interactions
    const local = (event: PointerEvent) => ({ x: event.clientX - rect.left, y: event.clientY - rect.top })
    const inHero = (event: PointerEvent) => event.clientY >= rect.top && event.clientY <= rect.bottom
    const onMove = (event: PointerEvent) => {
      const point = local(event)
      pointer.x = point.x
      pointer.y = point.y
      pointer.active = inHero(event)
    }
    let holdTween: gsap.core.Tween | null = null
    const onDown = (event: PointerEvent) => {
      if (!inHero(event) || (event.target as Element).closest?.('a, button')) return
      const point = local(event)
      pointer.down = true
      impulse(point.x, point.y, 260, 14)
      holdTween?.kill()
      holdTween = gsap.to(fx, { hold: 1, duration: 1.4, ease: 'power2.in', delay: 0.25 })
    }
    const onUp = () => {
      if (!pointer.down) return
      pointer.down = false
      holdTween?.kill()
      if (fx.hold > 0.35) {
        impulse(pointer.x, pointer.y, 900, 40 * fx.hold)
        canvas.dispatchEvent(new CustomEvent('brd:shockwave', { bubbles: true }))
      }
      holdTween = gsap.to(fx, { hold: 0, duration: 0.3 })
    }
    const onLeave = () => {
      pointer.active = false
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    const onScroll = () => {
      rect = canvas.getBoundingClientRect()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ---------- intro
    const unsubscribeIntro = onIntroDone(() => {
      if (!retarget('everywhere')) {
        showDomTitle()
        return
      }
      document.documentElement.dataset.particles = 'on'
      started = true
      assembledAt = time + 1.9
      gsap.to(fx, { alpha: 1, duration: 1.2, ease: 'power2.out' })
    })

    const unsubscribeRetarget = on('hero:retarget', () => {
      if (started) retarget('morph')
    })
    const unsubscribeParty = onPartyMode((isOn) => {
      gsap.to(fx, { party: isOn ? 1 : 0, duration: 1 })
      impulse(width / 2, height / 2, 2000, 18)
    })
    const unsubscribeMatrix = on('matrix', () => {
      gsap.timeline().to(fx, { matrix: 1, duration: 0.8 }).to(fx, { matrix: 0, duration: 1.2 }, '+=6')
    })

    let resizeTimer: ReturnType<typeof setTimeout>
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resizeCanvas()
        if (started) retarget('morph')
      }, 200)
    })
    resizeObserver.observe(canvas)

    // ---------- loop
    let frame = 0
    let last = performance.now()
    let visible = true

    const step = (dt: number) => {
      const repelRadius = 110
      const hold = fx.hold
      const gravity = fx.matrix * 0.45
      for (let i = 0; i < count; i++) {
        const age = time - delay[i]
        if (age < 0) {
          gpu[i * 3] = x[i]
          gpu[i * 3 + 1] = y[i]
          gpu[i * 3 + 2] = 0
          continue
        }
        // softer spring while assembling, snappier once in place
        const k = 0.012 + Math.min(1, age / 2.2) * 0.05
        let ax = (tx[i] - x[i]) * k
        let ay = (ty[i] - y[i]) * k + gravity * (0.5 + (i % 7) / 7)

        if (pointer.active) {
          const dx = x[i] - pointer.x
          const dy = y[i] - pointer.y
          const d2 = dx * dx + dy * dy
          if (hold > 0.01) {
            // black hole: everything nearby spirals into the cursor
            const d = Math.sqrt(d2) || 1
            const pull = Math.min(1, 420 / d) * hold * 2.2
            ax -= (dx / d) * pull - (dy / d) * pull * 0.35
            ay -= (dy / d) * pull + (dx / d) * pull * 0.35
          } else if (d2 < repelRadius * repelRadius) {
            const d = Math.sqrt(d2) || 1
            const f = (1 - d / repelRadius) * 3.2
            ax += (dx / d) * f
            ay += (dy / d) * f
          }
        }

        vx[i] = (vx[i] + ax * dt) * Math.pow(0.86, dt)
        vy[i] = (vy[i] + ay * dt) * Math.pow(0.86, dt)
        x[i] += vx[i] * dt
        y[i] += vy[i] * dt
        gpu[i * 3] = x[i]
        gpu[i * 3 + 1] = y[i]
        gpu[i * 3 + 2] = Math.abs(vx[i]) + Math.abs(vy[i])
      }
    }

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)
      const dt = Math.min((now - last) / 16.67, 2.5)
      last = now
      time += dt / 60

      if (started && time > assembledAt) {
        assembledAt = Infinity
        emit('hero:title')
      }

      gl.clear(gl.COLOR_BUFFER_BIT)
      if (!started || !count) return
      step(dt)

      gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer)
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, gpu)
      gl.enableVertexAttribArray(0)
      gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0)
      gl.bindBuffer(gl.ARRAY_BUFFER, randBuffer)
      gl.enableVertexAttribArray(1)
      gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 0, 0)

      gl.uniform1f(uni.time, time)
      gl.uniform1f(uni.alpha, fx.alpha)
      gl.uniform1f(uni.party, fx.party)
      gl.uniform1f(uni.matrix, fx.matrix)
      gl.drawArrays(gl.POINTS, 0, count)
    }

    const play = () => {
      if (!frame && visible && !document.hidden) {
        last = performance.now()
        frame = requestAnimationFrame(loop)
      }
    }
    const pause = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        rect = canvas.getBoundingClientRect()
        play()
      } else pause()
    })
    observer.observe(canvas)
    const onVisibility = () => (document.hidden ? pause() : play())
    document.addEventListener('visibilitychange', onVisibility)
    const onContextLost = (event: Event) => {
      event.preventDefault()
      pause()
      document.documentElement.dataset.particles = 'off'
    }
    canvas.addEventListener('webglcontextlost', onContextLost)
    play()

    return () => {
      pause()
      clearTimeout(resizeTimer)
      observer.disconnect()
      resizeObserver.disconnect()
      unsubscribeIntro()
      unsubscribeRetarget()
      unsubscribeParty()
      unsubscribeMatrix()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      gsap.killTweensOf(fx)
      delete document.documentElement.dataset.particles
    }
  }, [titleRef])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
