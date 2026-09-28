import type { Studio } from './types';

/** PLACEHOLDER room specs — confirm with engineering before launch. */
export const studios: Studio[] = [
  {
    id: 'room-a',
    name: 'Live Room',
    room: 'A',
    labelId: 'recordooze',
    focus: 'Full-band tracking, drums, amplified sessions',
    specs: ['Analog console', 'Isolated drum room', 'Backline on site'],
    location: 'Rockford Hills',
  },
  {
    id: 'room-b',
    name: 'Control & Mix',
    room: 'B',
    labelId: 'recordooze',
    focus: 'Mixing, overdubs, vocal & acoustic sessions',
    specs: ['Outboard chain', 'Vocal booth', 'Mix & master'],
    location: 'Rockford Hills',
  },
  {
    id: 'room-c',
    name: 'Beat Lab',
    room: 'C',
    labelId: 'deadwax',
    focus: 'Production, sound design, rap vocals',
    specs: ['Synth wall', 'Club monitoring', 'Vocal booth'],
    location: 'Rockford Hills',
  },
];
