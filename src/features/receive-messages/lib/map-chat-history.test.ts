import { describe, expect, it } from 'vitest';
import { mapChatHistory } from './map-chat-history';

describe('mapChatHistory', () => {
  it('maps text messages and sorts by timestamp ascending', () => {
    const result = mapChatHistory('100@c.us', [
      {
        type: 'outgoing',
        idMessage: '2',
        timestamp: 200,
        textMessage: 'later',
      },
      {
        type: 'incoming',
        idMessage: '1',
        timestamp: 100,
        textMessage: 'earlier',
      },
    ]);

    expect(result).toEqual([
      {
        id: '1',
        chatId: '100@c.us',
        text: 'earlier',
        direction: 'incoming',
        timestamp: 100_000,
      },
      {
        id: '2',
        chatId: '100@c.us',
        text: 'later',
        direction: 'outgoing',
        timestamp: 200_000,
      },
    ]);
  });

  it('skips non-text items without caption', () => {
    const result = mapChatHistory('100@c.us', [
      {
        type: 'incoming',
        idMessage: '1',
        typeMessage: 'stickerMessage',
      },
    ]);

    expect(result).toEqual([]);
  });
});
