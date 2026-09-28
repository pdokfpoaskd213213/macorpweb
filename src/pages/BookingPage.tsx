import { PageIntro } from '@/components/layout/PageIntro';
import { DoozeBotPanel } from '@/features/booking';

/**
 * /studios/book — the Dooze Bot workspace, behind <RequireAuth>.
 *
 * Phase 2 replaces the panel with <BookingForm /> (rendered from BOOKING_FIELDS),
 * availability calendar, producer picker and "My bookings" list.
 */
export function BookingPage() {
  return (
    <>
      <PageIntro index="DB" kicker="Dooze Bot" title="Book a session" />
      <section className="surface-paper section">
        <div className="container">
          <DoozeBotPanel />
        </div>
      </section>
    </>
  );
}
