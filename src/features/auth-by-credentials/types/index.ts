import type { Session } from '@/shared/types';

export type AuthFormProps = {
  onSubmit: (session: Session) => void;
};
