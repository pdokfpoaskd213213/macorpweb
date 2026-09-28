import type { Venture } from '@/content';
import styles from './VentureList.module.css';

const KIND_LABEL: Record<Venture['kind'], string> = {
  store: 'Store',
  venue: 'Venue',
  events: 'Events',
  broadcast: 'Broadcast',
  partner: 'Partner',
};

/** Connected businesses laid out like a ledger — hairlines, no boxes. */
export function VentureList({ ventures, startIndex = 1 }: { ventures: Venture[]; startIndex?: number }) {
  return (
    <ul className={styles.list}>
      {ventures.map((v, i) => (
        <li key={v.id} id={v.id} className={styles.item}>
          <div className={styles.head}>
            <span className="t-meta">{String(startIndex + i).padStart(2, '0')}</span>
            <span className={`t-meta ${styles.kind}`}>{KIND_LABEL[v.kind]}</span>
            {v.location && <span className="t-meta t-muted">{v.location}</span>}
          </div>
          <h3 className={styles.name}>{v.name}</h3>
          <p className={`t-meta t-muted ${styles.category}`}>{v.category}</p>
          <p className={styles.summary}>{v.summary}</p>
          {v.contact && (
            <p className={styles.contact}>
              <span className="t-meta t-muted">{v.contact.label}</span>
              {v.contact.href ? (
                <a href={v.contact.href} {...(v.contact.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  {v.contact.value}
                  {v.contact.href.startsWith('http') ? ' ↗' : ''}
                </a>
              ) : (
                <span>{v.contact.value}</span>
              )}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
