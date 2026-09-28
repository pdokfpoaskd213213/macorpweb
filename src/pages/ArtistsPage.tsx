import { getArtists, getLabels } from '@/content';
import { PageIntro } from '@/components/layout/PageIntro';
import { ArtistIndex } from '@/components/blocks/ArtistIndex';

export function ArtistsPage() {
  return (
    <>
      <PageIntro
        index="A"
        kicker="Artists"
        aside={`${getArtists().length} acts · ${getLabels().length} labels`}
        title="Roster"
        lead="Bands from the Recordooze live room and the rappers, producers and club acts of Deadwax — signed, developed and managed in-house."
      />
      <section className="surface-paper section">
        <div className="container">
          <ArtistIndex />
        </div>
      </section>
    </>
  );
}
