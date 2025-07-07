'use client';

import { FcmProvider } from './fcm-provider';
import { NotificationProvider } from './notification-provider';
import { NotesProvider } from './notes-provider';
import { VowsProvider } from './vows-provider';
import { ThemeProvider } from './theme-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="rose"
      enableSystem={false}
    >
      <NotificationProvider>
        <FcmProvider>
          <NotesProvider>
            <VowsProvider>{children}</VowsProvider>
          </NotesProvider>
        </FcmProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
