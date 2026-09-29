import { useState } from 'react';
import {
  clearSession,
  loadSession,
  saveSession,
  type Session,
} from '@/entities/session';
import { AuthPage } from '@/pages/auth';
import { ChatPage, clearChatState } from '@/pages/chat';
import './styles/index.css';

/**
 * Корневой компонент приложения.
 * Без сессии показывает форму входа, с сессией — страницу чатов.
 * Сессия хранится в sessionStorage и переживает F5.
 */
export function App() {
  const [session, setSession] = useState<Session | null>(() => loadSession());

  const handleAuth = (next: Session) => {
    saveSession(next);
    setSession(next);
  };

  const handleLogout = () => {
    if (session) {
      clearChatState(session.idInstance);
    }
    clearSession();
    setSession(null);
  };

  if (!session) {
    return <AuthPage onAuth={handleAuth} />;
  }

  return <ChatPage session={session} onLogout={handleLogout} />;
}
