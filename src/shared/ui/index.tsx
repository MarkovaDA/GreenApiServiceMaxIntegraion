import type { ButtonProps, InputProps, TextareaProps } from './types';

/** Базовая кнопка. */
export function Button({
  children,
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={['ui-button', className].filter(Boolean).join(' ')}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

/** Базовое текстовое поле. */
export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={['ui-input', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}

/** Многострочное поле ввода (для текста сообщения). */
export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={['ui-textarea', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}
