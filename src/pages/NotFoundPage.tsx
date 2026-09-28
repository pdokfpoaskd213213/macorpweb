import { PageIntro } from '@/components/layout/PageIntro';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <>
      <PageIntro
        index="404"
        kicker="Not found"
        title={
          <>
            Run-<em>out</em>
          </>
        }
        lead="The silent groove at the end of the record. Nothing is pressed on this part of it."
      />
      <section className="surface-ink section">
        <div className="container">
          <Button to="/" arrow>
            Back to the start
          </Button>
        </div>
      </section>
    </>
  );
}
