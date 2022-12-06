import { createContext } from "react";

export interface FormTheme {
  size: 'small' | 'medium'
}

const DEFAULT_THEME: FormTheme = {
  size: "medium"
}

export function createFormTheme(theme: Partial<FormTheme>): FormTheme {
  return {
    ...DEFAULT_THEME,
    ...theme,
  }
}

export const FormThemeContext = createContext(DEFAULT_THEME);