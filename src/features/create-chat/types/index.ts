import type { Chat } from '@/shared/types';

export type CreateChatFormProps = {
  onCreate: (chat: Chat) => void;
};
