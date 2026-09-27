import type { Chat } from '@/entities/chat';
import type { Session } from '@/entities/session';

export type CreateChatFormProps = {
  session: Session;
  onCreate: (chat: Chat) => void;
};
