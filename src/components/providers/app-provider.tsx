'use client';

import { NotesProvider } from './notes-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <NotesProvider>{children}</NotesProvider>;
}
