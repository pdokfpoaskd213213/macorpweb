import { formatDate, getArtist, getLabel, type Release } from '@/content';
import { CoverArt } from '@/components/media/CoverArt';
import styles from './ReleaseGrid.module.css';

export function ReleaseGrid({ releases, columns = 4 }: { releases: Release[]; columns?: 3 | 4 }) {
  return (
    <ul className={styles.grid} style={{ ['--cols' as string]: columns }}>
      {releases.map((r) => {
        const artist = getArtist(r.artistId)!;
        const label = getLabel(r.labelId);
        return (
          <li key={r.id} id={r.id} className={styles.item}>
            <article>
              <div className={styles.art}>
                <CoverArt release={r} artist={artist} label={label} />
              </div>
              <div className={styles.meta}>
                <span className="t-meta t-muted">{r.catalog}</span>
                <span className="t-meta t-muted">{formatDate(r.date)}</span>
              </div>
              <h3 className={styles.title}>{r.title}</h3>
              <p className={styles.artist}>
                {artist.name}
                <span className="t-meta t-muted">
                  {r.format}
                  {r.tracks ? ` · ${r.tracks} ${r.tracks === 1 ? 'track' : 'tracks'}` : ''}
                </span>
              </p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
