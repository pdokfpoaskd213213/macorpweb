import { getVentures } from '@/content';
import { PageIntro } from '@/components/layout/PageIntro';
import { VentureList } from '@/components/blocks/VentureList';
import styles from './InnerPages.module.css';

const shelves = [
  ['Records', 'New pressings from both labels, rare second-hand vinyl and the Vinylism crate picks.'],
  ['Hi-fi & equipment', 'Turntables, speakers, headphones and the studio gear the engineers actually use.'],
  ['Official merch', 'Apparel, accessories and collection pieces for every Ma. Corp artist — sold nowhere else.'],
];

export function StoresPage() {
  return (
    <>
      <PageIntro
        index="ST"
        kicker="Stores"
        title="Stores"
        lead="Records, hi-fi and the official merchandise of every Ma. Corp artist — in person, on the shelf."
      />
      <section className="surface-ink section">
        <div className="container">
          <VentureList ventures={getVentures(['store'])} />
          <ol className={styles.steps}>
            {shelves.map(([t, d], i) => (
              <li key={t}>
                <span className="t-meta">{String(i + 1).padStart(2, '0')}</span>
                <strong>{t}</strong>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
