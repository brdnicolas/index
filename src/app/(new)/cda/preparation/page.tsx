import type { Metadata } from 'next'
import { Preparation } from '@/site/cda/Preparation'

export const metadata: Metadata = {
  title: 'Comment se préparer au titre CDA — Toolbox CDA',
  description:
    'Le déroulé de l’épreuve du titre pro CDA, le dossier à rendre, les compétences, les attentes du jury, les erreurs à éviter, l’IA et le biais de confirmation.',
  alternates: { canonical: '/cda/preparation' }
}

export default function PreparationPage() {
  return (
    <main>
      <Preparation />
    </main>
  )
}
