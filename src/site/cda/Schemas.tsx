'use client'

import { Fragment, ReactNode, useEffect, useState } from 'react'
import Image from 'next/image'
import { CdaShell, Line } from './CdaShell'
import * as S from './schemaContent'
import styles from './Schemas.module.scss'
import base from './Cda.module.scss'

/* /cda/schemas — the MERISE & UML cheat sheet, chapter by chapter, around one example: a library. */

// ---------- small building blocks

const Section = ({
  id,
  index,
  title,
  subtitle,
  lead,
  children
}: {
  id: string
  index: number
  title: string
  subtitle: string
  lead: ReactNode
  children: ReactNode
}) => (
  <section id={id} className={styles.chapter} aria-labelledby={`${id}-title`}>
    <div className={`${styles.chapterHead} js-reveal`}>
      <span className={styles.chapterIndex}>{String(index).padStart(2, '0')}</span>
      <div>
        <h2 id={`${id}-title`} className={styles.chapterTitle}>
          {title}
        </h2>
        <p className={styles.chapterSubtitle}>{subtitle}</p>
      </div>
    </div>
    <div className={`${styles.lead} js-reveal`}>{lead}</div>
    {children}
  </section>
)

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className={styles.block}>
    <h3 className={`${styles.blockTitle} js-reveal`}>{title}</h3>
    {children}
  </div>
)

const DataTable = ({ table, mono = 0 }: { table: S.Table; mono?: number }) => (
  <div className={`${styles.tableWrap} js-reveal`}>
    <table className={styles.table}>
      <thead>
        <tr>
          {table.head.map((cell) => (
            <th key={cell}>{cell}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row) => (
          <tr key={row[0]}>
            {row.map((cell, index) => (
              <td key={`${row[0]}-${index}`} className={index < mono ? styles.cellKey : undefined}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const CalloutBox = ({ callout }: { callout: S.Callout }) => (
  <aside className={`${styles.callout} ${styles[callout.kind]} js-reveal`}>
    <p className={styles.calloutLabel}>{callout.label}</p>
    {callout.title ? <p className={styles.calloutTitle}>{callout.title}</p> : null}
    <p className={styles.calloutText}>{callout.text}</p>
  </aside>
)

const Checklist = ({ title, items }: { title: string; items: string[] }) => (
  <Block title={title}>
    <ul className={styles.checklist}>
      {items.map((item) => (
        <li key={item} className="js-reveal">
          <span className={styles.tick} aria-hidden="true">
            ✓
          </span>
          {item}
        </li>
      ))}
    </ul>
  </Block>
)

const Tools = ({ title, tools }: { title: string; tools: S.Tool[] }) => (
  <Block title={title}>
    <ul className={styles.tools}>
      {tools.map((tool) => (
        <li key={tool.name} className="js-reveal">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.tool} ${tool.recommended ? styles.toolRecommended : ''}`}
            data-cursor="Open ↗"
          >
            <span className={styles.toolHead}>
              <span className={styles.toolName}>{tool.name}</span>
              <span className={styles.toolBadge}>{tool.badge}</span>
            </span>
            <span className={styles.toolUrl}>{tool.url.replace(/^https:\/\/(www\.)?/, '')} ↗</span>
            <span className={styles.toolText}>{tool.text}</span>
          </a>
        </li>
      ))}
    </ul>
  </Block>
)

const SQL_KEYWORDS =
  /\b(CREATE|TABLE|INT|AUTO_INCREMENT|PRIMARY|KEY|VARCHAR|NOT|NULL|UNIQUE|YEAR|DATE|DATETIME|DEFAULT|INDEX|ENGINE|CHARSET|BOOLEAN|TRUE|FOREIGN|REFERENCES|ON|DELETE|UPDATE|RESTRICT|CASCADE|CURRENT_DATE|classDiagram|class)\b/g

// a tiny highlighter: comments dimmed, keywords lit
const highlight = (code: string) =>
  code.split('\n').map((line, lineIndex) => {
    if (line.trim().startsWith('--') || line.trim().startsWith('%%')) {
      return (
        <span key={lineIndex} className={styles.comment}>
          {line}
          {'\n'}
        </span>
      )
    }
    const parts = line.split(SQL_KEYWORDS)
    return (
      <Fragment key={lineIndex}>
        {parts.map((part, index) =>
          index % 2 === 1 ? (
            <span key={index} className={styles.keyword}>
              {part}
            </span>
          ) : (
            part
          )
        )}
        {'\n'}
      </Fragment>
    )
  })

const Code = ({ name, code }: { name: string; code: string }) => {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard blocked: nothing to do
    }
  }
  return (
    <div className={`${styles.code} js-reveal`}>
      <div className={styles.codeBar}>
        <span>{name}</span>
        <button type="button" onClick={copy} className={styles.copy}>
          {copied ? 'Copié ✓' : 'Copier'}
        </button>
      </div>
      <pre>
        <code>{highlight(code)}</code>
      </pre>
    </div>
  )
}

const Figure = ({ label, children, caption }: { label: string; children: ReactNode; caption?: ReactNode }) => (
  <figure className={`${styles.figure} js-reveal`}>
    <figcaption className={styles.figureLabel}>{label}</figcaption>
    <div className={styles.figureBody}>{children}</div>
    {caption ? <div className={styles.figureCaption}>{caption}</div> : null}
  </figure>
)

type Column = string | { name: string; pk?: boolean; fk?: boolean }

const Entity = ({ name, columns, keys = false }: { name: string; columns: Column[]; keys?: boolean }) => (
  <div className={styles.entity}>
    <p className={styles.entityName}>{name}</p>
    <ul>
      {columns.map((column) => {
        const item = typeof column === 'string' ? { name: column } : column
        return (
          <li key={item.name} className={item.pk && !keys ? styles.identifier : undefined}>
            {keys && (item.pk || item.fk) ? (
              <span className={styles.keyBadge}>{item.pk && item.fk ? 'PK/FK' : item.pk ? 'PK' : 'FK'}</span>
            ) : null}
            {item.name}
          </li>
        )
      })}
    </ul>
  </div>
)

const Link = ({ left, right, label }: { left: string; right: string; label?: ReactNode }) => (
  <div className={styles.link} aria-hidden="true">
    <span className={styles.cardinality}>{left}</span>
    <span className={styles.wire} />
    {label}
    <span className={styles.wire} />
    <span className={styles.cardinality}>{right}</span>
  </div>
)

// ---------- chapter menu: follows the reading

const ChapterNav = () => {
  const [active, setActive] = useState<string>(S.CHAPTERS[0].id)

  useEffect(() => {
    const onScroll = () => {
      let current: string = S.CHAPTERS[0].id
      for (const chapter of S.CHAPTERS) {
        const element = document.getElementById(chapter.id)
        if (element && element.getBoundingClientRect().top < window.innerHeight * 0.35) current = chapter.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={styles.nav} aria-label="Chapitres">
      {S.CHAPTERS.map((chapter, index) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          className={styles.navItem}
          aria-current={active === chapter.id ? 'true' : undefined}
        >
          <span className={styles.navIndex}>{String(index).padStart(2, '0')}</span>
          {chapter.label}
        </a>
      ))}
    </nav>
  )
}

// ---------- page

export const Schemas = () => (
  <CdaShell
    title="Anti-sèche MERISE & UML"
    lede="Les schémas à connaître pour le dossier projet, tous construits autour du même cas d’école : la gestion d’une bibliothèque. Pour chaque modèle : la théorie, un exemple, les pièges et les bons outils."
  >
    <ChapterNav />

    {/* ---------- MERISE */}
    <Section
      id="merise"
      index={0}
      title="MERISE"
      subtitle="La méthode et ses livrables"
      lead={
        <p>
          MERISE est la <strong>méthode</strong>, MCD, MLD et MPD sont les <strong>livrables</strong> qu’elle produit.
          Née en France dans les années 1970, elle fait concevoir une base de données en trois niveaux d’abstraction, du
          métier vers la technique.
        </p>
      }
    >
      <ol className={styles.levels}>
        {S.LEVELS.map((level) => (
          <li key={level.name} className={`${styles.level} js-reveal`}>
            <Line />
            <span className={styles.levelKicker}>{level.level}</span>
            <span className={styles.levelName}>{level.name}</span>
            <span className={styles.levelQuestion}>{level.question}</span>
            <span className={styles.levelText}>{level.text}</span>
          </li>
        ))}
      </ol>

      <Block title="L’analogie : construire une maison">
        <ul className={styles.analogy}>
          {S.ANALOGY.map((item) => (
            <li key={item.name} className="js-reveal">
              <span className={styles.analogyEmoji} aria-hidden="true">
                {item.emoji}
              </span>
              <strong>{item.name}</strong>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </Block>

      <CalloutBox callout={S.MERISE_JURY} />
    </Section>

    {/* ---------- MCD */}
    <Section
      id="mcd"
      index={1}
      title="MCD"
      subtitle="Modèle Conceptuel de Données"
      lead={
        <p>
          Le MCD représente les données métier <strong>sans aucune considération technique</strong>. Il décrit ce qu’est
          l’information dans l’organisation, indépendamment de tout SGBD.
        </p>
      }
    >
      <Block title="Les éléments">
        <DataTable table={S.MCD_ELEMENTS} mono={0} />
      </Block>
      <Block title="Les cardinalités">
        <DataTable table={S.MCD_CARDINALITIES} mono={1} />
        <CalloutBox callout={S.MCD_WARN} />
      </Block>
      <Block title="Exemple : la bibliothèque">
        <p className={`${styles.text} js-reveal`}>
          Des lecteurs empruntent des livres. L’historique doit être conservé : la date d’emprunt est donc portée par
          l’association elle-même (association porteuse).
        </p>
        <Figure
          label="Fig. 01 — MCD · Emprunt en bibliothèque"
          caption="Un livre peut être emprunté 0 ou N fois, un lecteur emprunte 0 ou N livres. « dateEmprunt » est portée par l’association."
        >
          <div className={styles.diagram}>
            <Entity
              name="LIVRE"
              columns={[{ name: 'idLivre', pk: true }, 'titre', 'auteur', 'isbn', 'anneePublication']}
            />
            <Link
              left="0,N"
              right="0,N"
              label={
                <span className={styles.association}>
                  <strong>emprunter</strong>
                  <span>dateEmprunt</span>
                </span>
              }
            />
            <Entity
              name="LECTEUR"
              columns={[{ name: 'idLecteur', pk: true }, 'nom', 'prenom', 'email', 'dateInscription']}
            />
          </div>
        </Figure>
      </Block>
      <Checklist title="Checklist MCD" items={S.MCD_CHECKLIST} />
      <Tools title="Outils pour votre MCD" tools={S.MCD_TOOLS} />
    </Section>

    {/* ---------- MLD */}
    <Section
      id="mld"
      index={2}
      title="MLD"
      subtitle="Modèle Logique de Données"
      lead={
        <p>
          Le MLD traduit le MCD en <strong>tables relationnelles</strong>, toujours indépendamment du SGBD. C’est ici
          qu’apparaissent les clés étrangères, et que les relations N:N deviennent de vraies tables.
        </p>
      }
    >
      <Block title="Les règles de passage MCD → MLD">
        <DataTable table={S.MLD_RULES} mono={1} />
        <CalloutBox callout={S.MLD_TIP} />
      </Block>
      <Block title="Le MCD bibliothèque, traduit">
        <Figure
          label="Fig. 02 — MLD · Tables relationnelles"
          caption="La relation N:N du MCD devient la table EMPRUNTER, avec une clé primaire composée (idLivre, idLecteur, dateEmprunt)."
        >
          <div className={styles.diagram}>
            <Entity
              keys
              name="LIVRE"
              columns={[{ name: 'idLivre', pk: true }, 'titre', 'auteur', 'isbn', 'anneePublication']}
            />
            <Link left="1" right="N" />
            <Entity
              keys
              name="EMPRUNTER"
              columns={[
                { name: 'idLivre', pk: true, fk: true },
                { name: 'idLecteur', pk: true, fk: true },
                { name: 'dateEmprunt', pk: true },
                'dateRetour'
              ]}
            />
            <Link left="N" right="1" />
            <Entity
              keys
              name="LECTEUR"
              columns={[{ name: 'idLecteur', pk: true }, 'nom', 'prenom', 'email', 'dateInscription']}
            />
          </div>
        </Figure>
      </Block>
      <Block title="La notation textuelle">
        <p className={`${styles.text} js-reveal`}>Souvent demandée en complément du schéma.</p>
        <div className={`${styles.notation} js-reveal`}>
          {S.MLD_NOTATION.map((table) => (
            <p key={table.table}>
              <strong>{table.table}</strong> (
              {table.columns.map((column, index) => {
                const item = typeof column === 'string' ? { name: column, pk: false } : column
                return (
                  <Fragment key={item.name}>
                    {index > 0 ? ', ' : null}
                    <span className={item.pk ? styles.underline : undefined}>{item.name}</span>
                  </Fragment>
                )
              })}
              )
            </p>
          ))}
        </div>
        <p className={`${styles.text} js-reveal`}>
          La clé primaire est soulignée, les clés étrangères sont préfixées par #. La PK d’EMPRUNTER compte trois
          colonnes, pour garder plusieurs emprunts du même livre par le même lecteur à des dates différentes.
        </p>
      </Block>
      <Checklist title="Checklist MLD" items={S.MLD_CHECKLIST} />
      <Tools title="Outils pour votre MLD" tools={S.MLD_TOOLS} />
    </Section>

    {/* ---------- MPD */}
    <Section
      id="mpd"
      index={3}
      title="MPD"
      subtitle="Modèle Physique de Données"
      lead={
        <p>
          Le MPD est l’implémentation concrète dans <strong>un SGBD précis</strong> (MySQL, PostgreSQL…) : c’est le
          script SQL qui crée la base.
        </p>
      }
    >
      <Block title="Ce qui apparaît au MPD (et pas avant)">
        <ul className={styles.grid}>
          {S.MPD_ADDS.map((item) => (
            <li key={item.title} className="js-reveal">
              <Line />
              <strong>{item.title}</strong>
              <code>{item.text}</code>
            </li>
          ))}
        </ul>
      </Block>
      <Block title="Le script SQL, MySQL 8">
        <Code name="gestion_bibliotheque.sql" code={S.MPD_SQL} />
        <CalloutBox callout={S.MPD_JURY} />
      </Block>
      <Checklist title="Checklist MPD" items={S.MPD_CHECKLIST} />
      <Tools title="Outils pour tester votre SQL" tools={S.MPD_TOOLS} />
    </Section>

    {/* ---------- UML */}
    <Section
      id="uml"
      index={4}
      title="UML"
      subtitle="Le diagramme de classes"
      lead={
        <p>
          UML est un langage de modélisation orienté objet. Le diagramme de classes est le plus demandé en CDA : il
          décrit les classes, leurs attributs, leurs méthodes et leurs relations. Ce n’est <strong>pas</strong> un MCD :
          il ajoute méthodes, visibilités, héritage et interfaces.
        </p>
      }
    >
      <Block title="Les visibilités">
        <ul className={styles.visibilities}>
          {S.VISIBILITIES.map((item) => (
            <li key={item.name} className="js-reveal">
              <span className={styles.visibilitySymbol}>{item.symbol}</span>
              <strong>{item.name}</strong>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </Block>
      <Block title="Les relations">
        <ul className={styles.relations}>
          {S.RELATIONS.map((item) => (
            <li key={item.name} className="js-reveal">
              <Line />
              <strong>{item.name}</strong>
              <span className={styles.relationSymbol} aria-hidden="true">
                {item.symbol}
              </span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
        <CalloutBox callout={S.UML_TIP} />
      </Block>
      <Block title="Les cardinalités UML">
        <DataTable table={S.UML_CARDINALITIES} mono={1} />
        <CalloutBox callout={S.UML_WARN} />
      </Block>
      <Block title="Exemple : la bibliothèque en UML">
        <p className={`${styles.text} js-reveal`}>
          Le même domaine, modélisé pour une application orientée objet : on voit apparaître l’héritage (Personne,
          abstraite), la composition (un Livre composé d’Exemplaires) et une association classique.
        </p>
        <Figure
          label="Fig. 03 — UML · Diagramme de classes"
          caption={
            <dl className={styles.legend}>
              {S.UML_LEGEND.map((item) => (
                <div key={item.name}>
                  <dt>{item.name}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
          }
        >
          <Image
            src="/cda/uml_diagram.png"
            alt="Diagramme de classes UML : Personne (abstraite) héritée par Lecteur et Bibliothecaire, Livre composé d’Exemplaires, Lecteur emprunte des Livres"
            width={2400}
            height={1660}
            sizes="(min-width: 1100px) 1000px, 100vw"
            className={styles.umlImage}
          />
        </Figure>
      </Block>
      <Checklist title="Checklist UML" items={S.UML_CHECKLIST} />
      <Tools title="Outils pour votre diagramme UML" tools={S.UML_TOOLS} />
      <Block title="Le snippet Mermaid à connaître">
        <Code name="diagramme.mmd" code={S.MERMAID} />
      </Block>
    </Section>

    {/* ---------- mistakes */}
    <Section
      id="erreurs"
      index={5}
      title="Les 5 erreurs"
      subtitle="Ce qui fait tiquer le jury"
      lead={
        <p>
          Elles reviennent dans presque tous les dossiers, et le jury les repère tout de suite. Les connaître, c’est
          éviter de les faire.
        </p>
      }
    >
      <ol className={base.list}>
        {S.MISTAKES.map((mistake, index) => (
          <li key={mistake.title} className={`${base.item} ${styles.mistake} js-reveal`}>
            <Line />
            <span className={styles.mistakeIndex}>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p className={styles.mistakeTitle}>{mistake.title}</p>
              <p className={styles.text}>{mistake.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  </CdaShell>
)
