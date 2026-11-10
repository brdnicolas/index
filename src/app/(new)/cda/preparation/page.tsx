import { Preparation } from '@/site/cda/Preparation'
import { JsonLd } from '@/site/components/JsonLd'
import { cdaMetadata } from '@/site/lib/seo'
import { cdaStructuredData } from '@/site/cda/seo'

const TITLE = 'Préparer l’épreuve du titre pro CDA'
const DESCRIPTION =
  'Titre pro CDA : déroulé de l’épreuve, dossier de projet et dossier professionnel, compétences expliquées, attentes du jury et erreurs à éviter.'

export const metadata = cdaMetadata({ title: TITLE, description: DESCRIPTION, path: '/cda/preparation' })

export default function PreparationPage() {
  return (
    <main>
      <JsonLd
        data={cdaStructuredData('preparation', { title: TITLE, description: DESCRIPTION, path: '/cda/preparation' })}
      />
      <Preparation />
    </main>
  )
}
