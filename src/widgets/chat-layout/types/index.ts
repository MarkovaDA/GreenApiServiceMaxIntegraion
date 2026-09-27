import type { ReactNode } from 'react';
import type { Chat } from '@/entities/chat';
import type { Message } from '@/entities/message';
import type { Session } from '@/entities/session';
import type { ReceiveStatus } from '@/features/receive-messages';

export type ChatLayoutProps = {
  session: Session;
  chats: Chat[];
  activeChat: Chat | null;
  messages: Message[];
  onCreateChat: (chat: Chat) => void;
  onSelectChat: (chat: Chat) => void;
  onMessageSent: (message: Message) => void;
  headerSlot?: ReactNode;
  receiveStatus: ReceiveStatus;
  receiveError: string | null;
};
