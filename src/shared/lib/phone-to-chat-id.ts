import { getMessages } from '@/shared/i18n';

/**
 * Нормализует номер телефона в chatId формата GREEN-API / WhatsApp.
 * Пример: `+7 (999) 123-45-67` → `79991234567@c.us`
 */
export function phoneToChatId(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  if (!digits) {
    throw new Error(getMessages().errors.phoneEmpty);
  }

  return `${digits}@c.us`;
}
