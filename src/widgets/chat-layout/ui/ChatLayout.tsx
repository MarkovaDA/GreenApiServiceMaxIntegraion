import { MessageList } from '@/widgets/message-list';
import logoGWhite from '@/shared/assets/logo-g-white.svg';
import { useI18n } from '@/shared/i18n';
import type { ChatLayoutProps } from '../types';

/**
 * Каркас экрана чата: сайдбар со списком диалогов и область активного чата.
 * Формы создания чата и отправки приходят слотами с page-слоя (FSD).
 */
export function ChatLayout({
  chats,
  activeChat,
  messages,
  unreadByChat,
  onSelectChat,
  sidebarForm,
  composer,
  headerSlot,
  receiveStatus,
  receiveError,
  isLoadingHistory = false,
  historyError = null,
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
        <div className="chat-topbar__brand">
          <img
            className="chat-topbar__logo"
            src={logoGWhite}
            alt=""
            aria-hidden
          />
          <div>
            <div className="chat-topbar__title">{t.appName}</div>
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
          </div>
        </div>
        {headerSlot}
      </header>

      <div className="chat-body">
        <aside className="chat-sidebar">
          <h2 className="chat-sidebar__title">{t.chat.sidebarTitle}</h2>
          {sidebarForm}
          <ul className="chat-list">
            {chats.map((chat) => {
              const unread = unreadByChat[chat.id] ?? 0;

              return (
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
                    <span className="chat-list__title">{chat.title}</span>
                    {unread > 0 ? (
                      <span className="chat-list__badge">{unread}</span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <main className="chat-main">
          {activeChat ? (
            <>
              <header className="chat-main__header">{activeChat.title}</header>
              <div className="chat-main__feed">
                {isLoadingHistory ? (
                  <p className="chat-main__hint" role="status">
                    {t.chat.loadingHistory}
                  </p>
                ) : null}
                {historyError ? (
                  <p
                    className="chat-main__hint chat-main__hint--error"
                    role="alert"
                  >
                    {historyError}
                  </p>
                ) : null}
                <MessageList messages={messages} />
              </div>
              {composer}
            </>
          ) : (
            <p className="chat-main__empty">{t.chat.emptyMain}</p>
          )}
        </main>
      </div>
    </div>
  );
}
