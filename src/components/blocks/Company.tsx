import { departments, leadership } from '@/content';
import styles from './Company.module.css';

const initials = (name: string) =>
  name
    .replace(/[“”"].*?[“”"]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join('');

export function Leadership() {
  return (
    <ul className={styles.people}>
      {leadership.map((p) => (
        <li key={p.id} className={styles.person}>
          <span className={styles.mono} aria-hidden="true">
            {initials(p.name)}
          </span>
          <div>
            <h3 className={styles.personName}>{p.name}</h3>
            <p className={styles.role}>{p.role}</p>
            <p className="t-meta t-muted">{p.unit}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function DepartmentGrid() {
  return (
    <ol className={styles.depts}>
      {departments.map((d, i) => (
        <li key={d.id} className={styles.dept}>
          <span className="t-meta t-muted">{String(i + 1).padStart(2, '0')}</span>
          <h3 className={styles.deptName}>{d.name}</h3>
          <p className={styles.deptSummary}>{d.summary}</p>
          <a className={`t-meta ${styles.mail}`} href={`mailto:${d.email}`}>
            {d.email}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function DemoCallout() {
  return (
    <div className={styles.callout}>
      <div>
        <p className="t-meta t-muted">A&R board · Demo reviews & scouting</p>
        <p className={styles.calloutLine}>
          Send us the record <em>no one else will sign.</em>
        </p>
      </div>
      <div className={styles.calloutLinks}>
        <a href="mailto:ar@macorp.com">
          <span className="t-meta t-muted">Demos</span>
          ar@macorp.com
        </a>
        <a href="mailto:hiring@macorp.com">
          <span className="t-meta t-muted">Careers</span>
          hiring@macorp.com
        </a>
      </div>
    </div>
  );
}
