'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CdaShell } from './CdaShell'
import { GLOSSARY_CATEGORIES, TERMS, normalize, termId } from './glossaryContent'
import styles from './Glossary.module.scss'
import hub from './CdaHub.module.scss'

/* /cda/glossaire — the vocabulary of the titre pro, searchable and filterable. Each term has its own anchor. */

type Filter = (typeof GLOSSARY_CATEGORIES)[number]['id']

const SORTED = [...TERMS].sort((a, b) => normalize(a.term).localeCompare(normalize(b.term)))

export const Glossary = () => {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const search = normalize(query.trim())
    return SORTED.filter(
      (item) =>
        (filter === 'all' || item.category === filter) &&
        (!search || normalize(`${item.term} ${item.aka ?? ''} ${item.definition}`).includes(search))
    )
  }, [filter, query])

  return (
    <CdaShell
      title="Glossaire CDA"
      lede="Les mots du référentiel, du dossier et des questions du jury, expliqués simplement."
    >
      <div className={`${styles.tools} js-reveal`}>
        <label className={styles.search}>
          <span className={styles.searchIcon} aria-hidden="true">
            ⌕
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un terme : JWT, MCD, recette…"
            aria-label="Rechercher un terme"
          />
        </label>
        <div className={hub.filters} role="group" aria-label="Filtrer par thème">
          {GLOSSARY_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={filter === category.id}
              onClick={() => setFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.count} aria-live="polite">
        {results.length} terme{results.length > 1 ? 's' : ''}
      </p>

      {results.length ? (
        <dl className={styles.grid}>
          {results.map((item) => (
            <div key={item.term} id={termId(item.term)} className={styles.card}>
              <dt>
                <span className={styles.term}>{item.term}</span>
                {item.aka ? <span className={styles.aka}>{item.aka}</span> : null}
              </dt>
              <dd>
                <p className={styles.definition}>{item.definition}</p>
                {item.link ? (
                  <Link href={item.link.href} className={styles.link}>
                    {item.link.label} →
                  </Link>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className={styles.empty}>Aucun terme ne correspond. Essayez un autre mot.</p>
      )}
    </CdaShell>
  )
}
