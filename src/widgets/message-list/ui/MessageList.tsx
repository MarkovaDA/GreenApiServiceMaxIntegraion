import { useEffect, useRef } from 'react';
import { MessageBubble } from '@/entities/message';
import { useI18n } from '@/shared/i18n';
import type { MessageListProps } from '../types';

/** Список сообщений активного чата с автоскроллом к последнему. */
export function MessageList({ messages }: MessageListProps) {
  const { t } = useI18n();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <p className="message-list__empty">{t.chat.emptyMessages}</p>
      ) : (
        messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))
      )}
      <div ref={bottomRef} />
    </div>
  );
}
