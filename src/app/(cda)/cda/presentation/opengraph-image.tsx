import { OG_SIZE, renderCdaOg } from '@/site/cda/og'

export const alt = 'Plan de la présentation — Toolbox CDA'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return renderCdaOg('Plan de la présentation', 'Un diaporama modèle pour la soutenance, slide par slide.')
}
