import { Schemas } from '@/site/cda/Schemas'
import { JsonLd } from '@/site/components/JsonLd'
import { cdaMetadata } from '@/site/lib/seo'
import { cdaStructuredData } from '@/site/cda/seo'

const TITLE = 'Anti-sèche MERISE & UML : MCD, MLD, MPD'
const DESCRIPTION =
  'Fiche de révision MERISE et UML pour le titre pro CDA : MCD, MLD, MPD, cardinalités, script SQL, diagramme de classes et erreurs à éviter.'

export const metadata = cdaMetadata({ title: TITLE, description: DESCRIPTION, path: '/cda/schemas' })

export default function SchemasPage() {
  return (
    <main>
      <JsonLd data={cdaStructuredData('schemas', { title: TITLE, description: DESCRIPTION, path: '/cda/schemas' })} />
      <Schemas />
    </main>
  )
}
