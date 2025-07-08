'use client';

import { NoteCard } from '@/components/note-card';
import { NoteEditorDialog } from '@/components/note-editor-dialog';
import { Button } from '@/components/ui/button';
import { useNotes } from '@/hooks/use-notes';
import { format } from 'date-fns';
import { Heart, PlusCircle, PenSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const { notes, isNotesLoaded } = useNotes();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const today = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);

  const todaysNote = useMemo(() => {
    if (!isNotesLoaded) return undefined;
    return notes.find(note => note.date === today);
  }, [notes, today, isNotesLoaded]);

  const latestNote = useMemo(() => {
    if (!isNotesLoaded) return undefined;
    return notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  }, [notes, isNotesLoaded]);
  
  const PageSkeleton = () => (
    <div className="flex flex-col gap-12 md:gap-16 animate-pulse">
        <header className="text-center py-16 md:py-24 px-4 relative">
             <Skeleton className="h-12 md:h-16 w-1/2 mx-auto" />
             <Skeleton className="h-5 md:h-6 w-3/4 mx-auto mt-4" />
             <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-12 w-48" />
             </div>
        </header>
        <section className="space-y-6">
            <Skeleton className="h-8 w-1/3 mx-auto" />
            <div className="max-w-3xl mx-auto">
                <Skeleton className="h-64 w-full rounded-lg" />
            </div>
        </section>
    </div>
  );

  if (!isClient) {
    return <PageSkeleton />;
  }

  return (
    <div className="flex flex-col gap-12 md:gap-16 animate-fade-in">
      <header className="text-center py-16 md:py-24 px-4 relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
           <div className="absolute left-0 top-0 -z-10 h-2/3 w-full bg-gradient-to-b from-primary/10 to-transparent"></div>
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground">LoveNote</h1>
          <p className="text-md md:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A private sanctuary for the story of your love, captured in daily notes and cherished memories.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <NoteEditorDialog>
              <Button size="lg" className="shadow-lg hover:shadow-primary/20 transition-shadow">
                <PenSquare />
                Write Today's Note
              </Button>
            </NoteEditorDialog>
            <Button size="lg" variant="ghost" asChild>
                <Link href="/gallery">
                    View Our Gallery
                    <ArrowRight />
                </Link>
            </Button>
          </div>
      </header>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold font-headline text-center">Today's Note</h2>
        {todaysNote ? (
          <div className="max-w-3xl mx-auto">
             <NoteCard note={todaysNote} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-lg bg-card border-2 border-dashed border-border/60 max-w-3xl mx-auto">
            <Heart className="w-16 h-16 text-muted-foreground/20 mb-4" />
            <h3 className="text-2xl font-semibold font-headline">The page awaits your story</h3>
            <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
              Every day is a chance to express your love. Why not add a memory for today?
            </p>
            <NoteEditorDialog>
              <Button>
                <PlusCircle/>
                Create Today's Note
              </Button>
            </NoteEditorDialog>
          </div>
        )}
      </section>

      {latestNote && latestNote.date !== today && (
         <section className="space-y-6">
            <h2 className="text-3xl font-bold font-headline text-center">Latest Memory</h2>
            <div className="max-w-3xl mx-auto">
                <NoteCard note={latestNote} />
            </div>
         </section>
      )}
    </div>
  );
}
