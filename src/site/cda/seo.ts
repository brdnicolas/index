import { PERSON, SITE_URL, absolute, breadcrumb, graph } from '../lib/seo'
import { QUESTIONS, TOOLS } from './content'
import { TERMS, termId } from './glossaryContent'

// schema.org data of the CDA toolbox pages (French)

type Kind = 'hub' | 'preparation' | 'schemas' | 'presentation' | 'questions' | 'glossary'
type Page = { title: string; description: string; path: string }

const TITLE_PRO = {
  '@type': 'EducationalOccupationalCredential',
  name: 'Titre professionnel Concepteur Développeur d’Applications (CDA)',
  credentialCategory: 'Titre professionnel de niveau 6',
  url: 'https://www.francecompetences.fr/recherche/rncp/37873/'
}

const crumbs = (page: Page) =>
  breadcrumb(
    page.path === '/cda'
      ? [
          { name: 'Nicolas Brouard', path: '/' },
          { name: 'Toolbox CDA', path: '/cda' }
        ]
      : [
          { name: 'Nicolas Brouard', path: '/' },
          { name: 'Toolbox CDA', path: '/cda' },
          { name: page.title, path: page.path }
        ]
  )

const base = (page: Page) => ({
  name: page.title,
  description: page.description,
  url: absolute(page.path),
  inLanguage: 'fr',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  author: { '@id': PERSON['@id'] },
  about: TITLE_PRO
})

const article = (page: Page, resourceType: string) => ({
  '@type': ['Article', 'LearningResource'],
  ...base(page),
  headline: page.title,
  learningResourceType: resourceType,
  educationalLevel: 'Titre professionnel de niveau 6',
  publisher: { '@id': PERSON['@id'] }
})

export const cdaStructuredData = (kind: Kind, page: Page) => {
  const nodes: Record<string, unknown>[] = [PERSON]

  switch (kind) {
    case 'hub':
      nodes.push({
        '@type': 'CollectionPage',
        ...base(page),
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: TOOLS.map((tool, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: tool.title,
            description: tool.text,
            url: tool.href.startsWith('http') ? tool.href : absolute(tool.href)
          }))
        }
      })
      break
    case 'questions':
      nodes.push({
        '@type': 'FAQPage',
        ...base(page),
        mainEntity: QUESTIONS.map((question) => ({
          '@type': 'Question',
          name: question.q,
          acceptedAnswer: { '@type': 'Answer', text: question.a }
        }))
      })
      break
    case 'glossary':
      nodes.push({
        '@type': 'DefinedTermSet',
        '@id': absolute(`${page.path}#glossaire`),
        ...base(page),
        hasDefinedTerm: TERMS.map((item) => ({
          '@type': 'DefinedTerm',
          name: item.term,
          ...(item.aka ? { alternateName: item.aka } : {}),
          description: item.definition,
          url: absolute(`${page.path}#${termId(item.term)}`),
          inDefinedTermSet: absolute(`${page.path}#glossaire`)
        }))
      })
      break
    case 'schemas':
      nodes.push(article(page, 'Fiche de révision'))
      break
    case 'presentation':
      nodes.push(article(page, 'Modèle de présentation'))
      break
    default:
      nodes.push(article(page, 'Guide'))
  }

  nodes.push(crumbs(page))
  return graph(...nodes)
}
