import { AuthForm } from '@/features/auth-by-credentials';
import type { AuthPageProps } from '../types';

/** Страница авторизации: ввод `idInstance` и `apiTokenInstance`. */
export function AuthPage({ onAuth }: AuthPageProps) {
  return (
    <section>
      <h1>MAX Chat</h1>

      <p>Введите данные инстанса GREEN-API</p>

      <AuthForm onSubmit={onAuth} />
    </section>
  );
}
