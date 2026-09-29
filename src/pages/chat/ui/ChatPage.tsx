import { useEffect, useState } from 'react';
import { CreateChatForm } from '@/features/create-chat';
import { mapChatHistory, useReceiveMessages } from '@/features/receive-messages';
import { SendMessageForm } from '@/features/send-message';
import { getChatHistory } from '@/shared/api';
import { CHAT_HISTORY_COUNT } from '@/shared/config';
import { LanguageSwitcher, useI18n } from '@/shared/i18n';
import { Button } from '@/shared/ui';
import { ChatLayout } from '@/widgets/chat-layout';
import type { ChatPageProps } from '../types';
import { useChatState } from '../hooks/use-chat-state';

/**
 * Страница чатов: композиция состояния и layout.
 * Сессия GREEN-API уже есть — сюда попадаем после успешного логина.
 */
export function ChatPage({ session, onLogout }: ChatPageProps) {
  const { t } = useI18n();
  const {
    chats,
    activeChat,
    messages,
    unreadByChat,
    historyLoaded,
    appendMessage,
    mergeHistory,
    markHistoryLoaded,
    createChat,
    selectChat,
  } = useChatState(session.idInstance);

  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const { status: receiveStatus, error: receiveError } = useReceiveMessages({
    session,
    enabled: true,
    onMessage: appendMessage,
  });

  useEffect(() => {
    if (!activeChat || historyLoaded[activeChat.id]) {
      return;
    }

    const chatId = activeChat.id;
    const controller = new AbortController();

    const load = async () => {
      setIsLoadingHistory(true);
      setHistoryError(null);

      try {
        const items = await getChatHistory(session, {
          chatId,
          count: CHAT_HISTORY_COUNT,
        });

        if (controller.signal.aborted) {
          return;
        }

        mergeHistory(chatId, mapChatHistory(chatId, items));
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        markHistoryLoaded(chatId);
        setHistoryError(
          err instanceof Error ? err.message : t.errors.loadHistoryFailed,
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingHistory(false);
        }
      }
    };

    void load();

    return () => {
      controller.abort();
    };
  }, [
    activeChat,
    historyLoaded,
    markHistoryLoaded,
    mergeHistory,
    session,
    t.errors.loadHistoryFailed,
  ]);

  return (
    <ChatLayout
      chats={chats}
      activeChat={activeChat}
      messages={messages}
      unreadByChat={unreadByChat}
      onSelectChat={selectChat}
      receiveStatus={receiveStatus}
      receiveError={receiveError}
      isLoadingHistory={isLoadingHistory}
      historyError={historyError}
      sidebarForm={
        <CreateChatForm session={session} onCreate={createChat} />
      }
      composer={
        activeChat ? (
          <SendMessageForm
            session={session}
            chatId={activeChat.id}
            onSent={appendMessage}
          />
        ) : null
      }
      headerSlot={
        <div className="chat-topbar__actions">
          <LanguageSwitcher variant="onBrand" />
          <Button className="ui-button--light" onClick={onLogout}>
            {t.chat.logout}
          </Button>
        </div>
      }
    />
  );
}
