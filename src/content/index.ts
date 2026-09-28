/**
 * Content selectors — the only entry point components use for data.
 * Swap these bodies for fetch calls in Phase 2; signatures stay.
 */
import { artists } from './artists';
import { labels } from './labels';
import { releases } from './releases';
import { studios } from './studios';
import { ventures } from './ventures';
import type { LabelId, VentureKind } from './types';

export * from './types';
export { company, leadership, departments, directory } from './company';

export const getLabels = () => labels;
export const getLabel = (id: LabelId) => labels.find((l) => l.id === id)!;

export const getArtists = (labelId?: LabelId) =>
  labelId ? artists.filter((a) => a.labelId === labelId) : artists;
export const getArtist = (id: string) => artists.find((a) => a.id === id);

export const getReleases = (limit?: number) => {
  const sorted = [...releases].sort((a, b) => b.date.localeCompare(a.date));
  return limit ? sorted.slice(0, limit) : sorted;
};

export const getStudios = () => studios;

export const getVentures = (kinds?: VentureKind[]) =>
  kinds ? ventures.filter((v) => kinds.includes(v.kind)) : ventures;

/** Catalogue-style dates: 2026-09-12 → 12.09.26, 2024-04 → 04.2024 */
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return d ? `${d}.${m}.${y.slice(2)}` : `${m}.${y}`;
};
