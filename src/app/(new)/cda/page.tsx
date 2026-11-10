import { CdaHub } from '@/site/cda/CdaHub'
import { JsonLd } from '@/site/components/JsonLd'
import { cdaMetadata } from '@/site/lib/seo'
import { cdaStructuredData } from '@/site/cda/seo'

const TITLE = 'La toolbox CDA · Préparer le titre pro'
const DESCRIPTION =
  'Les outils pour préparer le titre pro CDA : déroulé de l’épreuve, plan de soutenance, questions du jury et anti-sèche MERISE & UML.'

export const metadata = cdaMetadata({ title: TITLE, description: DESCRIPTION, path: '/cda' })

export default function CdaHubPage() {
  return (
    <main>
      <JsonLd data={cdaStructuredData('hub', { title: TITLE, description: DESCRIPTION, path: '/cda' })} />
      <CdaHub />
    </main>
  )
}
