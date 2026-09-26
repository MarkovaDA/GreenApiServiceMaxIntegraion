import { useEffect, useRef } from 'react';
import { deleteNotification, receiveNotification } from '@/shared/api';
import type { IncomingTextNotification, Message } from '@/shared/types';
import type { UseReceiveMessagesParams } from '../types';

/**
 * Достаёт текстовое входящее сообщение из тела уведомления GREEN-API.
 * Другие типы вебхуков и неполные данные игнорируются (`null`).
 */
function parseIncomingMessage(body: unknown): Message | null {
  const notification = body as IncomingTextNotification;

  if (notification.typeWebhook !== 'incomingMessageReceived') {
    return null;
  }

  const text = notification.messageData?.textMessageData?.textMessage;
  const chatId = notification.senderData?.chatId;
  const id = notification.idMessage;

  if (!text || !chatId || !id) {
    return null;
  }

  return {
    id,
    chatId,
    text,
    direction: 'incoming',
    timestamp: notification.timestamp
      ? notification.timestamp * 1000
      : Date.now(),
  };
}

/**
 * Хук long-polling входящих сообщений.
 * Цикл: ReceiveNotification → разбор → callback → DeleteNotification.
 * Останавливается при размонтировании или смене сессии.
 */
export function useReceiveMessages({
  session,
  enabled,
  onMessage,
}: UseReceiveMessagesParams) {
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  useEffect(() => {
    if (!session || !enabled) {
      return;
    }

    let cancelled = false;

    /** Бесконечный опрос очереди уведомлений, пока хук активен. */
    const poll = async () => {
      while (!cancelled) {
        try {
          const notification = await receiveNotification(session);

          if (cancelled) {
            break;
          }

          if (!notification) {
            continue;
          }

          const message = parseIncomingMessage(notification.body);

          if (message) {
            onMessageRef.current(message);
          }

          await deleteNotification(session, notification.receiptId);
        } catch {
          if (cancelled) {
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    };

    void poll();

    return () => {
      cancelled = true;
    };
  }, [session, enabled]);
}
