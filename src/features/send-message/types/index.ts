import type { Message, Session } from '@/shared/types';

export type SendMessageFormProps = {
  session: Session;
  chatId: string;
  onSent: (message: Message) => void;
};
