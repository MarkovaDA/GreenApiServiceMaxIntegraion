import { useCallback, useEffect, useState } from 'react';
import type { Chat } from '@/entities/chat';
import type { Message } from '@/entities/message';
import {
  loadChatState,
  saveChatState,
  type ChatStateSnapshot,
} from '../lib/chat-storage';

const emptySnapshot = (): ChatStateSnapshot => ({
  chats: [],
  activeChatId: null,
  messagesByChat: {},
  unreadByChat: {},
  historyLoaded: {},
});

/**
 * Состояние списка чатов и историй сообщений для страницы чата.
 * Переживает F5 через sessionStorage, привязанный к idInstance.
 */
export function useChatState(idInstance: string) {
  const [snapshot, setSnapshot] = useState<ChatStateSnapshot>(() => {
    return loadChatState(idInstance) ?? emptySnapshot();
  });

  useEffect(() => {
    saveChatState(idInstance, snapshot);
  }, [idInstance, snapshot]);

  const activeChat =
    snapshot.chats.find((chat) => chat.id === snapshot.activeChatId) ?? null;
  const messages = snapshot.activeChatId
    ? (snapshot.messagesByChat[snapshot.activeChatId] ?? [])
    : [];

  /**
   * Добавляет сообщение в историю чата (без дублей по `id`).
   * Если чата ещё нет — создаёт его. Для входящих в неактивный чат
   * увеличивает счётчик непрочитанных.
   */
  const appendMessage = useCallback((message: Message) => {
    setSnapshot((prev) => {
      const list = prev.messagesByChat[message.chatId] ?? [];

      if (list.some((item) => item.id === message.id)) {
        return prev;
      }

      const chats = prev.chats.some((chat) => chat.id === message.chatId)
        ? prev.chats
        : [
            ...prev.chats,
            {
              id: message.chatId,
              phone: message.chatId.replace(/@c\.us$/, ''),
              title: message.chatId.replace(/@c\.us$/, ''),
            },
          ];

      const isActive = prev.activeChatId === message.chatId;
      const unreadByChat = { ...prev.unreadByChat };
      let activeChatId = prev.activeChatId;

      // Если чат ещё не выбран — открываем тот, куда пришло сообщение.
      if (!activeChatId) {
        activeChatId = message.chatId;
      } else if (message.direction === 'incoming' && !isActive) {
        unreadByChat[message.chatId] = (unreadByChat[message.chatId] ?? 0) + 1;
      }

      return {
        ...prev,
        chats,
        activeChatId,
        messagesByChat: {
          ...prev.messagesByChat,
          [message.chatId]: [...list, message],
        },
        unreadByChat,
      };
    });
  }, []);

  /** Вливает историю API, не затирая уже имеющиеся сообщения. */
  const mergeHistory = useCallback((chatId: string, history: Message[]) => {
    setSnapshot((prev) => {
      const existing = prev.messagesByChat[chatId] ?? [];
      const byId = new Map<string, Message>();

      for (const item of history) {
        byId.set(item.id, item);
      }

      for (const item of existing) {
        byId.set(item.id, item);
      }

      const merged = [...byId.values()].sort(
        (a, b) => a.timestamp - b.timestamp,
      );

      return {
        ...prev,
        messagesByChat: {
          ...prev.messagesByChat,
          [chatId]: merged,
        },
        historyLoaded: {
          ...prev.historyLoaded,
          [chatId]: true,
        },
      };
    });
  }, []);

  const markHistoryLoaded = useCallback((chatId: string) => {
    setSnapshot((prev) => {
      if (prev.historyLoaded[chatId]) {
        return prev;
      }

      return {
        ...prev,
        historyLoaded: {
          ...prev.historyLoaded,
          [chatId]: true,
        },
      };
    });
  }, []);

  /** Добавляет новый чат в список и сразу делает его активным. */
  const createChat = useCallback((chat: Chat) => {
    setSnapshot((prev) => {
      const chats = prev.chats.some((item) => item.id === chat.id)
        ? prev.chats
        : [...prev.chats, chat];

      const unreadByChat = { ...prev.unreadByChat };
      delete unreadByChat[chat.id];

      return {
        ...prev,
        chats,
        activeChatId: chat.id,
        unreadByChat,
      };
    });
  }, []);

  const selectChat = useCallback((chat: Chat) => {
    setSnapshot((prev) => {
      const unreadByChat = { ...prev.unreadByChat };
      delete unreadByChat[chat.id];

      return {
        ...prev,
        activeChatId: chat.id,
        unreadByChat,
      };
    });
  }, []);

  return {
    chats: snapshot.chats,
    activeChat,
    messages,
    unreadByChat: snapshot.unreadByChat,
    historyLoaded: snapshot.historyLoaded,
    appendMessage,
    mergeHistory,
    markHistoryLoaded,
    createChat,
    selectChat,
  };
}
