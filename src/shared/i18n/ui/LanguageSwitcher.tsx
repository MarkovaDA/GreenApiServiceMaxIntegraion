import { useI18n } from './I18nProvider';

/** Переключатель языка интерфейса. */
export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className="language-switcher">
      <span className="language-switcher__label">{t.language.label}</span>
      <select
        className="ui-input language-switcher__select"
        value={locale}
        onChange={(event) => setLocale(event.target.value as 'ru' | 'en')}
        aria-label={t.language.label}
      >
        <option value="ru">{t.language.ru}</option>
        <option value="en">{t.language.en}</option>
      </select>
    </label>
  );
}
