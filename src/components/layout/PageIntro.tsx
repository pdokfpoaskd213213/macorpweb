import type { ReactNode } from 'react';
import styles from './PageIntro.module.css';

interface Props {
  index: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
}

/** Opening block for every inner page — the section head, one size up. */
export function PageIntro({ index, kicker, title, lead, aside }: Props) {
  return (
    <section className={`${styles.intro} surface-ink`}>
      <div className="container">
        <div className={styles.rule}>
          <span className="t-meta">[{index}]</span>
          <span className="t-meta">{kicker}</span>
          <span className={styles.line} aria-hidden="true" />
          {aside && <span className="t-meta t-muted">{aside}</span>}
        </div>
        <div className={styles.body}>
          <h1 className={styles.title}>{title}</h1>
          {lead && <p className={styles.lead}>{lead}</p>}
        </div>
      </div>
    </section>
  );
}
