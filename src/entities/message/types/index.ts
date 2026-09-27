export type MessageDirection = 'outgoing' | 'incoming';

export type Message = {
  id: string;
  chatId: string;
  text: string;
  direction: MessageDirection;
  timestamp: number;
};

export type MessageBubbleProps = {
  message: Message;
};
