import type { ReactNode } from 'react';
import type { Chat } from '@/entities/chat';
import type { Message } from '@/entities/message';
import type { ReceiveStatus } from '@/features/receive-messages';

export type ChatLayoutProps = {
  chats: Chat[];
  activeChat: Chat | null;
  messages: Message[];
  unreadByChat: Record<string, number>;
  onSelectChat: (chat: Chat) => void;
  sidebarForm: ReactNode;
  composer: ReactNode;
  headerSlot?: ReactNode;
  receiveStatus: ReceiveStatus;
  receiveError: string | null;
  isLoadingHistory?: boolean;
  historyError?: string | null;
};
