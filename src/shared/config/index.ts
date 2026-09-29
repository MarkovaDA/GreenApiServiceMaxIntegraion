/** Базовый URL GREEN-API для мессенджера MAX (v3). */
export const GREEN_API_BASE_URL = import.meta.env.DEV
  ? '/green-api'
  : 'https://api.green-api.com/v3';

/** Таймаут long-poll для ReceiveNotification (секунды). */
export const RECEIVE_TIMEOUT_SEC = 20;

/** Пауза после пустого ответа, если сервер вернул его слишком быстро (мс). */
export const RECEIVE_EMPTY_MIN_DELAY_MS = 1000;

/** Сколько сообщений подтягивать через GetChatHistory при открытии чата. */
export const CHAT_HISTORY_COUNT = 50;

