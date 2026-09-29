import type { Message } from '@/entities/message';
import type { ChatHistoryItem } from '@/shared/types';

/**
 * Преобразует элементы `GetChatHistory` в доменные сообщения.
 * Берём только текст (и caption у медиа); сортируем по возрастанию времени.
 */
export function mapChatHistory(
  chatId: string,
  items: ChatHistoryItem[],
): Message[] {
  const messages: Message[] = [];

  for (const item of items) {
    const id = item.idMessage;
    const text =
      item.textMessage?.trim() ||
      item.extendedTextMessage?.text?.trim() ||
      item.caption?.trim() ||
      '';

    if (!id || !text) {
      continue;
    }

    const direction =
      item.type === 'outgoing' || item.type === 'incoming'
        ? item.type
        : 'incoming';

    messages.push({
      id,
      chatId: item.chatId ?? chatId,
      text,
      direction,
      timestamp: item.timestamp ? item.timestamp * 1000 : Date.now(),
    });
  }

  return messages.sort((a, b) => a.timestamp - b.timestamp);
}
