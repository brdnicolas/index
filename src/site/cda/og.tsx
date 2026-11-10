import { ImageResponse } from 'next/og'

// Share image of the CDA toolbox pages (1200×630), drawn at build time in the site's style.

export const OG_SIZE = { width: 1200, height: 630 }

export const renderCdaOg = (title: string, subtitle: string) =>
  new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        backgroundColor: '#050505',
        backgroundImage: 'radial-gradient(circle at 85% 0%, rgba(61, 220, 132, 0.22), transparent 55%)',
        color: '#f3f2ee',
        fontFamily: 'sans-serif'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#8a8a86' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 14, height: 14, borderRadius: 999, background: '#3ddc84' }} />
          TOOLBOX CDA
        </span>
        <span>brdnicolas.com/cda</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{title}</div>
        <div style={{ fontSize: 32, color: '#b5b4ae', lineHeight: 1.3, maxWidth: 900 }}>{subtitle}</div>
      </div>

      <div style={{ display: 'flex', fontSize: 24, color: '#8a8a86' }}>
        Titre pro Concepteur Développeur d’Applications
      </div>
    </div>,
    OG_SIZE
  )
