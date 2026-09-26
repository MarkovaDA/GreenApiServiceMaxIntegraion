import type { Session } from '@/shared/types';

export type AuthPageProps = {
  onAuth: (session: Session) => void;
};
