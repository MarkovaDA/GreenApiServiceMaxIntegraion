import type { Message } from '@/entities/message';
import type { Session } from '@/entities/session';

export type SendMessageFormProps = {
  session: Session;
  chatId: string;
  onSent: (message: Message) => void;
};
