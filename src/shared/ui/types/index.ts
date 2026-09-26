import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
