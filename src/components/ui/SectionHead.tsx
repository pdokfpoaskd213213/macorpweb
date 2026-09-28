import type { ReactNode } from 'react';
import styles from './SectionHead.module.css';

interface Props {
  index: string;
  kicker: string;
  title: ReactNode;
  aside?: ReactNode;
  id?: string;
}

/**
 * Section opener used across the site:
 *   [02]  LABELS ─────────────────────────────  aside
 *   Big title
 */
export function SectionHead({ index, kicker, title, aside, id }: Props) {
  return (
    <header className={styles.head}>
      <div className={styles.rule}>
        <span className="t-meta">[{index}]</span>
        <span className="t-meta">{kicker}</span>
        <span className={styles.line} aria-hidden="true" />
        {aside && <span className={styles.aside}>{aside}</span>}
      </div>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
    </header>
  );
}
