import { CreateChatForm } from '@/features/create-chat';
import { SendMessageForm } from '@/features/send-message';
import { MessageList } from '@/widgets/message-list';
import { useI18n } from '@/shared/i18n';
import type { ChatLayoutProps } from '../types';

/**
 * Каркас экрана чата: сайдбар со списком диалогов и область активного чата.
 */
export function ChatLayout({
  session,
  chats,
  activeChat,
  messages,
  onCreateChat,
  onSelectChat,
  onMessageSent,
  headerSlot,
  receiveStatus,
  receiveError,
}: ChatLayoutProps) {
  const { t } = useI18n();

  const statusLabel =
    receiveStatus === 'listening'
      ? t.status.listening
      : receiveStatus === 'error'
        ? t.status.error
        : t.status.idle;

  return (
    <div className="chat-shell">
      <header className="chat-topbar">
        <div className="chat-topbar__status">
          <span
            className={`status-dot status-dot--${receiveStatus}`}
            aria-hidden
          />
          <span>{statusLabel}</span>
          {receiveError ? (
            <span className="chat-topbar__error" role="status">
              {receiveError}
            </span>
          ) : null}
        </div>
        {headerSlot}
      </header>

      <div className="chat-body">
        <aside className="chat-sidebar">
          <h2 className="chat-sidebar__title">{t.chat.sidebarTitle}</h2>
          <CreateChatForm session={session} onCreate={onCreateChat} />
          <ul className="chat-list">
            {chats.map((chat) => (
              <li key={chat.id}>
                <button
                  type="button"
                  className={
                    activeChat?.id === chat.id
                      ? 'chat-list__item chat-list__item--active'
                      : 'chat-list__item'
                  }
                  onClick={() => onSelectChat(chat)}
                >
                  {chat.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="chat-main">
          {activeChat ? (
            <>
              <header className="chat-main__header">{activeChat.title}</header>
              <MessageList messages={messages} />
              <SendMessageForm
                session={session}
                chatId={activeChat.id}
                onSent={onMessageSent}
              />
            </>
          ) : (
            <p className="chat-main__empty">{t.chat.emptyMain}</p>
          )}
        </main>
      </div>
    </div>
  );
}
