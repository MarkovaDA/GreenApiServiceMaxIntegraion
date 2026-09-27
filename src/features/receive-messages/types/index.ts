import type { Message } from '@/entities/message';
import type { Session } from '@/entities/session';

export type ReceiveStatus = 'idle' | 'listening' | 'error';

export type UseReceiveMessagesParams = {
  session: Session | null;
  enabled: boolean;
  onMessage: (message: Message) => void;
};

export type UseReceiveMessagesResult = {
  status: ReceiveStatus;
  error: string | null;
};
