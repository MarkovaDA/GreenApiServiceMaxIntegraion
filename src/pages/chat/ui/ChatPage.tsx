import { useCallback, useState } from 'react';
import { useReceiveMessages } from '@/features/receive-messages';
import { ChatLayout } from '@/widgets/chat-layout';
import { Button } from '@/shared/ui';
import type { ChatPageProps } from '../types';
import type { Chat, Message } from '@/shared/types';

/**
 * Страница чатов: список диалогов, активный чат, входящие/исходящие сообщения.
 * Сессия GREEN-API уже есть — сюда попадаем после успешного логина.
 */
export function ChatPage({ session, onLogout }: ChatPageProps) {
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

  useReceiveMessages({
    session,
    enabled: true,
    onMessage: appendMessage,
  });

  /** Добавляет новый чат в список и сразу делает его активным. */
  const handleCreateChat = (chat: Chat) => {
    setChats((prev) => {
      if (prev.some((item) => item.id === chat.id)) {
        return prev;
      }

      return [...prev, chat];
    });

    setActiveChatId(chat.id);
  };

  return (
    <ChatLayout
      session={session}
      chats={chats}
      activeChat={activeChat}
      messages={messages}
      onCreateChat={handleCreateChat}
      onSelectChat={(chat) => setActiveChatId(chat.id)}
      onMessageSent={appendMessage}
      headerSlot={<Button onClick={onLogout}>Выйти</Button>}
    />
  );
}
