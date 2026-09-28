import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { ucpClient, type AuthClient } from './ucpClient';
import type { AuthSession, AuthStatus } from './types';

interface AuthContextValue {
  status: AuthStatus;
  session: AuthSession | null;
  /** Starts the UCP redirect. Rejects with AuthNotConnectedError in Phase 1. */
  signIn: (returnTo?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children, client = ucpClient }: { children: ReactNode; client?: AuthClient }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [status, setStatus] = useState<AuthStatus>('guest');

  const signIn = useCallback(
    async (returnTo?: string) => {
      setStatus('authenticating');
      try {
        await client.beginSignIn(returnTo);
      } catch (err) {
        setStatus('guest');
        throw err;
      }
    },
    [client],
  );

  const signOut = useCallback(async () => {
    await client.signOut();
    setSession(null);
    setStatus('guest');
  }, [client]);

  const value = useMemo(() => ({ status, session, signIn, signOut }), [status, session, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
