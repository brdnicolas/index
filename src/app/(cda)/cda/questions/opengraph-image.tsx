import { OG_SIZE, renderCdaOg } from '@/site/cda/og'

export const alt = 'Questions du jury — Toolbox CDA'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return renderCdaOg('Questions du jury', 'Un jeu de cartes pour s’entraîner aux questions du jury.')
}
