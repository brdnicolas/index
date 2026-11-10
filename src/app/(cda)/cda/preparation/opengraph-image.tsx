import { OG_SIZE, renderCdaOg } from '@/site/cda/og'

export const alt = 'Comment se préparer — Toolbox CDA'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return renderCdaOg('Comment se préparer', 'Le déroulé de l’épreuve, le dossier à rendre et ce que regarde le jury.')
}
