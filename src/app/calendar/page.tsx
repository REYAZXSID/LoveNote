'use client';

import { NoteCard } from '@/components/note-card';
import { NoteEditorDialog } from '@/components/note-editor-dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useNotes } from '@/hooks/use-notes';
import { Heart, PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

export default function CalendarPage() {
  const { notes, getNoteByDate, isNotesLoaded } = useNotes();
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    // This effect runs only on the client, after hydration.
    setDate(new Date());
  }, []);

  const selectedNote = date ? getNoteByDate(date) : undefined;
  
  const noteDays = isNotesLoaded ? notes.map(note => new Date(note.date + 'T12:00:00Z')) : [];

  const modifiers = {
    hasNote: noteDays,
  };
  
  const modifiersStyles = {
    hasNote: {
      color: 'hsl(var(--primary-foreground))',
      backgroundColor: 'hsl(var(--primary))',
      borderRadius: 'var(--radius)',
    }
  };

  if (!date || !isNotesLoaded) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
            <div className="lg:col-span-1 flex flex-col items-center">
                <Skeleton className="h-10 w-1/2 mb-4" />
                <Skeleton className="rounded-xl border w-full h-80" />
            </div>
            <div className="lg:col-span-2">
                <Skeleton className="rounded-xl w-full h-[400px] lg:h-full" />
            </div>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
      <div className="lg:col-span-1 flex flex-col items-center">
        <h1 className="text-3xl font-bold font-headline mb-4 text-center">Our Timeline</h1>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-xl border w-full bg-card shadow-sm"
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          formatters={{
            formatDay: (day) => {
              const hasNote = getNoteByDate(day);
              const dayOfMonth = day.getDate();
              return (
                <>
                  {dayOfMonth}
                  {hasNote && <Heart className="absolute bottom-1 right-1 h-3 w-3" fill="currentColor" />}
                </>
              );
            }
          }}
        />
      </div>
      <div className="lg:col-span-2">
        <div className="p-4 rounded-xl bg-card/50 min-h-[400px] lg:min-h-full flex items-center justify-center">
          {selectedNote ? (
            <div className="w-full max-w-2xl animate-scale-in">
              <NoteCard key={selectedNote.id} note={selectedNote} className="bg-card shadow-lg" />
            </div>
          ) : (
            <div className="flex flex-col h-full items-center justify-center text-center p-12 animate-fade-in">
              <Heart className="w-16 h-16 text-muted-foreground/20 mb-4" />
              <h2 className="text-2xl font-semibold font-headline">Select a Day</h2>
              <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
                Pick a date from the calendar to view a memory, or write a new one for{' '}
                <span className="font-semibold text-foreground">{date ? format(date, "MMMM do") : 'today'}</span>.
              </p>
              <NoteEditorDialog>
                <Button>
                  <PlusCircle />
                  Write a Note for this Day
                </Button>
              </NoteEditorDialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
