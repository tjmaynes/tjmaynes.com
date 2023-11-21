'use client'

import { ThemeProvider } from 'next-themes'
import { CustomColorThemeProvider } from './useCustomColorTheme'

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <CustomColorThemeProvider>{children}</CustomColorThemeProvider>
  </ThemeProvider>
)
