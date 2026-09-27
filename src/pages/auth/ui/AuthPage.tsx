import { AuthForm } from '@/features/auth-by-credentials';
import { LanguageSwitcher, useI18n } from '@/shared/i18n';
import logoG from '@/shared/assets/logo-g.svg';
import type { AuthPageProps } from '../types';

/** Страница авторизации: ввод `idInstance` и `apiTokenInstance`. */
export function AuthPage({ onAuth }: AuthPageProps) {
  const { t } = useI18n();

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-card__top">
          <div className="auth-card__brand">
            <img className="auth-card__logo" src={logoG} alt="GREEN-API" />
            <div>
              <p className="auth-card__eyebrow">GREEN-API</p>
              <h1>{t.appName}</h1>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
        <p>{t.auth.subtitle}</p>
        <AuthForm onSubmit={onAuth} />
      </div>
    </section>
  );
}
