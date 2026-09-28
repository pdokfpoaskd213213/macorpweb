import type { AuthSession, Character } from './types';

/**
 * Transport contract between the site and the RP server's UCP.
 *
 * Sign-in is redirect-based: the site never sees UCP passwords.
 *   beginSignIn    → send the user to the UCP consent screen
 *   completeSignIn → handle the UCP callback (/auth/callback) and build a session
 *
 * Phase 2 implements this against the real endpoint; the UI only talks to
 * `AuthClient`, so nothing visual changes.
 */
export interface AuthClient {
  beginSignIn(returnTo?: string): Promise<void>;
  completeSignIn(params: URLSearchParams): Promise<AuthSession>;
  signOut(): Promise<void>;
  listCharacters(accountId: string): Promise<Character[]>;
  selectCharacter(characterId: string): Promise<AuthSession>;
}

export class AuthNotConnectedError extends Error {
  constructor() {
    super('UCP sign-in is not connected yet.');
    this.name = 'AuthNotConnectedError';
  }
}

const notConnected = () =>
  new Promise<never>((_, reject) => {
    // Short delay so the pending state of the login panel is visible and reviewable.
    setTimeout(() => reject(new AuthNotConnectedError()), 900);
  });

/** Phase 1 client: every call reports "not connected". No fake sessions. */
export const ucpClient: AuthClient = {
  beginSignIn: notConnected,
  completeSignIn: notConnected,
  signOut: async () => undefined,
  listCharacters: notConnected,
  selectCharacter: notConnected,
};
