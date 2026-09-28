import { PageIntro } from '@/components/layout/PageIntro';
import { SectionHead } from '@/components/ui/SectionHead';
import { StudioRooms } from '@/components/blocks/StudioRooms';
import { DoozeBotPanel } from '@/features/booking';
import styles from './InnerPages.module.css';

const steps = [
  ['Sign in', 'Use your UCP account. Signed artists and staff get studio access.'],
  ['Choose', 'Producer, room, date, time and session type — on one sheet.'],
  ['Confirm', 'Dooze Bot holds the slot and the studio team confirms it.'],
];

export function StudiosPage() {
  return (
    <>
      <PageIntro
        index="S"
        kicker="Studios"
        title={
          <>
            Stud<em>ios</em>
          </>
        }
        lead="Three rooms in Rockford Hills, run by the engineering team behind both labels. Sessions are booked through Dooze Bot."
      />
      <section className="surface-paper section">
        <div className={`container ${styles.split}`}>
          <div>
            <SectionHead index="S1" kicker="Rooms" title="The rooms" />
            <StudioRooms />
          </div>
          <div className={styles.sticky}>
            <DoozeBotPanel />
            <ol className={styles.steps}>
              {steps.map(([t, d], i) => (
                <li key={t}>
                  <span className="t-meta">{String(i + 1).padStart(2, '0')}</span>
                  <strong>{t}</strong>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
