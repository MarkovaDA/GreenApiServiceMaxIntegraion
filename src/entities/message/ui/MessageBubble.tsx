import type { MessageBubbleProps } from '../types';

function formatTime(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

/** Одно сообщение в ленте (входящее или исходящее). */
export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={`message-bubble message-bubble--${message.direction}`}
      data-direction={message.direction}
    >
      <p>{message.text}</p>
      <time className="message-bubble__time" dateTime={new Date(message.timestamp).toISOString()}>
        {formatTime(message.timestamp)}
      </time>
    </div>
  );
}
