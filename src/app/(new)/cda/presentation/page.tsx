import type { Metadata } from 'next'
import { Presentation } from '@/site/cda/Presentation'

export const metadata: Metadata = {
  title: 'Le plan de la présentation CDA — Nicolas Brouard',
  description: 'Les 13 parties de la soutenance du titre pro CDA, en checklist, avec ce que le jury regarde.',
  alternates: { canonical: '/cda/presentation' }
}

export default function PresentationPage() {
  return (
    <main>
      <Presentation />
    </main>
  )
}
