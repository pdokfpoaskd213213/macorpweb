import { Link } from 'react-router-dom';
import { primaryNav, socialLinks } from '@/app/navigation';
import { company, directory, getVentures } from '@/content';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} surface-ink`}>
      <div className="container">
        <Link to="/login" className={styles.cta}>
          <span className="t-meta">Artist area</span>
          <span className={styles.ctaLine}>
            <span>
              Sign in with <em>UCP</em> to book studio time
            </span>
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </span>
        </Link>

        <div className={styles.cols}>
          <div className={styles.col}>
            <h3 className="t-meta t-muted">Navigate</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {primaryNav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className="t-meta t-muted">Ecosystem</h3>
            <ul>
              <li>
                <Link to="/labels">Recordooze Studio x Records</Link>
              </li>
              <li>
                <Link to="/labels">Deadwax Records</Link>
              </li>
              {getVentures().map((v) => (
                <li key={v.id}>
                  <Link to={v.kind === 'store' ? '/stores' : '/connections'}>{v.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.col} ${styles.wide}`}>
            <h3 className="t-meta t-muted">Directory</h3>
            <dl className={styles.dir}>
              {directory.map((d) => (
                <div key={d.label}>
                  <dt className="t-meta t-muted">{d.label}</dt>
                  <dd>{d.href ? <a href={d.href}>{d.value}</a> : d.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.col}>
            <h3 className="t-meta t-muted">Follow</h3>
            <ul>
              {socialLinks.map((s) => (
                <li key={s.label}>
                  {s.href !== '#' ? (
                    <a href={s.href} target="_blank" rel="noreferrer">
                      {s.label} ↗
                    </a>
                  ) : (
                    <span className={styles.soon}>
                      {s.label} <span className="t-meta">soon</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.wordmark} aria-hidden="true">
        <span>Ma. Corp</span>
      </div>

      <div className={`container ${styles.legal}`}>
        <span className="t-meta t-muted">
          © {year} {company.name} — {company.headquarters}
        </span>
        <span className="t-meta t-muted">{company.status}</span>
      </div>
    </footer>
  );
}
