'use client';

import { NoteCard } from '@/components/note-card';
import { NoteEditorDialog } from '@/components/note-editor-dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useNotes } from '@/hooks/use-notes';
import { Heart, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';

export default function CalendarPage() {
  const { notes, getNoteByDate } = useNotes();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedNote = date ? getNoteByDate(date) : undefined;
  
  const noteDays = notes.map(note => new Date(note.date + 'T12:00:00Z'));

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1 flex flex-col items-center">
        <h1 className="text-3xl font-bold font-headline mb-4">Our Timeline</h1>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border w-full bg-card shadow-lg"
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          components={{
            Day: ({ ...props }) => {
              const hasNote = props.date && getNoteByDate(props.date);
              return (
                <div className="relative">
                  <DayPicker.Day {...props} />
                  {hasNote && <Heart className="absolute bottom-1 right-1 h-3 w-3 text-white" fill="white" />}
                </div>
              );
            },
          }}
        />
      </div>
      <div className="md:col-span-2">
        <div className="p-4 rounded-lg bg-card/50 min-h-[400px] flex items-center justify-center">
          {selectedNote ? (
            <NoteCard note={selectedNote} className="bg-card shadow-none border-0 w-full" />
          ) : (
            <div className="flex flex-col h-full items-center justify-center text-center p-12">
              <Heart className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <h2 className="text-2xl font-semibold font-headline">No Note for This Day</h2>
              <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
                Every day is a chance to express your love. Why not add a memory?
              </p>
              <NoteEditorDialog>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
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
