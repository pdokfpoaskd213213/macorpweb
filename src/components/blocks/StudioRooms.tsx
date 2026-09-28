import { getLabel, getStudios } from '@/content';
import styles from './StudioRooms.module.css';

export function StudioRooms() {
  return (
    <ul className={styles.rooms}>
      {getStudios().map((s) => (
        <li key={s.id} id={s.id} className={styles.room}>
          <span className={styles.letter} aria-hidden="true">
            {s.room}
          </span>
          <div className={styles.body}>
            <div className={styles.top}>
              <h3 className={styles.name}>
                <span className="visually-hidden">Room {s.room} — </span>
                {s.name}
              </h3>
              <span className="t-meta t-muted">{getLabel(s.labelId).shortName}</span>
            </div>
            <p className={styles.focus}>{s.focus}</p>
            <ul className={styles.specs}>
              {s.specs.map((sp) => (
                <li key={sp} className="t-meta">
                  {sp}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
