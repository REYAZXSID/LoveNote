'use client';

import { FcmProvider } from './fcm-provider';
import { NotificationProvider } from './notification-provider';
import { NotesProvider } from './notes-provider';
import { VowsProvider } from './vows-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <FcmProvider>
        <NotesProvider>
          <VowsProvider>{children}</VowsProvider>
        </NotesProvider>
      </FcmProvider>
    </NotificationProvider>
  );
}
