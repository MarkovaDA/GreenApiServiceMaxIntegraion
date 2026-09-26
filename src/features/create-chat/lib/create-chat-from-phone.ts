import { phoneToChatId } from '@/shared/lib';
import type { Chat } from '@/shared/types';

/**
 * Создаёт локальный объект чата по номеру телефона.
 * На API запрос не ходит — чат появляется только в UI.
 */
export function createChatFromPhone(phone: string): Chat {
  const chatId = phoneToChatId(phone);
  const digits = phone.replace(/\D/g, '');

  return {
    id: chatId,
    phone: digits,
    title: digits,
  };
}
