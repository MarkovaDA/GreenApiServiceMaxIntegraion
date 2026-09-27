import type { Messages } from '../types';

export const ru: Messages = {
  appName: 'MAX Chat',
  auth: {
    subtitle: 'Введите данные инстанса GREEN-API',
    idInstancePlaceholder: 'idInstance',
    apiTokenPlaceholder: 'apiTokenInstance',
    submit: 'Войти',
  },
  chat: {
    sidebarTitle: 'Чаты',
    emptyMain: 'Выберите или создайте чат',
    emptyMessages: 'Пока нет сообщений',
    logout: 'Выйти',
    phonePlaceholder: 'Номер телефона',
    createChat: 'Создать чат',
    checking: 'Проверка…',
    messagePlaceholder: 'Сообщение',
    send: 'Отправить',
  },
  status: {
    listening: 'Связь с API активна',
    error: 'Нет связи с API',
    idle: 'Ожидание',
  },
  errors: {
    noMaxAccount: 'На этом номере нет аккаунта MAX',
    checkPhoneFailed: 'Не удалось проверить номер',
    sendFailed: 'Не удалось отправить сообщение',
    receiveFailed: 'Нет связи с GREEN-API',
    phoneEmpty: 'Номер телефона пустой',
    checkAccountRejected: 'CheckAccount отклонён инстансом',
    sendMessageHttp: 'SendMessage не удался',
    checkAccountHttp: 'CheckAccount не удался',
    receiveNotificationHttp: 'ReceiveNotification не удался',
    deleteNotificationHttp: 'DeleteNotification не удался',
  },
  language: {
    label: 'Язык',
    ru: 'Русский',
    en: 'English',
  },
};
