import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  getLocale,
  getMessages,
  setLocale,
  subscribeLocale,
} from '../locale-store';
import type { Locale, Messages } from '../types';

type I18nContextValue = {
  locale: Locale;
  t: Messages;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = {
  children: ReactNode;
};

/** Провайдер локализации: даёт `t` и смену языка по всему приложению. */
export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => getLocale());

  useEffect(() => subscribeLocale(setLocaleState), []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t: getMessages(),
      setLocale,
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Хук доступа к переводам и текущей локали. */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }

  return context;
}
