import { describe, expect, it } from 'vitest';
import { getMessages } from '@/shared/i18n';
import { phoneToChatId } from '@/shared/lib/phone-to-chat-id';

describe('phoneToChatId', () => {
  it('нормализует номер к формату chatId', () => {
    expect(phoneToChatId('+7 (999) 123-45-67')).toBe('79991234567@c.us');
  });

  it('бросает ошибку на пустой номер', () => {
    expect(() => phoneToChatId('---')).toThrow(getMessages().errors.phoneEmpty);
  });
});
