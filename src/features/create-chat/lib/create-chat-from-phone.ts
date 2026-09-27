import type { Chat } from '@/entities/chat';

/**
 * Собирает локальный объект чата из номера и `chatId` (из CheckAccount).
 */
export function createChatFromPhone(phone: string, chatId: string): Chat {
  const digits = phone.replace(/\D/g, '');

  return {
    id: chatId,
    phone: digits,
    title: digits,
  };
}
