import { MessageBubble } from '@/entities/message';
import type { MessageListProps } from '../types';

/** Список сообщений активного чата. */
export function MessageList({ messages }: MessageListProps) {
  return (
    <div>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}
