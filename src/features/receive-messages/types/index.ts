import type { GreenApiCredentials, Message } from '@/shared/types';

export type UseReceiveMessagesParams = {
  session: GreenApiCredentials | null;
  enabled: boolean;
  onMessage: (message: Message) => void;
};
