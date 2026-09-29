/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { I18nProvider } from '@/shared/i18n';
import { CreateChatForm } from './CreateChatForm';

vi.mock('@/shared/api', () => ({
  checkAccount: vi.fn(),
}));

import { checkAccount } from '@/shared/api';

const session = {
  idInstance: '123',
  apiTokenInstance: 'token',
};

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('CreateChatForm', () => {
  it('creates chat after successful CheckAccount', async () => {
    vi.mocked(checkAccount).mockResolvedValue({
      exist: true,
      chatId: '79001234567@c.us',
    });

    const onCreate = vi.fn();

    render(
      <I18nProvider>
        <CreateChatForm session={session} onCreate={onCreate} />
      </I18nProvider>,
    );

    fireEvent.change(screen.getByPlaceholderText(/номер|phone/i), {
      target: { value: '79001234567' },
    });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(onCreate).toHaveBeenCalledWith({
        id: '79001234567@c.us',
        phone: '79001234567',
        title: '79001234567',
      });
    });
  });

  it('shows error when account does not exist', async () => {
    vi.mocked(checkAccount).mockResolvedValue({
      exist: false,
      chatId: '',
    });

    render(
      <I18nProvider>
        <CreateChatForm session={session} onCreate={vi.fn()} />
      </I18nProvider>,
    );

    fireEvent.change(screen.getByPlaceholderText(/номер|phone/i), {
      target: { value: '79001234567' },
    });
    fireEvent.click(screen.getByRole('button'));

    expect(await screen.findByRole('alert')).toBeTruthy();
  });
});
