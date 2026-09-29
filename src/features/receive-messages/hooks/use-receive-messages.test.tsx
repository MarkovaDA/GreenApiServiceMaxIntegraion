/** @vitest-environment jsdom */
import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useReceiveMessages } from './use-receive-messages';

vi.mock('@/shared/api', () => ({
  receiveNotification: vi.fn(),
  deleteNotification: vi.fn(),
}));

import { deleteNotification, receiveNotification } from '@/shared/api';

const session = {
  idInstance: '123',
  apiTokenInstance: 'token',
};

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('useReceiveMessages', () => {
  it('delivers parsed message and deletes notification', async () => {
    vi.mocked(receiveNotification)
      .mockResolvedValueOnce({
        receiptId: 7,
        body: {
          typeWebhook: 'incomingMessageReceived',
          idMessage: 'm1',
          timestamp: 1_700_000_000,
          senderData: { chatId: '1@c.us' },
          messageData: {
            typeMessage: 'textMessage',
            textMessageData: { textMessage: 'hello' },
          },
        },
      })
      .mockImplementation(() => new Promise(() => undefined));

    vi.mocked(deleteNotification).mockResolvedValue(undefined);

    const onMessage = vi.fn();

    const { unmount } = renderHook(() =>
      useReceiveMessages({
        session,
        enabled: true,
        onMessage,
      }),
    );

    await waitFor(() => {
      expect(onMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'm1',
          chatId: '1@c.us',
          text: 'hello',
          direction: 'incoming',
        }),
      );
    });

    expect(deleteNotification).toHaveBeenCalledWith(session, 7, expect.any(AbortSignal));

    unmount();
  });

  it('exposes error status when polling fails', async () => {
    vi.mocked(receiveNotification).mockRejectedValue(new Error('network down'));

    const { result, unmount } = renderHook(() =>
      useReceiveMessages({
        session,
        enabled: true,
        onMessage: vi.fn(),
      }),
    );

    await waitFor(() => {
      expect(result.current.status).toBe('error');
      expect(result.current.error).toBe('network down');
    });

    unmount();
  });
});
