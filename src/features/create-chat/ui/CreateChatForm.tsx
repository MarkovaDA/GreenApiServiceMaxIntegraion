import { useState, type FormEvent } from 'react';
import { checkAccount } from '@/shared/api';
import { useI18n } from '@/shared/i18n';
import { Button, Input } from '@/shared/ui';
import { createChatFromPhone } from '../lib/create-chat-from-phone';
import type { CreateChatFormProps } from '../types';

/**
 * Форма создания чата по номеру телефона.
 * Перед добавлением чата проверяет номер через CheckAccount.
 */
export function CreateChatForm({ session, onCreate }: CreateChatFormProps) {
  const { t } = useI18n();
  const [phone, setPhone] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Проверяет номер в MAX и создаёт чат с полученным chatId. */
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const digits = phone.replace(/\D/g, '');

    if (!digits || isChecking) {
      return;
    }

    setIsChecking(true);
    setError(null);

    try {
      const result = await checkAccount(session, Number(digits));

      if (!result.exist || !result.chatId) {
        throw new Error(t.errors.noMaxAccount);
      }

      onCreate(createChatFromPhone(phone, result.chatId));
      setPhone('');
    } catch (err) {
      const messageText =
        err instanceof Error ? err.message : t.errors.checkPhoneFailed;
      setError(messageText);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <form className="stack-form stack-form--compact" onSubmit={handleSubmit}>
      <Input
        name="phone"
        placeholder={t.chat.phonePlaceholder}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <Button type="submit" disabled={isChecking}>
        {isChecking ? t.chat.checking : t.chat.createChat}
      </Button>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
