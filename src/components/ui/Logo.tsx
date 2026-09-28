import styles from './Logo.module.css';

/** The Ma. corp wordmark, rebuilt in type so it stays sharp at any size. */
export function Logo({ inverted = false, className = '' }: { inverted?: boolean; className?: string }) {
  return (
    <span className={`${styles.mark} ${inverted ? styles.inverted : ''} ${className}`} aria-label="Ma. Corp">
      <span className={styles.ma} aria-hidden="true">
        Ma.
      </span>
      <span className={styles.corp} aria-hidden="true">
        corp<i className={styles.dot} />
      </span>
    </span>
  );
}
