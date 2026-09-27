import { useCallback, useState } from 'react';
import type { Chat } from '@/entities/chat';
import type { Message } from '@/entities/message';

/**
 * Состояние списка чатов и историй сообщений для страницы чата.
 * Страница только композирует UI — логика хранения здесь.
 */
export function useChatState() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messagesByChat, setMessagesByChat] = useState<
    Record<string, Message[]>
  >({});

  const activeChat = chats.find((chat) => chat.id === activeChatId) ?? null;
  const messages = activeChatId ? (messagesByChat[activeChatId] ?? []) : [];

  /**
   * Добавляет сообщение в историю чата (без дублей по `id`).
   * Если чата ещё нет в списке — создаёт его из `chatId`.
   */
  const appendMessage = useCallback((message: Message) => {
    setMessagesByChat((prev) => {
      const list = prev[message.chatId] ?? [];

      if (list.some((item) => item.id === message.id)) {
        return prev;
      }

      return {
        ...prev,
        [message.chatId]: [...list, message],
      };
    });

    setChats((prev) => {
      if (prev.some((chat) => chat.id === message.chatId)) {
        return prev;
      }

      const phone = message.chatId.replace(/@c\.us$/, '');

      return [
        ...prev,
        {
          id: message.chatId,
          phone,
          title: phone,
        },
      ];
    });
  }, []);

  /** Добавляет новый чат в список и сразу делает его активным. */
  const createChat = useCallback((chat: Chat) => {
    setChats((prev) => {
      if (prev.some((item) => item.id === chat.id)) {
        return prev;
      }

      return [...prev, chat];
    });

    setActiveChatId(chat.id);
  }, []);

  const selectChat = useCallback((chat: Chat) => {
    setActiveChatId(chat.id);
  }, []);

  return {
    chats,
    activeChat,
    messages,
    appendMessage,
    createChat,
    selectChat,
  };
}
