'use client';

import { NoteCard } from '@/components/note-card';
import { NoteEditorDialog } from '@/components/note-editor-dialog';
import { Button } from '@/components/ui/button';
import { useNotes } from '@/hooks/use-notes';
import { format } from 'date-fns';
import { Heart, PlusCircle } from 'lucide-react';
import { useMemo } from 'react';

export default function HomePage() {
  const { notes } = useNotes();
  const today = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
  const todaysNote = useMemo(() => notes.find(note => note.date === today), [notes, today]);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome Back, My Love</h1>
          <p className="text-muted-foreground">
            Here's your note for today, {format(new Date(), 'MMMM do, yyyy')}.
          </p>
        </div>
        <NoteEditorDialog>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </NoteEditorDialog>
      </div>

      {todaysNote ? (
        <NoteCard note={todaysNote} />
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg bg-card/50">
          <Heart className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold font-headline">No Note for Today</h2>
          <p className="text-muted-foreground mt-2 mb-4 max-w-sm">
            The page is blank, but your heart is full. Why not write a sweet message for your loved one?
          </p>
          <NoteEditorDialog>
            <Button variant="secondary">
              <PlusCircle className="mr-2 h-4 w-4" />
              Write a Note
            </Button>
          </NoteEditorDialog>
        </div>
      )}
    </div>
  );
}
