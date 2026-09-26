import type { MessageBubbleProps } from '../types';

/** Одно сообщение в ленте (входящее или исходящее). */
export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div data-direction={message.direction}>
      <p>{message.text}</p>
    </div>
  );
}
