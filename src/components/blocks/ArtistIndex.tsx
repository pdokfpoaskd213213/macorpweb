import { useState } from 'react';
import { getArtists, getLabel, getLabels, type LabelId } from '@/content';
import { Halftone } from '@/components/media/Halftone';
import styles from './ArtistIndex.module.css';

type Filter = 'all' | LabelId;

/**
 * Roster as an editorial index: one big line per act, with a printed
 * portrait that follows the row you're on.
 */
export function ArtistIndex() {
  const [filter, setFilter] = useState<Filter>('all');
  const list = getArtists(filter === 'all' ? undefined : filter);
  const [activeId, setActiveId] = useState(list[0].id);
  const active = list.find((a) => a.id === activeId) ?? list[0];

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: getArtists().length },
    ...getLabels().map((l) => ({ id: l.id, label: l.shortName, count: getArtists(l.id).length })),
  ];

  return (
    <div className={styles.wrap}>
      <div className={styles.filters} role="tablist" aria-label="Filter by label">
        {filters.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            className={`${styles.filter} ${filter === f.id ? styles.filterOn : ''}`}
            onClick={() => {
              setFilter(f.id);
              setActiveId(getArtists(f.id === 'all' ? undefined : f.id)[0].id);
            }}
          >
            {f.label}
            <sup>{String(f.count).padStart(2, '0')}</sup>
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        <ol className={styles.list}>
          {list.map((a, i) => (
            <li key={a.id} id={a.id}>
              <button
                className={`${styles.row} ${a.id === active.id ? styles.rowOn : ''}`}
                onMouseEnter={() => setActiveId(a.id)}
                onFocus={() => setActiveId(a.id)}
                onClick={() => setActiveId(a.id)}
              >
                <span className={`t-meta ${styles.num}`}>{String(i + 1).padStart(2, '0')}</span>
                <img className={styles.thumb} src={a.image} alt="" loading="lazy" />
                <span className={styles.name}>{a.name}</span>
                <span className={`t-meta ${styles.meta}`}>
                  <span>{a.kind}</span>
                  <span>{a.descriptor}</span>
                  <span>{getLabel(a.labelId).shortName}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>

        <aside className={styles.preview} aria-live="polite">
          <div className={styles.frame}>
            <Halftone src={active.image} alt={`Portrait of ${active.name}`} dot="#0b0b0b" density={48} gamma={1.2} onPaper />
          </div>
          <div className={styles.caption}>
            <span className="t-meta">{active.name}</span>
            <span className="t-meta t-muted">{getLabel(active.labelId).name}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
