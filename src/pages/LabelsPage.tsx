import { getLabels } from '@/content';
import { PageIntro } from '@/components/layout/PageIntro';
import { LabelFeature } from '@/components/blocks/LabelFeature';
import styles from './InnerPages.module.css';

export function LabelsPage() {
  return (
    <>
      <PageIntro
        index="L"
        kicker="Labels"
        title="Labels"
        lead="A flagship built on analog rooms and a sub-label built on the city’s street sound. Separate identities, shared infrastructure."
      />
      <section className="surface-ink section">
        <div className={`container ${styles.labels}`}>
          {getLabels().map((l, i) => (
            <LabelFeature key={l.id} label={l} index={i + 1} showRoster />
          ))}
        </div>
      </section>
    </>
  );
}
