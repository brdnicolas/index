import { OG_SIZE, renderCdaOg } from '@/site/cda/og'

export const alt = 'La toolbox CDA — Toolbox CDA'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return renderCdaOg('La toolbox CDA', 'Tous les outils pour préparer le titre pro, au même endroit.')
}
