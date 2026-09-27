import type { Session } from '@/entities/session';

export type AuthFormProps = {
  onSubmit: (session: Session) => void;
};
