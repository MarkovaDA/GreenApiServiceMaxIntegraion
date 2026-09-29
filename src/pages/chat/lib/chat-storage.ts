import type { Chat } from '@/entities/chat';
import type { Message } from '@/entities/message';

export type ChatStateSnapshot = {
  chats: Chat[];
  activeChatId: string | null;
  messagesByChat: Record<string, Message[]>;
  unreadByChat: Record<string, number>;
  historyLoaded: Record<string, true>;
};

const storageKey = (idInstance: string) => `green-api-chats:${idInstance}`;

/** Читает сохранённое состояние чатов для инстанса. */
export function loadChatState(idInstance: string): ChatStateSnapshot | null {
  try {
    const raw = sessionStorage.getItem(storageKey(idInstance));

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<ChatStateSnapshot>;

    return {
      chats: Array.isArray(parsed.chats) ? parsed.chats : [],
      activeChatId:
        typeof parsed.activeChatId === 'string' ? parsed.activeChatId : null,
      messagesByChat:
        parsed.messagesByChat && typeof parsed.messagesByChat === 'object'
          ? parsed.messagesByChat
          : {},
      unreadByChat:
        parsed.unreadByChat && typeof parsed.unreadByChat === 'object'
          ? parsed.unreadByChat
          : {},
      historyLoaded:
        parsed.historyLoaded && typeof parsed.historyLoaded === 'object'
          ? parsed.historyLoaded
          : {},
    };
  } catch {
    return null;
  }
}

/** Сохраняет состояние чатов, чтобы пережить F5 в рамках вкладки. */
export function saveChatState(
  idInstance: string,
  snapshot: ChatStateSnapshot,
): void {
  sessionStorage.setItem(storageKey(idInstance), JSON.stringify(snapshot));
}

/** Удаляет сохранённые чаты при выходе. */
export function clearChatState(idInstance: string): void {
  sessionStorage.removeItem(storageKey(idInstance));
}
