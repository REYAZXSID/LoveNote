'use client';

import { NoteCard } from '@/components/note-card';
import { NoteEditorDialog } from '@/components/note-editor-dialog';
import { Button } from '@/components/ui/button';
import { useNotes } from '@/hooks/use-notes';
import { format } from 'date-fns';
import { Heart, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

export default function HomePage() {
  const { notes } = useNotes();
  const today = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
  const todaysNote = useMemo(() => notes.find(note => note.date === today), [notes, today]);
  const latestNote = useMemo(() => notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0], [notes]);

  return (
    <div className="flex flex-col gap-8 md:gap-12 animate-fade-in">
      <header className="text-center py-12 md:py-16 px-4 bg-card rounded-xl shadow-inner-lg" style={{backgroundImage: 'radial-gradient(circle at top right, hsl(var(--primary) / 0.1), transparent 40%)'}}>
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Eternal Echoes</h1>
          <p className="text-md md:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A sanctuary for your most cherished memories and love notes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <NoteEditorDialog>
              <Button size="lg">
                <PlusCircle className="mr-2 h-5 w-5" />
                Write a New Note
              </Button>
            </NoteEditorDialog>
            <Button size="lg" variant="secondary" asChild>
                <Link href="/gallery">
                    <Heart className="mr-2 h-5 w-5" />
                    View Memories
                </Link>
            </Button>
          </div>
      </header>

      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold font-headline">Today's Note</h2>
        {todaysNote ? (
          <NoteCard note={todaysNote} />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 border-2 border-dashed rounded-lg bg-card/50">
            <Heart className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <h2 className="text-xl font-semibold font-headline">No Note for Today</h2>
            <p className="text-muted-foreground mt-2 mb-4 max-w-sm">
              The page is blank, but your heart is full. Why not write a sweet message for your loved one?
            </p>
            <NoteEditorDialog>
              <Button variant="secondary">
                <PlusCircle className="mr-2 h-4 w-4" />
                Write Today's Note
              </Button>
            </NoteEditorDialog>
          </div>
        )}
      </div>

      {latestNote && latestNote.date !== today && (
         <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">Latest Memory</h2>
            <NoteCard note={latestNote} />
         </div>
      )}
    </div>
  );
}
