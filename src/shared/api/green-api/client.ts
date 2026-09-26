import { GREEN_API_BASE_URL } from '@/shared/config';
import type { GreenApiCredentials } from '@/shared/types';

/**
 * Собирает URL метода GREEN-API для конкретного инстанса.
 * Формат: `{base}/waInstance{idInstance}/{method}/{apiTokenInstance}`
 */
export function buildInstanceUrl(
  credentials: GreenApiCredentials,
  method: string,
): string {
  const { idInstance, apiTokenInstance } = credentials;
  return `${GREEN_API_BASE_URL}/waInstance${idInstance}/${method}/${apiTokenInstance}`;
}
