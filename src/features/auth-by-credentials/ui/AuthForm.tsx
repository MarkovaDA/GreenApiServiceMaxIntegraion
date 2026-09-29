import { useState, type FormEvent } from 'react';
import { getStateInstance } from '@/shared/api';
import { useI18n } from '@/shared/i18n';
import { Button, Input } from '@/shared/ui';
import type { AuthFormProps } from '../types';

/**
 * Форма входа по данным инстанса GREEN-API (`idInstance` + `apiTokenInstance`).
 * Перед входом проверяет credentials через `GetStateInstance`.
 */
export function AuthForm({ onSubmit }: AuthFormProps) {
  const { t } = useI18n();
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Проверяет инстанс и передаёт сессию родителю при успехе. */
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const session = {
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    };

    if (!session.idInstance || !session.apiTokenInstance || isChecking) {
      return;
    }

    setIsChecking(true);
    setError(null);

    try {
      const { stateInstance } = await getStateInstance(session);

      if (
        stateInstance !== 'authorized' &&
        stateInstance !== 'suspended'
      ) {
        setError(t.errors.instanceNotAuthorized);
        return;
      }

      onSubmit(session);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t.errors.invalidCredentials;
      setError(message);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <form className="stack-form" onSubmit={handleSubmit}>
      <Input
        name="idInstance"
        placeholder={t.auth.idInstancePlaceholder}
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
        autoComplete="username"
        required
      />
      <Input
        name="apiTokenInstance"
        type="password"
        placeholder={t.auth.apiTokenPlaceholder}
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
        autoComplete="current-password"
        required
      />
      <Button type="submit" disabled={isChecking}>
        {isChecking ? t.auth.checking : t.auth.submit}
      </Button>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
