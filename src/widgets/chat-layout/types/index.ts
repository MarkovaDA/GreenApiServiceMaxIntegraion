import type { ReactNode } from 'react';
import type { Chat, Message, Session } from '@/shared/types';

export type ChatLayoutProps = {
  session: Session;
  chats: Chat[];
  activeChat: Chat | null;
  messages: Message[];
  onCreateChat: (chat: Chat) => void;
  onSelectChat: (chat: Chat) => void;
  onMessageSent: (message: Message) => void;
  headerSlot?: ReactNode;
};
