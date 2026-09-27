export type Locale = 'ru' | 'en';

export type Messages = {
  appName: string;
  auth: {
    subtitle: string;
    idInstancePlaceholder: string;
    apiTokenPlaceholder: string;
    submit: string;
  };
  chat: {
    sidebarTitle: string;
    emptyMain: string;
    emptyMessages: string;
    logout: string;
    phonePlaceholder: string;
    createChat: string;
    checking: string;
    messagePlaceholder: string;
    send: string;
  };
  status: {
    listening: string;
    error: string;
    idle: string;
  };
  errors: {
    noMaxAccount: string;
    checkPhoneFailed: string;
    sendFailed: string;
    receiveFailed: string;
    phoneEmpty: string;
    checkAccountRejected: string;
    sendMessageHttp: string;
    checkAccountHttp: string;
    receiveNotificationHttp: string;
    deleteNotificationHttp: string;
  };
  language: {
    label: string;
    ru: string;
    en: string;
  };
};
