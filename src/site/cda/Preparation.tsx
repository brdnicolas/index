'use client'

import { CdaShell, Line } from './CdaShell'
import { TIPS } from './content'
import * as P from './prepContent'
import base from './Cda.module.scss'
import styles from './Preparation.module.scss'

/* /cda/preparation — how the exam goes, what to hand in, what the jury wants, what to avoid, AI and bias. */

const pad = (value: number) => String(value).padStart(2, '0')
const TOTAL_MINUTES = P.EXAM.reduce((sum, step) => sum + step.minutes, 0)

const Head = ({ id, label, title, count }: { id: string; label: string; title: string; count?: number }) => (
  <>
    <div className={`${base.head} js-reveal`}>
      <h2 id={id} className={base.eyebrow}>
        {label}
      </h2>
      {count ? <span className={base.eyebrow}>{pad(count)}</span> : null}
    </div>
    <h3 className={`${base.sectionTitle} js-reveal`}>{title}</h3>
  </>
)

export const Preparation = () => (
  <CdaShell
    title="Comment se préparer"
    lede="Ce que dit le référentiel, sans le jargon : comment se déroule l’épreuve, ce qu’il faut rendre, ce que le jury regarde, et les pièges à éviter."
  >
    {/* ---------- the exam */}
    <section className={base.section} aria-labelledby="deroule">
      <Head id="deroule" label="Le déroulé" title={`${P.EXAM_TOTAL} d’épreuve, en quatre temps.`} />

      <div className={`${styles.timeline} js-reveal`} aria-hidden="true">
        {P.EXAM.map((step, index) => (
          <span key={step.name} style={{ flexGrow: step.minutes }} className={styles[`bar${index}`]}>
            {step.minutes} min
          </span>
        ))}
      </div>

      <ol className={styles.exam}>
        {P.EXAM.map((step, index) => (
          <li key={step.name} className={`${styles.examStep} js-reveal`}>
            <Line />
            <span className={`${styles.examDot} ${styles[`dot${index}`]}`} aria-hidden="true" />
            <div className={styles.examHead}>
              <span className={styles.examWhen}>{step.when}</span>
              <span className={styles.examName}>{step.name}</span>
              <span className={styles.examTime}>{step.minutes} min</span>
            </div>
            <ul className={styles.examPoints}>
              {step.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className={`${styles.note} js-reveal`}>
        {TOTAL_MINUTES} minutes au total pour vous. Le jury, lui, a lu votre dossier avant même que vous n’entriez.
      </p>
    </section>

    {/* ---------- deliverables */}
    <section className={base.section} aria-labelledby="rendre">
      <Head id="rendre" label="Ce qu’il faut rendre" title="Ce que vous rendez avant l’épreuve." />
      <ul className={styles.deliverables}>
        {P.DELIVERABLES.map((item) => (
          <li key={item.title} className="js-reveal">
            <span className={styles.bigValue}>
              {item.value}
              <small>{item.unit}</small>
            </span>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
      <p className={`${styles.note} js-reveal`}>{P.DELIVERABLES_NOTE}</p>
    </section>

    {/* ---------- skills */}
    <section className={base.section} aria-labelledby="competences">
      <Head
        id="competences"
        label="Les compétences obligatoires"
        title="Ce que votre projet doit couvrir."
        count={P.SKILLS.reduce((sum, block) => sum + block.items.length, 0)}
      />
      <p className={`${styles.intro} js-reveal`}>
        Les intitulés du référentiel sont abstraits. Voici ce qu’ils veulent dire, et ce que vous pouvez montrer pour
        chacun.
      </p>
      {P.SKILLS.map((block, index) => (
        <div key={block.block} className={styles.skillBlock}>
          <p className={`${styles.skillHead} js-reveal`}>
            <span className={styles.skillIndex}>Activité {index + 1}</span>
            {block.block}
          </p>
          <ul className={styles.skillList}>
            {block.items.map((skill) => (
              <li key={skill.name} className="js-reveal">
                <Line />
                <p className={styles.skillName}>
                  {skill.name}
                  {skill.interview ? <span className={styles.skillTag}>Évaluée à l’entretien technique</span> : null}
                </p>
                <div className={styles.skillExplain}>
                  <p>
                    <em>En clair</em>
                    {skill.plain}
                  </p>
                  <p>
                    <em>À montrer</em>
                    {skill.show}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className={`${styles.note} js-reveal`}>{P.SKILLS_NOTE}</p>
    </section>

    {/* ---------- dossier outline */}
    <section className={base.section} aria-labelledby="dossier">
      <Head id="dossier" label="Le dossier de projet" title="Le plan attendu, dans l’ordre." count={P.DOSSIER.length} />
      <ol className={styles.dossier}>
        {P.DOSSIER.map((item, index) => (
          <li key={item} className="js-reveal">
            <Line />
            <span className={base.stepIndex}>{pad(index + 1)}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
      <p className={`${styles.note} js-reveal`}>{P.DOSSIER_NOTE}</p>
    </section>

    {/* ---------- the jury */}
    <section className={base.section} aria-labelledby="jury">
      <Head id="jury" label="Les intentions du jury" title="Ce qu’il regarde." />
      <ul className={styles.juryFacts}>
        {P.JURY_FACTS.map((fact) => (
          <li key={fact.title} className="js-reveal">
            <strong>{fact.title}</strong>
            <span>{fact.text}</span>
          </li>
        ))}
      </ul>
      <p className={`${styles.subhead} js-reveal`}>Quelques critères de la grille d’évaluation</p>
      <div className={styles.criteria}>
        {P.CRITERIA.map((group) => (
          <div key={group.group} className={`${styles.criteriaGroup} js-reveal`}>
            <Line />
            <p className={styles.criteriaTitle}>{group.group}</p>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    {/* ---------- don'ts */}
    <section className={base.section} aria-labelledby="eviter">
      <Head id="eviter" label="À ne surtout pas faire" title="Les erreurs fréquentes." count={P.DONTS.length} />
      <ul className={styles.donts}>
        {P.DONTS.map((item) => (
          <li key={item} className="js-reveal">
            <span className={styles.cross} aria-hidden="true">
              ✕
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>

    {/* ---------- AI */}
    <section className={base.section} aria-labelledby="ia">
      <Head id="ia" label="L’IA" title="Utiliser l’IA pour se préparer." />
      <p className={`${styles.warning} js-reveal`}>
        <span className={styles.warningIcon} aria-hidden="true">
          ⚠
        </span>
        {P.AI.intro}
      </p>
      <div className={styles.doDont}>
        <div className={`${styles.doCol} js-reveal`}>
          <p className={styles.colTitle}>Oui</p>
          <ul>
            {P.AI.dos.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={`${styles.dontCol} js-reveal`}>
          <p className={styles.colTitle}>Non</p>
          <ul>
            {P.AI.donts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* ---------- confirmation bias */}
    <section className={base.section} aria-labelledby="biais">
      <Head id="biais" label="Biais cognitif" title="Le biais de confirmation, côté jury." />
      <p className={`${styles.lead} js-reveal`}>{P.BIAS.definition}</p>
      <ul className={styles.biasPoints}>
        {P.BIAS.points.map((point) => (
          <li key={point.title} className="js-reveal">
            <Line />
            <strong>{point.title}</strong>
            <span>{point.text}</span>
          </li>
        ))}
      </ul>
      <p className={`${styles.subhead} js-reveal`}>
        Ce qui peut donner cette impression, et ce qui montre votre travail
      </p>
      <ul className={styles.prompts}>
        {P.BIAS.signals.map((signal) => (
          <li key={signal.seen} className="js-reveal">
            <span className={styles.biased}>
              <em>Impression « généré »</em>
              {signal.seen}
            </span>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
            <span className={styles.better}>
              <em>Votre travail</em>
              {signal.better}
            </span>
          </li>
        ))}
      </ul>
    </section>

    {/* ---------- day J */}
    <section className={base.section} aria-labelledby="jourj">
      <Head id="jourj" label="Le jour J" title="Les derniers conseils." />
      <ul className={base.tips}>
        {TIPS.map((tip, index) => (
          <li key={tip} className={`${base.tip} js-reveal`}>
            <Line />
            <span className={base.stepIndex}>{pad(index + 1)}</span>
            <p>{tip}</p>
          </li>
        ))}
      </ul>
      <p className={`${styles.source} js-reveal`}>Source : {P.SOURCE}.</p>
    </section>
  </CdaShell>
)
