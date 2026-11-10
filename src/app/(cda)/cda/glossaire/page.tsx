import { Glossary } from '@/site/cda/Glossary'
import { JsonLd } from '@/site/components/JsonLd'
import { cdaMetadata } from '@/site/lib/seo'
import { cdaStructuredData } from '@/site/cda/seo'

const TITLE = 'Glossaire du titre pro CDA'
const DESCRIPTION =
  'Le vocabulaire du titre pro CDA expliqué simplement : MERISE, MCD, MLD, ORM, JWT, injection SQL, tests, recette, CI/CD, RGAA, éco-conception…'

export const metadata = cdaMetadata({ title: TITLE, description: DESCRIPTION, path: '/cda/glossaire' })

export default function GlossaryPage() {
  return (
    <main>
      <JsonLd
        data={cdaStructuredData('glossary', { title: TITLE, description: DESCRIPTION, path: '/cda/glossaire' })}
      />
      <Glossary />
    </main>
  )
}
