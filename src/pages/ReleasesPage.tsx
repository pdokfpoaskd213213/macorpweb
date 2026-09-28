import { getReleases } from '@/content';
import { PageIntro } from '@/components/layout/PageIntro';
import { ReleaseGrid } from '@/components/blocks/ReleaseGrid';

export function ReleasesPage() {
  const all = getReleases();
  return (
    <>
      <PageIntro
        index="R"
        kicker="Releases"
        aside={`${all.length} titles`}
        title={
          <>
            Cata<em>logue</em>
          </>
        }
        lead="Every Recordooze (RDZ) and Deadwax (DWX) release, newest first. Streaming and store links arrive with each drop."
      />
      <section className="surface-ink section">
        <div className="container">
          <ReleaseGrid releases={all} />
        </div>
      </section>
    </>
  );
}
