import type { Session } from '../types';

const SESSION_STORAGE_KEY = 'green-api-session';

/** Читает сохранённую сессию из sessionStorage (если валидна). */
export function loadSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<Session>;

    if (
      typeof parsed.idInstance !== 'string' ||
      typeof parsed.apiTokenInstance !== 'string' ||
      !parsed.idInstance.trim() ||
      !parsed.apiTokenInstance.trim()
    ) {
      return null;
    }

    return {
      idInstance: parsed.idInstance.trim(),
      apiTokenInstance: parsed.apiTokenInstance.trim(),
    };
  } catch {
    return null;
  }
}

/** Сохраняет сессию, чтобы пережить обновление страницы. */
export function saveSession(session: Session): void {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

/** Удаляет сессию при выходе. */
export function clearSession(): void {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}
