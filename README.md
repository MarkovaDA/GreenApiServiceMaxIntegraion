# GREEN-API MAX Chat

Тестовое веб-приложение для переписки через [GREEN-API](https://green-api.com) (мессенджер MAX).

Стек: **React**, **TypeScript**, **Vite**. Архитектура — Feature-Sliced Design (FSD).
Локализация — свой лёгкий i18n (`ru` / `en`), язык сохраняется в `localStorage`.

## Возможности

- вход по данным инстанса (`idInstance`, `apiTokenInstance`) с проверкой через `GetStateInstance`;
- создание чата по номеру (`CheckAccount` → локальный чат);
- загрузка истории при открытии чата (`GetChatHistory`);
- отправка текстовых сообщений (`SendMessage`);
- приём входящих через long-polling (`ReceiveNotification` → обработка → `DeleteNotification`);
- сохранение чатов и сообщений в `sessionStorage` (переживают F5 в рамках вкладки);
- счётчик непрочитанных для фоновых чатов;
- в `npm run dev` запросы к API идут через Vite-прокси (`/green-api`).

## Быстрый старт

```bash
npm install
npm run dev
```

Приложение откроется по адресу, который покажет Vite (обычно `http://localhost:5173`).

### Деплой

Продакшен: [https://markovada.github.io/GreenApiServiceMaxIntegraion/](https://markovada.github.io/GreenApiServiceMaxIntegraion/)

Пуш в `develop` обновляет ветку `gh-pages` через GitHub Actions (`lint` → `test` → `build` → publish). Вручную:

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
4. Введите их на экране входа приложения — инстанс проверяется через API, сессия сохранится в `sessionStorage` и переживёт F5.
5. Создайте чат с номером собеседника (например `79001234567`) — номер проверяется через `CheckAccount`, история подгружается автоматически.
6. Отправьте сообщение (кнопка или Enter; Shift+Enter — новая строка) и дождитесь ответа с другого аккаунта MAX.

В шапке чата отображается статус long-polling (`Связь с API активна` / `Нет связи с API`).

## Тесты

```bash
npm test
```

Покрыты хелперы, API-клиент (с моком `fetch`), форма создания чата и хук long-polling.

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

- `GetStateInstance` — проверка credentials при входе;
- `CheckAccount` — проверка номера в MAX перед созданием чата;
- `GetChatHistory` — история сообщений при открытии чата;
- `SendMessage` — отправка текста;
- `ReceiveNotification` — получение уведомления из очереди;
- `DeleteNotification` — удаление обработанного уведомления.

Документация: [green-api.com/v3/docs](https://green-api.com/v3/docs/).
