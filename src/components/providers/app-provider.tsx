'use client';

import { FcmProvider } from './fcm-provider';
import { NotesProvider } from './notes-provider';
import { VowsProvider } from './vows-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <FcmProvider>
      <NotesProvider>
        <VowsProvider>{children}</VowsProvider>
      </NotesProvider>
    </FcmProvider>
  );
}
