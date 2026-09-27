import { useState, type FormEvent } from 'react';
import { sendMessage } from '@/shared/api';
import { useI18n } from '@/shared/i18n';
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
  const { t } = useI18n();
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Отправляет сообщение в GREEN-API и очищает поле ввода. */
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const message = text.trim();

    if (!message || isSending) {
      return;
    }

    setIsSending(true);
    setError(null);

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
    } catch (err) {
      const messageText =
        err instanceof Error ? err.message : t.errors.sendFailed;
      setError(messageText);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <Textarea
        name="message"
        placeholder={t.chat.messagePlaceholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <Button type="submit" disabled={isSending}>
        {t.chat.send}
      </Button>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
