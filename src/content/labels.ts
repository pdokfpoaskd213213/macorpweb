import type { Label } from './types';

export const labels: Label[] = [
  {
    id: 'recordooze',
    name: 'Recordooze Studio x Records',
    shortName: 'Recordooze',
    tier: 'Flagship label',
    established: '2024-04',
    manager: 'Donna Moritz',
    genres: ['Rock', 'Metal', 'Punk', 'Indie', 'Acoustic'],
    summary:
      'The flagship and the root of Ma. Corp. Live instrumentation, acoustic discipline and raw room energy — analog recording, mixing, advanced arrangement and full-band studio infrastructure.',
    logo: `${import.meta.env.BASE_URL}media/labels/recordooze.png`,
    catalogPrefix: 'RDZ',
  },
  {
    id: 'deadwax',
    name: 'Deadwax Records',
    shortName: 'Deadwax',
    tier: 'Sub-label',
    established: '2025-08',
    manager: 'KeShaun “OffKey” Burns',
    genres: ['Techno', 'Hip-Hop', 'Trap', 'Electronic'],
    summary:
      'The city’s rhythm and modern street sound. An electronic and urban imprint built on sound design, synthesizers, beat-making and club-standard mix engineering.',
    logo: `${import.meta.env.BASE_URL}media/labels/deadwax.png`,
    catalogPrefix: 'DWX',
  },
];
