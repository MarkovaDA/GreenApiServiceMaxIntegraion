import { RECEIVE_TIMEOUT_SEC } from '@/shared/config';
import type {
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
    throw new Error(`SendMessage failed: ${response.status}`);
  }

  return response.json() as Promise<SendMessageResponse>;
}

/**
 * Забирает одно входящее уведомление из очереди инстанса (`ReceiveNotification`).
 * Долгий long-poll: ждёт до `receiveTimeout` секунд.
 * @returns уведомление или `null`, если за время ожидания ничего не пришло
 */
export async function receiveNotification(
  credentials: GreenApiCredentials,
  receiveTimeout = RECEIVE_TIMEOUT_SEC,
): Promise<ReceiveNotificationResponse> {
  const url = `${buildInstanceUrl(credentials, 'receiveNotification')}?receiveTimeout=${receiveTimeout}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`ReceiveNotification failed: ${response.status}`);
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
): Promise<void> {
  const url = `${buildInstanceUrl(credentials, 'deleteNotification')}/${receiptId}`;
  const response = await fetch(url, { method: 'DELETE' });

  if (!response.ok) {
    throw new Error(`DeleteNotification failed: ${response.status}`);
  }
}
