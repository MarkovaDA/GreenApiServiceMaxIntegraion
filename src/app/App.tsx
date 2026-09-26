import { useState } from 'react';
import type { Session } from '@/shared/types';
import { AuthPage } from '@/pages/auth';
import { ChatPage } from '@/pages/chat';
import './styles/index.css';

/**
 * Корневой компонент приложения.
 * Без сессии показывает форму входа, с сессией — страницу чатов.
 */
export function App() {
  const [session, setSession] = useState<Session | null>(null);

  if (!session) {
    return <AuthPage onAuth={setSession} />;
  }

  return <ChatPage session={session} onLogout={() => setSession(null)} />;
}
