# GREEN-API MAX Chat

Тестовое веб-приложение для переписки через [GREEN-API](https://green-api.com) (мессенджер MAX).

Стек: **React**, **TypeScript**, **Vite**. Архитектура — Feature-Sliced Design (FSD).
Локализация — свой лёгкий i18n (`ru` / `en`), язык сохраняется в `localStorage`.

## Возможности

- вход по данным инстанса (`idInstance`, `apiTokenInstance`);
- создание чата по номеру (`CheckAccount` → локальный чат);
- отправка текстовых сообщений (`SendMessage`);
- приём входящих через long-polling (`ReceiveNotification` → обработка → `DeleteNotification`).

## Быстрый старт

```bash
npm install
npm run dev
```

Приложение откроется по адресу, который покажет Vite (обычно `http://localhost:5173`).

### Деплой

Продакшен: [https://markovada.github.io/GreenApiServiceMaxIntegraion/](https://markovada.github.io/GreenApiServiceMaxIntegraion/)

Пуш в `develop` обновляет ветку `gh-pages` через GitHub Actions. Вручную:

```bash
npm run deploy
```

Один раз включите хостинг: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `gh-pages` / `/ (root)`**.

### Другие команды

| Команда | Описание |
| --- | --- |
| `npm run build` | Сборка production-версии |
| `npm run preview` | Просмотр собранного билда |
| `npm run lint` | Проверка кода (Oxlint) |
| `npm test` | Unit-тесты (Vitest) |
| `npm run format` | Форматирование (Prettier) |

## Как пользоваться

1. Зарегистрируйтесь в [консоли GREEN-API](https://console.green-api.com).
2. Создайте и **авторизуйте** инстанс MAX (по SMS в кабинете).
3. Скопируйте `idInstance` и `apiTokenInstance` со страницы инстанса.
4. Введите их на экране входа приложения (сессия сохранится в `sessionStorage` и переживёт F5).
5. Создайте чат с номером собеседника (например `79001234567`) — номер проверяется через `CheckAccount`.
6. Отправьте сообщение и дождитесь ответа с другого аккаунта MAX.

В шапке чата отображается статус long-polling (`Связь с API активна` / `Нет связи с API`).

## Тесты

```bash
npm test
```

Покрыты хелперы: нормализация телефона и разбор входящих уведомлений.

> Сообщение самому себе обычно **не приходит** как входящее — для проверки приёма нужен другой номер.

## Структура проекта

```
src/
  app/          # корень приложения, глобальные стили
  pages/        # страницы: auth, chat
  widgets/      # крупные блоки UI (layout чата, список сообщений)
  features/     # сценарии: вход, создание чата, отправка, приём
  entities/     # сущности и доменные типы: chat, message, session
  shared/       # API-типы, клиент GREEN-API, UI-кит, утилиты, конфиг
```

## API

Базовый URL: `https://api.green-api.com/v3`

Используемые методы:

- `CheckAccount` — проверка номера в MAX перед созданием чата;
- `SendMessage` — отправка текста;
- `ReceiveNotification` — получение уведомления из очереди;
- `DeleteNotification` — удаление обработанного уведомления.

Документация: [green-api.com/v3/docs](https://green-api.com/v3/docs/).
