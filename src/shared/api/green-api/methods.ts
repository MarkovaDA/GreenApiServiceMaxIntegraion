import { RECEIVE_TIMEOUT_SEC } from '@/shared/config';
import { getMessages } from '@/shared/i18n';
import type {
  CheckAccountResponse,
  GreenApiCredentials,
  ReceiveNotificationResponse,
  SendMessagePayload,
  SendMessageResponse,
} from '@/shared/types';
import { buildInstanceUrl } from './client';

/**
 * Отправляет текстовое сообщение в чат через GREEN-API (`SendMessage`).
 * @returns объект с `idMessage` — идентификатором отправленного сообщения
 */
export async function sendMessage(
  credentials: GreenApiCredentials,
  payload: SendMessagePayload,
): Promise<SendMessageResponse> {
  const url = buildInstanceUrl(credentials, 'sendMessage');
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `${getMessages().errors.sendMessageHttp}: ${response.status}`,
    );
  }

  return response.json() as Promise<SendMessageResponse>;
}

/**
 * Проверяет, есть ли аккаунт MAX на номере телефона (`CheckAccount`).
 * Возвращает `chatId`, который нужно использовать для отправки.
 */
export async function checkAccount(
  credentials: GreenApiCredentials,
  phoneNumber: number,
): Promise<CheckAccountResponse> {
  const url = buildInstanceUrl(credentials, 'checkAccount');
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber }),
  });

  if (!response.ok) {
    throw new Error(
      `${getMessages().errors.checkAccountHttp}: ${response.status}`,
    );
  }

  const data = (await response.json()) as CheckAccountResponse;

  if (data.status === false) {
    throw new Error(
      data.reason ?? getMessages().errors.checkAccountRejected,
    );
  }

  return data;
}

/**
 * Забирает одно входящее уведомление из очереди инстанса (`ReceiveNotification`).
 * Долгий long-poll: ждёт до `receiveTimeout` секунд.
 * @returns уведомление или `null`, если за время ожидания ничего не пришло
 */
export async function receiveNotification(
  credentials: GreenApiCredentials,
  receiveTimeout = RECEIVE_TIMEOUT_SEC,
  signal?: AbortSignal,
): Promise<ReceiveNotificationResponse> {
  const url = `${buildInstanceUrl(credentials, 'receiveNotification')}?receiveTimeout=${receiveTimeout}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(
      `${getMessages().errors.receiveNotificationHttp}: ${response.status}`,
    );
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text) as ReceiveNotificationResponse;
}

/**
 * Удаляет обработанное уведомление из очереди (`DeleteNotification`).
 * Нужно вызывать после `receiveNotification`, иначе одно и то же
 * уведомление будет приходить снова.
 */
export async function deleteNotification(
  credentials: GreenApiCredentials,
  receiptId: number,
  signal?: AbortSignal,
): Promise<void> {
  const url = `${buildInstanceUrl(credentials, 'deleteNotification')}/${receiptId}`;
  const response = await fetch(url, { method: 'DELETE', signal });

  if (!response.ok) {
    throw new Error(
      `${getMessages().errors.deleteNotificationHttp}: ${response.status}`,
    );
  }
}
