import { useAuth } from '@/features/auth';
import { DoozeBotPanel } from '@/features/booking';
import { PageIntro } from '@/components/layout/PageIntro';
import { Button } from '@/components/ui/Button';
import styles from './InnerPages.module.css';

/**
 * Authenticated home. Only reachable through <RequireAuth>, so in Phase 1
 * it never renders — it exists to fix the route and the page shell.
 *
 * Phase 2 slots: active character + switcher, upcoming bookings, profile.
 */
export function AccountPage() {
  const { session, signOut } = useAuth();

  return (
    <>
      <PageIntro
        index="ME"
        kicker="Account"
        title="Account"
        lead={session ? `Signed in as ${session.account.username}.` : undefined}
        aside={session?.character?.name ?? 'No character selected'}
      />
      <section className="surface-paper section">
        <div className={`container ${styles.split}`}>
          <DoozeBotPanel compact />
          <div>
            <Button variant="outline" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
