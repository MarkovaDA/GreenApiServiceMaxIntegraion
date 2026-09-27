import type { Messages } from '../types';

export const en: Messages = {
  appName: 'MAX Chat',
  auth: {
    subtitle: 'Enter your GREEN-API instance credentials',
    idInstancePlaceholder: 'idInstance',
    apiTokenPlaceholder: 'apiTokenInstance',
    submit: 'Sign in',
  },
  chat: {
    sidebarTitle: 'Chats',
    emptyMain: 'Select or create a chat',
    emptyMessages: 'No messages yet',
    logout: 'Log out',
    phonePlaceholder: 'Phone number',
    createChat: 'Create chat',
    checking: 'Checking…',
    messagePlaceholder: 'Message',
    send: 'Send',
  },
  status: {
    listening: 'API connection active',
    error: 'No API connection',
    idle: 'Waiting',
  },
  errors: {
    noMaxAccount: 'No MAX account on this number',
    checkPhoneFailed: 'Failed to check the number',
    sendFailed: 'Failed to send the message',
    receiveFailed: 'No connection to GREEN-API',
    phoneEmpty: 'Phone number is empty',
    checkAccountRejected: 'CheckAccount rejected by instance',
    sendMessageHttp: 'SendMessage failed',
    checkAccountHttp: 'CheckAccount failed',
    receiveNotificationHttp: 'ReceiveNotification failed',
    deleteNotificationHttp: 'DeleteNotification failed',
  },
  language: {
    label: 'Language',
    ru: 'Русский',
    en: 'English',
  },
};
