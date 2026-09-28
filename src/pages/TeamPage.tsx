import { directory } from '@/content';
import { PageIntro } from '@/components/layout/PageIntro';
import { SectionHead } from '@/components/ui/SectionHead';
import { DemoCallout, DepartmentGrid, Leadership } from '@/components/blocks/Company';
import styles from './InnerPages.module.css';

export function TeamPage() {
  return (
    <>
      <PageIntro
        index="T"
        kicker="Employees & team"
        title="Team"
        lead="An executive board, two label managers and six departments covering everything between the demo and the stage."
      />
      <section className="surface-paper section">
        <div className="container">
          <SectionHead index="T1" kicker="Executive board" title="Leadership" />
          <Leadership />
          <div className={styles.block}>
            <SectionHead index="T2" kicker="Departments" title="Departments" />
            <DepartmentGrid />
          </div>
          <div className={styles.block}>
            <DemoCallout />
          </div>
          <div className={styles.block}>
            <SectionHead index="T3" kicker="Directory" title="Switchboard" />
            <dl className={styles.directory}>
              {directory.map((d) => (
                <div key={d.label}>
                  <dt className="t-meta t-muted">{d.label}</dt>
                  <dd>{d.href ? <a href={d.href}>{d.value}</a> : d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
