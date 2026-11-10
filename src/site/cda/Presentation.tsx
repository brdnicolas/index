'use client'

import { CdaShell, Line } from './CdaShell'
import { Deck } from './Deck'
import { FACTS } from './content'
import styles from './Cda.module.scss'

/* /cda/presentation — the model deck of the defense, slide by slide, with presenter notes. */

export const Presentation = () => (
  <CdaShell
    title="Le plan de la présentation"
    lede="Le déroulé que je vous propose, sous forme de diaporama modèle. Parcourez-le comme une vraie présentation : flèches du clavier, swipe, ou plein écran."
  >
    <dl className={styles.facts}>
      <Line />
      {FACTS.map((fact) => (
        <div key={fact.value} className="js-reveal">
          <dt className={styles.factValue}>{fact.value}</dt>
          <dd className={styles.factLabel}>{fact.label}</dd>
        </div>
      ))}
    </dl>

    <div className="js-reveal">
      <Deck />
    </div>
  </CdaShell>
)
