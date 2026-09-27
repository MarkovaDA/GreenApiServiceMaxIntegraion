import { useState, type FormEvent } from 'react';
import { useI18n } from '@/shared/i18n';
import { Button, Input } from '@/shared/ui';
import type { AuthFormProps } from '../types';

/**
 * Форма входа по данным инстанса GREEN-API (`idInstance` + `apiTokenInstance`).
 */
export function AuthForm({ onSubmit }: AuthFormProps) {
  const { t } = useI18n();
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  /** Собирает сессию из полей формы и передаёт её родителю. */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onSubmit({
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    });
  };

  return (
    <form className="stack-form" onSubmit={handleSubmit}>
      <Input
        name="idInstance"
        placeholder={t.auth.idInstancePlaceholder}
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
        required
      />
      <Input
        name="apiTokenInstance"
        placeholder={t.auth.apiTokenPlaceholder}
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
        required
      />
      <Button type="submit">{t.auth.submit}</Button>
    </form>
  );
}
