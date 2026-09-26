import { CreateChatForm } from '@/features/create-chat';
import { SendMessageForm } from '@/features/send-message';
import { MessageList } from '@/widgets/message-list';
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
}: ChatLayoutProps) {
  return (
    <div>
      {headerSlot}
      <aside>
        <CreateChatForm onCreate={onCreateChat} />
        <ul>
          {chats.map((chat) => (
            <li key={chat.id}>
              <button type="button" onClick={() => onSelectChat(chat)}>
                {chat.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main>
        {activeChat ? (
          <>
            <header>{activeChat.title}</header>
            <MessageList messages={messages} />
            <SendMessageForm
              session={session}
              chatId={activeChat.id}
              onSent={onMessageSent}
            />
          </>
        ) : (
          <p>Выберите или создайте чат</p>
        )}
      </main>
    </div>
  );
}
