import { OG_SIZE, renderCdaOg } from '@/site/cda/og'

export const alt = 'Glossaire CDA — Toolbox CDA'
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image() {
  return renderCdaOg('Glossaire CDA', 'Les mots du référentiel et du jury, expliqués simplement.')
}
