import { Link } from 'react-router-dom';
import { getLabels, getReleases, getVentures } from '@/content';
import { SectionHead } from '@/components/ui/SectionHead';
import { ArtistIndex } from '@/components/blocks/ArtistIndex';
import { ReleaseGrid } from '@/components/blocks/ReleaseGrid';
import { LabelFeature } from '@/components/blocks/LabelFeature';
import { VentureList } from '@/components/blocks/VentureList';
import { StudioRooms } from '@/components/blocks/StudioRooms';
import { DemoCallout, DepartmentGrid, Leadership } from '@/components/blocks/Company';
import { DoozeBotPanel } from '@/features/booking';
import { Hero } from '@/sections/home/Hero';
import { Manifesto } from '@/sections/home/Manifesto';
import styles from './HomePage.module.css';

const More = ({ to, children }: { to: string; children: string }) => (
  <Link to={to} className={styles.more}>
    {children} <span aria-hidden="true">→</span>
  </Link>
);

export function HomePage() {
  const [flagship, sub] = getLabels();

  return (
    <>
      <Hero />
      <Manifesto />

      {/* Labels — per the wireframe: the two houses, side by side */}
      <section className="surface-ink section" aria-labelledby="labels-title">
        <div className="container">
          <SectionHead
            id="labels-title"
            index="02"
            kicker="Labels"
            title={
              <>
                Two houses, <em>one sound system</em>
              </>
            }
            aside={<More to="/labels">All labels</More>}
          />
          <div className={styles.labels}>
            <LabelFeature label={flagship} index={1} />
            <div className={styles.labelOffset}>
              <LabelFeature label={sub} index={2} />
            </div>
          </div>
        </div>
      </section>

      <section className="surface-paper section" aria-labelledby="artists-title">
        <div className="container">
          <SectionHead id="artists-title" index="03" kicker="Artists" title="The roster" aside={<More to="/artists">Full roster</More>} />
          <ArtistIndex />
        </div>
      </section>

      <section className="surface-ink section" aria-labelledby="releases-title">
        <div className="container">
          <SectionHead
            id="releases-title"
            index="04"
            kicker="Releases"
            title={
              <>
                New <em>from the catalogue</em>
              </>
            }
            aside={<More to="/releases">All releases</More>}
          />
          <ReleaseGrid releases={getReleases(4)} />
        </div>
      </section>

      <section className="surface-paper section" aria-labelledby="studios-title">
        <div className="container">
          <SectionHead
            id="studios-title"
            index="05"
            kicker="Studios"
            title={
              <>
                Three rooms, <em>booked by bot</em>
              </>
            }
            aside={<More to="/studios">Studios</More>}
          />
          <div className={styles.studios}>
            <div>
              <p className={styles.studioLead}>
                Analog tracking for the Recordooze bands, a beat lab for Deadwax, and an engineering team across both. Signed artists
                book time directly — producer, room, day and slot — through Dooze Bot.
              </p>
              <StudioRooms />
            </div>
            <DoozeBotPanel />
          </div>
        </div>
      </section>

      <section className="surface-ink section" aria-labelledby="eco-title">
        <div className="container">
          <SectionHead
            id="eco-title"
            index="06"
            kicker="Stores & connections"
            title={
              <>
                Beyond the <em>studio door</em>
              </>
            }
            aside={<More to="/connections">Connections</More>}
          />
          <VentureList ventures={getVentures()} />
        </div>
      </section>

      <section className="surface-paper section" aria-labelledby="team-title">
        <div className="container">
          <SectionHead id="team-title" index="07" kicker="Team" title="The people behind it" aside={<More to="/team">Team</More>} />
          <Leadership />
          <div className={styles.depts}>
            <DepartmentGrid />
          </div>
          <div className={styles.callout}>
            <DemoCallout />
          </div>
        </div>
      </section>
    </>
  );
}
