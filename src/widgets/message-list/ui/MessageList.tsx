import { MessageBubble } from '@/entities/message';
import { useI18n } from '@/shared/i18n';
import type { MessageListProps } from '../types';

/** Список сообщений активного чата. */
export function MessageList({ messages }: MessageListProps) {
  const { t } = useI18n();

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <p className="message-list__empty">{t.chat.emptyMessages}</p>
      ) : (
        messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))
      )}
    </div>
  );
}
