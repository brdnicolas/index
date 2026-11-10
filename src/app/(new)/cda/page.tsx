import type { Metadata } from 'next'
import { CdaHub } from '@/site/cda/CdaHub'

export const metadata: Metadata = {
  title: 'La toolbox CDA — Nicolas Brouard',
  description:
    'Préparer le titre pro Concepteur Développeur d’Applications : plan de la présentation, attendus du jury, questions types et ressources.',
  alternates: { canonical: '/cda' }
}

export default function CdaPage() {
  return (
    <main>
      <CdaHub />
    </main>
  )
}
