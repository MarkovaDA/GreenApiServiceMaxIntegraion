import type { Message } from '@/entities/message';
import type { IncomingTextNotification } from '@/shared/types';

/**
 * Достаёт текстовое входящее сообщение из тела уведомления GREEN-API.
 * Другие типы вебхуков и неполные данные игнорируются (`null`).
 */
export function parseIncomingMessage(body: unknown): Message | null {
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
