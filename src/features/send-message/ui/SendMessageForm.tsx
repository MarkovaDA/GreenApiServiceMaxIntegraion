import { useState, type FormEvent } from 'react';
import { sendMessage } from '@/shared/api';
import { Button, Textarea } from '@/shared/ui';
import type { SendMessageFormProps } from '../types';

/**
 * Форма отправки текстового сообщения в выбранный чат.
 * После успешного `SendMessage` отдаёт исходящее сообщение наружу через `onSent`.
 */
export function SendMessageForm({
  session,
  chatId,
  onSent,
}: SendMessageFormProps) {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);

  /** Отправляет сообщение в GREEN-API и очищает поле ввода. */
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const message = text.trim();

    if (!message || isSending) {
      return;
    }

    setIsSending(true);
    try {
      const { idMessage } = await sendMessage(session, {
        chatId,
        message,
      });

      onSent({
        id: idMessage,
        chatId,
        text: message,
        direction: 'outgoing',
        timestamp: Date.now(),
      });
      setText('');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        name="message"
        placeholder="Сообщение"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <Button type="submit" disabled={isSending}>
        Отправить
      </Button>
    </form>
  );
}
