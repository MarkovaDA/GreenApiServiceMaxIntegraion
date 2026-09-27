import { useEffect, useRef, useState } from 'react';
import { deleteNotification, receiveNotification } from '@/shared/api';
import {
  RECEIVE_EMPTY_MIN_DELAY_MS,
  RECEIVE_TIMEOUT_SEC,
} from '@/shared/config';
import { getMessages } from '@/shared/i18n';
import { parseIncomingMessage } from '../lib/parse-incoming-message';
import type {
  ReceiveStatus,
  UseReceiveMessagesParams,
  UseReceiveMessagesResult,
} from '../types';

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    const timer = window.setTimeout(() => resolve(), ms);
    const onAbort = () => {
      window.clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    };

    signal.addEventListener('abort', onAbort, { once: true });
  });
}

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

  const idInstance = session?.idInstance ?? '';
  const apiTokenInstance = session?.apiTokenInstance ?? '';

  useEffect(() => {
    if (!enabled || !idInstance || !apiTokenInstance) {
      setStatus('idle');
      setError(null);
      return;
    }

    const credentials = { idInstance, apiTokenInstance };
    const controller = new AbortController();
    const { signal } = controller;

    setStatus('listening');
    setError(null);

    /** Один long-poll за раз; пустой ответ не крутим tight-loop'ом. */
    const poll = async () => {
      while (!signal.aborted) {
        const startedAt = Date.now();

        try {
          const notification = await receiveNotification(
            credentials,
            RECEIVE_TIMEOUT_SEC,
            signal,
          );

          if (signal.aborted) {
            break;
          }

          setStatus('listening');
          setError(null);

          if (!notification) {
            const elapsed = Date.now() - startedAt;
            const waitMs = Math.max(0, RECEIVE_EMPTY_MIN_DELAY_MS - elapsed);

            if (waitMs > 0) {
              await sleep(waitMs, signal);
            }

            continue;
          }

          const message = parseIncomingMessage(notification.body);

          if (message) {
            onMessageRef.current(message);
          }

          await deleteNotification(credentials, notification.receiptId, signal);
        } catch (err) {
          if (signal.aborted || (err instanceof DOMException && err.name === 'AbortError')) {
            break;
          }

          const messageText =
            err instanceof Error
              ? err.message
              : getMessages().errors.receiveFailed;
          setStatus('error');
          setError(messageText);

          try {
            await sleep(2000, signal);
          } catch {
            break;
          }
        }
      }
    };

    void poll();

    return () => {
      controller.abort();
    };
  }, [enabled, idInstance, apiTokenInstance]);

  return { status, error };
}
