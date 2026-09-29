import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  checkAccount,
  deleteNotification,
  getChatHistory,
  getStateInstance,
  receiveNotification,
  sendMessage,
} from './methods';

const credentials = {
  idInstance: '123',
  apiTokenInstance: 'token',
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('green-api methods', () => {
  it('getStateInstance returns instance state', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({ stateInstance: 'authorized' }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await expect(getStateInstance(credentials)).resolves.toEqual({
      stateInstance: 'authorized',
    });
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('checkAccount rejects when status is false', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse({ status: false, reason: 'blocked', exist: false, chatId: '' }),
      ),
    );

    await expect(checkAccount(credentials, 79001234567)).rejects.toThrow(
      'blocked',
    );
  });

  it('sendMessage returns idMessage', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse({ idMessage: 'msg-1' })),
    );

    await expect(
      sendMessage(credentials, { chatId: '1@c.us', message: 'hi' }),
    ).resolves.toEqual({ idMessage: 'msg-1' });
  });

  it('getChatHistory returns list', async () => {
    const history = [{ idMessage: '1', textMessage: 'hi', type: 'incoming' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(history)));

    await expect(
      getChatHistory(credentials, { chatId: '1@c.us', count: 10 }),
    ).resolves.toEqual(history);
  });

  it('receiveNotification returns null on empty body', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('', { status: 200 })),
    );

    await expect(receiveNotification(credentials, 1)).resolves.toBeNull();
  });

  it('receiveNotification throws on invalid JSON', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('{broken', { status: 200 })),
    );

    await expect(receiveNotification(credentials, 1)).rejects.toThrow(
      /невалидный JSON|invalid JSON/i,
    );
  });

  it('deleteNotification sends DELETE', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await deleteNotification(credentials, 42);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/deleteNotification/'),
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
