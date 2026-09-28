import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, getArtist, getLabel, getReleases } from '@/content';
import { Halftone } from '@/components/media/Halftone';
import styles from './Hero.module.css';

const SLIDE_MS = 7000;
/** The hero features the newest releases that carry a portrait-led story. */
const FEATURED = ['night-shift-tapes', 'static-hymns', 'afterimage', 'glass-hours'];

export function Hero() {
  const slides = getReleases()
    .filter((r) => FEATURED.includes(r.id))
    .map((r) => ({ release: r, artist: getArtist(r.artistId)!, label: getLabel(r.labelId) }));

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => go(index + 1), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, go]);

  const { release, artist, label } = slides[index];
  const len = artist.name.length;
  const size = len <= 7 ? styles.nameXl : len <= 12 ? styles.nameL : styles.nameM;

  return (
    <section
      className={`${styles.hero} surface-ink`}
      aria-roledescription="carousel"
      aria-label="Featured releases"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.topline}>
          <span className="t-meta">Featured release</span>
          <span className="t-meta t-muted">
            {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
          <span className={styles.rule} aria-hidden="true" />
          <span className="t-meta t-muted">{label.name}</span>
        </div>

        <div className={styles.stage} key={release.id} aria-live={paused ? 'polite' : 'off'}>
          <div className={styles.copy}>
            <p className={`t-meta ${styles.kicker}`}>
              {artist.kind} — {artist.descriptor}
            </p>
            <h1 className={`${styles.name} ${size}`}>{artist.name}</h1>
            <div className={styles.releaseLine}>
              <p className={styles.releaseTitle}>
                <span className={styles.quote}>‘</span>
                {release.title}
                <span className={styles.quote}>’</span> out now
              </p>
              <dl className={styles.facts}>
                <div>
                  <dt className="t-meta t-muted">Format</dt>
                  <dd className="t-meta">{release.format}</dd>
                </div>
                <div>
                  <dt className="t-meta t-muted">Released</dt>
                  <dd className="t-meta">{formatDate(release.date)}</dd>
                </div>
                <div>
                  <dt className="t-meta t-muted">Cat. no.</dt>
                  <dd className="t-meta">{release.catalog}</dd>
                </div>
              </dl>
            </div>
            <div className={styles.actions}>
              <Link to={`/releases#${release.id}`} className={styles.listen}>
                <span className={styles.play} aria-hidden="true" />
                Listen
              </Link>
              <Link to={`/artists#${artist.id}`} className={styles.profile}>
                Artist profile <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <figure className={styles.figure}>
            <div className={styles.frame}>
              <Halftone src={artist.image} alt={`Portrait of ${artist.name}`} density={60} gamma={1.05} />
              <span className={styles.corner} aria-hidden="true">
                {release.catalog}
              </span>
            </div>
            <figcaption className={styles.caption}>
              <span className="t-meta">{artist.name}</span>
              <span className="t-meta t-muted">{label.shortName} · {formatDate(release.date)}</span>
            </figcaption>
          </figure>
        </div>

        <div className={styles.controls}>
          <ol className={styles.tabs}>
            {slides.map((s, i) => (
              <li key={s.release.id}>
                <button
                  className={`${styles.tab} ${i === index ? styles.tabOn : ''}`}
                  aria-label={`Show ${s.artist.name} — ${s.release.title}`}
                  aria-current={i === index}
                  onClick={() => go(i)}
                >
                  <span className={styles.bar}>
                    <span
                      key={`${i}-${i === index}`}
                      className={`${styles.fill} ${i < index ? styles.fillDone : ''}`}
                      style={{
                        animationDuration: `${SLIDE_MS}ms`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                    />
                  </span>
                  <span className="t-meta">
                    {String(i + 1).padStart(2, '0')} <span className={styles.tabName}>{s.artist.name}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className={styles.arrows}>
            <button onClick={() => go(index - 1)} aria-label="Previous release">
              ←
            </button>
            <button onClick={() => go(index + 1)} aria-label="Next release">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
