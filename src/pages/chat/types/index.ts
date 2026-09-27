import type { Session } from '@/entities/session';

export type ChatPageProps = {
  session: Session;
  onLogout: () => void;
};
