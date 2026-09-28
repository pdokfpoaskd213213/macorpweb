/**
 * Site map — single source for header, mobile menu, footer and routes.
 * `auth: true` marks areas that sit behind UCP sign-in (Phase 2).
 */
export interface NavItem {
  label: string;
  to: string;
  auth?: boolean;
}

export const primaryNav: NavItem[] = [
  { label: 'Artists', to: '/artists' },
  { label: 'Releases', to: '/releases' },
  { label: 'Labels', to: '/labels' },
  { label: 'Studios', to: '/studios' },
  { label: 'Stores', to: '/stores' },
  { label: 'Connections', to: '/connections' },
  { label: 'Team', to: '/team' },
];

export const accountNav: NavItem[] = [
  { label: 'Artist login', to: '/login' },
  { label: 'Account', to: '/account', auth: true },
  { label: 'Book a session', to: '/studios/book', auth: true },
];

export const socialLinks = [
  { label: 'Facebrowser', href: 'https://face.gta.world/page/macorp' },
  { label: 'Instagram', href: '#' },
  { label: 'SoundCloud', href: '#' },
  { label: 'YouTube', href: '#' },
];
