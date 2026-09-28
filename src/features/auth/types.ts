/**
 * Auth domain — UCP (User Control Panel) of the RP server.
 *
 * Flow the UI is structured around:
 *   1. ucp       → user authenticates with their UCP account      (Phase 1: UI only)
 *   2. character → user picks which character acts on the site   (Phase 2)
 *   3. ready     → session is scoped to account + character      (Phase 2)
 */

export type AuthStep = 'ucp' | 'character' | 'ready';

export type AuthStatus = 'guest' | 'authenticating' | 'authenticated';

export interface UcpAccount {
  id: string;
  username: string;
}

/** Phase 2 — an in-game character that belongs to the UCP account. */
export interface Character {
  id: string;
  name: string;
  /** Role inside Ma. Corp, e.g. artist, producer, staff. Drives permissions. */
  affiliation?: 'artist' | 'producer' | 'staff' | 'guest';
}

export interface AuthSession {
  account: UcpAccount;
  character: Character | null;
  token: string;
}
