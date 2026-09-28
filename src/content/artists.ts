import type { Artist } from './types';

const img = (id: string) => `${import.meta.env.BASE_URL}media/artists/${id}.png`;

export const artists: Artist[] = [
  // Recordooze Studio x Records
  { id: 'echos', name: 'Echos', kind: 'Group', labelId: 'recordooze', image: img('echos'), descriptor: 'Metal' },
  { id: 'stranger-in-the-mirror', name: 'Stranger in The Mirror', kind: 'Group', labelId: 'recordooze', image: img('stranger-in-the-mirror'), descriptor: 'Post-punk' },
  { id: 'creeve', name: 'Creeve', kind: 'Artist', labelId: 'recordooze', image: img('creeve'), descriptor: 'Indie / Acoustic' },
  { id: 'doozeband', name: 'Doozeband', kind: 'Group', labelId: 'recordooze', image: img('doozeband'), descriptor: 'House band' },

  // Deadwax Records
  { id: 'offkey', name: 'OffKey', kind: 'Artist', labelId: 'deadwax', image: img('offkey'), descriptor: 'Hip-Hop' },
  { id: 'roxxy-wesson', name: 'Roxxy We$$on', kind: 'Artist', labelId: 'deadwax', image: img('roxxy-wesson'), descriptor: 'Trap' },
  { id: 'm22', name: 'M22', kind: 'Artist', labelId: 'deadwax', image: img('m22'), descriptor: 'Hip-Hop' },
  { id: 'slynt', name: 'Slynt', kind: 'Artist', labelId: 'deadwax', image: img('slynt'), descriptor: 'Trap' },
  { id: 'dean-levine', name: 'Dean Levine', kind: 'Artist', labelId: 'deadwax', image: img('dean-levine'), descriptor: 'Hip-Hop' },
  { id: 'jace', name: 'Jace', kind: 'Artist', labelId: 'deadwax', image: img('jace'), descriptor: 'Electronic' },
  { id: 'paybacc', name: 'Paybacc', kind: 'Artist', labelId: 'deadwax', image: img('paybacc'), descriptor: 'Trap' },
  { id: 'jiyeon', name: 'Jiyeon', kind: 'Artist', labelId: 'deadwax', image: img('jiyeon'), descriptor: 'Electronic / Pop' },
];
