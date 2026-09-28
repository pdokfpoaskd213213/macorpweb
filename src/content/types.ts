/**
 * Domain types for public content.
 *
 * Phase 1 serves these from static modules in /src/content.
 * Phase 2 can replace the selectors in ./index.ts with API calls
 * without touching components — they only depend on these shapes.
 */

export type LabelId = 'recordooze' | 'deadwax';

export interface Label {
  id: LabelId;
  name: string;
  shortName: string;
  tier: 'Flagship label' | 'Sub-label';
  established: string;
  manager: string;
  genres: string[];
  summary: string;
  logo: string;
  catalogPrefix: string;
  forumUrl?: string;
}

export type ArtistKind = 'Artist' | 'Group';

export interface Artist {
  id: string;
  name: string;
  kind: ArtistKind;
  labelId: LabelId;
  image: string;
  /** Short line used in rosters and hero captions. */
  descriptor: string;
}

export type ReleaseFormat = 'Single' | 'EP' | 'LP' | 'Mixtape' | 'Live';

export interface Release {
  id: string;
  title: string;
  artistId: string;
  labelId: LabelId;
  format: ReleaseFormat;
  date: string; // ISO yyyy-mm-dd
  catalog: string;
  /** Visual treatment for generated cover art. */
  cover: 'portrait' | 'type' | 'grid' | 'rings';
  tracks?: number;
}

export type VentureKind = 'store' | 'venue' | 'events' | 'broadcast' | 'partner';

export interface Venture {
  id: string;
  name: string;
  kind: VentureKind;
  category: string;
  location?: string;
  summary: string;
  contact?: { label: string; value: string; href?: string };
}

export interface Studio {
  id: string;
  name: string;
  room: string;
  labelId: LabelId;
  focus: string;
  specs: string[];
  location: string;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  unit: string;
}

export interface Department {
  id: string;
  name: string;
  summary: string;
  email: string;
}
