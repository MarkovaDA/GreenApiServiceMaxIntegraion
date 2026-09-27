import { describe, expect, it } from 'vitest';
import { parseIncomingMessage } from './parse-incoming-message';

describe('parseIncomingMessage', () => {
  it('разбирает текстовое входящее сообщение', () => {
    const message = parseIncomingMessage({
      typeWebhook: 'incomingMessageReceived',
      idMessage: 'msg-1',
      timestamp: 1_700_000_000,
      senderData: { chatId: '10000000' },
      messageData: {
        typeMessage: 'textMessage',
        textMessageData: { textMessage: 'Привет' },
      },
    });

    expect(message).toEqual({
      id: 'msg-1',
      chatId: '10000000',
      text: 'Привет',
      direction: 'incoming',
      timestamp: 1_700_000_000_000,
    });
  });

  it('игнорирует чужие типы вебхуков', () => {
    expect(
      parseIncomingMessage({
        typeWebhook: 'outgoingMessageStatus',
        idMessage: 'msg-2',
      }),
    ).toBeNull();
  });

  it('игнорирует неполные данные', () => {
    expect(
      parseIncomingMessage({
        typeWebhook: 'incomingMessageReceived',
        idMessage: 'msg-3',
        senderData: { chatId: '10000000' },
      }),
    ).toBeNull();
  });
});
