export type Locale = 'ru' | 'en';

export type Messages = {
  appName: string;
  auth: {
    subtitle: string;
    idInstancePlaceholder: string;
    apiTokenPlaceholder: string;
    submit: string;
    checking: string;
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
    sending: string;
    loadingHistory: string;
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
    checkAccountRejected: string;
    sendMessageHttp: string;
    checkAccountHttp: string;
    receiveNotificationHttp: string;
    receiveNotificationInvalidJson: string;
    deleteNotificationHttp: string;
    getStateInstanceHttp: string;
    getChatHistoryHttp: string;
    invalidCredentials: string;
    instanceNotAuthorized: string;
    loadHistoryFailed: string;
  };
  language: {
    label: string;
    ru: string;
    en: string;
  };
};
