import { cs } from './cs';
import { en } from './en';

export type TranslationKey = keyof typeof cs;
export type Language = 'cs' | 'en';

export const translations = {
  cs,
  en,
} as const;

export type TranslationType = typeof cs;

export const defaultLanguage: Language = 'cs'; 