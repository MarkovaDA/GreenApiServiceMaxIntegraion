import type { Session } from '@/shared/types';

export type ChatPageProps = {
  session: Session;
  onLogout: () => void;
};
