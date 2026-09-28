import type { Department, Person } from './types';

export const company = {
  name: 'Ma. Corp',
  descriptor: 'Media, Arts & Entertainment Group',
  sector: 'Holding & entertainment conglomerate',
  headquarters: 'Rockford Hills, Los Santos',
  origin: 'Hawick',
  switchboard: '+(1) 527',
  email: 'contact@macorp.com',
  facebrowser: 'https://face.gta.world/page/macorp',
  status: 'Private enterprise — media & music group',
};

export const leadership: Person[] = [
  { id: 'donna-moritz', name: 'Donna Moritz', role: 'Co-Founder & CEO', unit: 'Executive board · Label manager, Recordooze' },
  { id: 'dean-levine', name: 'Dean Levine', role: 'Co-Founder & CEO', unit: 'Executive board' },
  { id: 'keshaun-burns', name: 'KeShaun “OffKey” Burns', role: 'Label Manager', unit: 'Deadwax Records' },
];

export const departments: Department[] = [
  { id: 'visual', name: 'Visual Content & Production', summary: 'Music videos, cover design, stage visuals and digital media — produced end to end.', email: 'contact@macorp.com' },
  { id: 'management', name: 'Artist Management', summary: 'Career planning, legal representation, contract negotiation, tour and calendar coordination.', email: 'contact@macorp.com' },
  { id: 'production', name: 'Music Production & Engineering', summary: 'Mixing and mastering, arrangement, composition, beat-making and the studio recording staff.', email: 'contact@macorp.com' },
  { id: 'events', name: 'Events & Organisation', summary: 'Concerts, launch nights, raves, ticketing and live production logistics.', email: 'events@macorp.com' },
  { id: 'pr', name: 'Public Relations & Communications', summary: 'Press releases, Facebrowser management, interviews and brand reputation.', email: 'contact@macorp.com' },
  { id: 'finance', name: 'Finance & Legal Operations', summary: 'Royalties, payroll, financial reporting, budgeting and artist advances.', email: 'finance@macorp.com' },
];

export const directory: { label: string; value: string; href?: string }[] = [
  { label: 'Switchboard', value: '+(1) 527' },
  { label: 'General', value: 'contact@macorp.com', href: 'mailto:contact@macorp.com' },
  { label: 'A&R / Demos', value: 'ar@macorp.com', href: 'mailto:ar@macorp.com' },
  { label: 'Events & staging', value: 'events@macorp.com', href: 'mailto:events@macorp.com' },
  { label: 'Radio & advertising', value: 'audio@macorp.com', href: 'mailto:audio@macorp.com' },
  { label: 'Careers', value: 'hiring@macorp.com', href: 'mailto:hiring@macorp.com' },
];
