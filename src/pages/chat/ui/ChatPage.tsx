import { useReceiveMessages } from '@/features/receive-messages';
import { ChatLayout } from '@/widgets/chat-layout';
import { LanguageSwitcher, useI18n } from '@/shared/i18n';
import { Button } from '@/shared/ui';
import type { ChatPageProps } from '../types';
import { useChatState } from '../hooks/use-chat-state';

/**
 * Страница чатов: композиция состояния и layout.
 * Сессия GREEN-API уже есть — сюда попадаем после успешного логина.
 */
export function ChatPage({ session, onLogout }: ChatPageProps) {
  const { t } = useI18n();
  const { chats, activeChat, messages, appendMessage, createChat, selectChat } =
    useChatState();

  const { status: receiveStatus, error: receiveError } = useReceiveMessages({
    session,
    enabled: true,
    onMessage: appendMessage,
  });

  return (
    <ChatLayout
      session={session}
      chats={chats}
      activeChat={activeChat}
      messages={messages}
      onCreateChat={createChat}
      onSelectChat={selectChat}
      onMessageSent={appendMessage}
      receiveStatus={receiveStatus}
      receiveError={receiveError}
      headerSlot={
        <div className="chat-topbar__actions">
          <LanguageSwitcher />
          <Button onClick={onLogout}>{t.chat.logout}</Button>
        </div>
      }
    />
  );
}
