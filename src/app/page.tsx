'use client';

import { NoteCard } from '@/components/note-card';
import { NoteEditorDialog } from '@/components/note-editor-dialog';
import { Button } from '@/components/ui/button';
import { useNotes } from '@/hooks/use-notes';
import { format } from 'date-fns';
import { Heart, PlusCircle, PenSquare } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

export default function HomePage() {
  const { notes } = useNotes();
  const today = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
  const todaysNote = useMemo(() => notes.find(note => note.date === today), [notes, today]);
  const latestNote = useMemo(() => notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0], [notes]);

  return (
    <div className="flex flex-col gap-8 md:gap-12 animate-fade-in">
      <header className="text-center py-12 md:py-16 px-4 bg-card rounded-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50"></div>
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Eternal Echoes</h1>
            <p className="text-md md:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              A sanctuary for your most cherished memories and love notes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <NoteEditorDialog>
                <Button size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
                  <PenSquare className="mr-2 h-5 w-5" />
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
          </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold font-headline">Today's Note</h2>
        {todaysNote ? (
          <NoteCard note={todaysNote} />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-lg bg-card border border-dashed border-border">
            <Heart className="w-16 h-16 text-muted-foreground/20 mb-4" />
            <h3 className="text-2xl font-semibold font-headline">The page awaits your story</h3>
            <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
              Every day is a chance to express your love. Why not add a memory for today?
            </p>
            <NoteEditorDialog>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Write Today's Note
              </Button>
            </NoteEditorDialog>
          </div>
        )}
      </section>

      {latestNote && latestNote.date !== today && (
         <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">Latest Memory</h2>
            <NoteCard note={latestNote} />
         </section>
      )}
    </div>
  );
}
