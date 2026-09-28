import type { Venture } from './types';

export const ventures: Venture[] = [
  {
    id: 'vinylism',
    name: 'Vinylism Record Store',
    kind: 'store',
    category: 'Physical retail, equipment & merchandise',
    location: 'Los Santos',
    summary:
      'Grown from a modest record shop into a full music store: rare pressings, hi-fi equipment, and the official distribution point for Ma. Corp artist merchandise — apparel, accessories and collection pieces.',
    contact: { label: 'Facebrowser', value: 'face.gta.world/page/vinylism', href: 'https://face.gta.world/page/vinylism' },
  },
  {
    id: 'urban-performance',
    name: 'Urban Performance Hall & Bar',
    kind: 'venue',
    category: 'Live stage, event space & bar',
    location: 'West Vinewood',
    summary:
      'The flagship live room on the West Vinewood strip. High acoustic standards, professional stage lighting and a full bar — home to Ma. Corp launch nights, a regular stage calendar and private events.',
    contact: { label: 'Facebrowser', value: 'face.gta.world/page/urbanperformance', href: 'https://face.gta.world/page/urbanperformance' },
  },
  {
    id: 'ma-events',
    name: 'Ma. Events',
    kind: 'events',
    category: 'Organisation, stage production & live management',
    summary:
      'The group’s independent events arm. Concerts, tours, festivals and launch operations for Ma. Corp artists — plus end-to-end staging, ticketing, security and technical production for outside artists, clubs and brands.',
    contact: { label: 'Booking & events', value: 'events@macorp.com', href: 'mailto:events@macorp.com' },
  },
  {
    id: 'ma-audio',
    name: 'Ma. Audio Group',
    kind: 'broadcast',
    category: 'Radio network, broadcasting & audio content',
    summary:
      'Terrestrial and digital radio under one roof. An active broadcast channel, independent podcasters, genre frequencies and dedicated shows for the group’s artists — on air across San Andreas.',
    contact: { label: 'Broadcast & advertising', value: 'audio@macorp.com', href: 'mailto:audio@macorp.com' },
  },
];
