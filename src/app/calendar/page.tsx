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
      backgroundColor: 'hsl(var(--primary) / 0.6)',
      borderRadius: 'var(--radius)',
    }
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-full bg-card"
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
      <div className="lg:col-span-2">
        <div className="p-4 rounded-lg bg-card/50 min-h-[300px]">
          {selectedNote ? (
            <NoteCard note={selectedNote} className="bg-card shadow-none border-0" />
          ) : (
            <div className="flex flex-col h-full items-center justify-center text-center p-12">
              <Heart className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <h2 className="text-xl font-semibold font-headline">No Note for This Day</h2>
              <p className="text-muted-foreground mt-2 mb-4 max-w-sm">
                Every day is a chance to express your love. Why not add a memory?
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
      </div>
    </div>
  );
}
