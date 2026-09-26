import type { GreenApiCredentials } from './green-api';

export type Session = GreenApiCredentials;

export type SessionStore = {
  session: Session | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
};
