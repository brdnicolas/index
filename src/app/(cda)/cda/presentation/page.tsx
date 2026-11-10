import { Presentation } from '@/site/cda/Presentation'
import { JsonLd } from '@/site/components/JsonLd'
import { cdaMetadata } from '@/site/lib/seo'
import { cdaStructuredData } from '@/site/cda/seo'

const TITLE = 'Plan de la soutenance du titre pro CDA'
const DESCRIPTION =
  'Un modèle de diaporama pour la soutenance du titre pro CDA, slide par slide : projet, maquettes, architecture, sécurité, déploiement, démo.'

export const metadata = cdaMetadata({ title: TITLE, description: DESCRIPTION, path: '/cda/presentation' })

export default function PresentationPage() {
  return (
    <main>
      <JsonLd
        data={cdaStructuredData('presentation', { title: TITLE, description: DESCRIPTION, path: '/cda/presentation' })}
      />
      <Presentation />
    </main>
  )
}
