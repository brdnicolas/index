import { COLLABS } from '../data/content'
import styles from './Collabs.module.scss'

const Logos = ({ hidden = false }: { hidden?: boolean }) => (
  <ul className={styles.track} aria-hidden={hidden || undefined}>
    {COLLABS.map((collab) => (
      <li key={collab.name} className={styles.item}>
        {collab.logo ? (
          <img
            src={collab.logo}
            alt={hidden ? '' : collab.name}
            width={collab.width}
            height={collab.height}
            style={{ height: collab.height, width: 'auto' }}
          />
        ) : (
          <span className={styles.wordmark}>{collab.name}</span>
        )}
      </li>
    ))}
  </ul>
)

export const Collabs = () => {
  return (
    <section className={styles.collabs} aria-label="Companies I worked with">
      <p className={styles.label}>A journey shaped by these collabs</p>
      <div className={styles.marquee}>
        <Logos />
        <Logos hidden />
      </div>
      <div className={styles.arc} aria-hidden="true" />
    </section>
  )
}
