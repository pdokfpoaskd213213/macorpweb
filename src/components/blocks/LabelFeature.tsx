import { Link } from 'react-router-dom';
import { formatDate, getArtists, type Label } from '@/content';
import { VinylDisc } from '@/components/media/VinylDisc';
import styles from './LabelFeature.module.css';

/** A label as a record: the disc, then the sleeve notes. */
export function LabelFeature({ label, index, showRoster = false }: { label: Label; index: number; showRoster?: boolean }) {
  const roster = getArtists(label.id);

  return (
    <article className={`${styles.label} disc-host`} id={label.id}>
      <div className={styles.discWrap}>
        <VinylDisc logo={label.logo} name={label.name} />
      </div>

      <div className={styles.notes}>
        <div className={styles.metaRow}>
          <span className="t-meta">{String(index).padStart(2, '0')}</span>
          <span className="t-meta t-muted">{label.tier}</span>
          <span className="t-meta t-muted">Est. {formatDate(label.established)}</span>
        </div>
        <h3 className={styles.name}>{label.name}</h3>
        <p className={styles.summary}>{label.summary}</p>

        <dl className={styles.facts}>
          <div>
            <dt className="t-meta t-muted">Sound</dt>
            <dd>{label.genres.join(' / ')}</dd>
          </div>
          <div>
            <dt className="t-meta t-muted">Label manager</dt>
            <dd>{label.manager}</dd>
          </div>
          <div>
            <dt className="t-meta t-muted">Catalogue</dt>
            <dd>{label.catalogPrefix} series</dd>
          </div>
          <div>
            <dt className="t-meta t-muted">Roster</dt>
            <dd>{String(roster.length).padStart(2, '0')} acts</dd>
          </div>
        </dl>

        {showRoster ? (
          <ul className={styles.roster}>
            {roster.map((a) => (
              <li key={a.id}>
                <Link to={`/artists#${a.id}`}>
                  <img src={a.image} alt="" loading="lazy" />
                  <span>{a.name}</span>
                  <span className="t-meta t-muted">{a.kind}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Link to={`/labels#${label.id}`} className={styles.more}>
            Enter {label.shortName} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}
