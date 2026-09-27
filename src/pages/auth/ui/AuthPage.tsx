import { AuthForm } from '@/features/auth-by-credentials';
import { LanguageSwitcher, useI18n } from '@/shared/i18n';
import type { AuthPageProps } from '../types';

/** Страница авторизации: ввод `idInstance` и `apiTokenInstance`. */
export function AuthPage({ onAuth }: AuthPageProps) {
  const { t } = useI18n();

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-card__top">
          <h1>{t.appName}</h1>
          <LanguageSwitcher />
        </div>
        <p>{t.auth.subtitle}</p>
        <AuthForm onSubmit={onAuth} />
      </div>
    </section>
  );
}
