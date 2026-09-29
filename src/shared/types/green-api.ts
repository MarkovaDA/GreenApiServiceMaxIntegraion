export type GreenApiCredentials = {
  idInstance: string;
  apiTokenInstance: string;
};

export type SendMessagePayload = {
  chatId: string;
  message: string;
};

export type SendMessageResponse = {
  idMessage: string;
};

export type CheckAccountResponse = {
  exist: boolean;
  chatId: string;
  fromCache?: boolean;
  status?: boolean;
  reason?: string;
};

export type InstanceState =
  | 'authorized'
  | 'notAuthorized'
  | 'blocked'
  | 'starting'
  | 'suspended'
  | 'pendingPassword';

export type GetStateInstanceResponse = {
  stateInstance: InstanceState | string;
};

export type GetChatHistoryPayload = {
  chatId: string;
  count?: number;
};

export type ChatHistoryItem = {
  type?: 'outgoing' | 'incoming' | string;
  idMessage?: string;
  timestamp?: number;
  typeMessage?: string;
  chatId?: string;
  textMessage?: string;
  extendedTextMessage?: { text?: string };
  caption?: string;
};

export type ReceiveNotificationResponse = {
  receiptId: number;
  body: unknown;
} | null;

export type IncomingTextNotification = {
  typeWebhook?: string;
  senderData?: { chatId?: string };
  messageData?: {
    typeMessage?: string;
    textMessageData?: { textMessage?: string };
  };
  idMessage?: string;
  timestamp?: number;
};
