import { useState, type FormEvent } from 'react';
import { Button, Input } from '@/shared/ui';
import { createChatFromPhone } from '../lib/create-chat-from-phone';
import type { CreateChatFormProps } from '../types';

/**
 * Форма создания чата по номеру телефона собеседника.
 */
export function CreateChatForm({ onCreate }: CreateChatFormProps) {
  const [phone, setPhone] = useState('');

  /** Превращает номер в объект чата и сообщает родителю. */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onCreate(createChatFromPhone(phone));
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="phone"
        placeholder="Номер телефона"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <Button type="submit">Создать чат</Button>
    </form>
  );
}
