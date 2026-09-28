import type { Artist, Label, Release } from '@/content';
import { Halftone } from './Halftone';
import styles from './CoverArt.module.css';

interface Props {
  release: Release;
  artist: Artist;
  label: Label;
}

/** Deterministic pseudo-random from a string, so covers never change between renders. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/**
 * Generated sleeve artwork — a house system of four treatments so the
 * catalogue reads as one label, until real artwork is supplied.
 */
export function CoverArt({ release, artist, label }: Props) {
  const rand = seeded(release.id);
  const light = release.cover === 'type';

  return (
    <div
      className={`${styles.cover} ${light ? styles.light : ''} ${release.cover === 'portrait' ? styles.portrait : ''}`}
      aria-hidden="true"
    >
      {release.cover === 'portrait' && (
        <div className={styles.photo}>
          <Halftone src={artist.image} alt="" density={40} gamma={1.2} />
        </div>
      )}

      {release.cover === 'grid' && (
        <div className={styles.grid}>
          {Array.from({ length: 64 }, (_, i) => (
            <span key={i} style={{ opacity: rand() > 0.62 ? 1 : 0.08 }} />
          ))}
        </div>
      )}

      {release.cover === 'rings' && (
        <svg className={styles.fill} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 10 }, (_, i) => (
            <circle
              key={i}
              cx={50 + (rand() - 0.5) * 6}
              cy={44}
              r={4 + i * 3.4}
              fill="none"
              stroke="currentColor"
              strokeWidth={i % 3 === 0 ? 0.9 : 0.35}
            />
          ))}
        </svg>
      )}

      {release.cover === 'type' && (
        <div className={styles.typeStack}>
          {release.title.split(' ').map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
      )}

      <div className={styles.top}>
        <span>{release.catalog}</span>
        <span>{label.shortName}</span>
      </div>
      {release.cover !== 'type' && (
        <div className={styles.bottom}>
          <span className={styles.artist}>{artist.name}</span>
          <span className={styles.title}>{release.title}</span>
        </div>
      )}
      {release.cover === 'type' && (
        <div className={styles.bottom}>
          <span className={styles.artistSmall}>{artist.name}</span>
        </div>
      )}
    </div>
  );
}
