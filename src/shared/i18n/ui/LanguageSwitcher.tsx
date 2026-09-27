import { useI18n } from './I18nProvider';

type LanguageSwitcherProps = {
  variant?: 'default' | 'onBrand';
};

/** Переключатель языка интерфейса. */
export function LanguageSwitcher({
  variant = 'default',
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n();

  return (
    <label
      className={
        variant === 'onBrand'
          ? 'language-switcher language-switcher--on-brand'
          : 'language-switcher'
      }
    >
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
