import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthNotConnectedError, useAuth, type AuthStep } from '@/features/auth';
import styles from './LoginPage.module.css';

/**
 * Artist area entry. The step rail mirrors the full UCP flow so Phase 2
 * only has to light up steps 02 and 03 — layout and states already exist.
 */
const STEPS: { id: AuthStep; title: string; body: string }[] = [
  { id: 'ucp', title: 'UCP sign-in', body: 'Authenticate with the account you use for the server’s User Control Panel.' },
  { id: 'character', title: 'Choose character', body: 'Pick which of your characters is acting — artist, producer or staff.' },
  { id: 'ready', title: 'Artist area', body: 'Book studio time through Dooze Bot and manage your sessions.' },
];

type Notice = { tone: 'info' | 'error'; text: string } | null;

export function LoginPage() {
  const { signIn, status } = useAuth();
  const location = useLocation();
  const returnTo = (location.state as { from?: string } | null)?.from;
  const [notice, setNotice] = useState<Notice>(null);
  const busy = status === 'authenticating';
  const current: AuthStep = 'ucp';

  const handleSignIn = async () => {
    setNotice(null);
    try {
      await signIn(returnTo);
    } catch (err) {
      setNotice(
        err instanceof AuthNotConnectedError
          ? { tone: 'info', text: 'UCP sign-in isn’t connected yet. Artist accounts open with the studio booking release.' }
          : { tone: 'error', text: 'Something went wrong reaching the UCP. Try again in a moment.' },
      );
    }
  };

  return (
    <section className={styles.page}>
      <div className={`${styles.left} surface-ink`}>
        <div className={styles.leftInner}>
          <p className="t-meta t-muted">[Account] Artist area</p>
          <h1 className={styles.title}>
            Artist <em>area</em>
          </h1>
          <p className={styles.lead}>
            For signed Ma. Corp artists, producers and staff. One sign-in for studio bookings, sessions and — later — everything else
            the label runs for you.
          </p>

          <ol className={styles.rail} aria-label="Sign-in steps">
            {STEPS.map((s, i) => {
              const state = s.id === current ? 'current' : 'upcoming';
              return (
                <li key={s.id} className={`${styles.step} ${styles[state]}`} aria-current={state === 'current' ? 'step' : undefined}>
                  <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className={styles.stepTitle}>
                      {s.title}
                      {state === 'upcoming' && <span className="t-meta">Soon</span>}
                    </p>
                    <p className={styles.stepBody}>{s.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className={`${styles.right} surface-paper`}>
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <span className="t-meta">Step 01 / 03</span>
            <span className="t-meta t-muted">Secure sign-in</span>
          </div>

          <h2 className={styles.panelTitle}>Sign in with UCP</h2>
          <p className={styles.panelBody}>
            You’ll be sent to the server’s User Control Panel to confirm it’s you, then brought straight back here.{' '}
            <strong>Ma. Corp never sees your UCP password.</strong>
          </p>

          <button className={styles.ucpBtn} onClick={handleSignIn} disabled={busy} aria-busy={busy}>
            <span className={styles.ucpMark} aria-hidden="true">
              UCP
            </span>
            <span>{busy ? 'Connecting…' : 'Continue with UCP'}</span>
            <span aria-hidden="true" className={styles.ucpArrow}>
              {busy ? <span className={styles.spinner} /> : '→'}
            </span>
          </button>

          <div role="status" aria-live="polite" className={styles.noticeSlot}>
            {notice && (
              <p className={`${styles.notice} ${notice.tone === 'error' ? styles.noticeError : ''}`}>
                <span className="t-meta">{notice.tone === 'error' ? 'Error' : 'Notice'}</span>
                {notice.text}
              </p>
            )}
          </div>

          <dl className={styles.help}>
            <div>
              <dt className="t-meta t-muted">Not signed yet?</dt>
              <dd>
                Send your demo to <a href="mailto:ar@macorp.com">ar@macorp.com</a>
              </dd>
            </div>
            <div>
              <dt className="t-meta t-muted">Access problems</dt>
              <dd>
                <a href="mailto:contact@macorp.com">contact@macorp.com</a>
              </dd>
            </div>
          </dl>

          <Link to="/studios" className={styles.back}>
            ← What’s behind the login: Studios & Dooze Bot
          </Link>
        </div>
      </div>
    </section>
  );
}
