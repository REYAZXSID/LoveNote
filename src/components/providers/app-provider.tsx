'use client';

import { NotesProvider } from './notes-provider';
import { VowsProvider } from './vows-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <NotesProvider>
      <VowsProvider>{children}</VowsProvider>
    </NotesProvider>
  );
}
