import type { Session } from '@/entities/session';

export type AuthPageProps = {
  onAuth: (session: Session) => void;
};
