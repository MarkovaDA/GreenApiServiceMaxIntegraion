import type { ButtonProps, InputProps, TextareaProps } from './types';

/** Базовая кнопка. */
export function Button({ children, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
}

/** Базовое текстовое поле. */
export function Input(props: InputProps) {
  return <input {...props} />;
}

/** Многострочное поле ввода (для текста сообщения). */
export function Textarea(props: TextareaProps) {
  return <textarea {...props} />;
}
