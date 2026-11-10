import type { Metadata } from 'next'
import { Schemas } from '@/site/cda/Schemas'

export const metadata: Metadata = {
  title: 'Anti-sèche MERISE & UML — Toolbox CDA',
  description:
    'MCD, MLD, MPD, cardinalités, diagramme de classes UML et les 5 erreurs à éviter, pour le titre pro Concepteur Développeur d’Applications.',
  alternates: { canonical: '/cda/schemas' }
}

export default function SchemasPage() {
  return (
    <main>
      <Schemas />
    </main>
  )
}
