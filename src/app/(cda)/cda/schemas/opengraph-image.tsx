import { OG_SIZE, renderCdaOg } from '@/site/cda/og'

export const alt = 'Anti-sèche MERISE & UML — Toolbox CDA'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return renderCdaOg('Anti-sèche MERISE & UML', 'MCD, MLD, MPD, cardinalités et diagramme de classes.')
}
