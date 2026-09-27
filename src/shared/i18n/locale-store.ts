import { en } from './locales/en';
import { ru } from './locales/ru';
import type { Locale, Messages } from './types';

const dictionaries: Record<Locale, Messages> = { ru, en };

const LOCALE_STORAGE_KEY = 'green-api-locale';

type LocaleListener = (locale: Locale) => void;

const listeners = new Set<LocaleListener>();

function readStoredLocale(): Locale {
  try {
    const raw = localStorage.getItem(LOCALE_STORAGE_KEY);

    if (raw === 'ru' || raw === 'en') {
      return raw;
    }
  } catch {
    // ignore storage access errors
  }

  return 'ru';
}

let currentLocale: Locale = readStoredLocale();

/** Текущая локаль (для кода вне React). */
export function getLocale(): Locale {
  return currentLocale;
}

/** Словарь активной локали (для API и утилит вне React). */
export function getMessages(): Messages {
  return dictionaries[currentLocale];
}

/** Меняет язык и уведомляет подписчиков. */
export function setLocale(locale: Locale): void {
  currentLocale = locale;

  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // ignore storage access errors
  }

  listeners.forEach((listener) => listener(locale));
}

/** Подписка на смену языка (для React-контекста). */
export function subscribeLocale(listener: LocaleListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
