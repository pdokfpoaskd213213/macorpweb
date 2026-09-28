import { getVentures } from '@/content';
import { PageIntro } from '@/components/layout/PageIntro';
import { VentureList } from '@/components/blocks/VentureList';

export function ConnectionsPage() {
  return (
    <>
      <PageIntro
        index="C"
        kicker="Connections & partners"
        title={
          <>
            Connec<em>tions</em>
          </>
        }
        lead="The stage, the events arm and the radio network that carry Ma. Corp music out of the studio and into the city."
      />
      <section className="surface-ink section">
        <div className="container">
          <VentureList ventures={getVentures(['venue', 'events', 'broadcast', 'partner'])} />
        </div>
      </section>
    </>
  );
}
