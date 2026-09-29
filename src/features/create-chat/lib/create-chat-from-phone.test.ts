import { describe, expect, it } from 'vitest';
import { createChatFromPhone } from './create-chat-from-phone';

describe('createChatFromPhone', () => {
  it('builds chat from phone and chatId', () => {
    expect(createChatFromPhone('+7 (900) 123-45-67', '79001234567@c.us')).toEqual({
      id: '79001234567@c.us',
      phone: '79001234567',
      title: '79001234567',
    });
  });
});
