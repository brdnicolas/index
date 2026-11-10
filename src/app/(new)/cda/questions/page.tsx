import { Questions } from '@/site/cda/Questions'
import { JsonLd } from '@/site/components/JsonLd'
import { cdaMetadata } from '@/site/lib/seo'
import { cdaStructuredData } from '@/site/cda/seo'

const TITLE = 'Questions du jury du titre pro CDA'
const DESCRIPTION =
  'Entraînez-vous aux questions du jury du titre pro CDA : tests, clés primaires et étrangères, CI/CD, sécurité, accessibilité, éco-conception.'

export const metadata = cdaMetadata({ title: TITLE, description: DESCRIPTION, path: '/cda/questions' })

export default function QuestionsPage() {
  return (
    <main>
      <JsonLd
        data={cdaStructuredData('questions', { title: TITLE, description: DESCRIPTION, path: '/cda/questions' })}
      />
      <Questions />
    </main>
  )
}
