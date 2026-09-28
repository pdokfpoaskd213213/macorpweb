import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth';
import { BOOKING_FIELDS } from './fields';
import styles from './DoozeBotPanel.module.css';

/**
 * Entry point to Dooze Bot, the studio booking system.
 *
 * Phase 1: a read-only preview of the booking sheet and a route into sign-in.
 * Phase 2: rows become inputs (same BOOKING_FIELDS), status goes live, and the
 * CTA opens /studios/book for authenticated artists.
 */
export function DoozeBotPanel({ compact = false }: { compact?: boolean }) {
  const { status } = useAuth();
  const signedIn = status === 'authenticated';

  return (
    <section className={`${styles.panel} surface-ink`} aria-labelledby="dooze-title">
      <header className={styles.bar}>
        <span className={styles.botMark} aria-hidden="true">
          +
        </span>
        <div>
          <h3 id="dooze-title" className={styles.title}>
            Dooze Bot
          </h3>
          <p className="t-meta t-muted">Studio booking · Recordooze & Deadwax rooms</p>
        </div>
        <span className={`t-meta ${styles.status}`}>
          <i aria-hidden="true" /> Opening soon
        </span>
      </header>

      {!compact && (
        <p className={styles.lead}>
          Pick your producer, room, day and slot — Dooze Bot holds the session and confirms it with the studio team.
        </p>
      )}

      <ol className={styles.sheet} aria-label="Booking sheet preview">
        {BOOKING_FIELDS.map((f, i) => (
          <li key={f.key} className={styles.field}>
            <span className="t-meta t-muted">{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.label}>{f.label}</span>
            <span className={styles.leader} aria-hidden="true" />
            <span className={`t-meta t-muted ${styles.hint}`}>{f.hint}</span>
            <span className={styles.lock} aria-label="Locked">
              <svg viewBox="0 0 12 14" width="10" height="12" aria-hidden="true">
                <rect x="1" y="6" width="10" height="7.5" fill="none" stroke="currentColor" />
                <path d="M3.5 6V4a2.5 2.5 0 0 1 5 0v2" fill="none" stroke="currentColor" />
              </svg>
            </span>
          </li>
        ))}
      </ol>

      <footer className={styles.foot}>
        <p className="t-meta t-muted">
          {signedIn ? 'Signed in — booking opens with the next release.' : 'Signed Ma. Corp artists only · UCP account required'}
        </p>
        <Link to={signedIn ? '/studios/book' : '/login'} className={styles.cta}>
          {signedIn ? 'Open Dooze Bot' : 'Sign in to book'} <span aria-hidden="true">→</span>
        </Link>
      </footer>
    </section>
  );
}
