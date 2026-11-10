import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

/*
 * Share image of the portfolio (1200×630), drawn at build time in the site's style:
 * the hero title on the left, the particle portrait (pre-rendered, see portrait.png) on the right.
 */

export const HOME_OG_SIZE = { width: 1200, height: 630 }
export const HOME_OG_ALT = "Nicolas Brouard — I'm just a Software Engineer"

const DIR = join(process.cwd(), 'src/site/og')
const asset = (name: string) => readFile(join(DIR, name))

const C = {
  bg: '#050505',
  fg: '#f3f2ee',
  soft: '#c9c8c4',
  muted: '#8b8a86',
  line: 'rgba(255, 255, 255, 0.12)',
  green: '#3ddc84'
}

const mono = {
  fontFamily: 'Geist Mono',
  fontSize: 17,
  letterSpacing: 1.5,
  color: C.muted,
  textTransform: 'uppercase'
} as const

export const renderHomeOg = async () => {
  const [sans, serif, mono400, portrait] = await Promise.all([
    asset('fonts/Geist-SemiBold.ttf'),
    asset('fonts/InstrumentSerif-Italic.ttf'),
    asset('fonts/GeistMono-Regular.ttf'),
    asset('portrait.png')
  ])

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', background: C.bg, color: C.fg, fontFamily: 'Geist' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 580,
          padding: '56px 0 52px 64px'
        }}
      >
        <div style={{ ...mono, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: C.green }} />
          brdnicolas.com
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 30, color: C.soft, marginBottom: 18, letterSpacing: -0.5 }}>
            Hi! I’m Nicolas Brouard
          </div>
          <div style={{ fontSize: 100, lineHeight: 0.95, letterSpacing: -5.5 }}>I’m just a</div>
          <div
            style={{
              fontFamily: 'Instrument Serif',
              fontStyle: 'italic',
              fontSize: 124,
              lineHeight: 0.9,
              letterSpacing: -2
            }}
          >
            Software
          </div>
          <div style={{ fontSize: 100, lineHeight: 0.95, letterSpacing: -5.5 }}>Engineer.</div>
        </div>

        <div
          style={{
            ...mono,
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 22,
            marginRight: 0,
            borderTop: `1px solid ${C.line}`
          }}
        >
          <span>Paris, FR</span>
          <span style={{ color: C.soft }}>Building @Shotgun</span>
        </div>
      </div>

      <img
        src={`data:image/png;base64,${portrait.toString('base64')}`}
        width={620}
        height={630}
        alt=""
        style={{ position: 'absolute', right: 0, top: 0 }}
      />
    </div>,
    {
      ...HOME_OG_SIZE,
      fonts: [
        { name: 'Geist', data: sans, weight: 600, style: 'normal' },
        { name: 'Instrument Serif', data: serif, weight: 400, style: 'italic' },
        { name: 'Geist Mono', data: mono400, weight: 400, style: 'normal' }
      ]
    }
  )
}
