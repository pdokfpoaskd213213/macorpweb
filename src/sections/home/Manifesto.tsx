import { company, getArtists, getLabels, getVentures } from '@/content';
import styles from './Manifesto.module.css';

export function Manifesto() {
  const ledger = [
    { k: 'Founded', v: `Back-room studio, ${company.origin}` },
    { k: 'Headquarters', v: company.headquarters },
    { k: 'Leadership', v: 'Donna Moritz & Dean Levine — Co-Founders & CEOs' },
    {
      k: 'Under one roof',
      v: `${getLabels().length} labels · ${getArtists().length} acts · ${getVentures().length} connected businesses`,
    },
  ];

  return (
    <section className={`${styles.section} surface-paper section`} aria-labelledby="about-title">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.side}>
            <span className="t-meta">[01]</span>
            <span className="t-meta">The group</span>
          </div>

          <div className={styles.main}>
            <h2 id="about-title" className={styles.statement}>
              From a back-room studio in Hawick to Rockford Hills — recording, releasing, retail, stages and radio <em>under one roof.</em>
            </h2>

            <div className={styles.cols}>
              <p>
                Ma. Corp is an independent media, arts & entertainment group. It brings independent production, music publishing, stage performance and creative distribution together in a
                single entertainment holding. We turned down the usual corporate mould: from the studio floor to the record store, from
                management to the live room, the whole industry sits in one ecosystem.
              </p>
              <p>
                Through its labels and affiliates, the group represents both a deep-rooted analog culture and the modern digital sound —
                with the standards to carry it well beyond San Andreas.
              </p>
            </div>

            <dl className={styles.ledger}>
              {ledger.map((row) => (
                <div key={row.k} className={styles.row}>
                  <dt className="t-meta t-muted">{row.k}</dt>
                  <dd>{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
