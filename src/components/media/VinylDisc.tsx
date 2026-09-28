import styles from './VinylDisc.module.css';

/** A record with the label's logo on the centre sticker. Spins while hovered. */
export function VinylDisc({ logo, name, className = '' }: { logo: string; name: string; className?: string }) {
  return (
    <div className={`${styles.disc} ${className}`}>
      <div className={styles.grooves} aria-hidden="true" />
      <div className={styles.sheen} aria-hidden="true" />
      <div className={styles.center}>
        <img src={logo} alt={`${name} logo`} loading="lazy" />
      </div>
      <span className={styles.spindle} aria-hidden="true" />
    </div>
  );
}
