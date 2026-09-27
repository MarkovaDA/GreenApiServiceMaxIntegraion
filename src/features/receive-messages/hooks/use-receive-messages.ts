import { useEffect, useRef, useState } from 'react';
import { deleteNotification, receiveNotification } from '@/shared/api';
import { getMessages } from '@/shared/i18n';
import { parseIncomingMessage } from '../lib/parse-incoming-message';
import type {
  ReceiveStatus,
  UseReceiveMessagesParams,
  UseReceiveMessagesResult,
} from '../types';

/**
 * Хук long-polling входящих сообщений.
 * Цикл: ReceiveNotification → разбор → callback → DeleteNotification.
 * Возвращает статус соединения для отображения в UI.
 */
export function useReceiveMessages({
  session,
  enabled,
  onMessage,
}: UseReceiveMessagesParams): UseReceiveMessagesResult {
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const [status, setStatus] = useState<ReceiveStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session || !enabled) {
      setStatus('idle');
      setError(null);
      return;
    }

    let cancelled = false;
    setStatus('listening');
    setError(null);

    /** Бесконечный опрос очереди уведомлений, пока хук активен. */
    const poll = async () => {
      while (!cancelled) {
        try {
          const notification = await receiveNotification(session);

          if (cancelled) {
            break;
          }

          setStatus('listening');
          setError(null);

          if (!notification) {
            continue;
          }

          const message = parseIncomingMessage(notification.body);

          if (message) {
            onMessageRef.current(message);
          }

          await deleteNotification(session, notification.receiptId);
        } catch (err) {
          if (cancelled) {
            break;
          }

          const messageText =
            err instanceof Error
              ? err.message
              : getMessages().errors.receiveFailed;
          setStatus('error');
          setError(messageText);

          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    };

    void poll();

    return () => {
      cancelled = true;
    };
  }, [session, enabled]);

  return { status, error };
}
