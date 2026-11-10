import type { Metadata } from 'next'
import { Questions } from '@/site/cda/Questions'

export const metadata: Metadata = {
  title: 'Les questions du jury CDA — Nicolas Brouard',
  description: 'Des questions de jury du titre pro CDA, avec des pistes de réponse et un tirage au hasard.',
  alternates: { canonical: '/cda/questions' }
}

export default function QuestionsPage() {
  return (
    <main>
      <Questions />
    </main>
  )
}
